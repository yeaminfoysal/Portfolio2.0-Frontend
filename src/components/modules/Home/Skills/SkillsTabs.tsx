"use client"
import { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, SiMongodb, SiGit, SiFirebase } from "react-icons/si";

// Define types
type Skill = {
    name: string;
    icon: ReactElement;
    level: number;
};

type SkillCategories = "All" | "Frontend" | "Backend" | "Database" | "Tools" | "Soft Skills";

const skillsData: Record<SkillCategories, Skill[]> = {
    All: [
        { name: "React JS", icon: <FaReact className="text-[#61DBFB]" />, level: 78 },
        { name: "Next JS", icon: <SiNextdotjs className="text-black dark:text-white" />, level: 60 },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, level: 75 },
        { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" />, level: 86 },
        { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" />, level: 72 },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38BDF8]" />, level: 72 },
        { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" />, level: 81 },
        { name: "Node JS", icon: <FaNodeJs className="text-[#68A063]" />, level: 65 },
    ],
    Frontend: [
        { name: "React JS", icon: <FaReact className="text-[#61DBFB]" />, level: 78 },
        { name: "Next JS", icon: <SiNextdotjs />, level: 60 },
        { name: "TypeScript", icon: <SiTypescript />, level: 75 },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 72 },
    ],
    Backend: [
        { name: "Node JS", icon: <FaNodeJs />, level: 65 },
        { name: "Express JS", icon: <FaNodeJs />, level: 68 },
    ],
    Database: [
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, level: 70 },
        { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" />, level: 75 },
    ],
    Tools: [
        { name: "Git", icon: <SiGit className="text-[#F1502F]" />, level: 80 },
    ],
    "Soft Skills": [
        { name: "Problem Solving", icon: <FaDatabase />, level: 85 },
        { name: "Communication", icon: <FaDatabase />, level: 78 },
    ],
};

export default function SkillsTabs() {
    const [activeTab, setActiveTab] = useState<SkillCategories>("All");

    return (
        <section className="relative px-4 md:px-0">
            <div className="mx-auto">
                {/* Tabs */}
                <div className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-10 flex-wrap">
                    {Object.keys(skillsData).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category as SkillCategories)}
                            className={`px-3 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 
                ${activeTab === category
                                    ? "btn-gradient text-white"
                                    : "bg-white dark:bg-[#141414] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {skillsData[activeTab].map((skill, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="bg-background border border-gray-200 dark:border-gray-800 rounded-lg md:rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                <div className="p-1.5 md:p-2 bg-orange-50 dark:bg-[#1a1a1a] rounded-md text-lg md:text-2xl">
                                    {skill.icon}
                                </div>
                                <h3 className="text-sm md:text-lg font-semibold text-gray-800 dark:text-white flex-1 truncate">
                                    {skill.name}
                                </h3>
                                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {skill.level}%
                                </span>
                            </div>

                            <div className="h-1.5 md:h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full btn-gradient rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}