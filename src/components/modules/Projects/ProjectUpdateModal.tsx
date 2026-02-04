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

// ✅ Schema for Features (Array of objects)
const featureItemSchema = z.object({
    value: z.string().min(1, "Feature required"),
});

// ✅ Main Zod Schema
const projectSchema = z.object({
    title: z.string().min(3, "Title is required"),
    preview: z.string().url("Preview must be a valid URL"),
    overview: z.string().min(10, "Overview is required"),
    category: z.enum(["Full-stack", "Frontend", "Backend"]).optional(),
    status: z.enum(["Ongoing", "Completed"]).optional(),
    position: z.coerce.number().optional(),
    isFeatured: z.boolean().optional(),
    features: z.array(featureItemSchema),
    challenges: z.array(featureItemSchema),
    plans: z.array(featureItemSchema),
    technologies: z.object({
        frontend: z.union([z.string(), z.array(z.string())]).optional(),
        backend: z.union([z.string(), z.array(z.string())]).optional(),
        database: z.union([z.string(), z.array(z.string())]).optional(),
        tools: z.union([z.string(), z.array(z.string())]).optional(),
    }),

    repositories: z
        .object({
            client: z.string().optional(),
            server: z.string().optional(),
        })
        .optional(),
});

// interface IProjectFormValues extends z.infer<typeof projectSchema> {
//     _id?: string;
// }

const toCommaString = (value?: string | string[]) => {
    if (Array.isArray(value)) return value.join(", ");
    return value || "";
};


// ✅ Component
export default function ProjectUpdateModal({ project }: { project: any }) {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [fullImageFile, setFullImageFile] = useState<File | null>(null);
    const [isFeatured, setIsFeatured] = useState(project?.isFeatured || false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<any>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: project?.title || "",
            preview: project?.preview || "",
            overview: project?.overview || "",
            category: project?.category,
            position: project?.position,
            status: project?.status,
            isFeatured: project?.isFeatured || false,
            features:
                project?.features?.length > 0
                    ? project.features.map((f: any) =>
                        typeof f === "string" ? { value: f } : f
                    )
                    : [{ value: "" }],
            challenges:
                project?.challenges?.length > 0
                    ? project.challenges.map((c: any) =>
                        typeof c === "string" ? { value: c } : c
                    )
                    : [{ value: "" }],
            plans:
                project?.plans?.length > 0
                    ? project.plans.map((p: any) =>
                        typeof p === "string" ? { value: p } : p
                    )
                    : [{ value: "" }],
            technologies: {
                frontend: toCommaString(project?.technologies?.frontend),
                backend: toCommaString(project?.technologies?.backend),
                database: toCommaString(project?.technologies?.database),
                tools: toCommaString(project?.technologies?.tools),
            },
            repositories: {
                client: project?.repositories?.client || "",
                server: project?.repositories?.server || "",
            },
        },
    });

    // ✅ For dynamic feature fields
    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: "features",
    // });
    const { fields: featureFields, append: featureAppend, remove: featureRemove } = useFieldArray<any>({
        control,
        name: "features" as const,
    });
    const { fields: challengeFields, append: challengeAppend, remove: challengeRemove } = useFieldArray<any>({
        control,
        name: "challenges" as const,
    });
    const { fields: planFields, append: planAppend, remove: planRemove } = useFieldArray<any>({
        control,
        name: "plans" as const,
    });

    // ✅ Submit Handler
    const onSubmit = async (values: any) => {
        try {
            const formData = new FormData();


            const projectData = {
                ...values,
                features: values.features.map((f: { value: any; }) => f.value),
                challenges: values.challenges.map((c: { value: any; }) => c.value),
                plans: values.plans.map((p: { value: any; }) => p.value),
                isFeatured,
            };

            formData.append("data", JSON.stringify(projectData));

            if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
            if (fullImageFile) formData.append("fullImage", fullImageFile);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${project._id}`,
                {
                    method: "PATCH",
                    body: formData,
                    credentials: "include"
                }
            );

            if (!res.ok) throw new Error("Failed to update project");

            const result = await res.json();
            console.log("✅ Update successful:", result);
            toast.success("Project updated successfully! 🚀");

            setFullImageFile(null);
            setThumbnailFile(null);
        } catch (err: any) {
            console.error("❌ Update failed:", err);
            toast.error(err.message || "Something went wrong!");
        }
    };

    // // ✅ Handle image previews
    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     setImages(files);
    //     if (files && files.length > 0) {
    //         const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    //         setPreviewURLs(urls);
    //     } else {
    //         setPreviewURLs([]);
    //     }
    // };

    return (
        <Card className=" mx-auto border-none w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                    Update Project 🚀
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
                                <p className="text-red-500 text-sm">{typeof errors.title.message === 'string' ? errors.title.message : "Error occurred"}</p>
                            )}
                        </div>
                        <div>
                            <Label className="mb-2">Position</Label>
                            <Input {...register("position")} placeholder="Project position" type="number" />
                            {errors.position && (
                                <p className="text-red-500 text-sm">{typeof errors.position.message === 'string' ? errors.position.message : "Error occurred"}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Preview URL</Label>
                        <Input {...register("preview")} placeholder="https://example.com" />
                        {errors.preview && (
                            <p className="text-red-500 text-sm">{typeof errors.preview.message === 'string' ? errors.preview.message : "Error occurred"}</p>
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
                            <p className="text-red-500 text-sm">{typeof errors.overview?.message === 'string' ? errors.overview.message : "Error occurred"}</p>
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
                                        {...register(`features.${index}.value`)}
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
                                        {...register(`challenges.${index}.value`)}
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
                                onClick={() => challengeAppend({ value: "" })}
                            >
                                <Plus className="w-4 h-4 mr-1" /> Add Challenge
                            </Button>
                        </div>
                    </div>

                    {/* Plans */}
                    <Separator />
                    <div>
                        <Label className="mb-2">Plans</Label>
                        <div className="space-y-2">
                            {planFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input
                                        {...register(`plans.${index}.value`)}
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
                                <option value="">Select...</option>
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
                                <option value="">Select...</option>
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
                            <Input
                                {...register("technologies.frontend")}
                                placeholder="Frontend (React, Next.js)"
                            />

                            <Input
                                {...register("technologies.backend")}
                                placeholder="Backend (Node, Express)"
                            />

                            <Input
                                {...register("technologies.database")}
                                placeholder="Database (MongoDB)"
                            />

                            <Input
                                {...register("technologies.tools")}
                                placeholder="Tools (Stripe, Firebase)"
                            />

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
                    <Separator />
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
                        {isSubmitting ? "Updating..." : "Update Project"}
                    </GlowButton>
                </form>
            </CardContent>
        </Card>
    );
}
