import About from "@/components/modules/Home/About";
import Hero from "@/components/modules/Home/Hero";
import ProjectsSection from "@/components/modules/Home/Project";
import Skills from "@/components/modules/Home/Skills";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      <Skills/>
      <ProjectsSection/>
    </div>
  );
}
