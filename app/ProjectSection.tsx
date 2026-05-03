import React, { useRef } from 'react';
import { ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
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
    image: string;
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
        image: '/farmerlogin.png'
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
        image: '/foodconnect.png'
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
            'AI-powered smart search (jobs, users, posts)',
            'Resume parser using AI (extract skills, experience, insights)',
            'AI-based post/job recommendation system',
            'Frontend on Vercel, backend on Render'
        ],
        link: 'http://workspera.vercel.app',
        image: '/workspera.png'
    },
    {
        title: 'FindMyWork',
        tech: ['MERN', 'Redux', 'Tailwind CSS', 'JWT'],
        description: 'A full-stack Job Portal for job search, application management, and real-time tracking',
        features: [
            'Scalable MERN Stack architecture',
            'Implemented JWT authentication with access & refresh tokens',
            'Developed job search, filtering, and pagination',
            'Created resume upload system using Multer (PDF/DOCX, 5MB)',
            'Built admin dashboard for job & candidate management',
            'Enabled real-time application tracking (status updates)'
        ],
        link: 'https://findmywork-one.vercel.app/',
        image: '/findmywork.png'
    }
];

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // Title Entrance
        gsap.from('.title-word', {
            y: 100,
            opacity: 0,
            rotationX: -80,
            transformOrigin: "bottom center",
            stagger: 0.1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
            }
        });

        // The Cards
        const cards = cardsRef.current;
        
        cards.forEach((card, index) => {
            if (!card) return;
            
            const inner = card.querySelector('.card-inner');
            const projectImage = card.querySelector('.project-image');
            const content = card.querySelector('.project-content');
            const features = card.querySelectorAll('.feature-item');
            const techBadges = card.querySelectorAll('.tech-badge');

            // Set initial state for sticky to work perfectly
            gsap.set(card, { clearProps: "all" });

            // Entrance animation for the INNER card (wrapper must remain pure for sticky)
            if (inner) {
                gsap.from(inner, {
                    y: "50vh",
                    scale: 0.8,
                    rotationX: 30,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
                        end: "top 30%",
                        scrub: 1,
                    }
                });
            }

            // Animate content elements as the card comes in
            if (content) {
                gsap.from([content.querySelector('h3'), content.querySelector('p')], {
                    x: -50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 70%",
                    }
                });
            }

            if (features.length) {
                gsap.from(features, {
                    opacity: 0,
                    x: -20,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 60%",
                    }
                });
            }

            // Image hover float animation
            if (projectImage) {
                gsap.from(projectImage, {
                    y: 80,
                    opacity: 0,
                    scale: 0.9,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 65%",
                    }
                });
            }

            // The Overlapping Stacking Effect is handled natively by CSS sticky to prevent GSAP reversing bugs on scroll up!
        });

    }, { scope: containerRef });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const inner = card.querySelector('.card-inner') as HTMLElement;
        if (!inner) return;

        const rect = inner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Mouse coordinates for background gradient effect
        inner.style.setProperty("--mouse-x", `${x}px`);
        inner.style.setProperty("--mouse-y", `${y}px`);

        // Calculate 3D rotation based on mouse position
        const rotateX = ((y / rect.height) - 0.5) * -20;
        const rotateY = ((x / rect.width) - 0.5) * 20;

        gsap.to(inner, {
            rotateX,
            rotateY,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        if (!card) return;
        
        const inner = card.querySelector('.card-inner') as HTMLElement;
        if (!inner) return;

        gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <section id="projects" ref={containerRef} className="py-32 px-4 bg-[#050505] relative min-h-screen">
            {/* NO OVERFLOW CLIP HERE, allows sticky to work perfectly */}
            
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] bg-cyan-900/20 rounded-full blur-[150px] mix-blend-screen opacity-50" />
                <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                <div className="mb-40 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                        <Sparkles size={18} className="text-cyan-400 relative z-10" />
                        <span className="text-white text-sm font-bold tracking-widest uppercase relative z-10">Portfolio Showcase</span>
                    </div>
                    
                    <h2 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black flex flex-wrap justify-center gap-4" style={{ perspective: '1000px' }}>
                        <span className="title-word inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-white/30">SELECTED</span>
                        <span className="title-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">WORKS</span>
                    </h2>
                </div>

                <div className="projects-container flex flex-col relative pb-[20vh]">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="project-card sticky w-full"
                            style={{ 
                                top: `5vh`, 
                                marginBottom: '15vh',
                                perspective: '2000px',
                                zIndex: index
                            }}
                        >
                            <div 
                                className="card-inner w-full min-h-[85vh] lg:h-[85vh] rounded-[2.5rem] bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col lg:flex-row relative origin-top"
                                style={{ transformStyle: 'preserve-3d' }}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                {/* Glowing Spotlight tracking mouse */}
                                <div
                                    className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
                                    style={{
                                        background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.1), transparent 40%)`
                                    } as React.CSSProperties}
                                />

                                {/* Background Grid overlay */}
                                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

                                {/* Left Content Section */}
                                <div className="project-content lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col lg:h-full relative z-10 border-b lg:border-b-0 lg:border-r border-white/5 overflow-y-auto custom-scrollbar">
                                    
                                    <div className="flex items-center gap-3 mb-6" style={{ transform: 'translateZ(30px)' }}>
                                        <div className="w-12 h-px bg-cyan-500" />
                                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Project 0{index + 1}</span>
                                    </div>

                                    <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight" style={{ transform: 'translateZ(60px)' }}>
                                        {project.title}
                                    </h3>
                                    
                                    {/* Tech Stack Area - Moved here for all sizes */}
                                    <div className="mb-8" style={{ transform: 'translateZ(40px)' }}>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, i) => (
                                                <span 
                                                    key={i} 
                                                    className="tech-badge px-3 py-1.5 text-xs font-semibold text-cyan-50 bg-cyan-950/40 border border-cyan-500/30 rounded-lg backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:scale-105 hover:border-cyan-400 hover:bg-cyan-900/60 transition-all cursor-default"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8" style={{ transform: 'translateZ(40px)' }}>
                                        {project.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-4 mb-10" style={{ transform: 'translateZ(30px)' }}>
                                        {project.features.map((feature, i) => (
                                            <div key={i} className="feature-item flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors">
                                                <Terminal className="text-cyan-400 mt-0.5 flex-shrink-0" size={18} />
                                                <span className="text-slate-300 leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-8" style={{ transform: 'translateZ(50px)' }}>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-between w-full p-6 bg-white text-black rounded-2xl font-bold text-xl transition-all duration-300 hover:bg-cyan-400 overflow-hidden relative"
                                        >
                                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                                                Live Preview
                                            </span>
                                            <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center relative z-10 group-hover:bg-white/20 transition-colors">
                                                <ArrowUpRight className="group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                {/* Right Visual Section - Project Screenshot */}
                                <div className="lg:w-1/2 relative h-[350px] lg:h-full flex flex-col p-6 md:p-8 overflow-hidden items-center justify-center">
                                    
                                    {/* Huge background text watermark */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[20rem] font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter mix-blend-overlay">
                                        {project.title.substring(0, 4).toUpperCase()}
                                    </div>

                                    {/* Glowing core behind image */}
                                    <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-gradient-to-tr from-cyan-500/40 to-purple-500/40 rounded-full blur-[80px] z-0" />

                                    {/* Project Screenshot */}
                                    <div className="project-image relative z-10 w-full h-full flex items-center justify-center">
                                        <div className="relative w-full max-w-[500px] group/img">
                                            {/* Glowing border effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 rounded-2xl blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                                            <img 
                                                src={project.image} 
                                                alt={project.title}
                                                className="relative w-full h-auto rounded-2xl border border-white/10 shadow-2xl shadow-black/50 object-cover group-hover/img:scale-[1.02] group-hover/img:border-cyan-500/30 transition-all duration-500"
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom scrollbar styles for inner content if needed */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(34, 211, 238, 0.5);
                }
            `}</style>
        </section>
    );
};

export default ProjectsSection;
