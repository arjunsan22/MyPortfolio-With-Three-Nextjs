import React, { useRef } from 'react';
import { GraduationCap, Award, BookOpen, Binary, CheckCircle2, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EducationCard = ({ item, index, isLast }: any) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Shutter entrance animation
        gsap.from(cardRef.current, {
            rotateX: -30,
            opacity: 0,
            y: 50,
            transformPerspective: 1000,
            duration: 1,
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // Floating ambient movement
        gsap.to(cardRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
        });
    }, { scope: cardRef });

    return (
        <div className="relative flex gap-8 md:gap-12 pb-20 last:pb-0">
            {/* Timeline Column */}
            <div className="flex flex-col items-center">
                <div className="relative z-10 w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <item.icon size={20} className="text-cyan-400" />
                    <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-20" />
                </div>
                {!isLast && (
                    <div className="w-[2px] h-full bg-gradient-to-b from-cyan-500/50 to-transparent" />
                )}
            </div>

            {/* Content Card */}
            <div
                ref={cardRef}
                className="flex-1 bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <item.icon size={120} />
                </div>

                {/* Border Beam Animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[shimmer_2s_infinite]" />
                </div>

                <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <span className="px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-tighter border border-cyan-500/20">
                            {item.year}
                        </span>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Zap size={14} className="text-yellow-500" />
                            <span>{item.type}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-slate-400 font-medium mb-6">{item.institution}</p>

                    {item.details && (
                        <div className="space-y-3">
                            {item.details.map((detail: string, i: number) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                                    <CheckCircle2 size={16} className="text-cyan-500/50 mt-0.5" />
                                    <span>{detail}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

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
        },         {
            title: "Docker Certification",
            institution: "Udemy",
            year: "NOV 2025",
            type: "Certification",
            icon: Award,
            details: ["Docker Containerization Expert", "CI/CD",'Basic of KubKubernetes']
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
        // Title reveal
        gsap.from(".edu-title-char", {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.05,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
            }
        });

        // Background line animation
        gsap.from(".bg-line", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 2,
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 70%",
                end: "bottom 70%",
                scrub: 1
            }
        });
    }, { scope: sectionRef });

    return (
        <section
            id="education"
            ref={sectionRef}
            className="py-32 px-6 bg-[#020617] relative overflow-hidden"
        >
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

            {/* Ambient Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter flex justify-center flex-wrap"
                    >
                        {"KNOWLEDGE ARCHIVE".split("").map((char, i) => (
                            <span key={i} className="edu-title-char inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                    <p className="mt-6 text-slate-500 font-mono tracking-widest uppercase text-sm">
                        Building the foundation of <span className="text-cyan-500 italic">excellence</span>
                    </p>
                </div>

                <div className="timeline-container relative">
                    {/* Persistent Background Line */}
                    <div className="bg-line absolute left-[23px] top-6 w-[2px] h-[90%] bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent hidden md:block" />

                    {educationData.map((item, index) => (
                        <EducationCard
                            key={index}
                            item={item}
                            index={index}
                            isLast={index === educationData.length - 1}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </section>
    );
};

export default EducationSection;