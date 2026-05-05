const fs = require('fs');

const file = 'f:/arjun2025-Portfolio/arjunportfolio/app/About.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports
content = content.replace(
`'use client';
import React, { useRef } from 'react';
import { MapPin, Phone, Mail, Network, Database } from 'lucide-react';
import Image from 'next/image';
import CircuitBackground from './components/CircuitBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}`,
`'use client';
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
}`
);

const oldAIBackgroundRegex = /const AIBackground = \(\) => \{[\s\S]*?\n\}\n\n\/\* ===============================\n   About Section/m;

const newAIBackground = `const AIBackground = () => {
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
            vertexShader: \`
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
            \`,
            fragmentShader: \`
                varying vec3 vColor;
                void main() {
                    float d = distance(gl_PointCoord, vec2(0.5));
                    if (d > 0.5) discard;
                    float alpha = smoothstep(0.5, 0.1, d);
                    gl_FragColor = vec4(vColor, alpha * 0.9);
                }
            \`,
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
   About Section`;

content = content.replace(oldAIBackgroundRegex, newAIBackground);

fs.writeFileSync(file, content, 'utf8');
console.log('done');
