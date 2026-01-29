import React, { useRef } from 'react';
import {
    Code, Rocket, Database, Cloud, Sparkles, Wrench,
    Terminal, Cpu, Layers, Globe, ShieldCheck, Zap
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = {
    languages: [
        { name: 'JavaScript', icon: <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]" /> },
        { name: 'TypeScript', icon: <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" /> },
        { name: 'C', icon: <div className="w-2 h-2 rounded-full bg-slate-400 shadow-[0_0_8px_#94a3b8]" /> },
        { name: 'Java', icon: <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" /> }
    ],
    frameworks: [
        { name: 'Next.js', icon: <Zap size={14} className="text-white" /> },
        { name: 'React.js', icon: <Zap size={14} className="text-cyan-400" /> },
        { name: 'Node.js', icon: <Zap size={14} className="text-green-500" /> },
        { name: 'Express.js', icon: <Zap size={14} className="text-slate-300" /> },
        { name: 'Socket.io', icon: <Zap size={14} className="text-white" /> },
        { name: 'Redux Toolkit', icon: <Zap size={14} className="text-purple-500" /> },
        { name: 'Firebase', icon: <Zap size={14} className="text-orange-400" /> }
    ],
    databases: [
        { name: 'MongoDB', icon: <Database size={14} className="text-green-500" /> },
        { name: 'SQL', icon: <Database size={14} className="text-blue-500" /> },
        { name: 'Firebase Firestore', icon: <Database size={14} className="text-orange-500" /> },
        { name: 'Redis', icon: <Database size={14} className="text-red-500" /> }
    ],
    devops: [
        { name: 'Docker', icon: <Cloud size={14} className="text-blue-400" /> },
        { name: 'Jenkins', icon: <Cloud size={14} className="text-red-400" /> },
        { name: 'Cloudinary', icon: <Cloud size={14} className="text-indigo-400" /> },
        { name: 'GCP', icon: <Cloud size={14} className="text-yellow-400" /> },
        { name: 'Render', icon: <Cloud size={14} className="text-emerald-400" /> },
        { name: 'Vercel', icon: <Cloud size={14} className="text-white" /> }
    ],
    frontend: [
        { name: 'HTML', icon: <Layers size={14} className="text-orange-500" /> },
        { name: 'CSS', icon: <Layers size={14} className="text-blue-500" /> },
        { name: 'Bootstrap', icon: <Layers size={14} className="text-purple-600" /> },
        { name: 'Tailwind CSS', icon: <Layers size={14} className="text-cyan-400" /> },
        { name: 'EJS', icon: <Layers size={14} className="text-yellow-600" /> },
        { name: 'Three.js', icon: <Layers size={14} className="text-white" /> },
        { name: 'GSAP', icon: <Layers size={14} className="text-green-400" /> }
    ],
    tools: [
        { name: 'Git', icon: <Wrench size={14} className="text-orange-600" /> },
        { name: 'GitHub', icon: <Wrench size={14} className="text-white" /> },
        { name: 'VS Code', icon: <Wrench size={14} className="text-blue-400" /> },
        { name: 'Postman', icon: <Wrench size={14} className="text-orange-500" /> },
        { name: 'Figma', icon: <Wrench size={14} className="text-pink-500" /> },
        { name: 'Antigravity', icon: <Wrench size={14} className="text-cyan-400" /> }
    ],
    specializations: [
        { name: 'REST API', icon: <Globe size={14} className="text-emerald-400" /> },
        { name: 'SEO', icon: <Globe size={14} className="text-blue-400" /> },
        { name: 'Performance Optimization (SEO)', icon: <Globe size={14} className="text-yellow-400" /> },
        { name: 'Data Structure and Algorithms (DSA)', icon: <Globe size={14} className="text-red-400" /> }
    ]
};

const SkillCategory = ({ title, icon: Icon, skills, index, color }: any) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Entrance Animation
        gsap.from(cardRef.current, {
            opacity: 0,
            y: 100,
            rotateX: -15,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 95%",
            }
        });

        // Interactive 3D Tilt Effect
        const card = cardRef.current;
        const handleMouseMove = (e: MouseEvent) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(contentRef.current, {
                rotateX,
                rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(contentRef.current, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        };

        card?.addEventListener("mousemove", handleMouseMove);
        card?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card?.removeEventListener("mousemove", handleMouseMove);
            card?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: cardRef });

    return (
        <div ref={cardRef} className="perspective-1000">
            <div
                ref={contentRef}
                className="group relative h-full bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 hover:border-white/20 transition-colors duration-500"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Floating Gradient Orb */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full bg-${color}-500`} />

                <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 shadow-2xl text-${color}-400`}>
                            <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
                            <div className={`h-0.5 w-0 group-hover:w-full bg-${color}-500 transition-all duration-500 rounded-full`} />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {skills.map((skill: any) => (
                            <div
                                key={skill.name}
                                className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300 cursor-default group/skill"
                            >
                                <span className="shrink-0 transition-transform group-hover/skill:scale-125 duration-300">
                                    {skill.icon}
                                </span>
                                <span className="text-sm font-medium text-slate-400 group-hover/skill:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cyber-grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-[2rem]"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            </div>
        </div>
    );
};

const SkillsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Floating background shapes
        gsap.to(".bg-shape", {
            y: "random(-40, 40)",
            x: "random(-40, 40)",
            duration: "random(4, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    return (
        <section id="skills" ref={containerRef} className="py-32 px-4 bg-[#020617] relative overflow-hidden">
            {/* High-end Background Glows */}
            <div className="bg-shape absolute top-20 left-[10%] w-[30vw] h-[30vw] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="bg-shape absolute bottom-20 right-[10%] w-[25vw] h-[25vw] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-24 space-y-4">
                    <div className="flex items-center gap-3 text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase">
                        <Terminal size={14} />
                        <span>System Capabilities</span>
                        <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-transparent" />
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                        Technical <span className="text-slate-500 italic font-light">Arsenal</span>
                    </h2>

                    <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
                        A specialized collection of modern tools and technologies I use to build
                        high-performance digital experiences.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SkillCategory title="Languages" icon={Code} skills={skills.languages} color="cyan" />
                    <SkillCategory title="Frameworks" icon={Rocket} skills={skills.frameworks} color="blue" />
                    <SkillCategory title="Databases" icon={Database} skills={skills.databases} color="indigo" />
                    <SkillCategory title="DevOps" icon={ShieldCheck} skills={skills.devops} color="emerald" />
                    <SkillCategory title="Frontend" icon={Sparkles} skills={skills.frontend} color="purple" />
                    <SkillCategory title="Tools" icon={Cpu} skills={skills.tools} color="slate" />
                    <SkillCategory title="Specialties" icon={Globe} skills={skills.specializations} color="fuchsia" />
                </div>
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
            `}</style>
        </section>
    );
};

export default SkillsSection;