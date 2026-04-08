import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
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
    const pinRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        // Faster scrolling: We decrease the 'end' to complete the changes more quickly
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinRef.current,
                start: "top top",
                end: `+=${cards.length * 60}%`, // Reduced scroll length for faster changes
                pin: true, 
                scrub: true,  
            }
        });

        cards.forEach((card, index) => {
            if (index > 0) {
                // Next card slides in
                tl.fromTo(card,
                    { y: "130vh" }, // Start from bottom
                    {
                        y: "0vh",   // Slide up correctly
                        ease: "none"
                    },
                    "-=0.2" // Slight overlap with previous animation
                );
            }
            
            // If there's a previous card, let's add a slight scale down effect
            // to make the current one pop out more!
            if (index < cards.length - 1) {
                tl.to(card, {
                    scale: 0.9,
                    opacity: 0.5,
                    ease: "none"
                }, ">"); // Starts as the next one comes up
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-[#020617]">
            {/* The Pinning Container */}
            <div ref={pinRef} className="h-[100dvh] w-full overflow-hidden relative flex flex-col items-center justify-start pt-24 md:pt-32 pb-12 md:pb-16 px-4">

                {/* Background Orbs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
                </div>

                {/* Title (Stays statically positioned above cards so it never overlaps!) */}
                <div className="w-full text-center z-50 mb-8 md:mb-12 shrink-0">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent pb-2">
                        Selected Works
                    </h2>
                </div>

                {/* The Stacked Cards Area */}
                <div className="relative w-full max-w-6xl flex-1 mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="absolute inset-0 flex items-start justify-center"
                            style={{ zIndex: index }}
                        >
                            <div className="w-full h-full bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row gap-6 md:gap-10 items-start lg:items-center overflow-y-auto custom-scrollbar">

                                {/* Info Side */}
                                <div className="flex-1 flex flex-col h-auto lg:h-full justify-center w-full py-4 lg:py-0">
                                    <div className="flex items-center gap-4 mb-4 md:mb-6 shrink-0">
                                        <div className="p-3 md:p-4 bg-slate-800/50 rounded-2xl border border-white/5">
                                            <span className="text-4xl md:text-5xl block">{project.icon}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.slice(0, 3).map((t, i) => (
                                                <span key={i} className="text-[9px] md:text-[10px] font-mono text-cyan-400 border border-cyan-400/20 px-2 py-1 rounded-md uppercase tracking-widest">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6 shrink-0">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 shrink-0">
                                        {project.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 shrink-0">
                                        {project.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-slate-300 bg-white/5 p-2 md:p-3 rounded-lg md:rounded-xl border border-white/5">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
                                                <span className="flex-1 leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 md:pt-8 border-t border-white/5 mt-auto shrink-0 pb-2 gap-4 sm:gap-0 mt-auto">
                                        <div className="hidden md:flex -space-x-2">
                                            {project.tech.map((t, i) => (
                                                <div key={i} title={t} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] text-white font-bold hover:-translate-y-2 transition-transform">
                                                    {t[0]}
                                                </div>
                                            ))}
                                        </div>

                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-center sm:justify-start gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-bold text-sm md:text-base hover:bg-cyan-400 hover:scale-105 transition-all duration-300 group w-full sm:w-auto mt-4 sm:mt-0"
                                        >
                                            Explore Project
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Added spacer to let the last card be viewed before moving to next section */}
            <div className="h-[20vh]" />
        </section>
    );
};

export default ProjectsSection;
