/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Typewriter } from "react-simple-typewriter";


import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import { useTheme } from "next-themes";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import GlowButton from "@/components/shared/GlowButton";

export default function Hero() {
    const { theme } = useTheme();

    const code = `const profile = {
  name: 'MD Yeamin Foysal',
  title: 'Full-stack Web Developer',
  skills: ['React', 'Express', 'MongoDB', 
  'Node', 'Next', 'JavaScript', 'Git', 'Motion', 
  'Firebase'],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.skills.length >= 5
    );
  }
};`;

    useEffect(() => {
        // Dynamically import the correct Prism theme
        if (theme === "dark") {
            // @ts-ignore
            import("prismjs/themes/prism-tomorrow.css");
        } else {
            // @ts-ignore
            import("prismjs/themes/prism.css");
        }
        Prism.highlightAll();
    }, [theme]);

    return (
        <section className="py-20 relative">

            <div className="flex flex-col xl:flex-row items-center justify-evenly mx-auto w-[95%] 2xl:max-w-[1492px]  px-6 md:px-12 py-10 md:py-20  gap-10 transition-all duration-300 ">

                {/* <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#8851f7] via-[#5b2df5] to-transparent bottom-1 left-60 opacity-30  blur-[120px] overflow-hidden"></div> */}

                {/* Left: Text */}
                <div className="text-center xl:text-left space-y-6  flex-1">

                    {/* Greeting */}
                    <h3 className="text-4xl font-semibold text-[var(--foreground)]">
                        Hello, I am Yeamin Foysal
                    </h3>

                    {/* Title with Typewriter */}
                    <h1 className="text-[55px] font-bold text-[var(--foreground)]">
                        <span className="inline-block gradient-txt-bg bg-clip-text text-transparent">
                            <Typewriter
                                words={["Full Stack Developer", "MERN Stack Engineer", "Creative Coder"]}
                                loop={0}
                                cursor
                                cursorStyle={<span className="text-[#fff]">|</span>}
                                cursorBlinking={false}
                                typeSpeed={25}
                                deleteSpeed={25}
                                delaySpeed={1500}
                            />
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg mx-auto xl:mx-0">
                        Hi, I’m Yeamin Foysal from Tangail, now living in Dhaka, Bangladesh. I’m
                        an undergraduate student in Computer Science and Engineering with a deep
                        passion for programming.
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center xl:justify-start gap-4 mt-4">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full hover:scale-110 transition-transform duration-300"
                        >
                            <FaFacebookF size={20} />
                        </Link>

                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full hover:scale-110 transition-transform duration-300"
                        >
                            <FaLinkedinIn size={20} />
                        </Link>

                        <Link
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full hover:scale-110 transition-transform duration-300"
                        >
                            <FiGithub size={20} />
                        </Link>
                    </div>
                    <div className="flex gap-4 items-center">
                        <GlowButton href="/projects">
                            Projects
                        </GlowButton>

                        <GlowButton>
                            <span className="flex items-center gap-2">
                                Resume
                                <MdArrowOutward size={25} />
                            </span>
                        </GlowButton>
                    </div>
                </div>


                {/* Right: Code Block */}
                <div className="bg-gradient p-[1px] rounded-lg w-full max-w-xl banner-shadow ">
                    
                    <div className="flex items-center space-x-2 px-3 py-5 bg-white dark:bg-[#050709] rounded-t-lg">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <pre className="bg-[#050709] text-sm md:text-base overflow-x-auto p-4 rounded-b-lg relative overflow-hidden">
                        <div className="absolute w-[450px] h-[200px] rounded-full bg-gradient to-transparent opacity-20 left-30 top-36 blur-[80px] overflow-hidden"></div>
                        <code className="language-javascript">{code}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}
