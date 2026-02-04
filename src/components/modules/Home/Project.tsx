/* eslint-disable @typescript-eslint/no-explicit-any */
import GlowEffect from "@/components/shared/GlowEffect";
import ProjectCard from "../Projects/ProjectCard";

const ProjectsSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`);
  const data = await res.json();
  const projects = data?.data || [];
  
  return (
    <section className="  py-16 md:py-20 relative">
      <GlowEffect />

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-[55px] font-bold text-center mb-8 md:mb-12">
          Featured <span className="main-txt">Projects</span>
        </h2>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard
              id={project._id}
              key={project._id}
              title={project.title}
              overview={project.overview}
              thumbnail={project.thumbnail}
              technologies={[
                ...(project.technologies?.backend || []),
                ...(project.technologies?.database || []),
                ...(project.technologies?.frontend || [])
              ]}
              preview={project.preview}
              detailsLink={project.detailsLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;