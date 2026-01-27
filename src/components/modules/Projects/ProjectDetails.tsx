"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Code2, Wrench, Calendar } from "lucide-react";
import { easeInOut } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GlowButton from "@/components/shared/GlowButton";
import { FaGithub } from "react-icons/fa";
import AutoScrollImage from "./AutoScrollImage";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: easeInOut },
    },
};

interface ProjectDetailsProps {
    project: {
        title: string;
        thumbnail: string;
        fullImage: string;
        technologies: {
            frontend: string[];
            backend: string[];
            database: string[];
            tools: string[];
        };
        repositories: {
            client: string;
            server: string;
        };
        preview: string;
        overview: string;
        features: string[];
        challenges: string[];
        plans: string[];
        status?: "Completed" | "Ongoing";
        category?: string;
        isFeatured?: boolean;
    };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {

    // const [selectedImage, setSelectedImage] = useState(0);

    const techCategories = [
        { name: "Frontend", items: project?.technologies?.frontend, icon: Code2, color: "from-blue-500 to-cyan-500" },
        { name: "Backend", items: project?.technologies?.backend, icon: Wrench, color: "from-green-500 to-emerald-500" },
        { name: "Database", items: project?.technologies?.database, icon: Calendar, color: "from-purple-500 to-pink-500" },
        { name: "Tools", items: project?.technologies?.tools, icon: CheckCircle2, color: "from-orange-500 to-red-500" },
    ];


    return (
        <div className="min-h-screen py-28 px-4 sm:px-6 lg:px-8 relative">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                {/* Back Button */}
                <motion.div variants={itemVariants} className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Portfolio</span>
                    </Link>
                </motion.div>

                {/* Header Section */}
                <motion.div variants={itemVariants} className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#a722ca]">
                            {project?.title}
                        </h1>
                        {project?.isFeatured && (
                            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                                ⭐ Featured
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {project?.status && (
                            <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${project.status === "Completed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                }`}>
                                {project?.status}
                            </span>
                        )}
                        {project?.category && (
                            <span className="px-4 py-1.5 text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">
                                {project?.category}
                            </span>
                        )}
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
                        {project?.overview}
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                    <GlowButton href={project?.preview} >  <ExternalLink className="w-5 h-5" /> Live Preview </GlowButton>
                    <GlowButton href={project?.repositories?.client} >  <FaGithub className="w-5 h-5" /> Client Code </GlowButton>
                    <GlowButton href={project?.repositories?.server} >  <FaGithub className="w-5 h-5" /> Server Code </GlowButton>
                    {/* <a
            href={project.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Live Preview
          </a> */}
                    {/* <a
            href={project.repositories.client}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Github className="w-5 h-5" />
            Client Code
          </a> */}
                    {/* <a
            href={project.repositories.server}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Github className="w-5 h-5" />
            Server Code
          </a> */}
                </motion.div>

                {/* Image Gallery */}
                <motion.div variants={imageVariants} className="mb-12">
                    {project?.fullImage ? (
                        <AutoScrollImage
                            src={project.fullImage}
                            alt={`${project.title} homepage screenshot`}
                            scrollDuration={60}      // Faster for testing
                            inactivityDelay={500}
                            pauseAtEnds={80}        // Short pause for testing
                        />
                    ) : (
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
                            <div className="relative aspect-video">
                                <Image
                                    src={project?.thumbnail}
                                    alt={`${project.title} screenshot`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    {/* {project?.images.length > 1 && (
                        <div className="mt-4 flex justify-center gap-2">
                            {project.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === selectedImage
                                        ? "bg-blue-600 dark:bg-blue-400 w-8"
                                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                                        }`}
                                    aria-label={`View image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )} */}
                </motion.div>

                <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

                    {/* Tech Stack Section */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            Technology Stack
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {techCategories.map((category) => (
                                <motion.div
                                    key={category.name}
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                    className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
                                >
                                    <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                                        <category.icon className="w-4 h-4" />
                                        <h3 className="font-semibold text-sm">{category.name}</h3>
                                    </div>
                                    <motion.ul
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-2"
                                    >
                                        {category.items.map((tech, techIndex) => (
                                            <motion.li
                                                key={techIndex}
                                                variants={itemVariants}
                                                className="text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                                                {tech}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features, Challenges, Plans Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Features */}
                        <motion.div
                            variants={itemVariants}
                            className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 shadow-lg border border-blue-200 dark:border-blue-800"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                Key Features
                            </h2>
                            <motion.ul
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                {project?.features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                                    >
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Challenges */}
                        <motion.div
                            variants={itemVariants}
                            className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 shadow-lg border border-purple-200 dark:border-purple-800"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                Challenges
                            </h2>
                            <motion.ul
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                {project?.challenges.map((challenge, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                                    >
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                                        <span>{challenge}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Future Plans */}
                        <motion.div
                            variants={itemVariants}
                            className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 shadow-lg border border-green-200 dark:border-green-800"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                                Future Plans
                            </h2>
                            <motion.ul
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                {project?.plans.map((plan, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                                    >
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                                        <span>{plan}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </div>

                    {/* Footer CTA */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl p-8 text-center shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Interested in this project?
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Check out the live demo and explore the source code to see how it was built.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href={project?.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            >
                                <ExternalLink className="w-5 h-5" />
                                View Live Site
                            </a>
                            <a
                                href={project.repositories.client}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all hover:bg-gray-800"
                            >
                                <Github className="w-5 h-5" />
                                View Source
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}