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
  // detailsLink,
  overview,
  id
}) => {
  // Animated gradient motion
  //   const radius = 150;
  const borderRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);

  useAnimationFrame((t) => {
    rotate.set((t / 100) % 360);
  });
  console.log(preview)
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative rounded-2xl p-[2px] overflow-hidden"
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
      <div className="relative z-10 rounded-2xl p-5 shadow-lg flex flex-col  animated-border border min-h-[550px]">
        <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
          <Image src={thumbnail} alt={title} fill className="object-cover rounded-xl" />
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-3 line-clamp-2 text-foreground/80">{overview}</p>
        {/* <p className=" font-medium mb-2">Used Technologies:</p> */}

        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.slice(0, 10).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-purple-900/20  rounded-lg border main-border"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3 justify-between">
          <GlowButton href={preview}>
            <span className="text-sm">Preview</span> <FaExternalLinkAlt size={13} />
          </GlowButton>
          {/* <Link
            
            target="_blank"
            className="flex items-center justify-center gap-2 w-1/2 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
          >
            Preview Now <FaExternalLinkAlt size={14} />
          </Link> */}
          <GlowButton href={`/projects/${id}`}>
            <span className="text-sm">Details</span> <FaExternalLinkAlt size={13} />
          </GlowButton>
          {/* <Link
            
            className="flex items-center justify-center gap-2 w-1/2 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-lg transition-all"
          >
            
          </Link> */}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
