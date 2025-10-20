"use client";

import data from "@/data/education.json";
import certifications from "@/data/certifications.json";
import { motion } from "framer-motion";
import EducationCard from "./Education/EducationCard";

const EducationCertification = () => {
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
                    Education & Certifications 
                </motion.h2>

                <div className="grid grid-cols-7 gap-8">
                    <div className="col-span-4 relative flex flex-col gap-12 pl-10">
                        {data.map((edu, index) => (
                            <EducationCard
                                key={edu.id}
                                degree={edu.degree}
                                institute={edu.institute}
                                location={edu.location}
                                duration={edu.duration}
                                status={edu.status}
                                achievements={edu.achievements}
                                courses={edu.courses}
                                instituteURL={edu?.instituteURL}
                                isfirst={index == 0}
                                length={data.length}
                            />
                        ))}
                    </div>
                    <div className="col-span-3 relative flex flex-col gap-12 pl-10">
                        {certifications.map((edu, index) => (
                            <EducationCard
                                key={edu.id}
                                degree={edu.degree}
                                institute={edu.institute}
                                // location={edu?.location}
                                duration={edu.duration}
                                status={edu.status}
                                achievements={edu.achievements}
                                courses={edu.technologies}
                                isfirst={index == 0}
                                length={data.length}
                                certificateURL={edu.certificateURL}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationCertification;
