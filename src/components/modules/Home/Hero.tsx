/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import { useTheme } from "next-themes";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";

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
        <section className="py-20">

            <div className="flex flex-col xl:flex-row items-center justify-evenly mx-auto w-[95%] 2xl:max-w-[1492px] bg-background px-6 md:px-12 py-10 md:py-20 rounded-2xl shadow-2xl gap-10 transition-all duration-300">
                {/* Left: Text */}

                <div className="text-center xl:text-left space-y-6">
                    {/* Greeting */}
                    <h3 className="text-3xl font-semibold text-[var(--foreground)]">
                        Hello, I am Yeamin Foysal
                    </h3>

                    {/* Title */}
                    <h1 className="text-5xl font-bold text-[var(--foreground)]">
                        <span className="text-[#8851f7]">Full Stack Developer</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-[var(--muted-foreground)] max-w-md mx-auto xl:mx-0">
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
                    <div className="flex gap-4">
                        <Link href="/projects">
                            <button className="px-3 py-2 rounded-md bg-[#8851f7]">Projects</button>
                        </Link>
                        <Link href="/projects">
                            <button className="px-3 py-2 rounded-md bg-[#8851f7]">Resume</button>
                        </Link>
                    </div>
                </div>


                {/* Right: Code Block */}
                <div className="bg-gradient-to-br from-[#8851f7] to-[#5b2df5] p-[1px] rounded-lg w-full max-w-xl banner-shadow">
                    {/* Window Header */}
                    <div className="flex items-center space-x-2 px-3 py-5 bg-white dark:bg-[#050709] rounded-t-lg">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    {/* Code Block */}
                    <pre className="bg-[#050709] text-sm md:text-base overflow-x-auto p-4 rounded-b-lg">
                        <code className="language-javascript">{code}</code>
                    </pre>
                </div>
            </div>
        </section>
    );
}
