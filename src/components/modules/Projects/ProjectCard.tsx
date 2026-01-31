"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import GlowButton from "@/components/shared/GlowButton";

type ProjectProps = {
  id: string;
  title: string;
  thumbnail: string;
  fullImage?: string;
  technologies: string[];
  preview: string;
  detailsLink: string;
  overview: string
};

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  thumbnail,
  technologies,
  preview,
  overview,
  id
}) => {
  const borderRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);

  useAnimationFrame((t) => {
    rotate.set((t / 100) % 360);
  });

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative rounded-xl md:rounded-2xl p-[2px] overflow-hidden"
    >
      {/* Animated gradient border */}
      <motion.div
        ref={borderRef}
        style={{
          borderRadius: "1rem",
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg flex flex-col animated-border border min-h-[450px] md:min-h-[550px]">
        {/* Thumbnail */}
        <div className="relative w-full h-48 md:h-56 rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4">
          <Image 
            src={thumbnail} 
            alt={title} 
            fill 
            className="object-cover rounded-lg md:rounded-xl" 
          />
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
        
        {/* Overview */}
        <p className="text-xs md:text-sm mb-3 line-clamp-2 text-foreground/80">{overview}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-5">
          {technologies.slice(0, 10).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm bg-purple-900/20 rounded-md md:rounded-lg border main-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row gap-2 md:gap-3 justify-between">
          <GlowButton href={preview} className="w-full sm:w-auto">
            <span className="text-xs md:text-sm">Preview</span> 
            <FaExternalLinkAlt size={12} className="md:w-[13px] md:h-[13px]" />
          </GlowButton>
          
          <GlowButton href={`/projects/${id}`} className="w-full sm:w-auto">
            <span className="text-xs md:text-sm">Details</span> 
            <FaExternalLinkAlt size={12} className="md:w-[13px] md:h-[13px]" />
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;