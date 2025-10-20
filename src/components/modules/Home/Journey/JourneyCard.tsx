"use client";

import GlowButton from "@/components/shared/GlowButton";
import { motion } from "framer-motion";
import { FaSchool, FaCalendarAlt, FaMedal, FaBookOpen, FaStar, FaGraduationCap, FaBriefcase, FaCertificate } from "react-icons/fa";

type EducationProps = {
  degree?: string;
  position?: string;
  institute?: string;
  company?: string;
  location?: string;
  duration: string;
  status: string;
  achievements: string[];
  courses?: string[];
  technologies?: string[];
  certificateURL?: string,
  instituteURL?: string,
  companyURL?: string;
  isfirst: boolean,
  length: number
};

const JourneyCard: React.FC<EducationProps> = ({
  degree,
  position,
  institute,
  company,
  location,
  duration,
  status,
  achievements,
  courses,
  technologies,
  certificateURL,
  instituteURL,
  companyURL,
  isfirst,
  length
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="relative border border-purple-800/50 rounded-2xl p-10 shadow-lg backdrop-blur-md bg-background"
    >

      {/* Glow icon */}
      <div className="absolute left-[-40px] top-6 p-3 main-bg rounded-full shadow-[0_0_10px_#a855f7]">
        {companyURL && <FaBriefcase size={25} color="#fff" />}
        {instituteURL && <FaGraduationCap size={25} color="#fff" />}
        {certificateURL && <FaCertificate size={25} color="#fff" />}
      </div>

      {/* Glow vertical line */}

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
            className={`absolute left-0 w-full h-[calc(100%*1.15)] bg-gradient-to-b from-[#ff0000] via-purple-500 to-transparent blur-xl opacity-90`}
            style={{ filter: "drop-shadow(0 0 8px #a54af9)" }}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4 text-[#a54af9]">
        <h3 className="text-[22px] font-bold">
          {degree || position}
        </h3>
        <span className="flex items-center gap-2 text-sm font-medium main-txt/50  bg-[#a822ca11] px-3 py-1 rounded-lg main-border">
          <FaCalendarAlt /> {duration}
        </span>
      </div>

      {/* Institute Info */}
      <div className="flex items-center gap-3 mb-4 bg-[#a822ca11] p-3 rounded-md">
        <span className="bg-[#a822ca29] p-3 rounded-md">
          <FaSchool className="main-txt text-xl" />
        </span>
        <div>
          <p className="font-semibold">{institute || company}</p>
          <p className="text-sm ">{location}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4 font-medium">
        <FaStar className="main-txt" />
        <span className="bg-[#a822ca11] border main-border px-3 py-3  rounded-lg text-sm">
          {status}
        </span>
      </div>

      {/* Achievements */}
      <div className="mb-5">
        <h4 className="flex items-center gap-2  font-semibold mb-2">
          <FaMedal className="main-txt" /> Achievements
        </h4>
        <ul className="space-y-2 text-foreground/80 text-sm list-disc list-inside">
          {achievements.map((ach, i) => (
            <li className="bg-[#a822ca11] p-2 rounded-md" key={i}>{ach}</li>
          ))}
        </ul>
      </div>

      {/* Key Courses */}
      <div>
        <h4 className="flex items-center gap-2  font-semibold mb-3">
          <FaBookOpen className="main-txt" />
          {courses && 'Key courses'}
          {technologies && 'Technologies'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {
            (courses || technologies as string[]).map((course, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-[#a822ca11] rounded-lg border main-border hover:bg-[#a822ca11]/50 transition-all"
              >
                {course}
              </span>
            ))
          }
        </div>
      </div>
      {
        certificateURL && <div className="flex justify-end mt-4">
          <GlowButton href={certificateURL}>
            <span className="text-sm">View Certificate</span>
          </GlowButton>
        </div>
      }
      {
        instituteURL && <div className="flex justify-end  mt-4">
          <GlowButton href={instituteURL}>
            <span className="text-sm">View institute</span>
          </GlowButton>
        </div>
      }
      {
        companyURL && <div className="flex justify-end  mt-4">
          <GlowButton href={companyURL}>
            <span className="text-xm">View Company</span>
          </GlowButton>
        </div>
      }
    </motion.div>
  );
};

export default JourneyCard;
