/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";

const projectSchema = z.object({
    title: z.string().min(3, "Title is required"),
    preview: z.string().url("Preview must be a valid URL"),
    overview: z.string().min(10, "Overview is required"),
    category: z.enum(["Full-stack", "Frontend", "Backend"]),
    status: z.enum(["Ongoing", "Completed"]),
    features: z.string().min(3, "At least one feature is required"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectCreateForm() {
    const [images, setImages] = useState<FileList | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
    });

    const onSubmit = async (values: ProjectFormValues) => {
        try {
            const formData = new FormData();

            const projectData = {
                ...values,
                features: values.features.split(",").map((f) => f.trim()),
                technologies: {
                    frontend: ["React.js", "Tailwind CSS"],
                    backend: ["Node.js", "Express.js"],
                    database: ["MongoDB"],
                    tools: ["Cloudinary"],
                },
            };

            formData.append("data", JSON.stringify(projectData));
            if (images) {
                Array.from(images).forEach((file) => {
                    formData.append("files", file);
                });
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to create project");

            console.log(res)
            //   toast.success("Project created successfully!");
            reset();
            setImages(null);
        } catch (error: any) {
            console.error(error);
            //   toast.error(error.message || "Something went wrong");
            console.error(error)
        }
    };

    return (
        <Card className="max-w-2xl mx-auto mt-10">
            <CardHeader>
                <CardTitle>Create New Project</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Title</Label>
                        <Input {...register("title")} placeholder="Project title" />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>Preview Link</Label>
                        <Input {...register("preview")} placeholder="https://example.com" />
                        {errors.preview && (
                            <p className="text-sm text-red-500">{errors.preview.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>Overview</Label>
                        <Textarea {...register("overview")} rows={4} placeholder="Project overview..." />
                        {errors.overview && (
                            <p className="text-sm text-red-500">{errors.overview.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>Features (comma separated)</Label>
                        <Input {...register("features")} placeholder="Feature 1, Feature 2..." />
                    </div>

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

                    <div>
                        <Label>Upload Images</Label>
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setImages(e.target.files)}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Create Project"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
