"use client";

import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import { useTheme } from "next-themes";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import GlowButton from "@/components/shared/GlowButton";
import GlowEffect from "@/components/shared/GlowEffect";

export default function Hero() {
    const { theme } = useTheme();
    const [displayedCode, setDisplayedCode] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [highlightedHTML, setHighlightedHTML] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [startTyping, setStartTyping] = useState(false);


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
};`

    //  useEffect(() => {
    //         Prism.highlightAll();
    //     }, [theme, code]); // code dependency 

    // Typewriter effect

    // Typewriter effect


    useEffect(() => {
        if (currentIndex < code.length) {
            const timeout = setTimeout(() => {
                setDisplayedCode(code.substring(0, currentIndex + 1));
                setCurrentIndex(prev => prev + 1);
            }, 20); // typing speed

            return () => clearTimeout(timeout);
        } else if (currentIndex === code.length && !isTypingComplete) {
            setIsTypingComplete(true);
        }
    }, [currentIndex, code, isTypingComplete]);

    // Typewriter effect with real-time highlighting
    useEffect(() => {
        if (currentIndex < code.length) {
            const timeout = setTimeout(() => {
                const newCode = code.substring(0, currentIndex + 1);
                setDisplayedCode(newCode);

                // Every character typing & highlighting
                const highlighted = Prism.highlight(
                    newCode,
                    Prism.languages.javascript,
                    'javascript'
                );
                setHighlightedHTML(highlighted);

                setCurrentIndex(prev => prev + 1);
            }, 20); // typing speed

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, code]);

    // Theme change then re-highlighting
    useEffect(() => {
        if (displayedCode) {
            const highlighted = Prism.highlight(
                displayedCode,
                Prism.languages.javascript,
                'javascript'
            );
            setHighlightedHTML(highlighted);
        }
    }, [theme, displayedCode]);

    // Start typing after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setStartTyping(true);
        }, 7000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);


    return (
        <section className="py-20 relative">

            <div className="flex flex-col xl:flex-row items-center justify-evenly max-w-7xl mx-auto  py-10 md:py-20  gap-10 transition-all duration-300 ">

                <GlowEffect />
                {/* <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#8851f7] via-[#5b2df5] to-transparent bottom-1 left-60 opacity-30  blur-[120px] overflow-hidden"></div> */}

                {/* Left: Text */}
                <div className="text-center xl:text-left space-y-6  flex-1 my-12">

                    {/* Greeting */}
                    <h3 className="text-4xl font-semibold text-[var(--foreground)]">
                        Hello, I am Yeamin Foysal
                    </h3>

                    {/* Title with Typewriter */}
                    <h1 className="text-[52px] font-bold text-[var(--foreground)]">
                        <span className="inline-block gradient-txt-bg bg-clip-text text-transparent">
                            {startTyping ? (
                                <Typewriter
                                    words={["Full Stack Developer", "MERN Developer", "Creative Coder"]}
                                    loop={0}
                                    cursor
                                    cursorStyle={<span className="text-[#fff]">|</span>}
                                    cursorBlinking={false}
                                    typeSpeed={25}
                                    deleteSpeed={25}
                                    delaySpeed={1500}
                                />
                            ) : <>Full Stack Developer</>}

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
                {/* <div className="bg-gradient p-[1px] rounded-lg w-full max-w-xl banner-shadow ">
                    
                    <div className="flex items-center space-x-2 px-3 py-5 bg-white dark:bg-[#050709] rounded-t-lg">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <pre className="bg-[#050709] text-sm md:text-base overflow-x-auto p-4 rounded-b-lg relative overflow-hidden">
                        <div className="absolute w-[450px] h-[200px] rounded-full bg-gradient to-transparent opacity-20 left-30 top-36 blur-[80px] overflow-hidden"></div>
                        <code className="language-javascript">{code}</code>
                    </pre>
                </div> */}

                {/* Right: Code Block with Real-time Highlighted Typewriter */}
                <div className="bg-gradient p-[1px] rounded-lg w-full max-w-xl banner-shadow">
                    {/* Header - Dynamic background based on theme */}
                    <div className="flex items-center space-x-2 px-3 py-5 bg-white dark:bg-[#050709] rounded-t-lg">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>

                    {/* Code block - Dynamic background based on theme */}
                    <pre className="bg-background text-sm md:text-base overflow-x-auto p-4 rounded-b-lg relative overflow-hidden transition-colors duration-300">
                        <div className="absolute w-[450px] h-[200px] rounded-full bg-gradient to-transparent opacity-20 left-30 top-36 blur-[80px] overflow-hidden"></div>
                        <code
                            className="language-javascript"
                            dangerouslySetInnerHTML={{ __html: highlightedHTML }}
                        />
                        {currentIndex < code.length && (
                            <span className="animate-pulse text-gray-800 dark:text-white">|</span>
                        )}
                    </pre>
                </div>
            </div>
        </section>
    );
}
