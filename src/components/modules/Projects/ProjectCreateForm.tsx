/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash } from "lucide-react";
import GlowButton from "@/components/shared/GlowButton";
import toast from "react-hot-toast";

// ✅ FIX 1: Define a structured schema for the array item
const featureItemSchema = z.object({
  value: z.string().min(1, "Feature required"),
});

// 🧩 Validation Schema (Updated)
const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  preview: z.string().url("Preview must be a valid URL"),
  overview: z.string().min(10, "Overview is required"),
  category: z.enum(["Full-stack", "Frontend", "Backend"]).optional(),
  status: z.enum(["Ongoing", "Completed"]).optional(),
  isFeatured: z.boolean().optional(),
  features: z.array(featureItemSchema), // Now an array of objects
  challenges: z.array(featureItemSchema), // Now an array of objects
  plans: z.array(featureItemSchema), // Now an array of objects
  // challenges: z.array(z.string()).optional(),
  // plans: z.array(z.string()).optional(),
  technologies: z.object({
    frontend: z.array(z.string()).optional(),
    backend: z.array(z.string()).optional(),
    database: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
  }),
  repositories: z
    .object({
      client: z.string().optional(),
      server: z.string().optional(),
    })
    .optional(),
});

// ✅ FIX 2: Define the interface to match the new object structure
interface IProjectFormValues {
  title: string;
  preview: string;
  overview: string;
  category?: "Full-stack" | "Frontend" | "Backend";
  status?: "Ongoing" | "Completed";
  position?: number;
  isFeatured?: boolean;
  features: { value: string }[]; // Array of objects
  challenges: { value: string }[]; // Array of objects
  plans: { value: string }[]; // Array of objects
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
  };
  repositories?: {
    client?: string;
    server?: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ProjectFormValues = IProjectFormValues;


export default function ProjectCreateForm() {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [fullImageFile, setFullImageFile] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      preview: "",
      overview: "",
      position: 0,
      features: [{ value: "" }], // ✅ FIX 3: Default value must match the object structure
      challenges: [{ value: "" }], // ✅ FIX 3: Default value must match the object structure
      plans: [{ value: "" }], // ✅ FIX 3: Default value must match the object structure
      technologies: {
        frontend: [""],
        backend: [""],
        database: [""],
        tools: [""],
      },
      repositories: {
        client: "",
        server: "",
      },
    },
  });

  // ✅ FINAL FIX: The basic useFieldArray call now works because the structure is unambiguous
  const { fields: featureFields, append: featureAppend, remove: featureRemove } = useFieldArray<IProjectFormValues>({
    control,
    name: "features" as const,
  });
  const { fields: challengeFields, append: challengeAppend, remove: challengeRemove } = useFieldArray<IProjectFormValues>({
    control,
    name: "challenges" as const,
  });
  const { fields: planFields, append: planAppend, remove: planRemove } = useFieldArray<IProjectFormValues>({
    control,
    name: "plans" as const,
  });


  const onSubmit = async (values: IProjectFormValues) => {
    console.log("✅ onSubmit triggered with:", values);
    try {
      const formData = new FormData();

      // Note: The structure of 'values.features' is now [{value: 'feature 1'}, ...]
      // You might need to flatten it before sending to your backend if it expects string[]
      const flatFeatures = values.features.map(f => f.value);
      const flatChallenges = values.challenges.map(c => c.value);
      const flatPlans = values.plans.map(p => p.value);

      const projectData = {
        ...values,
        features: flatFeatures, // Flattened for backend if needed
        challenges: flatChallenges, // Flattened for backend if needed
        plans: flatPlans, // Flattened for backend if needed
        isFeatured,
      };

      formData.append("data", JSON.stringify(projectData));

      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      if (fullImageFile) formData.append("fullImage", fullImageFile);

      console.log(formData)

      const res = await fetch(`http://localhost:4000/api/projects`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to create project");

      const result = await res.json();
      console.log(result);
      toast.success("Project created successfully! 🚀");
      //   reset();
      setFullImageFile(null);
      setThumbnailFile(null);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-xl border border-border/40">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Create New Project 🚀
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Title</Label>
              <Input {...register("title")} placeholder="Project title" />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Label className="mb-2">Position</Label>
              <Input {...register("position")} placeholder="Project position" type="number" />
              {errors.position && (
                <p className="text-red-500 text-sm">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="mb-2">Preview URL</Label>
            <Input {...register("preview")} placeholder="https://example.com" />
            {errors.preview && (
              <p className="text-red-500 text-sm">{errors.preview.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">Overview</Label>
            <Textarea
              {...register("overview")}
              placeholder="Write a short project overview..."
              rows={4}
            />
            {errors.overview && (
              <p className="text-red-500 text-sm">{errors.overview.message}</p>
            )}
          </div>

          {/* Features */}
          <Separator />
          <div>
            <Label className="mb-2">Features</Label>
            <div className="space-y-2">
              {featureFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    // ✅ FIX 4: Register the field at the nested 'value' path
                    {...register(`features.${index}.value` as const)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => featureRemove(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                // Append an object with the 'value' field
                onClick={() => featureAppend({ value: "" })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Feature
              </Button>
            </div>
          </div>

          {/* Challenges */}
          <Separator />
          <div>
            <Label className="mb-2">Challenges</Label>
            <div className="space-y-2">
              {challengeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    // ✅ FIX 4: Register the field at the nested 'value' path
                    {...register(`challenges.${index}.value` as const)}
                    placeholder={`Challenge ${index + 1}`}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => challengeRemove(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                // Append an object with the 'value' field
                onClick={() => challengeAppend({ value: "" })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Challenge
              </Button>
            </div>
          </div>

          {/* plans */}
          <Separator />
          <div>
            <Label className="mb-2">Plans</Label>
            <div className="space-y-2">
              {planFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    // ✅ FIX 4: Register the field at the nested 'value' path
                    {...register(`plans.${index}.value` as const)}
                    placeholder={`Plan ${index + 1}`}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => planRemove(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                // Append an object with the 'value' field
                onClick={() => planAppend({ value: "" })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Plan
              </Button>
            </div>
          </div>


          {/* Category and Status */}
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Category</Label>
              <select
                {...register("category")}
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="Full-stack">Full-stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </div>
            <div>
              <Label className="mb-2">Status</Label>
              <select
                {...register("status")}
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Technologies */}
          <Separator />
          <div>
            <Label className="mb-2">Technologies</Label>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <Input {...register("technologies.frontend.0")} placeholder="Frontend (e.g. React)" />
              <Input {...register("technologies.backend.0")} placeholder="Backend (e.g. Node.js)" />
              <Input {...register("technologies.database.0")} placeholder="Database (e.g. MongoDB)" />
              <Input {...register("technologies.tools.0")} placeholder="Tools (e.g. Cloudinary)" />
            </div>
          </div>

          {/* Repository Links */}
          <Separator />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Client Repository</Label>
              <Input {...register("repositories.client")} placeholder="https://github.com/client" />
            </div>
            <div>
              <Label className="mb-2">Server Repository</Label>
              <Input {...register("repositories.server")} placeholder="https://github.com/server" />
            </div>
          </div>

          {/* Upload Images */}
          <Label className="mb-2">Thumbnail Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          />

          <Label className="mb-2">Full Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFullImageFile(e.target.files?.[0] || null)}
          />

          {thumbnailFile && (
            <Image src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail" width={100} height={100} />
          )}

          {fullImageFile && (
            <Image src={URL.createObjectURL(fullImageFile)} alt="Full Image" width={100} height={100} />
          )}


          {/* Featured Switch */}
          <Separator />
          <div className="flex items-center justify-between">
            <Label className="mb-2">Feature this project?</Label>
            <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
          </div>

          {/* Submit */}
          <GlowButton className="w-full" type="submit" isDisabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Project"}
          </GlowButton>
          {/* <Button
            
            className="w-full mt-4"
            
          >
            
          </Button> */}
        </form>
      </CardContent >
    </Card >
  );
}