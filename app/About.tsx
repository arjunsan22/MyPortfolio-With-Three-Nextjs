'use client';
import React, { useRef } from 'react';
import { MapPin, Phone, Mail, Network, Database } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AIBackground = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const [elements, setElements] = React.useState<{
        paths: any[];
        nodes: any[];
        packeth: any[];
        packetv: any[];
    } | null>(null);

    React.useEffect(() => {
        setElements({
            paths: Array.from({ length: 25 }).map((_, i) => {
                const x1 = Math.random() * 100;
                const y1 = Math.random() * 100;
                return {
                    id: i,
                    x1, y1,
                    x2: x1 + (Math.random() * 40 - 20),
                    y2: y1,
                    x3: x1 + (Math.random() * 40 - 20),
                    y3: y1 + (Math.random() * 40 - 20),
                    isCyan: i % 2 === 0,
                    strokeWidth: Math.random() > 0.5 ? "0.2" : "0.5"
                };
            }),
            nodes: Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                isCyan: Math.random() > 0.5,
                size: Math.random() * 3 + 1,
                left: Math.random() * 100,
                top: Math.random() * 100
            })),
            packeth: Array.from({ length: 15 }).map((_, i) => ({
                id: i,
                left: Math.random() * 50,
                top: Math.random() * 100
            })),
            packetv: Array.from({ length: 15 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 50
            }))
        });
    }, []);

    useGSAP(() => {
        if (!elements) return;

        // Glowing nodes pulsing
        gsap.to('.ai-node', {
            opacity: "random(0.3, 1)",
            scale: "random(0.8, 1.5)",
            duration: "random(1.5, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { amount: 2, from: "random" }
        });

        // Moving data packets along lines
        gsap.to('.data-packet-h', {
            x: "random(100, 400)",
            keyframes: { opacity: [0, 1, 0] },
            duration: "random(2, 4)",
            repeat: -1,
            ease: "linear",
            stagger: { amount: 3, from: "random" }
        });

        gsap.to('.data-packet-v', {
            y: "random(100, 400)",
            keyframes: { opacity: [0, 1, 0] },
            duration: "random(2, 4)",
            repeat: -1,
            ease: "linear",
            stagger: { amount: 3, from: "random" }
        });

        // Circuit paths drawing effect
        gsap.fromTo('.circuit-path', 
            { strokeDasharray: "20 100", strokeDashoffset: 120 },
            { 
                strokeDashoffset: 0, 
                duration: "random(3, 6)", 
                repeat: -1, 
                ease: "none",
                stagger: { amount: 4, from: "random" }
            }
        );
        
    }, { dependencies: [elements], scope: bgRef });

    return (
        <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] bg-[#030108] border border-cyan-500/20">
            {/* Deep glowing core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-cyan-900/20 rounded-full blur-[80px] pointer-events-none"></div>
            
            {elements && (
                <>
                    {/* SVG Circuits */}
                    <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
                                <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="purple-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                                <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        
                        {/* Generated Paths */}
                        {elements.paths.map((path) => (
                            <path 
                                key={`path-${path.id}`}
                                className="circuit-path"
                                d={`M ${path.x1} ${path.y1} L ${path.x2} ${path.y2} L ${path.x3} ${path.y3}`}
                                fill="none"
                                stroke={path.isCyan ? "url(#cyan-glow)" : "url(#purple-glow)"}
                                strokeWidth={path.strokeWidth}
                                vectorEffect="non-scaling-stroke"
                            />
                        ))}
                    </svg>

                    {/* Glowing Plugs / Nodes */}
                    {elements.nodes.map((node) => (
                        <div 
                            key={`node-${node.id}`} 
                            className={`ai-node absolute rounded-full ${node.isCyan ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-purple-500 shadow-[0_0_10px_#a855f7]'}`} 
                            style={{
                                left: `${node.left}%`,
                                top: `${node.top}%`,
                                width: `${node.size}px`,
                                height: `${node.size}px`
                            }}
                        >
                            <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: node.isCyan ? '#22d3ee' : '#a855f7' }}></div>
                        </div>
                    ))}

                    {/* Moving data packets */}
                    {elements.packeth.map((packet) => (
                        <div key={`packeth-${packet.id}`} className="data-packet-h absolute h-[1px] w-6 bg-cyan-400 shadow-[0_0_5px_#22d3ee] rounded-full" style={{
                            top: `${packet.top}%`,
                            left: `${packet.left}%`,
                        }}></div>
                    ))}
                    {elements.packetv.map((packet) => (
                        <div key={`packetv-${packet.id}`} className="data-packet-v absolute w-[1px] h-6 bg-purple-400 shadow-[0_0_5px_#a855f7] rounded-full" style={{
                            left: `${packet.left}%`,
                            top: `${packet.top}%`,
                        }}></div>
                    ))}
                </>
            )}
            
            {/* Hexagon Grid overlay for AI aesthetic */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2228%22 height=%2249%22 viewBox=%220 0 28 49%22><g fill=%22%23ffffff%22 fill-opacity=%221%22><polygon points=%2222 14 14 28 6 14%22/><polygon points=%2214 49 6 35 22 35%22/></g></svg>')" }}></div>
        </div>
    )
}

/* ===============================
   About Section
================================ */

const SplitText = ({ text, className = "" }: { text: string, className?: string }) => (
    <span className={className}>
        {text.split('').map((char, i) => (
            <span key={i} className="about-char inline-block">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))}
    </span>
);

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        // Heading Animation
        gsap.from(".about-title-char", {
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

        gsap.from(".about-line", {
            scaleX: 0,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        // Card Entry Animation
        gsap.from(cardRef.current, {
            y: 100,
            opacity: 0,
            rotationX: 10,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
            }
        });

        // Typewriter Effect for Text
        gsap.from(".about-char", {
            opacity: 0,
            y: 5,
            stagger: 0.015,
            duration: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: ".about-text-content",
                start: "top 85%",
            }
        });

        // Profile Image Entry
        gsap.from(".about-image-container", {
            scale: 0.8,
            opacity: 0,
            rotationY: -30,
            duration: 1.5,
            ease: "elastic.out(1, 0.7)",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
            }
        });

        // Contact Pills Entry
        gsap.fromTo(".about-pill", 
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                }
            }
        );

    }, { scope: sectionRef });

    // GSAP 3D Tilt Effect on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1200,
            ease: "power2.out",
            duration: 0.5
        });
        
        // Move inner glow
        gsap.to('.card-glow', {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            ease: "power2.out",
            duration: 0.5
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            ease: "elastic.out(1, 0.5)",
            duration: 1.2
        });
        gsap.to('.card-glow', {
            x: 0,
            y: 0,
            ease: "power2.out",
            duration: 1.2
        });
    };

    const titleText = "About Me";



    const colorMap: Record<string, string> = {
        cyan: "hover:border-cyan-500/50 hover:bg-cyan-500/10",
        blue: "hover:border-blue-500/50 hover:bg-blue-500/10",
        purple: "hover:border-purple-500/50 hover:bg-purple-500/10"
    };

    const iconColorMap: Record<string, string> = {
        cyan: "text-cyan-400",
        blue: "text-blue-400",
        purple: "text-purple-400"
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="py-24 px-4 bg-transparent overflow-hidden relative z-10"
        >
            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Heading */}
                <div className="text-center mb-24 perspective-[1000px]">
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-black flex justify-center gap-[2px] tracking-tighter">
                        {titleText.split('').map((char, i) => (
                            <span
                                key={i}
                                className="about-title-char inline-block bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </h2>

                    <div className="about-line h-[2px] w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_10px_#22d3ee]" />
                </div>

                {/* 3D Card */}
                <div className="perspective-[2000px]">
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] [transform-style:preserve-3d] group cursor-crosshair"
                    >
                        {/* Background Component */}
                        <AIBackground />

                        {/* Interactive Glow */}
                        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none z-0">
                            <div className="card-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Card Content */}
                        <div className="relative z-10 p-8 md:p-16 [transform-style:preserve-3d]">
                            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                                {/* Left Content */}
                                <div
                                    style={{ transform: 'translateZ(60px)' }}
                                    className="flex-1 order-2 md:order-1 about-text-content"
                                >
                                    <div className="space-y-6 mb-10 text-2xl md:text-3xl lg:text-4xl text-slate-200 leading-snug font-medium tracking-wide">
                                        <SplitText text="I'm a passionate " />
                                        <SplitText
                                            text="Full-Stack Web Developer "
                                            className="text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                        />
                                        <SplitText
                                            text="with hands-on experience in building dynamic and scalable applications. I specialize in the "
                                        />
                                        <SplitText
                                            text="MERN stack "
                                            className="text-purple-400 font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                        />
                                        <SplitText text="and " />
                                        <SplitText
                                            text="Next.js."
                                            className="text-blue-400 font-bold drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                        />
                                    </div>

                                    <div style={{ transform: 'translateZ(40px)' }}>
                                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light italic bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                                            With a strong foundation in{' '}
                                            <span className="text-cyan-300 not-italic font-semibold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                                                Data Structures and Algorithms
                                            </span>
                                            , I focus on problem-solving and performance optimization to
                                            create user-focused solutions.
                                        </p>
                                    </div>

                                </div>

                                {/* Profile Image */}
                                <div
                                    style={{ transform: 'translateZ(100px)' }}
                                    className="about-image-container relative order-1 md:order-2 flex-shrink-0"
                                >
                                    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-[2.5rem] overflow-hidden border border-cyan-500/30 bg-[#030108] shadow-[0_0_50px_rgba(34,211,238,0.2)] group p-2">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay"></div>
                                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                                            <Image
                                                src="/arjun.jpeg"
                                                alt="Arjun Anil Profile"
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                        {/* Scanner effect line over image */}
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-20 opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
                                    </div>
                                    {/* Tech icons floating around avatar */}
                                    <div className="absolute -top-6 -right-6 p-4 bg-[#050510]/80 backdrop-blur-xl border border-white/10 rounded-2xl text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-bounce" style={{ animationDuration: '3s' }}>
                                        <Network size={24} />
                                    </div>
                                    <div className="absolute -bottom-6 -left-6 p-4 bg-[#050510]/80 backdrop-blur-xl border border-white/10 rounded-2xl text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                                        <Database size={24} />
                                    </div>
                                </div>

                            </div>

                            {/* Contact Pills - Footer */}
                            <div className="about-pills-container flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-white/10">
                                {[
                                    { icon: MapPin, text: 'Kottayam, Kerala, India', color: 'cyan' },
                                    { icon: Phone, text: '+91 8590924584', color: 'blue' },
                                    { icon: Mail, text: 'arjunanil2114@gmail.com', color: 'purple' },
                                ].map((item, idx) => (
                                    <a
                                        href={item.icon === Mail ? `mailto:${item.text}` : undefined}
                                        key={idx}
                                        style={{ transform: 'translateZ(80px)' }}
                                        className={`about-pill flex items-center gap-3 bg-[#050510]/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 ${colorMap[item.color]} transition-all duration-300 group`}
                                    >
                                        <item.icon size={20} className={`${iconColorMap[item.color]} group-hover:scale-110 transition-transform`} />
                                        <span className="text-slate-300 text-sm md:text-base font-semibold tracking-wide group-hover:text-white transition-colors">
                                            {item.text}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
