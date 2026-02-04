/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import GlowButton from "@/components/shared/GlowButton";
import { IBlogFormValues } from "./BlogCreateForm";


// ✅ Main Zod Schema
const blogSchema = z.object({
    title: z.string().min(3, "Title is required"),
    author: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(3, "Description is required"),
    content: z.string().min(3, "Content is required"),
});

// ✅ Component
export default function BlogUpdateModal({ blog }: { blog: IBlogFormValues }) {
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IBlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: blog.title || "",
            thumbnail: blog.thumbnail || "",
            description: blog.description || "",
            content: blog.content || "",
            author: blog.author || "",
            category: blog.category || ""
        },
    });

    // ✅ Submit Handler
    const onSubmit = async (values: IBlogFormValues) => {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(values));

            if (image) {
                formData.append("file", image);
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${blog._id}`,
                {
                    method: "PATCH",
                    body: formData,
                    credentials: "include"
                }
            );

            if (!res.ok) throw new Error("Failed to update blog");

            const result = await res.json();
            console.log("✅ Update successful:", result);

            setImage(null);
            setPreviewURL(null);
        } catch (err: any) {
            console.error("❌ Update failed:", err);
        }
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    return (
        <Card className=" mx-auto border-none">
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
                                <p className="text-red-500 text-sm">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-2">Thumbnail URL</Label>
                            <Input {...register("thumbnail")} placeholder="https://example.com" />
                            {errors.thumbnail && (
                                <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Author</Label>
                        <Textarea
                            {...register("author")}
                            placeholder="Author"
                            rows={4}
                        />
                        {errors.author && (
                            <p className="text-red-500 text-sm">{errors.author.message}</p>
                        )}
                    </div>

                    <div>
                        <Label className="mb-2">Description</Label>
                        <Textarea
                            {...register("description")}
                            placeholder="Write a short blog description..."
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Content */}
                    <Separator />
                    <div>
                        <Label className="mb-2">Content</Label>
                        <Textarea
                            {...register("content")}
                            placeholder="Write a short blog content..."
                            rows={4}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm">{errors.content.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <Separator />
                    <div className="">
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
                    </div>

                    {/* Upload Image */}
                    <Separator />
                    <div>
                        <Label className="mb-2">Upload Project Image</Label>
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {previewURL && (
                            <div className="mt-3 relative w-32 h-32 rounded-md overflow-hidden border">
                                <Image
                                    src={previewURL}
                                    alt="Thumbnail Preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <GlowButton className="w-full" type="submit" isDisabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Blog"}
                    </GlowButton>
                </form>
            </CardContent>
        </Card>
    );
}
