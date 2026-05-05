'use client';
import React, { useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Network, Database } from 'lucide-react';
import Image from 'next/image';
import CircuitBackground from './components/CircuitBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AIBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 1. The Head/Brain (Particle Sphere)
        const particleCount = 4000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const colorCyan = new THREE.Color('#00f0ff');
        const colorBlue = new THREE.Color('#3b82f6');
        const colorPurple = new THREE.Color('#a855f7');

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            let r = 12 + Math.random() * 2.5;
            
            let y = r * 1.2 * Math.cos(phi);
            let x = r * Math.sin(phi) * Math.cos(theta);
            let z = r * Math.sin(phi) * Math.sin(theta);
            
            if (x > 0 && y < 0) x += Math.abs(y) * 0.3; 
            if (x < 0) x *= 0.8;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            sizes[i] = Math.random() * 1.5 + 0.5;

            const mixRatio = (x + 15) / 30;
            const finalColor = colorCyan.clone().lerp(colorPurple, mixRatio + Math.random() * 0.2);
            colors[i * 3] = finalColor.r;
            colors[i * 3 + 1] = finalColor.g;
            colors[i * 3 + 2] = finalColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    pos.x += sin(time * 2.0 + pos.y * 0.5) * 0.3;
                    pos.y += cos(time * 1.5 + pos.x * 0.5) * 0.3;
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (40.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float d = distance(gl_PointCoord, vec2(0.5));
                    if (d > 0.5) discard;
                    float alpha = smoothstep(0.5, 0.1, d);
                    gl_FragColor = vec4(vColor, alpha * 0.9);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const headPoints = new THREE.Points(geometry, material);
        headPoints.position.x = 10;
        scene.add(headPoints);

        // 2. Data Streams (Flowing lines)
        const lineCount = 150;
        const linesGroup = new THREE.Group();
        
        const linesData: any[] = [];
        for (let i = 0; i < lineCount; i++) {
            const numPoints = 60;
            const linePositions = new Float32Array(numPoints * 3);
            const lineColors = new Float32Array(numPoints * 3);
            
            const startY = (Math.random() - 0.5) * 25;
            const startZ = (Math.random() - 0.5) * 20;
            
            for (let j = 0; j < numPoints; j++) {
                const lx = 10 - j * 0.8;
                linePositions[j * 3] = lx;
                linePositions[j * 3 + 1] = startY;
                linePositions[j * 3 + 2] = startZ;
                
                const alpha = 1.0 - (j / numPoints);
                const c = colorCyan.clone().lerp(colorBlue, j / numPoints);
                lineColors[j * 3] = c.r * alpha;
                lineColors[j * 3 + 1] = c.g * alpha;
                lineColors[j * 3 + 2] = c.b * alpha;
            }
            
            const lineGeom = new THREE.BufferGeometry();
            lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
            lineGeom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
            
            const mat = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0.3 + Math.random() * 0.3,
                blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(lineGeom, mat);
            linesGroup.add(line);
            
            linesData.push({
                geom: lineGeom,
                startY, startZ,
                speed: 0.05 + Math.random() * 0.08,
                offset: Math.random() * Math.PI * 2,
                amplitude: 0.5 + Math.random() * 1.5,
                frequency: 0.05 + Math.random() * 0.1
            });
        }
        scene.add(linesGroup);

        const clock = new THREE.Clock();
        let animId: number;
        let isVisible = false;

        const observer = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0]?.isIntersecting ?? false;
                if (isVisible && !animId) {
                    clock.start();
                    animate();
                }
            },
            { threshold: 0.05 }
        );
        observer.observe(container);

        const animate = () => {
            if (!isVisible) {
                animId = 0;
                clock.stop();
                return;
            }
            animId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            
            material.uniforms.time.value = time;
            
            headPoints.rotation.y = Math.sin(time * 0.2) * 0.15;
            headPoints.rotation.x = Math.cos(time * 0.15) * 0.05;

            linesData.forEach((data) => {
                const positions = data.geom.attributes.position.array as Float32Array;
                for (let j = 0; j < 60; j++) {
                    const x = positions[j * 3];
                    const wave = Math.sin(x * data.frequency - time * data.speed * 20 + data.offset);
                    positions[j * 3 + 1] = data.startY + wave * data.amplitude;
                    positions[j * 3 + 2] = data.startZ + Math.cos(x * data.frequency - time * data.speed * 20 + data.offset) * data.amplitude;
                }
                data.geom.attributes.position.needsUpdate = true;
            });

            renderer.render(scene, camera);
        };

        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            linesGroup.children.forEach((c: any) => {
                c.geometry.dispose();
                c.material.dispose();
            });
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] bg-[#030108] border border-cyan-500/20">
            <div ref={containerRef} className="absolute inset-0 pointer-events-none opacity-80"></div>
            <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%] bg-purple-900/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2228%22 height=%2249%22 viewBox=%220 0 28 49%22><g fill=%22%23ffffff%22 fill-opacity=%221%22><polygon points=%2222 14 14 28 6 14%22/><polygon points=%2214 49 6 35 22 35%22/></g></svg>')" }}></div>
        </div>
    )
}

/* ===============================
   About Section
================================ */

const SplitText = ({ text, className = "" }: { text: string, className?: string }) => (
    <span className={className}>
        {text.split(/(\s+)/).map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-pre">
                {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="about-char inline-block">
                        {char}
                    </span>
                ))}
            </span>
        ))}
    </span>
);

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        // Stroke to Fill Text Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        tl.to(".stroke-scanner", { opacity: 1, duration: 0.2 })
          .to(".stroke-fill-text", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power2.inOut" }, "fill")
          .to(".stroke-scanner", { left: "100%", duration: 1.5, ease: "power2.inOut" }, "fill")
          .to(".stroke-scanner", { opacity: 0, duration: 0.3 });

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
            <CircuitBackground id="about" />
            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Heading - Stroke to Fill */}
                <div className="flex justify-center mb-24">
                    <div className="relative inline-block">
                        {/* Outline Text */}
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent"
                            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}
                        >
                            ABOUT ME
                        </h2>
                        
                        {/* Fill Text (Clipped) */}
                        <h2 className="stroke-fill-text absolute top-0 left-0 text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] whitespace-nowrap"
                            style={{ clipPath: 'inset(0 100% 0 0)' }}
                        >
                            ABOUT ME
                        </h2>
                        
                        {/* Scanner Line */}
                        <div className="stroke-scanner absolute top-[-5%] bottom-[-5%] left-0 w-[4px] bg-cyan-300 shadow-[0_0_15px_#67e8f9] opacity-0 rounded-full" />
                    </div>
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
