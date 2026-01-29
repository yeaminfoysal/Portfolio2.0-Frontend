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
      className="relative border border-purple-800/50 rounded-2xl px-4 sm:px-6 lg:px-10 py-4 sm:py-6 shadow-lg backdrop-blur-md bg-background"
    >

      {/* Glow icon */}
      <div className="absolute left-[-24px] sm:left-[-32px] lg:left-[-40px] top-4 sm:top-6 p-1.5 sm:p-2 md:p-3 main-bg rounded-full shadow-[0_0_10px_#a855f7]">
        {companyURL && <FaBriefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color="#fff" />}
        {instituteURL && <FaGraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color="#fff" />}
        {certificateURL && <FaCertificate className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" color="#fff" />}
      </div>

      {/* Glow vertical line */}

      {/* Animated glow vertical line (only once for first card) */}
      {isfirst && (
        <div className="absolute left-[-13px] sm:left-[-16px] lg:left-[-20px] top-12 sm:top-16 bottom-0 w-[2px] sm:w-[3px]">
          {/* Base static line */}
          <div
            className={`absolute inset-0 bg-gradient ${length === 1
              ? "h-full"
              : `h-[calc(100%*2+5rem)] sm:h-[calc(100%*2+7rem)]`
              }`}
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-4">
        <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold">
          {degree || position}
        </h3>
        <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium main-txt/50 bg-[#a822ca19] px-2 sm:px-3 py-1 rounded-lg main-border w-fit">
          <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" /> 
          <span className="whitespace-nowrap">{duration}</span>
        </span>
      </div>

      {/* Institute Info */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 bg-[#a822ca19] p-2 sm:p-3 rounded-md">
        <span className="bg-[#a822ca29] p-2 sm:p-3 rounded-md flex-shrink-0">
          <FaSchool className="main-txt text-base sm:text-lg lg:text-xl" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-sm sm:text-base truncate">{institute || company}</p>
          <p className="text-xs sm:text-sm truncate">{location}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4 font-medium">
        <FaStar className="main-txt flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
        <span className="bg-[#a822ca19] border main-border px-2 sm:px-3 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
          {status}
        </span>
      </div>

      {/* Achievements */}
      <div className="mb-4 sm:mb-5">
        <h4 className="flex items-center gap-2 font-semibold mb-2 text-sm sm:text-base">
          <FaMedal className="main-txt flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" /> Achievements
        </h4>
        <ul className="space-y-2 text-foreground/80 text-xs sm:text-sm list-disc list-inside">
          {achievements.map((ach, i) => (
            <li className="bg-[#a822ca19] p-2 rounded-md break-words" key={i}>{ach}</li>
          ))}
        </ul>
      </div>

      {/* Key Courses */}
      <div>
        <h4 className="flex items-center gap-2 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
          <FaBookOpen className="main-txt flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
          {courses && 'Key courses'}
          {technologies && 'Technologies'}
        </h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {
            (courses || technologies as string[]).map((course, i) => (
              <span
                key={i}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-[#a822ca19] rounded-lg border main-border hover:bg-[#a822ca19]/50 transition-all"
              >
                {course}
              </span>
            ))
          }
        </div>
      </div>
      {
        certificateURL && <div className="flex justify-end mt-3 sm:mt-4">
          <GlowButton href={certificateURL}>
            <span className="text-xs sm:text-sm">View Certificate</span>
          </GlowButton>
        </div>
      }
      {
        instituteURL && <div className="flex justify-end mt-3 sm:mt-4">
          <GlowButton href={instituteURL}>
            <span className="text-xs sm:text-sm">View institute</span>
          </GlowButton>
        </div>
      }
      {
        companyURL && <div className="flex justify-end mt-3 sm:mt-4">
          <GlowButton href={companyURL}>
            <span className="text-xs sm:text-sm">View Company</span>
          </GlowButton>
        </div>
      }
    </motion.div>
  );
};

export default JourneyCard;