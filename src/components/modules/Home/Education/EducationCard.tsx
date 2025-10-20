"use client";

import GlowButton from "@/components/shared/GlowButton";
import { motion } from "framer-motion";
import { FaSchool, FaCalendarAlt, FaMedal, FaBookOpen, FaStar, FaGraduationCap } from "react-icons/fa";

type EducationProps = {
    degree: string;
    institute: string;
    location?: string;
    duration: string;
    status: string;
    achievements: string[];
    courses: string[];
    certificateURL?: string,
    instituteURL?: string,
    isfirst: boolean,
    length: number
    // isLast: boolean,
    // index: number,
};

const EducationCard: React.FC<EducationProps> = ({
    degree,
    institute,
    location,
    duration,
    status,
    achievements,
    courses,
    certificateURL,
    instituteURL,
    isfirst,
    length
    // isLast,
    // index,
}) => {
    console.log(isfirst)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="relative border border-purple-800/50 rounded-2xl p-6 shadow-lg backdrop-blur-md bg-background"
        >
            {/* Animated background glow */}
            {/* <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gradient blur-[80px] rounded-full"
            /> */}

            {/* Glow icon */}
            <div className="absolute left-[-40px] top-6 p-3 main-bg rounded-full shadow-[0_0_10px_#a855f7]">
                <FaGraduationCap size={25} color="#fff" />
            </div>

            {/* Glow vertical line */}

            {/* <div className={`absolute left-[-10px] top-8 w-[2px] h-[calc(100%${isLast ? "" : "+3rem"})] bg-gradient-to-b from-purple-500/80 to-purple-500/80`} /> */}

            {/* <div
                className={`absolute left-[-10px] top-14 w-[2px] ${isLast
                    ? "h-[calc(100%-4rem)]"
                    : "h-[calc(100%+3rem)]"
                    } main-bg`}
            ></div> */}
            {/* <div
                className={`${isfirst ? "" : "hidden"} absolute left-[-10px] top-14 w-[2px] ${length == 1
                    ? "h-[calc(100%)]"
                    : `h-[calc(100%*${length})]`
                    } main-bg`}
            ></div> */}

            {/* Animated glow vertical line (only once for first card) */}
            {isfirst && (
                <div className="absolute left-[-20px] top-16 bottom-0 w-[3px]">
                    {/* Base static line */}
                    <div
                        className={`absolute inset-0 bg-gradient  ${length === 1
                            ? "h-full"
                            : `h-[calc(100%*2+7rem)]`
                            } `}
                    ></div>

                    {/* Moving glowing streak */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: ["100%", "2%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 w-full h-[calc(100%*1.2)] bg-gradient-to-b from-pink-600 via-purple-500 to-transparent 
                 blur-2xl opacity-90"
                        style={{ filter: "drop-shadow(0 0 6px #a855f7)" }}
                    />
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-[19px] font-bold">

                    {degree}
                </h3>
                <span className="flex items-center gap-2 text-sm main-txt/50  bg-purple-900/30 px-3 py-1 rounded-lg main-border">
                    <FaCalendarAlt /> {duration}
                </span>
            </div>

            {/* Institute Info */}
            <div className="flex items-center gap-3 mb-4 bg-[#a822ca1e] p-3 rounded-md">
                <span className="bg-[#a822ca29] p-3 rounded-md">
                    <FaSchool className="main-txt text-xl" />
                </span>
                <div>
                    <p className="font-medium">{institute}</p>
                    <p className="text-sm ">{location}</p>
                </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-4 font-medium">
                <FaStar className="text-pink-500" />
                <span className="bg-[#a822ca1e] border main-border px-3 py-3  rounded-lg text-sm">
                    {status}
                </span>
            </div>

            {/* Achievements */}
            <div className="mb-5">
                <h4 className="flex items-center gap-2  font-semibold mb-2">
                    <FaMedal /> Achievements
                </h4>
                <ul className="space-y-2 text-foreground/80 text-sm list-disc list-inside">
                    {achievements.map((ach, i) => (
                        <li className="bg-[#a822ca21] p-2 rounded-md" key={i}>{ach}</li>
                    ))}
                </ul>
            </div>

            {/* Key Courses */}
            <div>
                <h4 className="flex items-center gap-2  font-semibold mb-3">
                    <FaBookOpen /> Key Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                    {courses.map((course, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-sm bg-[#a822ca1e] rounded-lg border main-border hover:bg-purple-800/50 transition-all"
                        >
                            {course}
                        </span>
                    ))}
                </div>
            </div>
            {
                certificateURL && <div className="flex justify-end">
                    <GlowButton href={certificateURL}>
                        <span className="text-xs">View Certificate</span>
                    </GlowButton>
                </div>
            }
            {
                instituteURL && <div className="flex justify-end">
                    <GlowButton href={instituteURL}>
                        <span className="text-xs">View institute</span>
                    </GlowButton>
                </div>
            }
        </motion.div>
    );
};

export default EducationCard;
