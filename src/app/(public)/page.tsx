import About from "@/components/modules/Home/About";
import Journey from "@/components/modules/Home/Journey";
import Hero from "@/components/modules/Home/Hero";
import ProjectsSection from "@/components/modules/Home/Project";
import Skills from "@/components/modules/Home/Skills";
import BlogSection from "@/components/modules/Home/Blogs";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      {/* <Experiance/> */}
      <Skills />
      <ProjectsSection />
      {/* <EducationCertification /> */}
      <Journey />
      <BlogSection/>
    </div>
  );
}
