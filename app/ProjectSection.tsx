import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
        tech: ['Next.js', 'React.js', 'Express.js', 'NextAuth.js', 'Socket.io', 'WebRTC', 'Node.js', 'MongoDB', 'Vercel', 'Render', 'Gemini API / Gen AI'],
        description: 'Real-time worker-connection platform combining chat, video calls, work posting, and hiring',
        features: [
            'Real-time chat using Socket.io',
            'Peer-to-peer video calling with WebRTC',
            'Secure authentication with NextAuth.js',
            'Work posting & worker hiring system',
            'Follow & following networking feature',
            'AI Chatbot for user assistance & queries',
            'AI-powered smart search',
            'Resume parser using AI',
            'AI-based recommendation system',
            'Frontend on Vercel, backend on Render'
        ],
        link: 'http://workspera.vercel.app',
        icon: '🛠️'
    },
    {
        title: 'FindMyWork',
        tech: ['MERN', 'Redux', 'Tailwind CSS', 'JWT'],
        description: 'A full-stack Job Portal for job search, application management, and real-time tracking',
        features: [
            'Scalable MERN Stack architecture',
            'Implemented JWT authentication',
            'Developed job search, filtering, and pagination',
            'Created resume upload system using Multer',
            'Built admin dashboard',
            'Enabled real-time application tracking'
        ],
        link: 'https://findmywork-one.vercel.app/',
        icon: '💼🔎'
    }
];

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // Title Animation
        const chars = titleRef.current?.querySelectorAll('.typing-char');
        if (chars && chars.length > 0) {
            gsap.from(chars, {
                opacity: 0,
                y: 40,
                rotateX: -90,
                stagger: 0.05,
                duration: 1,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                }
            });
        }

        // --- STACKING CARDS ANIMATION ---
        cardsRef.current.forEach((card, index) => {
            if (!card) return;
            const inner = card.querySelector('.card-inner');
            
            // Initial Entrance
            gsap.from(inner, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                }
            });

            // The "Override" Stacking Effect
            // As the NEXT card comes up, this card scales down and darkens
            if (index < projects.length - 1) {
                gsap.to(inner, {
                    scale: 0.9,
                    filter: "brightness(0.3)",
                    scrollTrigger: {
                        trigger: cardsRef.current[index + 1],
                        start: "top 50%", 
                        end: "top 0%",
                        scrub: true,
                    }
                });
            }
        });

        // 3D Icon floating animation
        gsap.to('.project-icon-3d', {
            y: -20,
            rotationY: 15,
            rotationX: 10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2
        });

    }, { scope: containerRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 25;
        const rotateY = -(x - rect.width / 2) / 25;

        gsap.to(card.querySelector('.card-inner'), {
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

        gsap.to(card.querySelector('.card-inner'), {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
        });
    };

    return (
        <section id="projects" ref={containerRef} className="py-32 px-4 bg-[#020617] relative">
            {/* Cosmic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-32 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-6">
                        <Sparkles size={16} />
                        <span>Featured Projects</span>
                    </div>
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-black flex flex-col justify-center items-center gap-2"
                        style={{ perspective: '1000px' }}
                    >
                        <div className="flex overflow-hidden">
                            {"SELECTED".split("").map((char, i) => (
                                <span key={`sel-${i}`} className="typing-char inline-block bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
                                    {char}
                                </span>
                            ))}
                        </div>
                        <div className="flex overflow-hidden">
                            {"WORKS".split("").map((char, i) => (
                                <span key={`wrk-${i}`} className="typing-char inline-block bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                                    {char}
                                </span>
                            ))}
                        </div>
                    </h2>
                </div>

                {/* Container for Stacking Cards */}
                <div className="projects-container relative flex flex-col gap-[10vh]">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="project-card sticky w-full"
                            style={{ 
                                top: `${100 + (index * 20)}px`, // Staggered sticky position
                                zIndex: index,
                                perspective: '1000px' 
                            }}
                        >
                            <div 
                                className="card-inner relative w-full rounded-[2.5rem] border border-white/10 bg-[#0a0f1e] backdrop-blur-3xl overflow-hidden shadow-2xl shadow-black/50"
                                style={{ transformStyle: 'preserve-3d' }}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                {/* Glowing Mouse Effect */}
                                <div
                                    className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
                                    style={{
                                        background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.08), transparent 40%)`
                                    }}
                                />
                                
                                <div className="grid lg:grid-cols-12 gap-0 relative z-10 min-h-[500px]">
                                    
                                    {/* Left Content */}
                                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-500/20 rounded-full backdrop-blur-md">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-10">
                                            {project.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 group/feature">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover/feature:bg-cyan-400 transition-all flex-shrink-0" />
                                                    <span className="text-sm text-slate-500 group-hover/feature:text-slate-300 transition-colors">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm md:text-base overflow-hidden transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                                            >
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                                <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors">
                                                    View Project
                                                    <ArrowRight size={18} className="group-hover/btn:-rotate-45 transition-transform duration-300" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Right Visual Area */}
                                    <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full flex items-center justify-center p-8 overflow-hidden group/visual">
                                        <div className="absolute w-[150%] aspect-square border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                                        <div className="absolute w-48 h-48 bg-gradient-to-tr from-cyan-500/40 to-indigo-500/40 rounded-full blur-[60px]" />
                                        <div className="project-icon-3d text-8xl md:text-9xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] select-none">
                                            {project.icon}
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