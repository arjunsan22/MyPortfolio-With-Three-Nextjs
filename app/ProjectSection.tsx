import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
            'AI-powered smart search (jobs, users, posts)',
            'Resume parser using AI (extract skills, experience, insights)',
            'AI-based post/job recommendation system',
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
            'Implemented JWT authentication with access & refresh tokens',
            'Developed job search, filtering, and pagination',
            'Built admin dashboard for job & candidate management',
            'Enabled real-time application tracking (status updates)'
        ],
        link: 'https://findmywork-one.vercel.app',
        icon: '💼'
    }
];

const PortalBackground = () => {
    const bgRef = useRef<HTMLDivElement>(null);
    const [rings, setRings] = React.useState<{id: number, size: number}[] | null>(null);

    React.useEffect(() => {
        setRings(Array.from({ length: 5 }).map((_, i) => ({
            id: i,
            size: (i + 1) * 25
        })));
    }, []);

    useGSAP(() => {
        if (!rings) return;

        gsap.to('.portal-ring', {
            rotation: 360,
            duration: "random(40, 80)",
            repeat: -1,
            ease: "none",
            stagger: { amount: 10, from: "edges" }
        });

        gsap.to('.portal-ring', {
            scale: 1.05,
            opacity: "random(0.1, 0.3)",
            duration: "random(4, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { amount: 2, from: "center" }
        });
    }, { dependencies: [rings], scope: bgRef });

    return (
        <div ref={bgRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[3rem]">
            {/* Core glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Futuristic portal rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-40 mix-blend-screen pointer-events-none">
                {rings && rings.map((ring) => (
                    <div 
                        key={`ring-${ring.id}`}
                        className="portal-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)_inset]"
                        style={{ width: `${ring.size}%`, height: `${ring.size}%` }}
                    />
                ))}
            </div>

            {/* Matrix dot grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 mix-blend-overlay pointer-events-none" />
        </div>
    );
};

const ProjectCard = ({ project }: { project: Project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !contentRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(cardRef.current, {
            rotateX, rotateY,
            transformPerspective: 1500,
            ease: "power2.out",
            duration: 0.5
        });

        gsap.to(contentRef.current, {
            x: (x - centerX) * 0.05,
            y: (y - centerY) * 0.05,
            ease: "power2.out",
            duration: 0.5
        });

        gsap.to(cardRef.current.querySelector('.project-glow'), {
            x: x - 200,
            y: y - 200,
            opacity: 1,
            ease: "power2.out",
            duration: 0.5
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || !contentRef.current) return;
        gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, ease: "power3.out", duration: 1 });
        gsap.to(contentRef.current, { x: 0, y: 0, ease: "power3.out", duration: 1 });
        gsap.to(cardRef.current.querySelector('.project-glow'), { opacity: 0, ease: "power2.out", duration: 1 });
    };

    return (
        <div
            ref={cardRef}
            className="project-card relative w-full h-full rounded-[2.5rem] bg-[#050510]/60 backdrop-blur-2xl border border-white/5 overflow-hidden cursor-crosshair group [transform-style:preserve-3d]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Hover Glow */}
            <div className="project-glow absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none opacity-0 mix-blend-screen" />
            
            {/* Inner Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-[2.5rem] transition-colors duration-500 pointer-events-none mix-blend-overlay z-20" />

            {/* Inner Content */}
            <div ref={contentRef} className="relative z-10 p-8 md:p-10 flex flex-col h-full [transform-style:preserve-3d]">
                <div className="flex justify-between items-start mb-10">
                    <div className="text-6xl md:text-7xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        {project.icon}
                    </div>
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 group/link"
                        style={{ transform: 'translateZ(40px)' }}
                    >
                        <span className="text-sm font-black tracking-widest uppercase">Visit</span>
                        <ArrowRight size={18} className="group-hover/link:translate-x-1 group-hover/link:-rotate-45 transition-transform" />
                    </a>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500" style={{ transform: 'translateZ(30px)' }}>
                    {project.title}
                </h3>

                <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 flex-grow group-hover:text-slate-300 transition-colors duration-300" style={{ transform: 'translateZ(20px)' }}>
                    {project.description}
                </p>

                <div className="space-y-4 mb-10" style={{ transform: 'translateZ(25px)' }}>
                    {project.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                            <span className="text-base text-slate-300/80 leading-snug">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10 mt-auto" style={{ transform: 'translateZ(10px)' }}>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-xs md:text-sm font-mono font-bold text-cyan-400/80 bg-cyan-950/40 px-4 py-2 rounded-xl border border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:bg-cyan-900/40 group-hover:text-cyan-300 transition-colors duration-300 shadow-[0_0_10px_rgba(34,211,238,0.05)_inset]">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Main Title
        gsap.from(".projects-title-char", {
            y: 100,
            opacity: 0,
            rotationX: -90,
            stagger: 0.05,
            duration: 1.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        // 3D Card Stagger Entry
        const cards = gsap.utils.toArray('.project-card');
        gsap.fromTo(cards, 
            { y: 150, opacity: 0, rotationX: 15, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );

    }, { scope: sectionRef });

    const titleText = "Selected Works";

    return (
        <section id="projects" ref={sectionRef} className="py-32 px-4 bg-transparent overflow-hidden relative z-10 perspective-[2000px]">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Title */}
                <div className="text-center mb-24 perspective-[1000px]">
                    <h2 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black flex justify-center gap-[2px] tracking-tighter flex-wrap">
                        {titleText.split(' ').map((word, wordIndex) => (
                            <span key={`word-${wordIndex}`} className="inline-block whitespace-pre mr-4 md:mr-8">
                                {word.split('').map((char, charIndex) => (
                                    <span
                                        key={`char-${charIndex}`}
                                        className="projects-title-char inline-block bg-gradient-to-br from-cyan-300 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                    >
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>
                    <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-8 shadow-[0_0_15px_#a855f7]" />
                </div>

                {/* Main 3D Container wrapper */}
                <div 
                    ref={containerRef}
                    className="relative rounded-[3rem] p-4 md:p-8 lg:p-12 border border-white/5 bg-[#030108]/80 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] [transform-style:preserve-3d]"
                >
                    <PortalBackground />
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12" style={{ transform: 'translateZ(60px)' }}>
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;




