'use client';
import React, { useEffect, useRef } from 'react';
import { Github, ExternalLink, Code2, Globe } from 'lucide-react';
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
            // 1. Initial State for entrance
            gsap.set(".metric-card", { y: 100, opacity: 0, scale: 0.9, rotationX: 15, transformPerspective: 1000 });
            gsap.set(".stagger-text", { opacity: 0, y: 30 });
            // The liquid layers start fully transparent (mask at 0%)
            gsap.set(".liquid-layer", { "--mask-y": "0%" });

            // 2. Main Entrance Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            tl.to(".stagger-text", {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "expo.out"
            })
                // Liquid Reveal Effects
                .to(".liquid-layer-1", { "--mask-y": "100%", duration: 1.5, ease: "power2.out" }, "-=0.6")
                .to(".liquid-layer-2", { "--mask-y": "100%", duration: 1.5, ease: "power2.out" }, "-=1.2")
                .to(".liquid-layer-3", { "--mask-y": "100%", duration: 1.5, ease: "power2.out" }, "-=1.2")
                // Cards Reveal
                .to(".metric-card", {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationX: 0,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: "power4.out"
                }, "-=1.0")
                .to(".username-scramble", {
                    duration: 1.2,
                    text: "NpXLrsDWZR",
                    ease: "none"
                }, "-=0.8");

            // 3. Counter Animation
            const counters = document.querySelectorAll(".count-up");
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute("data-target") || "0");
                ScrollTrigger.create({
                    trigger: counter,
                    start: "top 90%",
                    once: true,
                    onEnter: () => {
                        gsap.to(counter, {
                            innerText: target,
                            duration: 2.5,
                            snap: { innerText: 1 },
                            ease: "power4.out"
                        });
                    }
                });
            });

            // 4. Subtle Ambient Float
            gsap.to(".ambient-glow", {
                opacity: 0.6,
                scale: 1.2,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Mouse Spotlight Effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cards = document.getElementsByClassName("metric-card");
        for (const card of cards as any) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    // Magnetic Icon Effect
    const handleMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
        const item = e.currentTarget;
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        gsap.to(item, { x: x * 0.4, y: y * 0.4, duration: 0.3 });
    };

    const resetMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen bg-slate-800/30 backdrop-blur-sm py-24 px-6 overflow-hidden flex flex-col justify-center selection:bg-emerald-500/30"
        >
            {/* Background Layers */}
            <div className="ambient-glow absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="ambient-glow absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="max-w-6xl mx-auto w-full relative z-10">

                {/* Heading Area */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1px] w-12 bg-emerald-500/50 stagger-text" />
                        <span className="text-emerald-500 font-mono text-sm tracking-[0.4em] uppercase font-bold stagger-text">Analytics Engine</span>
                    </div>
                    
                    <div className="relative liquid-container pb-2 mb-8 stagger-text">
                        {/* Base Layer: Outline */}
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent outline-text m-0">
                            The Proof of <span className="italic">Work.</span>
                        </h2>
                        
                        {/* Liquid Layers */}
                        <h2 className="absolute top-0 left-0 w-full h-full text-6xl md:text-8xl font-black tracking-tighter text-orange-500 liquid-layer liquid-layer-1 drop-shadow-lg m-0 pointer-events-none">
                            The Proof of <span className="italic">Work.</span>
                        </h2>
                        <h2 className="absolute top-0 left-0 w-full h-full text-6xl md:text-8xl font-black tracking-tighter text-cyan-400 liquid-layer liquid-layer-2 drop-shadow-lg m-0 pointer-events-none">
                            The Proof of <span className="italic">Work.</span>
                        </h2>
                        <h2 className="absolute top-0 left-0 w-full h-full text-6xl md:text-8xl font-black tracking-tighter text-white liquid-layer liquid-layer-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] m-0 pointer-events-none">
                            The Proof of <span className="italic">Work.</span>
                        </h2>
                    </div>
                    
                    <p className="text-zinc-400 max-w-md font-medium text-lg stagger-text leading-relaxed">
                        Tracking algorithmic performance and architectural contributions across platforms.
                    </p>
                </div>

                {/* Bento Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-6 gap-4">

                    {/* LeetCode Card */}
                    <div className="metric-card relative md:col-span-4 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 overflow-hidden group">
                        {/* Spotlight background & Border */}
                        <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(16,185,129,0.15),transparent_40%)] z-0" />
                        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(16,185,129,0.5),transparent_40%)_border-box] [-webkit-mask-composite:exclude] [mask-composite:exclude] [-webkit-mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] z-10" />

                        <div className="flex justify-between items-start mb-16 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                    <Code2 className="text-emerald-500" size={32} />
                                </div>
                                <div>
                                    <h4 className="text-white text-xl font-bold">LeetCode</h4>
                                    <p className="text-emerald-500/60 font-mono text-sm username-scramble">@user_id</p>
                                </div>
                            </div>
                            <a href="https://leetcode.com/u/NpXLrsDWZR" target="_blank" className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all duration-500 border border-white/10">
                                <ExternalLink size={20} />
                            </a>
                        </div>

                        <div className="flex items-baseline gap-6 relative z-10">
                            <span className="text-9xl md:text-[11rem] font-black text-white tracking-tighter count-up leading-none" data-target="110">0</span>
                            <div className="space-y-1">
                                <div className="h-1 w-12 bg-emerald-500 rounded-full mb-3" />
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Problems<br />Solved</p>
                            </div>
                        </div>
                    </div>

                    {/* GitHub Card */}
                    <div className="metric-card relative md:col-span-2 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 overflow-hidden group flex flex-col justify-between">
                        {/* Spotlight background & Border */}
                        <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(500px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.08),transparent_40%)] z-0" />
                        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(500px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.4),transparent_40%)_border-box] [-webkit-mask-composite:exclude] [mask-composite:exclude] [-webkit-mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] z-10" />

                        <Github className="text-zinc-600 group-hover:text-white transition-colors duration-500" size={48} />

                        <div className="relative z-10">
                            <p className="text-emerald-500 font-mono text-sm mb-2 font-bold">/arjunsan22</p>
                            <h4 className="text-6xl font-black text-white tracking-tighter mb-1">25</h4>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Total Repositories</p>
                        </div>

                        {/* Magnetic Explore Button */}
                        <div
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                            className="mt-8 relative z-10"
                        >
                            <a
                                href="https://github.com/arjunsan22"
                                target="_blank"
                                className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center group/btn hover:scale-105 transition-transform"
                            >
                                <Globe className="text-black group-hover/btn:rotate-45 transition-transform duration-500" size={24} />
                                <span className="text-black text-[8px] font-black uppercase mt-1">Visit</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .outline-text {
                    -webkit-text-stroke: 2px rgba(255,255,255,0.15);
                    color: transparent;
                }
                
                .liquid-container {
                    position: relative;
                }
                
                .liquid-layer {
                    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200' preserveAspectRatio='none'%3E%3Cpath d='M0,100 Q25,85 50,100 T100,100 L100,200 L0,200 Z' fill='black'/%3E%3C/svg%3E");
                    -webkit-mask-size: 200% 200%;
                    -webkit-mask-repeat: repeat-x;
                    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200' preserveAspectRatio='none'%3E%3Cpath d='M0,100 Q25,85 50,100 T100,100 L100,200 L0,200 Z' fill='black'/%3E%3C/svg%3E");
                    mask-size: 200% 200%;
                    mask-repeat: repeat-x;
                    --mask-y: 0%;
                }

                .liquid-layer-1 { animation: wave-1 3s infinite linear; }
                .liquid-layer-2 { animation: wave-2 4s infinite linear; }
                .liquid-layer-3 { animation: wave-3 5s infinite linear; }

                @keyframes wave-1 {
                    0% { -webkit-mask-position: 0% var(--mask-y); mask-position: 0% var(--mask-y); }
                    100% { -webkit-mask-position: 200% var(--mask-y); mask-position: 200% var(--mask-y); }
                }
                @keyframes wave-2 {
                    0% { -webkit-mask-position: 50% var(--mask-y); mask-position: 50% var(--mask-y); }
                    100% { -webkit-mask-position: 250% var(--mask-y); mask-position: 250% var(--mask-y); }
                }
                @keyframes wave-3 {
                    0% { -webkit-mask-position: 100% var(--mask-y); mask-position: 100% var(--mask-y); }
                    100% { -webkit-mask-position: 300% var(--mask-y); mask-position: 300% var(--mask-y); }
                }
            `}</style>
        </section>
    );
};

export default DevMetrics;
