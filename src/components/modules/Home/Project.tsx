/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectCard from "../Projects/ProjectCard";

const ProjectsSection = async () => {
  const res = await fetch("http://localhost:4000/api/projects");
  const data = await res.json();
  const projects = data?.data || [];
  return (
    <section className="py-20 relative">

      <div className="absolute w-[750px] h-[800px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[160px] overflow-hidden"></div>

      <div className="max-w-7xl mx-auto">
        <h2
          className="text-[55px] font-bold text-center mb-12"
        >
          Featured <span className="main-txt">Projects</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard
              id={project._id}
              key={project._id}
              title={project.title}
              overview={project.overview}
              thumbnail={project.thumbnail}
              technologies={[
                ...(project.technologies?.backend),
                ...(project.technologies?.database),
                ...(project.technologies?.frontend)
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
