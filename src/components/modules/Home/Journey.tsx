"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserGraduate, FaBriefcase, FaCertificate } from "react-icons/fa";
import certifications from "@/data/certifications.json";
import education from "@/data/education.json";
import experience from "@/data/experiance.json";
import JourneyCard from "./Journey/JourneyCard";
import GlowEffect from "@/components/shared/GlowEffect";

const tabs = [
    { id: "experience", label: "Experience", icon: <FaBriefcase /> },
    { id: "education", label: "Education", icon: <FaUserGraduate /> },
    { id: "certifications", label: "Certifications", icon: <FaCertificate /> },
];

export default function Journey() {
    const [activeTab, setActiveTab] = useState("experience");

    const getData = () => {
        switch (activeTab) {
            case "experience":
                return experience;
            case "education":
                return education;
            case "certifications":
                return certifications;
            default:
                return [];
        }
    };

    const data = getData();

    return (
        <section className="w-full max-w-7xl mx-auto  py-16 md:py-20  relative">
            {/* Glow Effect */}
            <GlowEffect />
            {/* <div className="absolute w-[750px] h-[1000px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div> */}

            {/* Header */}
            <h2 className="text-center text-3xl md:text-4xl lg:text-[55px] font-bold mb-6 md:mb-10 bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                My Journey
            </h2>

            {/* Tabs */}
            <div className="flex justify-center gap-2 md:gap-4 mb-8 md:mb-10 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-full border transition-all duration-300 text-sm md:text-base
              ${activeTab === tab.id
                                ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/30"
                                : "border-purple-800 hover:border-purple-600"
                            }`}
                    >
                        <span className="text-sm md:text-base">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden text-xs">{tab.label.slice(0, 4)}</span>
                    </button>
                ))}
            </div>

            {/* Animated Content */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex flex-col gap-8 md:gap-12 pl-4 md:pl-10"
                    >
                        {activeTab === "experience" &&
                            (data as typeof experience).map((item, index) => (
                                <JourneyCard
                                    key={item.id}
                                    position={item.position}
                                    company={item.company}
                                    location={item.location}
                                    duration={item.duration}
                                    status={item.status}
                                    achievements={item.achievements}
                                    technologies={item.technologies}
                                    companyURL={item.companyURL}
                                    isfirst={index === 0}
                                    length={data.length}
                                />
                            ))}

                        {activeTab === "education" &&
                            (data as typeof education).map((item, index) => (
                                <JourneyCard
                                    key={item.id}
                                    degree={item.degree}
                                    institute={item.institute}
                                    location={item.location}
                                    duration={item.duration}
                                    status={item.status}
                                    achievements={item.achievements}
                                    courses={item.courses}
                                    instituteURL={item.instituteURL}
                                    isfirst={index === 0}
                                    length={data.length}
                                />
                            ))}

                        {activeTab === "certifications" &&
                            (data as typeof certifications).map((item, index) => (
                                <JourneyCard
                                    key={item.id}
                                    degree={item.degree}
                                    institute={item.institute}
                                    duration={item.duration}
                                    status={item.status}
                                    achievements={item.achievements}
                                    technologies={item.technologies}
                                    certificateURL={item.certificateURL}
                                    isfirst={index === 0}
                                    length={data.length}
                                />
                            ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}