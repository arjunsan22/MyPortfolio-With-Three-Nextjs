import React, { useRef } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register outside or inside an effect to prevent SSR issues
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".contact-reveal", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            }
        });
        // Motion Split Text Animation for Title
        const topHalves = document.querySelectorAll('.motion-top');
        const bottomHalves = document.querySelectorAll('.motion-bottom');

        gsap.set(topHalves, { yPercent: -100, opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)' });
        gsap.set(bottomHalves, { yPercent: 100, opacity: 0, clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)' });

        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        titleTl.to(topHalves, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05
        }, 0)
        .to(bottomHalves, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05
        }, 0.1);

        // Hover Glitch Effect for Title
        const titleContainers = document.querySelectorAll('.contact-motion-char');
        titleContainers.forEach(container => {
            container.addEventListener('mouseenter', () => {
                const top = container.querySelector('.motion-top');
                const bottom = container.querySelector('.motion-bottom');
                gsap.to(top, { x: -4, duration: 0.1, yoyo: true, repeat: 3 });
                gsap.to(bottom, { x: 4, duration: 0.1, yoyo: true, repeat: 3 });
            });
        });

        // Neon Electric Flicker for Contact Subtitle
        const textChars = document.querySelectorAll('.contact-text-char');
        gsap.set(textChars, { opacity: 0 });

        const neonTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });

        const colors = ["#a855f7", "#06b6d4", "#3b82f6", "#10b981"]; // Purple, Cyan, Blue, Emerald

        // Animate Subtitle Text
        textChars.forEach((char, i) => {
            const glowColor = colors[(i + 2) % colors.length];
            const intenseGlow = `0 0 5px #fff, 0 0 10px ${glowColor}, 0 0 20px ${glowColor}`;
            const subtleGlow = `0 0 2px ${glowColor}, 0 0 5px ${glowColor}`;

            neonTl.to(char, {
                keyframes: [
                    { opacity: 1, textShadow: intenseGlow, duration: 0.03 },
                    { opacity: Math.random() * 0.3, textShadow: "none", duration: 0.03 + Math.random() * 0.03 },
                    { opacity: 1, textShadow: intenseGlow, duration: 0.03 },
                    { opacity: Math.random() * 0.2, textShadow: "none", duration: 0.03 },
                    { opacity: 1, textShadow: subtleGlow, duration: 0.1 }
                ],
                ease: "none",
            }, 0.5 + i * 0.02); 
        });
        
        // Occasional Random Flickers
        const triggerRandomFlicker = () => {
            if (!textChars.length) return;
            const randomChar = textChars[Math.floor(Math.random() * textChars.length)];
            const glowColor = colors[Math.floor(Math.random() * colors.length)];
            const intenseGlow = `0 0 5px #fff, 0 0 10px ${glowColor}, 0 0 20px ${glowColor}`;
            const subtleGlow = `0 0 2px ${glowColor}, 0 0 5px ${glowColor}`;

            gsap.to(randomChar, {
                keyframes: [
                    { opacity: 0.4, textShadow: "none", duration: 0.05 },
                    { opacity: 1, textShadow: intenseGlow, duration: 0.05 },
                    { opacity: 0.7, textShadow: "none", duration: 0.05 },
                    { opacity: 1, textShadow: subtleGlow, duration: 0.1 }
                ],
                delay: 1 + Math.random() * 4,
                onComplete: triggerRandomFlicker
            });
        };

        neonTl.call(triggerRandomFlicker, [], "+=0.5");

        const cards = gsap.utils.toArray<HTMLElement>(".magnetic-button");

        const listeners: Array<{
            card: HTMLElement;
            move: (e: MouseEvent) => void;
            reset: () => void;
        }> = [];

        cards.forEach((card) => {
            const moveCard = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(card, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.5,
                    ease: "power2.out"
                });
            };

            const resetCard = () => {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)"
                });
            };

            card.addEventListener("mousemove", moveCard);
            card.addEventListener("mouseleave", resetCard);

            listeners.push({ card, move: moveCard, reset: resetCard });
        });

        // ✅ Proper cleanup
        return () => {
            listeners.forEach(({ card, move, reset }) => {
                card.removeEventListener("mousemove", move);
                card.removeEventListener("mouseleave", reset);
            });
        };
    }, { scope: containerRef });

    const links = [
        {
            name: "Email Me",
            url: "mailto:arjunanil2114@gmail.com",
            icon: <Mail size={20} />,
            color: "bg-cyan-500",
            shadow: "shadow-cyan-500/50",
            hover: "hover:bg-cyan-600"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/arjun-anil-8707572b1",
            icon: <Linkedin size={20} />,
            color: "bg-blue-600",
            shadow: "shadow-blue-500/50",
            hover: "hover:bg-blue-700"
        },
        {
            name: "GitHub",
            url: "https://github.com/arjunsan22",
            icon: <Github size={20} />,
            color: "bg-slate-700",
            shadow: "shadow-slate-500/50",
            hover: "hover:bg-slate-600"
        }
    ];

    return (
        <section
            id="contact"
            ref={containerRef}
            className="py-32 px-4 bg-[#050505] relative overflow-hidden min-h-screen flex flex-col justify-center border-t border-white/5"
        >
            {/* Premium Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-12 contact-reveal">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-white text-sm font-bold tracking-widest uppercase">Available for Work</span>
                </div>

                <h2
                    className="text-6xl md:text-8xl lg:text-[8rem] font-black mb-10 text-white flex justify-center gap-x-6 flex-wrap uppercase tracking-tighter"
                    style={{ lineHeight: 1.1 }}
                >
                    {"Let's Connect".toUpperCase().split(" ").map((word, wordIndex) => (
                        <span key={wordIndex} className="inline-flex">
                            {word.split("").map((char, i) => {
                                // Specific logic for colored letters like the image
                                const isO = char === 'O'; 
                                const isE = char === 'E';
                                return (
                                    <span key={i} className="relative inline-block contact-motion-char cursor-pointer">
                                        <span className="absolute top-0 left-0 motion-top text-white">
                                            {char}
                                        </span>
                                        <span className={`absolute top-0 left-0 motion-bottom ${isO ? 'text-red-500' : isE ? 'text-cyan-500' : 'text-white'}`}>
                                            {char}
                                        </span>
                                        {/* Invisible placeholder to maintain width */}
                                        <span className="opacity-0">{char}</span>
                                    </span>
                                );
                            })}
                        </span>
                    ))}
                </h2>

                <p className="text-xl md:text-2xl text-slate-300 font-medium mb-16 flex flex-wrap justify-center leading-relaxed">
                    {"I'm always open to discussing new projects and opportunities"
                        .split(" ")
                        .map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex mr-2 mb-1">
                                {word.split("").map((char, i) => (
                                    <span key={i} className="contact-text-char inline-block opacity-0">
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                </p>


                <div className="flex flex-wrap justify-center gap-6 contact-reveal">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target={link.name !== "Email Me" ? "_blank" : undefined}
                            rel={link.name !== "Email Me" ? "noopener noreferrer" : undefined}
                            className={`magnetic-button group flex items-center gap-2 px-8 py-4 ${link.color} ${link.hover} rounded-xl transition-all duration-300 hover:shadow-lg ${link.shadow} text-white font-semibold`}
                        >
                            <span className="group-hover:animate-bounce">
                                {link.icon}
                            </span>
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default ContactSection;