'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  Menu, X, Code, Database, Cloud, Wrench, Rocket,
  Sparkles, Terminal, Cpu
} from 'lucide-react';
import * as THREE from 'three';

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


  const skills = {
    languages: [
      { name: 'JavaScript', icon: '🟨' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'C', icon: '⚙️' },
      { name: 'Java', icon: '☕' }
    ],
    frameworks: [
      { name: 'Next.js', icon: '⚡' },
      { name: 'React.js', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '🚂' },
      { name: 'Socket.io', icon: '🔌' },
      { name: 'Firebase', icon: '🔥' }
    ],
    databases: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'SQL', icon: '📊' },
      { name: 'Firebase Firestore', icon: '☁️' },
      { name: 'Redis', icon: '🔴' }
    ],
    devops: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Cloudinary', icon: '☁️' },
      { name: 'Google Cloud Platform', icon: '🌐' },
      { name: 'Render', icon: '🚀' },
      { name: 'Vercel', icon: '▲' }
    ],
    frontend: [
      { name: 'HTML', icon: '🌐' },
      { name: 'CSS', icon: '🎨' },
      { name: 'Bootstrap', icon: '🅱️' },
      { name: 'Tailwind', icon: '💨' },
      { name: 'EJS', icon: '📄' },
      { name: 'Three.js', icon: '🎮' }
    ],
    tools: [
      { name: 'Git', icon: '📦' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'VS Code', icon: '💻' },
      { name: 'Postman', icon: '📮' },
      { name: 'Figma', icon: '🎨' }
    ]
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
        <section id="about" className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I'm a passionate Full-Stack Web Developer with hands-on experience in building dynamic and scalable applications. 
                I specialize in the MERN stack and Next.js ecosystem, creating responsive UIs and robust RESTful APIs.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                With a strong foundation in Data Structures and Algorithms, I focus on problem-solving and performance optimization. 
                I'm continuously learning and exploring advanced technologies to create user-focused solutions.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <MapPin size={20} className="text-cyan-400 group-hover:animate-bounce" />
                  Kottayam, Kerala, India
                </div>
                <div className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <Phone size={20} className="text-cyan-400 group-hover:animate-pulse" />
                  +91 8590924584
                </div>
                <div className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors group">
                  <Mail size={20} className="text-cyan-400 group-hover:animate-bounce" />
                  arjunanil2114@gmail.com
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 group">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="text-cyan-400 group-hover:animate-spin" size={24} />
                  <h3 className="text-xl font-semibold">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-700/70 hover:bg-cyan-500/20 rounded-full text-sm transition-all duration-300 hover:scale-110 cursor-pointer border border-cyan-500/20">
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 hover:border-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 group">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="text-blue-400 group-hover:animate-bounce" size={24} />
                  <h3 className="text-xl font-semibold">Frameworks</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((skill) => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-700/70 hover:bg-blue-500/20 rounded-full text-sm transition-all duration-300 hover:scale-110 cursor-pointer border border-blue-500/20">
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="text-purple-400 group-hover:animate-pulse" size={24} />
                  <h3 className="text-xl font-semibold">Databases</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((skill) => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-700/70 hover:bg-purple-500/20 rounded-full text-sm transition-all duration-300 hover:scale-110 cursor-pointer border border-purple-500/20">
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 group">
                <div className="flex items-center gap-3 mb-4">
                  <Cloud className="text-cyan-400 group-hover:animate-bounce" size={24} />
                  <h3 className="text-xl font-semibold">DevOps & Cloud</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.devops.map((skill) => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-700/70 hover:bg-cyan-500/20 rounded-full text-sm transition-all duration-300 hover:scale-110 cursor-pointer border border-cyan-500/20">
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 hover:border-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 group">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-blue-400 group-hover:animate-spin" size={24} />
                  <h3 className="text-xl font-semibold">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-700/70 hover:bg-blue-500/20 rounded-full text-sm transition-all duration-300 hover:scale-110 cursor-pointer border border-blue-500/20">
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="text-purple-400 group-hover:animate-spin" size={24} />
                  <h3 className="text-xl font-semibold">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-700/70 hover:bg-purple-500/20 rounded-full text-sm transition-all duration-300 hover:scale-110 cursor-pointer border border-purple-500/20">
                      {skill.icon} {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-md rounded-xl p-8 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 group">
                  <div className="text-5xl mb-4 group-hover:animate-bounce">{project.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-cyan-400">Key Features:</h4>
                    <ul className="space-y-1 text-slate-300">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 hover:text-cyan-400 transition-colors">
                          <span className="text-cyan-400 mt-1">✨</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-700/70 hover:bg-cyan-500/20 rounded text-xs text-cyan-400 border border-cyan-500/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 group"
                  >
                    <ExternalLink size={18} className="group-hover:rotate-45 transition-transform" />
                    View Live Project
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Education & Certifications
            </h2>
            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 group">
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:animate-bounce">🎓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">Diploma in Computer Engineering</h3>
                    <p className="text-cyan-400 mb-2">Government Polytechnic College Pala, Kottayam</p>
                    <p className="text-slate-300">2024 </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 hover:border-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 group">
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:animate-bounce">📚</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Higher Secondary – Computer Science</h3>
                    <p className="text-blue-400 mb-2">St. Mary's HSS Manarcadu, Kottayam</p>
                    <p className="text-slate-300">2022</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">🏆</span>
                  Certifications
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
                    <span className="text-cyan-400">✓</span>
                    MERN Stack Development Course (Ongoing)
                  </li>
                  <li className="flex items-start gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
                    <span className="text-cyan-400">✓</span>
                    Docker Certification – Udemy
                  </li>
                  <li className="flex items-start gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
                    <span className="text-cyan-400">✓</span>
                    Python Django Internship (1 Month)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              I'm always open to discussing new projects and opportunities
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:arjunanil2114@gmail.com"
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <Mail size={20} className="group-hover:animate-bounce" />
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/arjun-anil-8707572b1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <Linkedin size={20} className="group-hover:animate-pulse" />
                LinkedIn
              </a>
              <a
                href="https://github.com/arjunsan22"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/50"
              >
                <Github size={20} className="group-hover:rotate-12 transition-transform" />
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-md">
          <div className="max-w-6xl mx-auto text-center text-slate-400">
            <p className="hover:text-cyan-400 transition-colors">© 2025 <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-text font-semibold animate-glow">
  Arjun Sandhya❤️
</span>
. Built with Next.js & Three.js </p>
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
