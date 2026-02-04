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
        gsap.fromTo(".contact-title-char",
            {
                opacity: 0,
                y: 20,
                filter: "blur(6px)"
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.04,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );


        gsap.fromTo(".contact-text-char",
            {
                opacity: 0,
                y: 15,
                filter: "blur(4px)"
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.015,
                duration: 0.5,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );

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
            className="py-24 px-4 bg-slate-950 relative overflow-hidden"
        >
            {/* Background Decor (same vibe as CodingProfiles) */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h2
                    className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent"
                >
                    Let's Connect
                </h2>

                <p className="text-xl text-slate-400 mb-12">
                    {"I'm always open to discussing new projects and opportunities"
                        .split("")
                        .map((char, i) => (
                            <span key={i} className="contact-text-char inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                </p>


                <div className="flex flex-wrap justify-center gap-6">
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