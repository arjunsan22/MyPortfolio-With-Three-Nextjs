import React, { useRef } from 'react';
import { GraduationCap, Award, BookOpen, Binary, CheckCircle2, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const educationData = [
        {
            title: "Diploma in Computer Engineering",
            institution: "Government Polytechnic College Pala, Kottayam",
            year: "2021 — 2024",
            type: "Academic",
            icon: GraduationCap,
            details: ["Focused on Systems Architecture", "Microprocessor Programming", "Network Security Fundamentals"]
        },
        {
            title: "Higher Secondary – Computer Science",
            institution: "St. Mary's HSS Manarcadu, Kottayam",
            year: "2020 — 2022",
            type: "Secondary",
            icon: BookOpen,
            details: ["Advanced Mathematics", "C++ Programming Base", "Database Management Concepts"]
        },
        {
            title: "MERN Stack Development",
            institution: "Brototype",
            year: "DEC 2025",
            type: "Professional",
            icon: Binary,
            details: ["Intensive Industrial Training", "Full-stack Projects", "MVC / Clean Architecture Principles", "Data Structures & Algorithms (LeetCode Practice)"]
        },
        {
            title: "Docker Certification",
            institution: "Udemy",
            year: "NOV 2025",
            type: "Certification",
            icon: Award,
            details: ["Docker Containerization Expert", "CI/CD", 'Basic of KubKubernetes']
        },
        {
            title: "Cloud & DevOps Certifications",
            institution: "UpGrad",
            year: "DEC 2025",
            type: "Certification",
            icon: Award,
            details: ["GCP Cloud Fundamentals", "CI/CD Pipeline Automation"]
        }
    ];

    useGSAP(() => {
        // Title words entrance
        gsap.from('.edu-title-word', {
            y: 120,
            opacity: 0,
            rotationX: -90,
            transformOrigin: "bottom center",
            stagger: 0.15,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
            }
        });

        // Subtitle
        gsap.from('.edu-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
            }
        });

        // Timeline line grows
        gsap.from('.timeline-beam', {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 2,
            ease: "none",
            scrollTrigger: {
                trigger: '.timeline-track',
                start: "top 70%",
                end: "bottom 50%",
                scrub: 1,
            }
        });

        // Cards stagger in from alternating sides
        const cards = cardsRef.current;
        cards.forEach((card, index) => {
            if (!card) return;

            const isLeft = index % 2 === 0;

            // Card entrance
            gsap.from(card, {
                x: isLeft ? -80 : 80,
                opacity: 0,
                rotateY: isLeft ? 15 : -15,
                scale: 0.9,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none",
                }
            });

            // Timeline node pulse
            const node = card.closest('.timeline-item')?.querySelector('.timeline-node');
            if (node) {
                gsap.from(node, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    }
                });
            }
        });

    }, { scope: sectionRef });

    // 3D tilt on hover
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -15;
        const rotateY = ((x / rect.width) - 0.5) * 15;
        gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: "power2.out" });
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    };

    return (
        <section
            id="education"
            ref={sectionRef}
            className="py-32 px-4 md:px-6 bg-[#050505] relative overflow-hidden min-h-screen"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px]" />
                <div className="absolute bottom-[10%] right-[-15%] w-[700px] h-[700px] bg-cyan-900/15 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
                        <GraduationCap size={18} className="text-purple-400" />
                        <span className="text-white text-sm font-bold tracking-widest uppercase">Knowledge Archive</span>
                    </div>

                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl lg:text-9xl font-black flex flex-wrap justify-center gap-4"
                        style={{ perspective: '1000px' }}
                    >
                        <span className="edu-title-word inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30">EDUCATION</span>
                        <span className="edu-title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">&</span>
                        <span className="edu-title-word inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30">CERTS</span>
                    </h2>

                    <p className="edu-subtitle mt-8 text-slate-500 font-mono tracking-widest uppercase text-sm">
                        Building the foundation of <span className="text-cyan-400 italic">excellence</span>
                    </p>
                </div>

                {/* Timeline */}
                <div className="timeline-track relative">
                    {/* Central Beam */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]">
                        <div className="timeline-beam w-full h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500/0" />
                    </div>
                    {/* Mobile beam */}
                    <div className="lg:hidden absolute left-8 top-0 bottom-0 w-[2px]">
                        <div className="timeline-beam w-full h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500/0" />
                    </div>

                    <div className="flex flex-col gap-16 md:gap-20">
                        {educationData.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const Icon = item.icon;

                            return (
                                <div key={index} className="timeline-item relative">
                                    {/* Timeline Node */}
                                    <div className={`timeline-node absolute z-20 lg:left-1/2 lg:-translate-x-1/2 left-8 -translate-x-1/2 top-8`}>
                                        <div className="w-14 h-14 rounded-2xl bg-[#0a0a0a] border-2 border-purple-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] rotate-45 group">
                                            <Icon size={22} className="text-purple-400 -rotate-45" />
                                        </div>
                                        {/* Pulse ring */}
                                        <div className="absolute inset-0 rounded-2xl border border-purple-500/30 animate-ping opacity-20 rotate-45" />
                                    </div>

                                    {/* Card - alternating sides on desktop */}
                                    <div className={`lg:w-[45%] ml-16 lg:ml-0 ${isLeft ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
                                        <div
                                            ref={(el) => { cardsRef.current[index] = el; }}
                                            className="relative rounded-[2rem] bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/[0.08] p-8 md:p-10 overflow-hidden group cursor-default"
                                            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                                            onMouseMove={(e) => handleMouseMove(e, index)}
                                            onMouseLeave={() => handleMouseLeave(index)}
                                        >
                                            {/* Hover glow */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />
                                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                                            </div>

                                            {/* Large faded icon background */}
                                            <div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                                                <Icon size={140} />
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                {/* Top row */}
                                                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                                    <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase border border-purple-500/20">
                                                        {item.year}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <Zap size={14} className="text-yellow-500" />
                                                        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{item.type}</span>
                                                    </div>
                                                </div>

                                                {/* Title & Institution */}
                                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-500">
                                                    {item.title}
                                                </h3>
                                                <p className="text-slate-400 font-medium mb-8 text-lg">{item.institution}</p>

                                                {/* Details */}
                                                {item.details && (
                                                    <div className="space-y-3">
                                                        {item.details.map((detail: string, i: number) => (
                                                            <div key={i} className="detail-item flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] group-hover:bg-white/[0.04] group-hover:border-white/[0.08] transition-all duration-300">
                                                                <CheckCircle2 size={16} className="text-cyan-500/70 mt-0.5 flex-shrink-0" />
                                                                <span className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{detail}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Connector line to timeline (desktop) */}
                                            <div className={`hidden lg:block absolute top-10 ${isLeft ? '-right-16' : '-left-16'} w-16 h-[2px]`}>
                                                <div className={`w-full h-full bg-gradient-to-r ${isLeft ? 'from-white/10 to-purple-500/50' : 'from-purple-500/50 to-white/10'}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </section>
    );
};

export default EducationSection;