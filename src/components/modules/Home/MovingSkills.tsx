"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// 🔹 Skill arrays with icon + name
const skillsRow1 = [
    { name: "Mongoose", icon: "/skills/mongodb.png" },
    { name: "C", icon: "/skills/c.png" },
    { name: "C++", icon: "/skills/cpp.png" },
    { name: "HTML", icon: "/skills/html.png" },
    { name: "CSS", icon: "/skills/css.png" },
    { name: "JavaScript", icon: "/skills/javascript.png" },
    { name: "TypeScript", icon: "/skills/typescript.png" },
    { name: "React", icon: "/skills/react.png" },
    { name: "Next.js", icon: "/skills/nextjs.png" },
    { name: "Tailwind CSS", icon: "/skills/tailwind.png" },
];

const skillsRow2 = [
    { name: "MongoDB", icon: "/skills/mongodb.png" },
    { name: "PostgreSQL", icon: "/skills/postgresql.png" },
    { name: "Firebase", icon: "/skills/firebase.png" },
    { name: "Prisma ORM", icon: "/skills/prisma.png" },
    { name: "JWT", icon: "/skills/jwt.png" },
    { name: "Shadcn UI", icon: "/skills/shadcn.png" },
    { name: "Express", icon: "/skills/expressjs.png" },
    { name: "Node.js", icon: "/skills/nodejs.png" },
    { name: "Redux", icon: "/skills/redux.png" },
    { name: "Framer Motion", icon: "/skills/motion.png" },
    { name: "Vercel", icon: "/skills/vercel.png" },
    { name: "Git", icon: "/skills/git.png" },
    { name: "GitHub", icon: "/skills/github.png" },
    { name: "REST API", icon: "/skills/restapi.png" },
];

// ✅ Reusable infinite scrolling row
function ScrollingRow({
    items,
    reverse = false,
    speed = 40,
}: {
    items: { name: string; icon: string }[];
    reverse?: boolean;
    speed?: number;
}) {
    const x = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useAnimationFrame((_, delta) => {
        if (!containerRef.current) return;

        const direction = reverse ? -1 : 1;
        const move = (direction * speed * delta) / 1000;
        x.current -= move;

        const width = containerRef.current.scrollWidth / 2;
        if (x.current <= -width) {
            x.current = 0;
        } else if (x.current >= 0) {
            x.current = -width;
        }

        containerRef.current.style.transform = `translateX(${x.current}px)`;
    });

    return (
        <div className="overflow-hidden whitespace-nowrap my-5 relative  py-4">
            <div ref={containerRef} className="flex gap-6 items-center">
                {[...items, ...items].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        onMouseEnter={() => (speed = 0)}
                        onMouseLeave={() => (speed = 40)}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="min-w-[200px] min-h-[150px] flex items-center justify-center gap-3 px-8 py-4 border main-border bg-background rounded-2xl text-lg font-medium shadow-md flex-col hover:banner-shadow"
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="min-h-[48px] min-w-[48px]"
                        />
                        <h2>{item.name}</h2>
                    </motion.div>
                ))}
            </div>

            {/* gradient edges */}
            <div className="hidden dark:block absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0d0d0d] to-transparent pointer-events-none"></div>
            <div className=" hidden dark:block absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0d0d0d] to-transparent pointer-events-none"></div>
        </div>
    );
}

export default function MovingSkills() {
    return (
        <section className="py-20 text-center  relative">

            <div className="absolute w-[550px] h-[400px] rounded-full bg-gradient to-transparent opacity-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[120px] overflow-hidden"></div>

            <h2 className="text-4xl md:text-[55px] font-bold main-txt mb-6">
                Skills & Technologies
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
                Technologies I’ve been working with recently to create amazing web experiences.
            </p>

            <div className="max-w-7xl mx-auto px-4">

                {/* 🔹 1st row → left to right */}
                <ScrollingRow items={skillsRow1} reverse={false} speed={50} />

                {/* 🔹 2nd row → right to left */}
                <ScrollingRow items={skillsRow2} reverse={true} speed={50} />
            </div>
        </section>
    );
}
