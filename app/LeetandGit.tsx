'use client';
import React, { useEffect, useRef } from 'react';
import { Github, ExternalLink, Code2, Terminal, Flame, GitCommit, LayoutGrid, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/dist/TextPlugin';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const DevMetrics: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial State
            gsap.set(".metric-card", { y: 100, opacity: 0 });
            gsap.set(".stagger-text", { opacity: 0, x: -20 });

            // 2. Main Entrance Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom bottom",
                }
            });

            tl.to(".stagger-text", {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power4.out"
            })
            .to(".metric-card", {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1.2,
                ease: "expo.out"
            }, "-=0.4")
            // Scramble Text Effect for the Username
            .to(".username-scramble", {
                duration: 1.5,
                text: "NpXLrsDWZR",
                ease: "none"
            }, "-=1");

            // 3. Counter Animation for Solved Problems
            const counters = document.querySelectorAll(".count-up");
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute("data-target") || "0");
                ScrollTrigger.create({
                    trigger: counter,
                    start: "top 90%",
                        once: true, // 👈 VERY IMPORTANT

                    onEnter: () => {
                        gsap.to(counter, {
                            innerText: target,
                            duration: 2,
                            snap: { innerText: 1 },
                            ease: "power4.out"
                        });
                    }
                });
            });

            // 4. Subtle Floating Animation for the Background
            gsap.to(".bg-gradient", {
                scale: 1.2,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Magnetic Icon Effect
    const handleMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
        const item = e.currentTarget;
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        gsap.to(item, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const resetMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
    };

    return (
        <section ref={containerRef} className="relative min-h-screen bg-black py-24 px-6 overflow-hidden flex flex-col justify-center">
            
            {/* Background Aesthetic */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="max-w-6xl mx-auto w-full relative z-10">
                
                {/* Heading Area */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-[1px] w-12 bg-emerald-500 stagger-text" />
                        <span className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase stagger-text">Analytics Engine</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 stagger-text">
                        The Proof of <span className="text-neutral-500 italic">Work.</span>
                    </h2>
                    <p className="text-neutral-400 max-w-md font-medium stagger-text">
                        Tracking algorithmic performance and architectural contributions across platforms.
                    </p>
                </div>

                {/* Bento Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    
                    {/* LeetCode Solved - Large Card */}
                    <div className="metric-card md:col-span-4 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 hover:border-emerald-500/40 transition-colors group">
                        <div className="flex justify-between items-start mb-12">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-xl">
                                    <Code2 className="text-emerald-500" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">LeetCode</h4>
                                    <p className="text-neutral-500 text-sm username-scramble">@user_id</p>
                                </div>
                            </div>
                            <a href="https://leetcode.com/u/NpXLrsDWZR" target="_blank" className="p-2 border border-neutral-700 rounded-full hover:bg-white hover:text-black transition-all">
                                <ExternalLink size={16} />
                            </a>
                        </div>
                        
                        <div className="flex items-baseline gap-4">
<span
  className="text-8xl md:text-9xl font-black text-white tracking-tighter count-up"
  data-target="108"
>
  0
</span>
                            <div className="space-y-1">
                              
                                <p className="text-neutral-500 font-medium">Problems Solved</p>
                            </div>
                        </div>
                    </div>

                    {/* GitHub Contribution - Small Square */}
                    <div className="metric-card md:col-span-2 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between">
                        <Github className="text-neutral-500" size={32} />
                        <div>
                            <p className="text-neutral-500 text-sm font-mono mb-2">/arjunsan22</p>
                            <h4 className="text-4xl font-bold text-white tracking-tight">25</h4>
                            <p className="text-neutral-400 text-sm">Repositories</p>
                        </div>
                         {/* Magnetic CTA */}
                    <div 
                        onMouseMove={handleMagnetic}
                        onMouseLeave={resetMagnetic}
                        className="metric-card md:col-span-4 lg:col-span-1 bg-white rounded-3xl p-4 flex items-center justify-center cursor-pointer group"
                    >
                        <a href="https://github.com/arjunsan22" target="_blank" className="flex items-center flex-col gap-2">
                            <Globe className="text-black group-hover:rotate-12 transition-transform" size={32} />
                            <span className="text-black text-[10px] font-black uppercase tracking-tighter">Explore</span>
                        </a>
                    </div>
                    </div>

                

                </div>
            </div>
        </section>
    );
};

const Trophy = ({ className, size = 20 }: { className?: string, size?: number }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} height={size} 
        viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" 
        strokeLinecap="round" strokeLinejoin="round" 
        className={className}
    >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

export default DevMetrics;