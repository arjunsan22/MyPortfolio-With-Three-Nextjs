'use client';
import React, { useEffect, useRef } from 'react';
import { Github, Code2, ExternalLink, Terminal, Cpu, GitBranch, Trophy, Target, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const CodingProfiles = () => {
    const containerRef = useRef(null);
    const githubCardRef = useRef(null);
    const leetcodeCardRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. Title Animation (Split Text Effect)
            const titleChars = document.querySelectorAll('.title-char');
            gsap.from(titleChars, {
                scrollTrigger: {
                    trigger: ".section-title",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                rotateX: -90,
                stagger: 0.05,
                duration: 1,
                ease: "back.out(1.7)"
            });

            // 2. Card Entrance (3D Rise)
            gsap.from(".profile-card", {
                scrollTrigger: {
                    trigger: ".cards-container",
                    start: "top 75%",
                },
                y: 100,
                opacity: 0,
                scale: 0.9,
                rotationX: -15,
                stagger: 0.2,
                duration: 1.2,
                ease: "expo.out"
            });

            // 3. Floating Icon Animation
            gsap.to(".floating-icon", {
                y: -15,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.3
            });

            // 4. Progress Bar Animation
            gsap.from(".progress-fill", {
                scrollTrigger: {
                    trigger: ".cards-container",
                    start: "top 70%",
                },
                width: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: 0.2
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // 5. 3D Tilt & Spotlight Effect (Mouse Follow)
    const handleMouseMove = (e, cardRef) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
        });

        // Move the spotlight glow
        gsap.to(card.querySelector('.spotlight'), {
            opacity: 1,
            x: x,
            y: y,
            duration: 0.1
        });
    };

    const handleMouseLeave = (cardRef) => {
        const card = cardRef.current;
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)"
        });
        gsap.to(card.querySelector('.spotlight'), {
            opacity: 0,
            duration: 0.5
        });
    };

    const title = "Coding Ecosystem";

    return (
        <section ref={containerRef} className="py-24 px-4 bg-slate-950 overflow-hidden relative">
            {/* Ambient Background Blur */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="section-title text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-black text-white flex justify-center overflow-hidden">
                        {title.split("").map((char, i) => (
                            <span key={i} className="title-char inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                    <div className="mt-4 h-1 w-24 bg-gradient-to-r from-violet-500 to-amber-500 mx-auto rounded-full" />
                </div>

                <div className="cards-container grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* GITHUB CARD */}
                    <div
                        ref={githubCardRef}
                        onMouseMove={(e) => handleMouseMove(e, githubCardRef)}
                        onMouseLeave={() => handleMouseLeave(githubCardRef)}
                        className="profile-card relative group bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] overflow-hidden"
                    >
                        <div className="spotlight pointer-events-none absolute -inset-px opacity-0 bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(139,92,246,0.15),transparent_80%)] translate-x-[-50%] translate-y-[-50%]"
                            style={{ width: '1000px', height: '1000px' }} />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-4 bg-violet-500/10 rounded-2xl border border-violet-500/20 floating-icon">
                                    <Github className="text-violet-400 w-10 h-10" />
                                </div>
                                <div className="text-right">
                                    <span className="text-violet-400 font-mono text-sm">@arjunsan22</span>
                                    <h3 className="text-3xl font-bold text-white mt-1">GitHub</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 group-hover:border-violet-500/30 transition-colors">
                                    <div className="flex items-center gap-3 text-slate-400 mb-2">
                                        <GitBranch size={18} />
                                        <span className="text-xs uppercase tracking-wider">Projects</span>
                                    </div>
                                    <p className="text-3xl font-bold text-white">25+</p>
                                </div>
                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 group-hover:border-violet-500/30 transition-colors">
                                    <div className="flex items-center gap-3 text-slate-400 mb-2">
                                        <Zap size={18} />
                                        <span className="text-xs uppercase tracking-wider">Status</span>
                                    </div>
                                    <p className="text-lg font-semibold text-violet-400 italic">Active Contributor</p>
                                </div>
                            </div>

                            <a href="#" className="flex items-center justify-center gap-3 w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-violet-900/20 group/btn">
                                <span>Explore Repositories</span>
                                <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* LEETCODE CARD */}
                    <div
                        ref={leetcodeCardRef}
                        onMouseMove={(e) => handleMouseMove(e, leetcodeCardRef)}
                        onMouseLeave={() => handleMouseLeave(leetcodeCardRef)}
                        className="profile-card relative group bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] overflow-hidden"
                    >
                        <div className="spotlight pointer-events-none absolute -inset-px opacity-0 bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(245,158,11,0.15),transparent_80%)] translate-x-[-50%] translate-y-[-50%]"
                            style={{ width: '1000px', height: '1000px' }} />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-12">
                                <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 floating-icon">
                                    <Trophy className="text-amber-400 w-10 h-10" />
                                </div>
                                <div className="text-right">
                                    <span className="text-amber-400 font-mono text-sm italic">Competitive Programmer</span>
                                    <h3 className="text-3xl font-bold text-white mt-1">LeetCode</h3>
                                </div>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-slate-400">
                                        <span>Problem Solving Mastery</span>
                                        <span className="text-amber-400 font-bold">Top 15%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="progress-fill h-full bg-gradient-to-r from-amber-600 to-yellow-400 w-[75%]" />
                                    </div>
                                </div>

                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {['Algorithms', 'Data Structures', 'DP', 'Graphs'].map((tag) => (
                                        <span key={tag} className="px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-slate-400 text-sm italic leading-relaxed">
                                    "Continuously refining logic and optimizing time complexity through daily challenges."
                                </p>
                            </div>

                            <a href="#" className="flex items-center justify-center gap-3 w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-900/20 group/btn">
                                <span>View LC Profile</span>
                                <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CodingProfiles;