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

const blogSchema = z.object({
    title: z.string().min(3, "Title is required"),
    author: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(3, "Description is required"),
    content: z.string().min(3, "Content is required"),
});

export interface IBlogFormValues {
    _id?: string,
    title: string;
    author?: string;
    thumbnail?: string;
    category: string;
    views?: number;
    description: string;
    content: string;
}

export default function BlogCreateForm() {
    const [image, setImage] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IBlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            author: "",
            category: "",
        },
    });

    const onSubmit = async (values: IBlogFormValues) => {
        console.log("✅ Submitting:", values);
        try {
            const formData = new FormData();

            const blogData = {
                ...values,
            };

            formData.append("data", JSON.stringify(blogData));
            if (image) {
                formData.append("file", image);
            }

            const res = await fetch(`http://localhost:4000/api/blogs`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            if (!res.ok) throw new Error("Failed to create blog");

            const result = await res.json();
            console.log(result);

            setPreviewURL(null);
            setImage(null);
            reset();
        } catch (err: any) {
            console.error("❌ Submit error:", err);
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
        <Card className="max-w-3xl mx-auto mt-10 shadow-xl border border-border/40">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                    Create New Blog 📝
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <Label>Title</Label>
                        <Input {...register("title")} placeholder="Blog title" />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Author */}
                    <div>
                        <Label>Author</Label>
                        <Input {...register("author")} placeholder="Author name" />
                        {errors.author && (
                            <p className="text-red-500 text-sm">{errors.author.message}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <Label>Category</Label>
                        <select
                            {...register("category")}
                            className="w-full border rounded-md p-2 bg-background"
                        >
                            <option value="">Select category</option>
                            <option value="Full-stack">Full-stack</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm">{errors.category.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <Label>Description</Label>
                        <Textarea
                            {...register("description")}
                            placeholder="Write a short description..."
                            rows={3}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <Label>Content</Label>
                        <Textarea
                            {...register("content")}
                            placeholder="Write your content..."
                            rows={5}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm">{errors.content.message}</p>
                        )}
                    </div>

                    {/* Upload Thumbnail */}
                    <Separator />
                    <div>
                        <Label>Upload Thumbnail</Label>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
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
                    <GlowButton
                        className="w-full"
                        type="submit"
                        isDisabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Create Blog"}
                    </GlowButton>
                </form>
            </CardContent>
        </Card>
    );
}
