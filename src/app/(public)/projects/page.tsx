/* eslint-disable @typescript-eslint/no-explicit-any */
// import { motion } from "framer-motion";
import ProjectCard from "@/components/modules/Projects/ProjectCard";

const ProjectsSection = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/projects");
    const data = await res.json();
    const projects = data?.data || [];

    return (
      <section className="py-20 relative">
        <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-[55px] font-bold text-center mb-12" >
            Featured <span className="main-txt">Projects</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                overview={project.overview}
                image={project.images?.[0]}
                technologies={[
                ...(project.technologies?.backend),
                ...(project.technologies?.database),
                ...(project.technologies?.frontend),
                ...(project.technologies?.tools)
                ]}
                preview={project.preview}
                detailsLink={project.detailsLink}
              />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return <p className="text-center text-red-500">Failed to load projects.</p>;
  }
};

export default ProjectsSection;
