'use client';
import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface CircuitBackgroundProps {
    id?: string;
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ id = 'default' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
    const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));

    const handleInteraction = useCallback((clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize to -1 to 1
        targetMouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        targetMouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // ── Scene Setup ──
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030305, 0.003); // Deep cyber space fog

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 150;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        // ── Generate Canvas Textures for Code Symbols ──
        // const symbols = ['{', '}', '< / >', '()', '=>', '01', '10', 'const', 'let', '++', '[]', ';', '||', '&&', '!='];
        const symbols = [
            '{', '}', '</>', '()', '=>', '01', '10',
            'const', 'let', 'var', '++', '--',
            '[]', ';', '||', '&&', '!=', '===',

            // Hacking / cyber vibe
            'root@sys', 'sudo', 'chmod', 'ssh', 'nmap',
            '0xFF', '0x00', 'encrypt()', 'decrypt()',
            'access_denied',
            // Node / Express
            'req()', 'exports',
            'app.get()', 'app.post()', 'use()',
            'middleware()', 'req', 'res', 'next()',
            '.env', 'npm',

            // React
            'useEffect()',
            'props', 'state', 'JSX', '<Component />',
            'Context()', 'DOM',

            // FastAPI / backend
            'get()', '@app',
            'async', 'await',

            // Dev + system
            'API', 'REST',
            'HTTP', 'HTTPS', '404', '500',
            'auth', 'token', 'commit',

            // Extra stylish
            '<script>', '</div>', '</html>',
            'function()', 'class {}',
            '>>>', '///', '***'
        ];
        const symbolGroup = new THREE.Group();
        scene.add(symbolGroup);

        const symbolCount = 250;
        const materials: THREE.SpriteMaterial[] = [];

        // Pre-render text onto canvases for performance
        symbols.forEach(symbol => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 256;
            tempCanvas.height = 128;
            const ctx = tempCanvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'transparent';
                ctx.fillRect(0, 0, 256, 128);

                // Color theme: Cyan, Purple, or Blue
                const randColor = Math.random();
                let colorHex = '#22d3ee'; // cyan
                if (randColor > 0.6) colorHex = '#a855f7'; // purple
                else if (randColor > 0.4) colorHex = '#3b82f6'; // blue

                ctx.fillStyle = colorHex;
                ctx.font = 'bold 50px "Courier New", Courier, monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Add soft neon glow
                ctx.shadowColor = colorHex;
                ctx.shadowBlur = 20;

                ctx.fillText(symbol, 128, 64);
            }

            const texture = new THREE.CanvasTexture(tempCanvas);
            texture.minFilter = THREE.LinearFilter;

            materials.push(new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            }));
        });

        // ── Instantiate Sprites ──
        const symbolData: { sprite: THREE.Sprite, speedY: number, speedRot: number, baseX: number, baseY: number, baseZ: number, pulseOffset: number }[] = [];

        for (let i = 0; i < symbolCount; i++) {
            const material = materials[Math.floor(Math.random() * materials.length)].clone();
            const sprite = new THREE.Sprite(material);

            const x = (Math.random() - 0.5) * 500;
            const y = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 300;

            sprite.position.set(x, y, z);

            const scale = Math.random() * 12 + 6; // varying sizes
            sprite.scale.set(scale * 2, scale, 1); // width is 2x height in texture

            symbolGroup.add(sprite);

            symbolData.push({
                sprite,
                speedY: Math.random() * 0.3 + 0.1, // Floating up speed
                speedRot: (Math.random() - 0.5) * 0.02, // Slow rotation
                baseX: x,
                baseY: y,
                baseZ: z,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }

        // ── Mouse Interaction Handlers ──
        const onPointerMove = (e: PointerEvent) => {
            handleInteraction(e.clientX, e.clientY);
        };

        canvas.style.pointerEvents = 'auto';
        container.addEventListener('pointermove', onPointerMove);

        // ── GSAP Entrance Animation ──
        // Animates the entire group of symbols upwards and fades them in like a cinematic reveal
        gsap.fromTo(symbolGroup.position,
            { y: -150 },
            { y: 0, duration: 3, ease: 'power3.out' }
        );
        gsap.fromTo(symbolGroup.rotation,
            { x: 0.3, y: -0.3 },
            { x: 0, y: 0, duration: 4, ease: 'power2.out' }
        );

        // Staggered opacity fade-in
        symbolData.forEach((data, index) => {
            gsap.fromTo(data.sprite.material,
                { opacity: 0 },
                { opacity: Math.random() * 0.6 + 0.2, duration: 2, delay: Math.random() * 1.5, ease: 'power1.inOut' }
            );
        });

        // ── Animation Loop ──
        const clock = new THREE.Clock();
        let animId: number;
        let isVisible = false;

        const visibilityObserver = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0]?.isIntersecting ?? false;
                if (isVisible && !animId) {
                    clock.start();
                    animate();
                }
            },
            { threshold: 0.05 }
        );
        visibilityObserver.observe(container);

        const animate = () => {
            if (!isVisible) {
                animId = 0;
                clock.stop();
                return;
            }
            animId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            // Smooth mouse follow for parallax
            mouseRef.current.lerp(targetMouseRef.current, 0.05);

            // Parallax effect on the whole group based on mouse
            symbolGroup.rotation.y = mouseRef.current.x * 0.15;
            symbolGroup.rotation.x = -mouseRef.current.y * 0.15;

            // Animate individual symbols
            symbolData.forEach((data) => {
                const { sprite, speedY, speedRot, pulseOffset } = data;

                // Matrix-like floating effect
                sprite.position.y += speedY;

                // Gentle sway
                sprite.position.x += Math.sin(elapsed * 0.5 + pulseOffset) * 0.05;

                // Rotate material slightly
                sprite.material.rotation += speedRot;

                // Glowing pulse effect
                const baseOpacity = 0.4;
                sprite.material.opacity = baseOpacity + Math.sin(elapsed * 2 + pulseOffset) * 0.3;

                // Reset position if it floats out of view
                if (sprite.position.y > 250) {
                    sprite.position.y = -250;
                    sprite.position.x = data.baseX; // reset horizontal position
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        // ── Resize Handler ──
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        // ── Cleanup ──
        return () => {
            cancelAnimationFrame(animId);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            container.removeEventListener('pointermove', onPointerMove);

            materials.forEach(mat => {
                if (mat.map) mat.map.dispose();
                mat.dispose();
            });
            renderer.dispose();
        };
    }, [id, handleInteraction]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
            {/* Three.js Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full mix-blend-screen"
                style={{ pointerEvents: 'auto' }}
            />

            {/* Deep Vignette to frame the coding symbols */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,3,5,0.95)_80%)] pointer-events-none" />

            {/* Subtle overlay grid for tech feel */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        </div>
    );
};

export default CircuitBackground;
