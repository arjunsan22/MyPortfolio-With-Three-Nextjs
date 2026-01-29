'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  Menu, X, Code, Database, Cloud, Wrench, Rocket,
  Sparkles, Terminal, Cpu
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import ProjectsSection from './ProjectSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import CodingProfiles from './LeetandGit'
import AboutSection from './About'
import ContactSection from './ContactSection'

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js Background
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating shapes
    const geometries = [
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.3, 0),
      new THREE.IcosahedronGeometry(0.3, 0)
    ];

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x22d3ee : 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shapes.push(mesh);
      scene.add(mesh);
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.001 * (index + 1);
        shape.rotation.y += 0.001 * (index + 1);
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
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
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };


  const projects = [
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
      tech: ['Next.js', 'Tailwind CSS', 'NextAuth.js', 'Razorpay', 'MongoDB Atlas', 'Vercel'],
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
      tech: ['Next.js', 'NextAuth.js', 'Socket.io', 'WebRTC', 'Node.js', 'Express.js', 'MongoDB', 'Vercel', 'Render'],
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-slate-900/60 backdrop-blur-xl z-50 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                <Terminal className="inline-block mr-2 text-cyan-400" size={24} />
                Arjun Anil
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-cyan-500/20 animate-slideDown">
              {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-700 hover:text-cyan-400 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mb-6 animate-fadeIn">
                <Sparkles className="inline-block text-cyan-400 animate-spin-slow" size={40} />
              </div>
              <h1
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              >
                Full-Stack Web Developer
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 animate-fadeIn animation-delay-200">
                Building dynamic and scalable applications with modern web technologies
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeIn animation-delay-400">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=arjunanil2114@gmail.com"
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  <Mail size={20} className="group-hover:animate-bounce" />
                  Get in Touch
                </a>

                <a href="https://github.com/arjunsan22" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/50">
                  <Github size={20} className="group-hover:rotate-12 transition-transform" />
                  GitHub
                </a>
              </div>
              <div className="flex justify-center gap-4 animate-fadeIn animation-delay-600">
                <Cpu className="text-cyan-400 animate-pulse" size={32} />
                <Rocket className="text-blue-400 animate-bounce" size={32} />
                <Code className="text-purple-400 animate-pulse" size={32} />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Education Section */}
        <EducationSection />
        {/*Coding Profiles Section*/}
        <CodingProfiles />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-md">
          <div className="max-w-6xl mx-auto text-center text-slate-400">
            <p className="hover:text-cyan-400 transition-colors">© 2025 <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-text font-semibold animate-glow">
              Arjun Sandhya❤️
            </span>
              . Built with Next.js, Three.js & GSAP </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
