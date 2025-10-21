"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MessageCircle } from "lucide-react";
import GlowButton from "@/components/shared/GlowButton";
// import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    subject: z.string().min(2, "Enter a valid Subject"),
    message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = (data: ContactFormValues) => {
        console.log(data);
        // toast.success("Message sent successfully!");
        form.reset();
    };

    return (
        <section id="contact" className="w-full py-20 px-4 md:px-10 relative">

            <div className="absolute w-[750px] h-[500px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

            <div className="max-w-6xl mx-auto relative">
                <div className="text-center mb-10">
                    <h2 className="text-[55px] font-bold mb-2">Contact Me</h2>
                    <p className="text-gray-400">Feel free to reach out for any inquiries or feedback.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 rounded-xl px-6 py-6">
                    {/* Left Side */}
                    <Card className=" border-none bg-background p-4">
                        <CardContent className="space-y-6 p-6">
                            <div>
                                <h3 className="text-2xl font-semibold mb-3">Get in Touch</h3>
                                <p className="text-gray-400">
                                    I’m currently open to new opportunities. Whether you have a question or just want to say hi,
                                    my inbox is always open.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 bg-[#a822ca28] p-5 rounded-xl border">
                                    <Mail className="main-txt" />
                                    <a href="mailto:yeamin.foysal@example.com" className=" transition">
                                        yeamin.foysal@example.com
                                    </a>
                                </div>

                                <div className="flex items-center gap-3 bg-[#a822ca28] p-5 rounded-xl border">
                                    <Phone className="main-txt" />
                                    <p className="">+880 1234 567 890</p>
                                </div>

                                <div className="flex items-center gap-3 bg-[#a822ca28] p-5 rounded-xl border">
                                    <MessageCircle className="main-txt" />
                                    <a
                                        href="https://wa.me/8801234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=""
                                    >
                                        Chat on WhatsApp
                                    </a>
                                </div>

                                <div className="flex items-center gap-3 bg-[#a822ca28] p-5 rounded-xl border">
                                    <MessageCircle className="main-txt" />
                                    <a
                                        href="https://wa.me/8801234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=""
                                    >
                                        Chat on Linkedin
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Side */}
                    <Card className=" border-none  bg-background p-4">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-semibold mb-4">Leave a Message</h3>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Your Name</FormLabel> */}
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your Name"
                                                        {...field}
                                                        className="!bg-[#a822ca28] focus:border-purple-800 p-5"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Your Email</FormLabel> */}
                                                <FormControl>
                                                    <Input
                                                        // type="email"
                                                        placeholder="Subject"
                                                        {...field}
                                                        className="!bg-[#a822ca28] focus:border-purple-400 p-5"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Your Email</FormLabel> */}
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Your Email"
                                                        {...field}
                                                        className="!bg-[#a822ca28] focus:border-purple-400 p-5"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Your Message</FormLabel> */}
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Write your message..."
                                                        {...field}
                                                        className="!bg-[#a822ca28] focus:border-purple-400 min-h-[120px] p-5"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <GlowButton type="submit" className="w-full text-center">
                                        Send Message
                                    </GlowButton>

                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
