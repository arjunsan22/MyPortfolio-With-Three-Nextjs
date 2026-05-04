'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github, Mail,
  Menu, X, Code, Rocket,
  Sparkles, Terminal, Cpu
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import ProjectsSection from './ProjectSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import AboutSection from './About';
import ContactSection from './ContactSection';
import CodingProfiles from './LeetandGit';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ── SplitChars: renders each character grouped into words to prevent line breaks ── */
function SplitChars({ text, className, charClassName }: { text: string; className?: string; charClassName?: string }) {
  const words = useMemo(() => text.split(' '), [text]);
  
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIdx) => (
        <span 
          key={wordIdx} 
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          className="word-wrapper"
        >
          {word.split('').map((ch, charIdx) => (
            <span
              key={charIdx}
              className={charClassName}
              style={{ display: 'inline-block' }}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
          {/* Add a space after the word if it's not the last one */}
          {wordIdx < words.length - 1 && (
            <span style={{ display: 'inline-block' }} aria-hidden="true">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We keep empty dependency array if we just want it on mount.
    // However, if we don't need scroll listener anymore, we can remove this useEffect completely.
    // The existing code was only used for setting scrollY which we no longer need.
  }, []);

  // Three.js Background (Premium Upgrade)
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.05);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Custom Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0x7000ff);

    for (let i = 0; i < particlesCount * 3; i+=3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i+1] = (Math.random() - 0.5) * 20;
      posArray[i+2] = (Math.random() - 0.5) * 15;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colorsArray[i] = mixedColor.r;
      colorsArray[i+1] = mixedColor.g;
      colorsArray[i+2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating shapes with wireframes and glowing materials
    const geometries = [
      new THREE.IcosahedronGeometry(0.5, 1),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TorusGeometry(0.3, 0.1, 16, 32)
    ];

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhysicalMaterial({
        color: Math.random() > 0.5 ? 0x00f0ff : 0x7000ff,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.15,
        wireframe: Math.random() > 0.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00f0ff, 2, 20);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      
      // Smooth camera movement
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 * (index + 1);
        shape.rotation.y += 0.002 * (index + 1);
        shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.002;
        shape.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    // Nav animation
    tl.from("nav", {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    });

    // Hero sparkle
    tl.from(".hero-sparkle", {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.8");

    /* ──────────────────────────────────────────────
     *  SPLIT TEXT — Heading
     *  Each character starts clipped (invisible),
     *  then the clip-path opens vertically from
     *  center outward while the char slides up with
     *  3D rotation — replicating the "Split Second" look.
     * ────────────────────────────────────────────── */
    const titleChars = containerRef.current?.querySelectorAll('.hero-title-char');
    if (titleChars && titleChars.length) {
      // Initial state
      gsap.set(titleChars, {
        opacity: 0,
        y: 80,
        rotationX: -90,
        scaleY: 0,
        transformOrigin: '50% 100%',
        clipPath: 'inset(100% 0% 0% 0%)',
      });

      tl.to(titleChars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scaleY: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        stagger: {
          each: 0.04,
          from: 'center',
        },
        ease: 'expo.out',
      }, '-=0.6');

      // Secondary shimmer sweep — a subtle brightness pulse
      tl.fromTo(titleChars, {
        filter: 'brightness(1)',
      }, {
        filter: 'brightness(1.8)',
        duration: 0.3,
        stagger: { each: 0.025, from: 'start' },
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      }, '-=0.5');
    }

    /* ──────────────────────────────────────────────
     *  MOTION TYPOGRAPHY — Subtitle
     *  Each character enters from a random offset,
     *  rotation, and scale — the "MOTION" look.
     * ────────────────────────────────────────────── */
    const subtitleChars = containerRef.current?.querySelectorAll('.hero-sub-char');
    if (subtitleChars && subtitleChars.length) {
      // Randomised initial state for each char
      subtitleChars.forEach((ch) => {
        gsap.set(ch, {
          opacity: 0,
          y: gsap.utils.random(-120, 120),
          x: gsap.utils.random(-40, 40),
          rotation: gsap.utils.random(-90, 90),
          scale: gsap.utils.random(0, 2.5),
          transformOrigin: '50% 50%',
        });
      });

      tl.to(subtitleChars, {
        opacity: 1,
        y: 0,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.4,
        stagger: {
          each: 0.02,
          from: 'random',
        },
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.8');
    }

    // Buttons
    tl.from(".hero-btn", {
      scale: 0.8,
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.5)"
    }, "-=0.6")
    .from(".hero-icon", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(2)"
    }, "-=0.4");

    // Scroll Animations
    gsap.to(".hero-wrapper", {
      yPercent: 40,
      opacity: 0,
      filter: "blur(15px)",
      scale: 0.95,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });
    
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030305] text-slate-200 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80 mix-blend-screen" />
      
      {/* Decorative ambient gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none z-0"></div>
      
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-[#030305]/40 backdrop-blur-2xl z-50 border-b border-white/5 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="text-2xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer">
                <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <Terminal className="text-white" size={24} />
                </div>
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent group-hover:text-cyan-400 transition-colors duration-300">
                  Arjun Anil
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-2">
                {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/5 text-slate-300 hover:text-cyan-400 transition-all duration-300 relative group overflow-hidden"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></span>
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} className="text-cyan-400" /> : <Menu size={20} className="text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden absolute top-full left-0 w-full bg-[#030305]/95 backdrop-blur-3xl border-b border-white/10 transition-all duration-500 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
            <div className="px-4 py-6 flex flex-col gap-2">
              {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left px-6 py-4 rounded-xl hover:bg-white/5 hover:text-cyan-400 transition-all duration-300 border border-transparent hover:border-white/5 text-lg font-medium flex items-center gap-4 group"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section min-h-[100svh] pt-32 pb-20 px-4 relative flex items-center justify-center">
          <div className="hero-wrapper max-w-6xl mx-auto w-full relative z-10">
            <div className="text-center flex flex-col items-center">
              <div className="hero-sparkle mb-8 inline-flex items-center justify-center p-4 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 backdrop-blur-md shadow-2xl shadow-cyan-500/20">
                <Sparkles className="text-cyan-400" size={32} />
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 flex flex-wrap justify-center gap-x-[0.3em] gap-y-2" style={{ perspective: "1000px" }}>
                <SplitChars
                  text="Full-Stack"
                  className="hero-title-word inline-block bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
                  charClassName="hero-title-char"
                />
                <SplitChars
                  text="Web"
                  className="hero-title-word inline-block bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  charClassName="hero-title-char"
                />
                <SplitChars
                  text="Developer"
                  className="hero-title-word inline-block bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
                  charClassName="hero-title-char"
                />
              </h1>
              
              <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-slate-400 font-light max-w-3xl mb-12 leading-relaxed" style={{ perspective: '800px' }}>
                <SplitChars text="Building " charClassName="hero-sub-char" />
                <SplitChars text="dynamic" className="text-cyan-400 font-medium" charClassName="hero-sub-char hero-sub-char--accent-cyan" />
                <SplitChars text=" and " charClassName="hero-sub-char" />
                <SplitChars text="scalable" className="text-purple-400 font-medium" charClassName="hero-sub-char hero-sub-char--accent-purple" />
                <SplitChars text=" applications with modern web technologies" charClassName="hero-sub-char" />
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 w-full sm:w-auto">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=arjunanil2114@gmail.com"
                  className="hero-btn relative group overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <Mail size={22} className="relative z-10 group-hover:animate-bounce group-hover:text-white transition-colors" />
                  <span className="relative z-10 group-hover:text-white transition-colors">Get in Touch</span>
                </a>

                <a 
                  href="https://github.com/arjunsan22" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hero-btn relative group overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-white font-bold rounded-full border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/5"
                >
                  <Github size={22} className="group-hover:rotate-12 transition-transform text-slate-300 group-hover:text-white" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">GitHub</span>
                  <div className="absolute inset-0 rounded-full border border-cyan-500/0 group-hover:border-cyan-500/50 transition-colors duration-500 blur-sm"></div>
                </a>
              </div>
              
              <div className="flex justify-center gap-6 sm:gap-8 items-center bg-white/5 p-4 sm:p-6 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                <div className="hero-icon p-4 bg-cyan-500/10 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)] border border-cyan-500/20 group hover:bg-cyan-500/20 transition-colors">
                  <Cpu className="text-cyan-400 group-hover:scale-110 transition-transform" size={32} />
                </div>
                <div className="hero-icon p-4 bg-blue-500/10 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)] border border-blue-500/20 group hover:bg-blue-500/20 transition-colors">
                  <Rocket className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                </div>
                <div className="hero-icon p-4 bg-purple-500/10 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-purple-500/20 group hover:bg-purple-500/20 transition-colors">
                  <Code className="text-purple-400 group-hover:scale-110 transition-transform" size={32} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity animate-bounce">
            <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-400 to-transparent"></div>
          </div>
        </section>

        {/* Existing Sections with premium backdrop */}
        <div className="relative z-20 bg-[#030305]/80 backdrop-blur-3xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <CodingProfiles/>
          <ContactSection />
        </div>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10 bg-[#020202] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          <div className="max-w-6xl mx-auto text-center text-slate-500 relative z-10 flex flex-col items-center gap-6">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 inline-block group hover:bg-white/10 transition-colors cursor-pointer">
               <Terminal className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors" size={24} />
            </div>
            <p className="text-sm font-medium tracking-wide">
              © {new Date().getFullYear()} <span className="text-white hover:text-cyan-400 transition-colors px-1 cursor-pointer">Arjun Sandhya</span>
            </p>
            <p className="text-xs tracking-widest uppercase opacity-50 flex flex-wrap items-center gap-2 justify-center">
              Built with <span className="text-white font-bold">Next.js</span> <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> <span className="text-cyan-400 font-bold">Three.js</span> <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> <span className="text-purple-400 font-bold">GSAP</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
