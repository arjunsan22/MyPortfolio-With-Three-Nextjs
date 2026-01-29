'use client'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import React, { useRef } from 'react';
import Image from 'next/image';
import avatar from './avatar.png'

// --- Typewriter Helper Component ---
const TypewriterText = ({ text, className, delay = 0 }) => {
    // Split text into characters
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            display: "inline",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            display: "none",
        },
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {letters.map((char, index) => (
                <motion.span variants={child} key={index}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const AboutSection = () => {
    const cardRef = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);
    const spotlightGlow = useMotionTemplate`radial-gradient(600px circle at ${glowX}px ${glowY}px, rgba(6,182,212,0.15), transparent 80%)`;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
        glowX.set(e.clientX - rect.left);
        glowY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const titleText = "About Me";

    return (
        <section id="about" className="py-24 px-4 bg-slate-800/30 backdrop-blur-sm overflow-hidden" style={{ perspective: "1200px" }}>
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-20">
                    <motion.h2 className="text-6xl md:text-7xl font-black flex justify-center gap-[2px] tracking-tighter">
                        {titleText.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: 80, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04, type: "spring", stiffness: 100, damping: 12 }}
                                className="bg-gradient-to-b from-cyan-300 to-blue-600 bg-clip-text text-transparent inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-[2px] w-40 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4"
                    />
                </div>

                {/* 3D Kinetic Card */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 shadow-2xl overflow-hidden"
                >
                    <motion.div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-0" style={{ background: spotlightGlow }} />

                    <div className="relative z-10 p-8 md:p-16">
                        <div className="flex flex-col md:flex-row items-center gap-12">

                            {/* LEFT SIDE: Text Content with Typewriter Effect */}
                            <div style={{ transform: "translateZ(60px)" }} className="flex-1 order-2 md:order-1">
                                <div className="space-y-6 mb-10">
                                    <div className="text-2xl md:text-3xl text-slate-100 leading-snug font-medium">
                                        <TypewriterText text="I'm a passionate " />
                                        <TypewriterText text="Full-Stack Web Developer " className="text-cyan-400" delay={0.5} />
                                        <TypewriterText text="with hands-on experience in building dynamic and scalable applications. I specialize in the " delay={1.2} />
                                        <TypewriterText text="MERN stack " className="text-blue-400 font-bold" delay={3.2} />
                                        <TypewriterText text="and " delay={3.5} />
                                        <TypewriterText text="Next.js." className="text-blue-400 font-bold" delay={3.7} />
                                    </div>

                                    {/* Secondary Text */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 4.5, duration: 1 }}
                                        className="text-lg md:text-xl text-slate-400 leading-relaxed font-light italic"
                                    >
                                        𝖶𝗂𝗍𝗁 𝖺 𝗌𝗍𝗋𝗈𝗇𝗀 𝖿𝗈𝗎𝗇𝖽𝖺𝗍𝗂𝗈𝗇 𝗂𝗇 <span className="text-slate-200 not-italic font-semibold">𝖣𝖺𝗍𝖺 𝖲𝗍𝗋𝗎𝖼𝗍𝗎𝗋𝖾𝗌 𝖺𝗇𝖽 𝖠𝗅𝗀𝗈𝗋𝗂𝗍𝗁𝗆𝗌</span>, 𝖨 𝖿𝗈𝖼𝗎𝗌 𝗈𝗇 𝗉𝗋𝗈𝖻𝗅𝖾𝗆-𝗌𝗈𝗅𝗏𝗂𝗇𝗀 𝖺𝗇𝖽 𝗉𝖾𝗋𝖿𝗈𝗋𝗆𝖺𝗇𝖼𝖾 𝗈𝗉𝗍𝗂𝗆𝗂𝗓𝖺𝗍𝗂𝗈𝗇 𝗍𝗈 𝖼𝗋𝖾𝖺𝗍𝖾 𝗎𝗌𝖾𝗋-𝖿𝗈𝖼𝗎𝗌𝖾𝖽 𝗌𝗈𝗅𝗎𝗍𝗂𝗈𝗇𝗌.
                                    </motion.p>
                                </div>
                                {/* Contact Pills */}
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { icon: MapPin, text: "Kottayam, Kerala, India" },
                                        { icon: Phone, text: "+91 8590924584" },
                                        { icon: Mail, text: "arjunanil2114@gmail.com" }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            style={{ transform: "translateZ(90px)" }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 5 + (idx * 0.1) }}
                                            className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-colors group cursor-pointer"
                                        >
                                            <item.icon size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-slate-300 text-sm font-medium group-hover:text-white">{item.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT SIDE: Profile Image */}
                            <motion.div
                                style={{ transform: "translateZ(100px)", transformStyle: "preserve-3d" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="relative order-1 md:order-2 flex-shrink-0"
                            >
                                <div className="absolute inset-[-15px] rounded-full border border-cyan-500/20 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-[-15px] rounded-full border-t-2 border-cyan-500/40 animate-[spin_6s_linear_infinite]" />

                                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-cyan-500/30 bg-slate-900 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                                    <Image src={avatar} alt="Arjun Anil Profile" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;