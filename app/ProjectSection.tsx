import React, { useRef } from 'react';
import { Code2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    tech: string[];
    description: string;
    features: string[];
    link: string;
    icon: string;
}

const projects: Project[] = [
    {
        title: 'Farmers Login',
        tech: ['Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'EJS', 'Socket.io', 'Cloudinary', 'GCP'],
        description: 'Full-stack farmers marketplace with authentication, real-time chat, and integrated payments',
        features: [
            'Google OAuth authentication',
            'Real-time chat using Socket.io',
            'Multiple payment options (Razorpay, Wallet, COD)',
            'Multi-vendor e-commerce',
            'MVC architecture'
        ],
        link: 'https://farmerslogin.vercel.app',
        icon: '🌾'
    },
    {
        title: 'FoodConnects',
        tech: ['Next.js', 'React.js', 'Express.js', 'Tailwind CSS', 'NextAuth.js', 'Razorpay', 'MongoDB Atlas', 'Vercel'],
        description: 'Online bakery ordering platform with modern UI and seamless payment integration',
        features: [
            'Server-Side Rendering (SSR) and Static Site Generation (SSG)',
            'Google OAuth with NextAuth.js',
            'Razorpay payment integration',
            'Deployed on Vercel',
            'Responsive design with Tailwind CSS'
        ],
        link: 'https://foodconnects.vercel.app/',
        icon: '🍰'
    },
    {

        title: 'WorkSPera',
        tech: ['Next.js', 'React.js', 'Express.js', 'NextAuth.js', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB', 'Vercel', 'Render'],
        description: 'Real-time worker-connection platform combining chat, video calls, work posting, and hiring',
        features: [
            'Real-time chat using Socket.io',
            'Peer-to-peer video calling with WebRTC',
            'Secure authentication with NextAuth.js',
            'Work posting & worker hiring system',
            'Follow & following networking feature',
            'Frontend on Vercel, backend on Render'
        ],
        link: 'http://workspera.vercel.app',
        icon: '🛠️'
    },
    {
        title: 'SongConnects',
        tech: ['Next.js', 'Tailwind CSS', 'Vercel'],
        description: 'Music streaming application similar to Spotify with playlists and dynamic audio player',
        features: [
            'Modern Spotify-like UI with Tailwind CSS',
            'Dynamic audio player with play/pause/seek controls',
            'Create & manage playlists',
            'Fast routing with Next.js App Router',
            'Deployed on Vercel for high performance'
        ],
        link: 'https://songconnects.vercel.app/',
        icon: '🎵'
    }
];

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        // 1. TYPING REVEAL ANIMATION
        // We target the spans inside the title
        const chars = titleRef.current?.querySelectorAll('.typing-char');
        if (chars && chars.length > 0) {
            gsap.from(chars, {
                opacity: 0,
                y: 10,
                filter: "blur(5px)",
                stagger: 0.05,
                duration: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 90%",
                }
            });
        }

        // Underline Reveal
        gsap.from(".title-underline", {
            width: 0,
            duration: 1,
            delay: 0.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 90%",
            }
        });

        // 2. Cards Entrance
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: index * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                });

                // Stack scale down effect: scale down previous cards as next one scrolls in
                if (index < cardsRef.current.length - 1) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0.4,
                        scrollTrigger: {
                            trigger: cardsRef.current[index + 1],
                            start: "top center",
                            end: "top top+=100",
                            scrub: true,
                        }
                    });
                }
            }
        });
    }, { scope: containerRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 20;
        const rotateY = -(x - rect.width / 2) / 20;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
        });

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
        });
    };

    const text = "Selected Works";

    return (
        <section id="projects" ref={containerRef} className="py-32 px-4 bg-[#020617] relative overflow-clip">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                    <h2
                        ref={titleRef}
                        className="project-title text-6xl md:text-7xl font-black mb-6 flex justify-center flex-wrap"
                    >
                        {text.split("").map((char, i) => (
                            <span
                                key={i}
                                className="typing-char inline-block bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent"
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                    <div className="title-underline h-1 w-24 bg-cyan-500 mx-auto rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
                </div>

                <div className="flex flex-col gap-24 pb-24" style={{ perspective: "1000px" }}>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="sticky w-full max-w-5xl mx-auto"
                            style={{
                                top: `calc(15vh + ${index * 30}px)`,
                                zIndex: index
                            }}
                        >
                            <div
                                ref={(el) => { cardsRef.current[index] = el; }}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                style={{ transformStyle: "preserve-3d" }}
                                className="group relative bg-slate-900/80 backdrop-blur-3xl rounded-3xl p-1 border border-white/10 transition-colors duration-500 hover:border-cyan-500/50 shadow-2xl"
                            >
                                {/* Spotlight */}
                                <div
                                    className="pointer-events-none absolute inset-0 rounded-3xl z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15), transparent 40%)`
                                    } as React.CSSProperties}
                                />

                                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col md:flex-row gap-10 bg-slate-900/50 rounded-[22px]">
                                    {/* Left side: Icon & Tech */}
                                    <div className="flex flex-col justify-start md:w-1/3 border-b md:border-b-0 md:border-r border-white/5 pb-8 md:pb-0 md:pr-8">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-500 shadow-md">
                                                <span className="text-6xl block grayscale group-hover:grayscale-0 transition-all">
                                                    {project.icon}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                                            {project.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tech.slice(0, 4).map((t, i) => (
                                                <span key={i} className="text-[10px] md:text-xs font-mono text-cyan-400/80 uppercase tracking-tighter border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 rounded-md">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right side: Content */}
                                    <div className="flex flex-col flex-1">
                                        <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-grow">
                                            {project.description}
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                            {project.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3 text-sm text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5">
                                                    <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                                            <div className="flex -space-x-3">
                                                {project.tech.map((t, i) => (
                                                    <div key={i} title={t} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold hover:-translate-y-2 hover:z-10 relative transition-all cursor-default shadow-lg">
                                                        {t[0]}
                                                    </div>
                                                ))}
                                            </div>

                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300 group/btn shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                                            >
                                                Explore
                                                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
