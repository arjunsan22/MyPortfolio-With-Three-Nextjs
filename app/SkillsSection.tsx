'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrainCircuit, Network, TerminalSquare, Bot } from 'lucide-react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Skill {
    name: string;
    slug?: string;
    Icon?: React.ElementType;
}

interface SkillData {
    [key: string]: Skill[];
}

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const skillData: SkillData = {
    languages: [
        { name: 'JavaScript', slug: 'javascript/javascript-original.svg' },
        { name: 'TypeScript', slug: 'typescript/typescript-original.svg' },
        { name: 'C', slug: 'c/c-original.svg' },
        { name: 'Java', slug: 'java/java-original.svg' }
    ],
    frameworks: [
        { name: 'Next.js', slug: 'nextjs/nextjs-original.svg' },
        { name: 'React.js', slug: 'react/react-original.svg' },
        { name: 'Node.js', slug: 'nodejs/nodejs-original.svg' },
        { name: 'Express.js', slug: 'express/express-original.svg' },
        { name: 'Socket.io', slug: 'socketio/socketio-original.svg' },
        { name: 'Redux', slug: 'redux/redux-original.svg' },
        { name: 'Firebase', slug: 'firebase/firebase-plain.svg' }
    ],
    databases: [
        { name: 'MongoDB', slug: 'mongodb/mongodb-original.svg' },
        { name: 'MySQL', slug: 'mysql/mysql-original.svg' },
        { name: 'Redis', slug: 'redis/redis-original.svg' }
    ],
    devops: [
        { name: 'Docker', slug: 'docker/docker-original.svg' },
        { name: 'Jenkins', slug: 'jenkins/jenkins-original.svg' },
        { name: 'Google Cloud', slug: 'googlecloud/googlecloud-original.svg' },
        { name: 'Vercel', slug: 'vercel/vercel-original.svg' }
    ],
    frontend: [
        { name: 'HTML', slug: 'html5/html5-original.svg' },
        { name: 'CSS', slug: 'css3/css3-original.svg' },
        { name: 'Bootstrap', slug: 'bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', slug: 'tailwindcss/tailwindcss-original.svg' },
        { name: 'Three.js', slug: 'threejs/threejs-original.svg' }
    ],
    tools: [
        { name: 'Git', slug: 'git/git-original.svg' },
        { name: 'GitHub', slug: 'github/github-original.svg' },
        { name: 'VS Code', slug: 'vscode/vscode-original.svg' },
        { name: 'Postman', slug: 'postman/postman-original.svg' },
        { name: 'Figma', slug: 'figma/figma-original.svg' }
    ],
    specializations: [
        { name: 'REST API', slug: 'nodejs/nodejs-plain.svg' },
        { name: 'SEO', slug: 'chrome/chrome-original.svg' },
        { name: 'Performance', slug: 'chrome/chrome-plain.svg' },
        { name: 'DSA', slug: 'javascript/javascript-plain.svg' }
    ],
    'generative ai': [
        { name: 'Generative AI', Icon: BrainCircuit },
        { name: 'LLM APIs', Icon: Network },
        { name: 'Prompt Engg', Icon: TerminalSquare },
        { name: 'AI Chatbots', Icon: Bot }
    ]
};

const CyberGridBackground = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const [elements, setElements] = React.useState<{ dots: { id: number, left: number, top: number }[], lines: { id: number, top: number, width: number }[] } | null>(null);

    React.useEffect(() => {
        setElements({
            dots: Array.from({ length: 50 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
            })),
            lines: Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                top: Math.random() * 100,
                width: Math.random() * 50 + 10,
            }))
        });
    }, []);

    useGSAP(() => {
        if (!elements) return;

        gsap.to('.cyber-dot', {
            opacity: "random(0.1, 0.8)",
            scale: "random(0.5, 1.5)",
            duration: "random(1.5, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { amount: 2, from: "random" }
        });

        gsap.to('.cyber-line', {
            x: "150vw",
            duration: "random(4, 10)",
            repeat: -1,
            ease: "linear",
            stagger: { amount: 8, from: "random" }
        });
    }, { dependencies: [elements], scope: bgRef });

    return (
        <div ref={bgRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[2.5rem]">
            {/* Core gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

            {elements && (
                <>
                    {elements.dots.map(dot => (
                        <div
                            key={`dot-${dot.id}`}
                            className="cyber-dot absolute w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_#22d3ee]"
                            style={{ left: `${dot.left}%`, top: `${dot.top}%`, opacity: 0.1 }}
                        />
                    ))}
                    {elements.lines.map(line => (
                        <div
                            key={`line-${line.id}`}
                            className="cyber-line absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee] opacity-30"
                            style={{ top: `${line.top}%`, left: '-50%', width: `${line.width}%` }}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

const SkillIcon = ({ name, slug, Icon }: Skill) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !contentRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -20;
        const rotateY = ((x - centerX) / centerX) * 20;

        gsap.to(cardRef.current, {
            rotateX, rotateY,
            transformPerspective: 1000,
            ease: "power3.out",
            duration: 0.4
        });

        gsap.to(contentRef.current, {
            x: (x - centerX) * 0.15,
            y: (y - centerY) * 0.15,
            ease: "power2.out",
            duration: 0.4
        });

        gsap.to(cardRef.current.querySelector('.skill-glow'), {
            x: x - 64, // Center the 128px glow
            y: y - 64,
            opacity: 1,
            ease: "power2.out",
            duration: 0.4
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || !contentRef.current) return;
        gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, ease: "power3.out", duration: 0.8 });
        gsap.to(contentRef.current, { x: 0, y: 0, ease: "power3.out", duration: 0.8 });
        gsap.to(cardRef.current.querySelector('.skill-glow'), { opacity: 0, ease: "power2.out", duration: 0.8 });
    };

    return (
        <div
            ref={cardRef}
            className="skill-card group relative w-full h-32 md:h-40 rounded-[2rem] border border-white/5 bg-[#050510]/50 backdrop-blur-md overflow-hidden cursor-crosshair [transform-style:preserve-3d]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Hover Glow */}
            <div className="skill-glow absolute top-0 left-0 w-32 h-32 bg-cyan-500/30 rounded-full blur-[40px] pointer-events-none opacity-0 mix-blend-screen" />

            <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center p-4 [transform-style:preserve-3d]">
                <div className="relative w-12 h-12 md:w-16 md:h-16 mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300">
                    {Icon ? (
                        <Icon className="w-full h-full text-cyan-400" strokeWidth={1.5} />
                    ) : (
                        <img src={`${ICON_BASE}${slug}`} alt={name} className="w-full h-full object-contain" />
                    )}
                </div>
                <span className="text-sm md:text-base font-bold text-slate-400 group-hover:text-white transition-colors duration-300 tracking-wide text-center drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    {name}
                </span>
            </div>

            {/* Tech border reveal */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-[2rem] transition-colors duration-500 pointer-events-none mix-blend-overlay" />
        </div>
    );
};

const SkillsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Main Title
        gsap.from(".skills-title-char", {
            y: 100,
            opacity: 0,
            rotationX: -90,
            stagger: 0.05,
            duration: 1,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        // Category Containers
        gsap.from(".skill-category", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        // Skill Cards Stagger
        const categories = gsap.utils.toArray<HTMLElement>('.skill-category');
        categories.forEach((cat) => {
            gsap.fromTo(cat.querySelectorAll('.skill-card'),
                { scale: 0.8, opacity: 0, y: 30, rotationX: -15 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: cat,
                        start: "top 85%",
                    }
                }
            );
        });

    }, { scope: sectionRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Very subtle tilt for the huge container
        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        gsap.to(containerRef.current, {
            rotateX, rotateY,
            transformPerspective: 2000,
            ease: "power2.out",
            duration: 1
        });
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        gsap.to(containerRef.current, { rotateX: 0, rotateY: 0, ease: "power3.out", duration: 1.5 });
    };

    const titleText = "Skills";

    return (
        <section id="skills" ref={sectionRef} className="py-24 px-4 bg-transparent overflow-hidden relative z-10 perspective-[2000px]">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="text-center mb-20 perspective-[1000px]">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black flex justify-center gap-[2px] tracking-tighter">
                        {titleText.split('').map((char, i) => (
                            <span
                                key={i}
                                className="skills-title-char inline-block bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </h2>
                    <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_10px_#22d3ee]" />
                </div>

                {/* Main 3D Container */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative bg-[#050510]/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 md:p-12 lg:p-16 [transform-style:preserve-3d]"
                >
                    <CyberGridBackground />

                    <div className="relative z-10 space-y-20 [transform-style:preserve-3d]" style={{ transform: 'translateZ(50px)' }}>
                        {Object.entries(skillData).map(([category, skills]) => (
                            <div key={category} className="skill-category">
                                <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 uppercase tracking-widest flex items-center gap-4">
                                    {category}
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                                </h3>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {skills.map((skill) => (
                                        <SkillIcon key={skill.name} {...skill} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;