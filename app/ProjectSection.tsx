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
        link: 'https://farmers-login.vercel.app/',
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
        link: 'https://workspera-backend.onrender.com',
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
                    y: 50,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1,
                    delay: index * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                    }
                });
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
        <section id="projects" ref={containerRef} className="py-32 px-4 bg-[#020617] relative overflow-hidden">
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

                <div className="grid lg:grid-cols-2 gap-12" style={{ perspective: "1000px" }}>
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            style={{ transformStyle: "preserve-3d" }}
                            className="group relative bg-slate-900/40 backdrop-blur-xl rounded-3xl p-1 border border-white/10 transition-colors duration-500 hover:border-cyan-500/50"
                        >
                            {/* Spotlight */}
                            <div
                                className="pointer-events-none absolute inset-0 rounded-3xl z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.15), transparent 40%)`
                                } as React.CSSProperties}
                            />

                            <div className="relative z-10 p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-white/5 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-500">
                                        <span className="text-5xl block grayscale group-hover:grayscale-0 transition-all">
                                            {project.icon}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        {project.tech.slice(0, 3).map((t, i) => (
                                            <span key={i} className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-tighter border border-cyan-400/20 px-2 py-1 rounded-md">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <div className="flex -space-x-2">
                                        {project.tech.map((t, i) => (
                                            <div key={i} title={t} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] text-white font-bold hover:-translate-y-2 transition-transform cursor-default">
                                                {t[0]}
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300 group/btn"
                                    >
                                        Explore
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
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