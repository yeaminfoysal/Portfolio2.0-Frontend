"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Code2, Wrench, Calendar } from "lucide-react";
import { easeInOut } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GlowButton from "@/components/shared/GlowButton";
import { FaGithub } from "react-icons/fa";

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
    images: string[];
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
    
  const projectData = {
  title: "RideMate",
  images: [
    "https://res.cloudinary.com/dnfwuorji/image/upload/v1761382127/n20ysk5apj-1761382121618-bytebooks-png.png.png",
  ],
  technologies: {
    frontend: ["ReactJS", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Recharts", "Framer Motion"],
    backend: ["NodeJS", "ExpressJS", "JWT", "Mapbox SDK", "SSLCOMMERTZ"],
    database: ["MongoDB", "Mongoose"],
    tools: ["Vite", "React Hook Form", "Zod", "Cloudinary", "Shadcn UI"],
  },
  repositories: {
    client: "https://github.com/yeaminfoysal/RideMate-Frontend",
    server: "https://github.com/yeaminfoysal/RideMate-Backend",
  },
  preview: "https://ride-mate-frontend.vercel.app",
  overview:
    "RideMate is a full-featured ride-sharing platform that connects riders with drivers efficiently and securely. Built with a modern MERN stack and enhanced with real-time ride tracking, analytics, and role-based access control.",
  features: [
    "Ride Request & Fare Estimation",
    "Live Ride Tracking",
    "Emergency / SOS System",
    "Admin Analytics Dashboard",
    "Driver Earnings Dashboard",
  ],
  challenges: [
    "Handling real-time ride tracking with multiple concurrent users.",
    "Integrating secure payment gateways (SSLCOMMERTZ) for multiple currencies.",
    "Implementing role-based access control for riders, drivers, and admins.",
  ],
  plans: [
    "Add ride history analytics for users.",
    "Integrate more advanced map features with Mapbox.",
    "Implement push notifications for ride status updates.",
  ],
  status: "Completed" as const,
  category: "Full-Stack Web App",
  isFeatured: true,
};

  const [selectedImage, setSelectedImage] = useState(0);

  const techCategories = [
    { name: "Frontend", items: projectData.technologies.frontend, icon: Code2, color: "from-blue-500 to-cyan-500" },
    { name: "Backend", items: projectData.technologies.backend, icon: Wrench, color: "from-green-500 to-emerald-500" },
    { name: "Database", items: projectData.technologies.database, icon: Calendar, color: "from-purple-500 to-pink-500" },
    { name: "Tools", items: projectData.technologies.tools, icon: CheckCircle2, color: "from-orange-500 to-red-500" },
  ];


  return (
    <div className="min-h-screen py-28 px-4 sm:px-6 lg:px-8">
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
              {projectData.title}
            </h1>
            {projectData.isFeatured && (
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg">
                ⭐ Featured
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {projectData.status && (
              <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                projectData.status === "Completed" 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              }`}>
                {projectData.status}
              </span>
            )}
            {projectData.category && (
              <span className="px-4 py-1.5 text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">
                {projectData.category}
              </span>
            )}
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
            {projectData.overview}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
            <GlowButton href={projectData.preview} >  <ExternalLink className="w-5 h-5" /> Live Preview </GlowButton>
            <GlowButton href={projectData.repositories.client} >  <FaGithub className="w-5 h-5" /> Client Code </GlowButton>
            <GlowButton href={projectData.repositories.server} >  <FaGithub className="w-5 h-5" /> Server Code </GlowButton>
          {/* <a
            href={projectData.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Live Preview
          </a> */}
          {/* <a
            href={projectData.repositories.client}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Github className="w-5 h-5" />
            Client Code
          </a> */}
          {/* <a
            href={projectData.repositories.server}
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
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
            <div className="relative aspect-video">
              <Image
                src={projectData.images[selectedImage]}
                alt={`${projectData.title} screenshot ${selectedImage + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            {projectData.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {projectData.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === selectedImage
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
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
            className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 shadow-lg border border-blue-200 dark:border-blue-800"
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
              {projectData.features.map((feature, index) => (
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
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 shadow-lg border border-purple-200 dark:border-purple-800"
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
              {projectData.challenges.map((challenge, index) => (
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
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 shadow-lg border border-green-200 dark:border-green-800"
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
              {projectData.plans.map((plan, index) => (
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
              href={projectData.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Site
            </a>
            <a
              href={projectData.repositories.client}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all hover:bg-gray-800"
            >
              <Github className="w-5 h-5" />
              View Source
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}