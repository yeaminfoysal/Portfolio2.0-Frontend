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

// 🧩 Validation Schema
const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  preview: z.string().url("Preview must be a valid URL"),
  overview: z.string().min(10, "Overview is required"),
  category: z.enum(["Full-stack", "Frontend", "Backend"]).optional(),
  status: z.enum(["Ongoing", "Completed"]).optional(),
  isFeatured: z.boolean().optional(),
  features: z.array(z.string().min(1, "Feature required")),
  challenges: z.array(z.string()).optional(),
  plans: z.array(z.string()).optional(),
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

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectCreateForm() {
  const [images, setImages] = useState<FileList | null>(null);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);

const {
  register,
  handleSubmit,
  control,
  reset,
  formState: { errors, isSubmitting },
} = useForm<ProjectFormValues>({
  resolver: zodResolver(projectSchema),
  defaultValues: {
    title: "",
    preview: "",
    overview: "",
    features: [""],
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

const { fields, append, remove } = useFieldArray({
  control,
  name: "features" as const,
});



const onSubmit = async (values: ProjectFormValues) => {
  console.log("✅ onSubmit triggered with:", values);
    try {
      const formData = new FormData();

      const projectData = {
        ...values,
        isFeatured,
      };

      formData.append("data", JSON.stringify(projectData));
      if (images) {
        Array.from(images).forEach((file) => {
          formData.append("files", file);
        });
      }
      console.log(formData)

      const res = await fetch(`http://localhost:4000/api/projects`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create project");

      const result = await res.json();
      console.log(result);
    //   reset();
      setImages(null);
      setPreviewURLs([]);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files);
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewURLs(urls);
    } else {
      setPreviewURLs([]);
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
              <Label>Title</Label>
              <Input {...register("title")} placeholder="Project title" />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label>Preview URL</Label>
              <Input {...register("preview")} placeholder="https://example.com" />
              {errors.preview && (
                <p className="text-red-500 text-sm">{errors.preview.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label>Overview</Label>
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
            <Label>Features</Label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...register(`features.${index}` as const)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => append("")}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Feature
              </Button>
            </div>
          </div>

          {/* Category and Status */}
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
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
              <Label>Status</Label>
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
            <Label>Technologies</Label>
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
              <Label>Client Repository</Label>
              <Input {...register("repositories.client")} placeholder="https://github.com/client" />
            </div>
            <div>
              <Label>Server Repository</Label>
              <Input {...register("repositories.server")} placeholder="https://github.com/server" />
            </div>
          </div>

          {/* Upload Images */}
          <Separator />
          <div>
            <Label>Upload Project Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewURLs.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previewURLs.map((url, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-md overflow-hidden border">
                    <Image
                      src={url}
                      alt={`Preview ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Featured Switch */}
          <Separator />
          <div className="flex items-center justify-between">
            <Label>Feature this project?</Label>
            <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
