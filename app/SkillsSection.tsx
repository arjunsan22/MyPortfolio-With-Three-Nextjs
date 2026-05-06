'use client';
import React, { useRef } from 'react';
import CircuitBackground from './components/CircuitBackground';
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
        // Main Title Stack Animation
        gsap.fromTo(".skills-title-stack",
            {
                y: (i) => (i - 2) * 60,
                opacity: 0,
                scale: (i) => 1 - Math.abs(i - 2) * 0.05
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );

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

        // Skill Cards Stagger & Category Titles
        const categories = gsap.utils.toArray<HTMLElement>('.skill-category');
        categories.forEach((cat, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cat,
                    start: "top 85%",
                }
            });

            const textOverlay = cat.querySelector('.category-text-overlay');
            const titleText = cat.querySelector('.category-title-text');
            const splitChars = cat.querySelectorAll('.split-char');
            const skillsGrid = cat.querySelector('.skills-grid');
            const skillCards = cat.querySelectorAll('.skill-card');

            // 1. Reveal animated text
            if (index === 0) { // Glitch Reveal
                tl.set(titleText, { opacity: 1 });
                tl.fromTo(splitChars, 
                    { opacity: 0, x: () => gsap.utils.random(-20, 20), skewX: () => gsap.utils.random(-20, 20) },
                    { opacity: 1, x: 0, skewX: 0, duration: 0.6, stagger: 0.05, ease: "elastic.out(1, 0.3)" }
                );
                tl.to(titleText, { opacity: 0.3, duration: 0.05, repeat: 3, yoyo: true }, "-=0.4");
                tl.set(titleText, { opacity: 1 });
            } 
            else if (index === 1) { // Liquid Wave (Safe alternative to clipPath)
                tl.set(titleText, { opacity: 1 });
                tl.fromTo(splitChars, 
                    { opacity: 0, y: 40, scale: 0.8 }, 
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: "back.out(1.5)" }
                );
            } 
            else if (index === 2) { // Gradient Sweep (Fixed initial opacity & order)
                tl.set(titleText, { opacity: 1 });
                tl.set(splitChars, { backgroundSize: "200% auto" });
                tl.fromTo(splitChars,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
                );
                tl.fromTo(splitChars, 
                    { backgroundPosition: "200% center" }, 
                    { backgroundPosition: "0% center", duration: 1.5, ease: "power2.out" }, "-=0.5"
                );
            } 
            else if (index === 3) { // Typewriter
                tl.set(titleText, { opacity: 1 });
                tl.fromTo(splitChars, 
                    { opacity: 0, scale: 1.5 }, 
                    { opacity: 1, scale: 1, duration: 0.01, stagger: 0.1, ease: "none" }
                );
            } 
            else if (index === 4) { // Neon Flicker (Fixed yoyo leaving opacity 0)
                tl.fromTo(titleText, 
                    { opacity: 0 }, 
                    { opacity: 1, duration: 0.05, repeat: 5, yoyo: true, ease: "power1.inOut" }
                );
                tl.set(titleText, { opacity: 1 }); // Ensure it stays on
            } 
            else if (index === 5) { // Morphing / 3D Flip (Fixed z index bug)
                tl.set(titleText, { opacity: 1 });
                tl.fromTo(splitChars, 
                    { rotationX: 90, opacity: 0, y: 20 }, 
                    { rotationX: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)" }
                );
            } 
            else if (index === 6) { // Focus Reveal (Safe alternative to blur)
                tl.set(titleText, { opacity: 1 });
                tl.fromTo(splitChars, 
                    { opacity: 0, scale: 2 }, 
                    { opacity: 1, scale: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" }
                );
            } 
            else { // Explosion / Convergence (Safe scaling)
                tl.set(titleText, { opacity: 1 });
                tl.fromTo(splitChars, 
                    { x: () => gsap.utils.random(-150, 150), y: () => gsap.utils.random(-150, 150), rotation: () => gsap.utils.random(-180, 180), opacity: 0, scale: 0 }, 
                    { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.03, ease: "power4.out" }
                );
            }


            // 2. Text gone
            tl.to(titleText, { 
                opacity: 0, 
                scale: 1.5, 
                filter: "blur(15px)", 
                duration: 0.5, 
                ease: "power2.in", 
                delay: 0.8 
            });

            // 3. Hide text container & show grid
            tl.set(textOverlay, { display: "none" });
            tl.set(skillsGrid, { opacity: 1 });

            // 4. Reveal icons
            tl.fromTo(skillCards,
                { scale: 0.8, opacity: 0, y: 30, rotationX: -15 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "back.out(1.2)",
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

    return (
        <section id="skills" ref={sectionRef} className="py-24 px-4 bg-transparent overflow-hidden relative z-10 perspective-[2000px]">
            <CircuitBackground id="skills" />
            <div className="max-w-7xl mx-auto">
                {/* Title Stack Animation */}
                <div className="relative text-center mb-32 h-32 flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                        <h2
                            key={i}
                            className="skills-title-stack absolute text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase"
                            style={{
                                color: i === 4 ? '#ffffff' : 'transparent',
                                WebkitTextStroke: i === 4 ? '0px' : '2px rgba(255,255,255,0.2)',
                                zIndex: i
                            }}
                        >
                            SKILLS
                        </h2>
                    ))}
                </div>
                <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 mb-20 shadow-[0_0_10px_#22d3ee]" />

                {/* Main 3D Container */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative bg-[#050510]/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 md:p-12 lg:p-16 [transform-style:preserve-3d]"
                >
                    <CyberGridBackground />

                    <div className="relative z-10 space-y-32 [transform-style:preserve-3d]" style={{ transform: 'translateZ(50px)' }}>
                        {Object.entries(skillData).map(([category, skills], index) => {
                            const textGradients = [
                                "from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]",
                                "from-purple-400 to-pink-600 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]",
                                "from-emerald-400 to-teal-600 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]",
                                "from-amber-400 to-orange-600 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]",
                                "from-rose-400 to-red-600 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]",
                                "from-indigo-400 to-violet-600 drop-shadow-[0_0_15px_rgba(129,140,248,0.6)]",
                                "from-fuchsia-400 to-purple-600 drop-shadow-[0_0_15px_rgba(232,121,249,0.6)]",
                                "from-blue-400 to-indigo-600 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]"
                            ];
                            const gradientClass = textGradients[index % textGradients.length];

                            return (
                                <div key={category} className="skill-category relative min-h-[200px] flex flex-col justify-center">
                                    <div className="category-text-overlay absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                        <h3 className="category-title-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.2em] [transform-style:preserve-3d] text-center">
                                            {category.split('').map((char, i) => (
                                                <span key={i} className={`inline-block split-char text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`} style={{ whiteSpace: char === ' ' ? 'pre' : 'normal', paddingBottom: '0.1em' }}>
                                                    {char}
                                                </span>
                                            ))}
                                        </h3>
                                    </div>

                                    <div className="skills-grid opacity-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                        {skills.map((skill) => (
                                            <SkillIcon key={skill.name} {...skill} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;