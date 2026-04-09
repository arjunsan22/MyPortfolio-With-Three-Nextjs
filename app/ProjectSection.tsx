'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
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
    category: string;
    color: string;
}

const projects: Project[] = [
    {
        title: 'Farmers Login',
        tech: ['Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'EJS', 'Socket.io', 'Cloudinary', 'GCP'],
        description: 'Full-stack farmers marketplace with authentication, real-time chat, and integrated payments.',
        features: [
            'Google OAuth authentication',
            'Real-time chat using Socket.io',
            'Multiple payment options (Razorpay, Wallet, COD)',
            'Multi-vendor e-commerce',
            'MVC architecture'
        ],
        link: 'https://farmerslogin.vercel.app',
        icon: '🌾',
        category: 'Full Stack',
        color: '#10b981'
    },
    {
        title: 'FoodConnects',
        tech: ['Next.js', 'React.js', 'Express.js', 'Tailwind CSS', 'NextAuth.js', 'Razorpay', 'MongoDB Atlas', 'Vercel'],
        description: 'Online bakery ordering platform with modern UI and seamless payment integration.',
        features: [
            'Server-Side Rendering (SSR) and SSG',
            'Google OAuth with NextAuth.js',
            'Razorpay payment integration',
            'Deployed on Vercel',
            'Responsive design with Tailwind CSS'
        ],
        link: 'https://foodconnects.vercel.app/',
        icon: '🍰',
        category: 'E-Commerce',
        color: '#f59e0b'
    },
    {
        title: 'WorkSPera',
        tech: ['Next.js', 'React.js', 'Express.js', 'NextAuth.js', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB', 'Gemini API'],
        description: 'Real-time worker-connection platform combining AI-powered chat, video calls, work posting, and hiring.',
        features: [
            'Real-time chat using Socket.io',
            'Peer-to-peer video calling with WebRTC',
            'AI Chatbot & Smart Search',
            'Resume parser using AI',
            'AI-based recommendation system'
        ],
        link: 'http://workspera.vercel.app',
        icon: '🛠️',
        category: 'AI Platform',
        color: '#06b6d4'
    },
    {
        title: 'SongConnects',
        tech: ['Next.js', 'Tailwind CSS', 'Vercel'],
        description: 'Music streaming application similar to Spotify with playlists and dynamic audio player.',
        features: [
            'Modern Spotify-like UI',
            'Dynamic audio player with controls',
            'Create & manage playlists',
            'Fast routing with Next.js App Router',
            'Deployed on Vercel'
        ],
        link: 'https://songconnects.vercel.app/',
        icon: '🎵',
        category: 'Web App',
        color: '#8b5cf6'
    }
];

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // --- Heading reveal ---
        const headingEl = headingRef.current;
        if (headingEl) {
            const chars = headingEl.querySelectorAll('.heading-char');
            gsap.from(chars, {
                opacity: 0,
                y: 60,
                rotateX: -90,
                stagger: 0.04,
                duration: 0.8,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: headingEl,
                    start: 'top 85%',
                },
            });
            gsap.from(headingEl.querySelector('.section-sub'), {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: headingEl,
                    start: 'top 85%',
                },
            });
        }

        // --- Project rows ---
        rowRefs.current.forEach((row, i) => {
            if (!row) return;
            const isEven = i % 2 === 0;

            // Big number
            gsap.from(row.querySelector('.proj-number'), {
                opacity: 0,
                x: isEven ? -80 : 80,
                duration: 1.2,
                ease: 'expo.out',
                scrollTrigger: { trigger: row, start: 'top 80%' },
            });

            // Content panel
            gsap.from(row.querySelector('.proj-content'), {
                opacity: 0,
                x: isEven ? 60 : -60,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: row, start: 'top 80%' },
            });

            // Icon box
            gsap.from(row.querySelector('.proj-icon'), {
                opacity: 0,
                scale: 0.5,
                rotate: -20,
                duration: 0.8,
                delay: 0.2,
                ease: 'back.out(2)',
                scrollTrigger: { trigger: row, start: 'top 80%' },
            });

            // Tech pills stagger
            const pills = row.querySelectorAll('.tech-pill');
            gsap.from(pills, {
                opacity: 0,
                y: 15,
                scale: 0.8,
                stagger: 0.05,
                duration: 0.5,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: { trigger: row, start: 'top 80%' },
            });

            // Features stagger
            const features = row.querySelectorAll('.feature-item');
            gsap.from(features, {
                opacity: 0,
                x: -20,
                stagger: 0.07,
                duration: 0.5,
                delay: 0.4,
                ease: 'power2.out',
                scrollTrigger: { trigger: row, start: 'top 80%' },
            });

            // Divider line
            gsap.from(row.querySelector('.proj-divider'), {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 1.2,
                ease: 'expo.out',
                scrollTrigger: { trigger: row, start: 'top 85%' },
            });
        });
    }, { scope: containerRef });

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#020617] overflow-hidden"
        >
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-cyan-600/8 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-violet-600/8 blur-[120px]" />
                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* ── Header ── */}
                <div ref={headingRef} className="mb-20 sm:mb-28">
                    <p className="section-sub text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-cyan-400 mb-4">
                        — Portfolio
                    </p>
                    <h2 className="section-heading text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none overflow-hidden">
                        <span style={{ display: 'inline-block' }}>
                            {'Selected'.split('').map((ch, i) => (
                                <span key={i} className="heading-char inline-block">{ch}</span>
                            ))}
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                            {'Works.'.split('').map((ch, i) => (
                                <span key={i} className="heading-char inline-block">{ch}</span>
                            ))}
                        </span>
                    </h2>
                </div>

                {/* ── Projects ── */}
                <div className="space-y-0">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                ref={(el) => { rowRefs.current[index] = el; }}
                                className="group relative"
                            >
                                {/* Divider top */}
                                <div
                                    className="proj-divider w-full h-px mb-10 sm:mb-16"
                                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }}
                                />

                                <div
                                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-start pb-10 sm:pb-16`}
                                >
                                    {/* ── Number + Icon block ── */}
                                    <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6 w-full lg:w-auto">
                                        <p
                                            className="proj-number font-black text-[60px] sm:text-[80px] lg:text-[120px] leading-none select-none"
                                            style={{ color: `${project.color}15`, WebkitTextStroke: `1px ${project.color}30` }}
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </p>
                                        <div
                                            className="proj-icon flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl border"
                                            style={{ background: `${project.color}15`, borderColor: `${project.color}40` }}
                                        >
                                            {project.icon}
                                        </div>
                                    </div>

                                    {/* ── Content ── */}
                                    <div className="proj-content flex-1 min-w-0">
                                        {/* Category + Title */}
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span
                                                className="text-[10px] sm:text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border"
                                                style={{ color: project.color, borderColor: `${project.color}50`, background: `${project.color}10` }}
                                            >
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500"
                                            style={{ '--hover-color': project.color } as React.CSSProperties}
                                        >
                                            {project.title}
                                        </h3>

                                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                                            {project.description}
                                        </p>

                                        {/* Tech pills — flex-wrap prevents overflow */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech.map((t, i) => (
                                                <span
                                                    key={i}
                                                    className="tech-pill text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-full border border-white/10 text-slate-400 bg-white/5 hover:border-white/30 transition-colors duration-200"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Features grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                                            {project.features.map((feat, i) => (
                                                <div key={i} className="feature-item flex items-start gap-2.5">
                                                    <div
                                                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                                                        style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }}
                                                    />
                                                    <span className="text-xs sm:text-sm text-slate-500 leading-snug">{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="proj-cta inline-flex items-center gap-2 group/cta"
                                        >
                                            <span
                                                className="relative text-sm sm:text-base font-bold transition-colors duration-300"
                                                style={{ color: project.color }}
                                            >
                                                View Project
                                                <span
                                                    className="absolute -bottom-0.5 left-0 h-px w-0 group-hover/cta:w-full transition-all duration-300"
                                                    style={{ background: project.color }}
                                                />
                                            </span>
                                            <ArrowUpRight
                                                size={18}
                                                className="group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform duration-300"
                                                style={{ color: project.color }}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Final divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
