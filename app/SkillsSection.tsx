'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
    name: string;
    slug: string;
}

interface SkillData {
    [key: string]: Skill[];
}

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const skillData: SkillData = {
    languages: [
        { name: 'JavaScript', slug: 'javascript/javascript-original.svg' },
        { name: 'TypeScript', slug: 'typescript/typescript-original.svg' },
        { name: 'C', slug: 'c/c-original.svg' },
        { name: 'Java', slug: 'java/java-original.svg' }
    ],
    frameworks: [
        { name: 'Next.js', slug: 'nextjs/nextjs-original.svg' },
        { name: 'React.js', slug: 'react/react-original.svg' },
        { name: 'Node.js', slug: 'nodejs/nodejs-original.svg' },
        { name: 'Express.js', slug: 'express/express-original.svg' },
        { name: 'Socket.io', slug: 'socketio/socketio-original.svg' },
        { name: 'Redux', slug: 'redux/redux-original.svg' },
        { name: 'Firebase', slug: 'firebase/firebase-plain.svg' }
    ],
    databases: [
        { name: 'MongoDB', slug: 'mongodb/mongodb-original.svg' },
        { name: 'MySQL', slug: 'mysql/mysql-original.svg' },
        { name: 'Redis', slug: 'redis/redis-original.svg' }
    ],
    devops: [
        { name: 'Docker', slug: 'docker/docker-original.svg' },
        { name: 'Jenkins', slug: 'jenkins/jenkins-original.svg' },
        { name: 'Google Cloud', slug: 'googlecloud/googlecloud-original.svg' },
        { name: 'Vercel', slug: 'vercel/vercel-original.svg' }
    ],
    frontend: [
        { name: 'HTML', slug: 'html5/html5-original.svg' },
        { name: 'CSS', slug: 'css3/css3-original.svg' },
        { name: 'Bootstrap', slug: 'bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', slug: 'tailwindcss/tailwindcss-original.svg' },
        { name: 'Three.js', slug: 'threejs/threejs-original.svg' }
    ],
    tools: [
        { name: 'Git', slug: 'git/git-original.svg' },
        { name: 'GitHub', slug: 'github/github-original.svg' },
        { name: 'VS Code', slug: 'vscode/vscode-original.svg' },
        { name: 'Postman', slug: 'postman/postman-original.svg' },
        { name: 'Figma', slug: 'figma/figma-original.svg' }
    ],
    specializations: [
        { name: 'REST API', slug: 'nodejs/nodejs-plain.svg' },
        { name: 'SEO', slug: 'chrome/chrome-original.svg' },
        { name: 'Performance', slug: 'chrome/chrome-plain.svg' },
        { name: 'DSA', slug: 'javascript/javascript-plain.svg' }
    ]
};

const SkillIcon = ({ name, slug }: Skill) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;

        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <div
            ref={cardRef}
            className="skill-card group relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Background gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card container */}
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 p-6 overflow-hidden transition-all duration-300 group-hover:border-white/20">

                {/* Animated mesh gradient background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Icon container with 3D effect */}
                <div className="relative z-10 flex flex-col items-center gap-4" style={{ transform: 'translateZ(20px)' }}>
                    <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-500">
                        {/* Rotating ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000" />

                        {/* Icon glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Icon */}
                        <img
                            src={`${ICON_BASE}${slug}`}
                            alt={name}
                            className="relative w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Name with gradient */}
                    <p className="relative text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
                        <span className="relative z-10">{name}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 bg-clip-text text-transparent transition-opacity duration-500">
                            {name}
                        </span>
                    </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    );
};

const SkillsSection = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        // Title animation with split text effect
        if (titleRef.current) {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                },
                opacity: 0,
                scale: 0.8,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });

            // Gradient text animation
            gsap.to(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                },
                backgroundPosition: "200% center",
                duration: 3,
                ease: "none",
                repeat: -1
            });
        }

        // Category animations with 3D effects
        const categories = gsap.utils.toArray('.skill-category');

        categories.forEach((category: any, index: number) => {
            const cards = category.querySelectorAll('.skill-card');
            const categoryTitle = category.querySelector('.category-title');

            // Category title animation
            gsap.from(categoryTitle, {
                scrollTrigger: {
                    trigger: category,
                    start: "top 80%",
                },
                opacity: 0,
                x: -50,
                duration: 0.8,
                ease: "power3.out"
            });

            // 3D card entrance animation
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: category,
                    start: "top 75%",
                },
                opacity: 0,
                y: 100,
                rotateX: -45,
                z: -200,
                duration: 1,
                stagger: {
                    each: 0.08,
                    from: "start"
                },
                ease: "power3.out",
                transformPerspective: 1000
            });

            // Parallax effect on scroll
            gsap.to(cards, {
                scrollTrigger: {
                    trigger: category,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: (i) => i * -20,
                ease: "none"
            });
        });

        // Continuous floating animation
        gsap.to(".skill-card", {
            y: (i) => (i % 2 === 0 ? -12 : -8),
            duration: 2.5 + Math.random(),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: {
                each: 0.2,
                from: "random"
            }
        });

        // Subtle rotation animation
        gsap.to(".skill-card", {
            rotateZ: (i) => (i % 2 === 0 ? 1 : -1),
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: {
                each: 0.3,
                from: "random"
            }
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen py-24 px-6 overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom, #0a0a0a 0%, #0f0f1e 50%, #0a0a0a 100%)'
            }}
        >
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative max-w-7xl mx-auto">
                {/* Title with gradient */}
                <h2
                    ref={titleRef}
                    className="text-6xl md:text-7xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    style={{
                        backgroundSize: '200% auto',
                        textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
                    }}
                >
                    Skills.
                </h2>

                {/* Skills grid */}
                <div className="space-y-16">
                    {Object.entries(skillData).map(([category, skills]) => (
                        <div key={category} className="skill-category">
                            <h3 className="category-title text-2xl font-bold text-white/70 mb-8 uppercase tracking-wider">
                                {category}
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {skills.map((skill) => (
                                    <SkillIcon key={skill.name} {...skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;