/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectCard from "@/components/modules/Projects/ProjectCard";
import GlowEffect from "@/components/shared/GlowEffect";

const ProjectsSection = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/projects");
    const data = await res.json();
    const projects = data?.data || [];
    console.log(projects);

    return (
      <section className=" py-20 md:py-28 relative px-4 md:px-6">
        <GlowEffect />

        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-[55px] font-bold text-center mb-8 md:mb-12">
            Featured <span className="main-txt">Projects</span>
          </h2>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <ProjectCard
                key={project._id}
                id={project._id}
                title={project.title}
                overview={project.overview}
                thumbnail={project.thumbnail}
                technologies={[
                  ...(project.technologies?.backend || []),
                  ...(project.technologies?.database || []),
                  ...(project.technologies?.frontend || []),
                  ...(project.technologies?.tools || [])
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
    return (
      <div className="py-20 px-4">
        <p className="text-center text-red-500 text-sm md:text-base">
          Failed to load projects. Please try again later.
        </p>
      </div>
    );
  }
};

export default ProjectsSection;