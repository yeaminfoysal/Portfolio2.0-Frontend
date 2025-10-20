"use client";

import data from "@/data/education.json";
import { motion } from "framer-motion";
import ExperianceCard from "./Journey/JourneyCard";

const Experiance = () => {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>


            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[55px] font-bold text-center  mb-12"
                >
                    Experiance
                </motion.h2>

                <div className=" relative flex flex-col gap-12 pl-10">
                    {data.map((edu, index) => (
                        <ExperianceCard
                            key={edu.id}
                            degree={edu.degree}
                            institute={edu.institute}
                            location={edu.location}
                            duration={edu.duration}
                            status={edu.status}
                            achievements={edu.achievements}
                            courses={edu.courses}
                            instituteURL={edu?.instituteURL}
                            // companyURL={edu?.companyURL}
                            isfirst={index == 0}
                            length={data.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiance;
