"use client";

import { motion } from "framer-motion";
import projects from "@/data/projects.json";
import ProjectCard from "../Projects/ProjectCard";

const ProjectsSection = () => {
  return (
    <section className="py-20 relative">

      <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[55px] font-bold text-center mb-12"
        >
          Featured <span className="main-txt">Projects</span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              image={project.image}
              technologies={project.technologies}
              previewLink={project.previewLink}
              detailsLink={project.detailsLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
