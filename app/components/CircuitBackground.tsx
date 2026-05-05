'use client';
import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface CircuitBackgroundProps {
    id?: string;
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ id = 'default' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(9999, 9999));
    const touchActiveRef = useRef(false);
    const patternId = `circuit-pattern-${id}`;

    const handleInteraction = useCallback((clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize to -1 to 1
        mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // ── Scene Setup ──
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            -width / 2, width / 2,
            height / 2, -height / 2,
            0.1, 1000
        );
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        // ── Circuit Node Particles ──
        const nodeCount = 120;
        const nodeGeometry = new THREE.BufferGeometry();
        const nodePositions = new Float32Array(nodeCount * 3);
        const nodeSizes = new Float32Array(nodeCount);
        const nodeColors = new Float32Array(nodeCount * 3);
        const nodeVelocities: THREE.Vector2[] = [];
        const nodeBasePositions: THREE.Vector2[] = [];

        const colors = [
            new THREE.Color(0x22d3ee), // cyan
            new THREE.Color(0xa855f7), // purple
            new THREE.Color(0x3b82f6), // blue
            new THREE.Color(0xec4899), // pink
            new THREE.Color(0x10b981), // emerald
        ];

        for (let i = 0; i < nodeCount; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = (Math.random() - 0.5) * height;
            nodePositions[i * 3] = x;
            nodePositions[i * 3 + 1] = y;
            nodePositions[i * 3 + 2] = 0;

            nodeSizes[i] = Math.random() * 3 + 1.5;

            const color = colors[Math.floor(Math.random() * colors.length)];
            nodeColors[i * 3] = color.r;
            nodeColors[i * 3 + 1] = color.g;
            nodeColors[i * 3 + 2] = color.b;

            nodeVelocities.push(new THREE.Vector2(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3
            ));
            nodeBasePositions.push(new THREE.Vector2(x, y));
        }

        nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        nodeGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));
        nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

        const nodeShaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vAlpha;
                uniform float uTime;
                uniform float uPixelRatio;

                void main() {
                    vColor = color;
                    float pulse = sin(uTime * 2.0 + position.x * 0.01 + position.y * 0.01) * 0.5 + 0.5;
                    vAlpha = 0.4 + pulse * 0.6;

                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * uPixelRatio * (1.0 + pulse * 0.5);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;

                    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
                    float core = 1.0 - smoothstep(0.0, 0.15, dist);

                    vec3 finalColor = vColor * glow + vec3(1.0) * core * 0.5;
                    float alpha = glow * vAlpha;

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const nodePoints = new THREE.Points(nodeGeometry, nodeShaderMaterial);
        scene.add(nodePoints);

        // ── Circuit Trace Lines ──
        const lineCount = 60;
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x22d3ee,
            transparent: true,
            opacity: 0.06,
            blending: THREE.AdditiveBlending,
        });

        const lineGroup = new THREE.Group();
        scene.add(lineGroup);

        // Create static circuit-style paths
        for (let i = 0; i < lineCount; i++) {
            const points: THREE.Vector3[] = [];
            let x = (Math.random() - 0.5) * width;
            let y = (Math.random() - 0.5) * height;
            const segments = Math.floor(Math.random() * 4) + 2;

            points.push(new THREE.Vector3(x, y, 0));

            for (let s = 0; s < segments; s++) {
                // Circuit-style: only horizontal or vertical movements
                if (Math.random() > 0.5) {
                    x += (Math.random() - 0.5) * 200;
                } else {
                    y += (Math.random() - 0.5) * 200;
                }
                points.push(new THREE.Vector3(x, y, 0));
            }

            const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
            const lineMat = new THREE.LineBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.04 + Math.random() * 0.04,
                blending: THREE.AdditiveBlending,
            });
            const line = new THREE.Line(lineGeom, lineMat);
            lineGroup.add(line);
        }

        // ── Electron Particles (moving along paths) ──
        const electronCount = 30;
        const electronGeometry = new THREE.BufferGeometry();
        const electronPositions = new Float32Array(electronCount * 3);
        const electronSizes = new Float32Array(electronCount);
        const electronColors = new Float32Array(electronCount * 3);

        interface ElectronData {
            speed: number;
            progress: number;
            pathPoints: THREE.Vector3[];
        }
        const electronData: ElectronData[] = [];

        for (let i = 0; i < electronCount; i++) {
            // Generate a random circuit path for each electron
            const pts: THREE.Vector3[] = [];
            let ex = (Math.random() - 0.5) * width;
            let ey = (Math.random() - 0.5) * height;
            pts.push(new THREE.Vector3(ex, ey, 0));
            const segs = Math.floor(Math.random() * 5) + 3;
            for (let s = 0; s < segs; s++) {
                if (Math.random() > 0.5) {
                    ex += (Math.random() - 0.5) * 300;
                } else {
                    ey += (Math.random() - 0.5) * 300;
                }
                pts.push(new THREE.Vector3(ex, ey, 0));
            }

            electronPositions[i * 3] = pts[0].x;
            electronPositions[i * 3 + 1] = pts[0].y;
            electronPositions[i * 3 + 2] = 0;

            electronSizes[i] = Math.random() * 4 + 3;

            const col = colors[Math.floor(Math.random() * colors.length)];
            electronColors[i * 3] = col.r;
            electronColors[i * 3 + 1] = col.g;
            electronColors[i * 3 + 2] = col.b;

            electronData.push({
                speed: 0.002 + Math.random() * 0.004,
                progress: Math.random(),
                pathPoints: pts,
            });
        }

        electronGeometry.setAttribute('position', new THREE.BufferAttribute(electronPositions, 3));
        electronGeometry.setAttribute('size', new THREE.BufferAttribute(electronSizes, 1));
        electronGeometry.setAttribute('color', new THREE.BufferAttribute(electronColors, 3));

        const electronMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float uPixelRatio;

                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * uPixelRatio;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;

                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;

                    float glow = exp(-dist * 6.0);
                    float core = exp(-dist * 20.0);

                    vec3 finalColor = vColor * glow * 2.0 + vec3(1.0) * core;
                    float alpha = glow;

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const electronPoints = new THREE.Points(electronGeometry, electronMaterial);
        scene.add(electronPoints);

        // ── Touch/Mouse Ripple Rings ──
        interface Ripple {
            mesh: THREE.Mesh;
            birth: number;
            maxRadius: number;
            speed: number;
        }
        const ripples: Ripple[] = [];

        const createRipple = (worldX: number, worldY: number) => {
            const ringGeom = new THREE.RingGeometry(0.5, 2, 64);
            const ringMat = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
            });
            const ring = new THREE.Mesh(ringGeom, ringMat);
            ring.position.set(worldX, worldY, 0);
            scene.add(ring);

            ripples.push({
                mesh: ring,
                birth: performance.now(),
                maxRadius: 80 + Math.random() * 60,
                speed: 0.8 + Math.random() * 0.5,
            });
        };

        // ── Mouse/Touch Interaction Handlers ──
        let lastRippleTime = 0;

        const onPointerMove = (e: PointerEvent) => {
            handleInteraction(e.clientX, e.clientY);
            touchActiveRef.current = true;

            // Spawn ripple on movement every 400ms
            const now = performance.now();
            if (now - lastRippleTime > 400) {
                const rect = container.getBoundingClientRect();
                const worldX = (e.clientX - rect.left - rect.width / 2);
                const worldY = -(e.clientY - rect.top - rect.height / 2);
                createRipple(worldX, worldY);
                lastRippleTime = now;
            }
        };

        const onPointerLeave = () => {
            mouseRef.current.set(9999, 9999);
            touchActiveRef.current = false;
        };

        const onClick = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const worldX = (e.clientX - rect.left - rect.width / 2);
            const worldY = -(e.clientY - rect.top - rect.height / 2);
            // Burst of ripples on click
            for (let r = 0; r < 3; r++) {
                setTimeout(() => createRipple(
                    worldX + (Math.random() - 0.5) * 30,
                    worldY + (Math.random() - 0.5) * 30
                ), r * 80);
            }
        };

        // Allow pointer events on the canvas for interaction
        canvas.style.pointerEvents = 'auto';
        container.addEventListener('pointermove', onPointerMove);
        container.addEventListener('pointerleave', onPointerLeave);
        container.addEventListener('click', onClick);

        // Touch events
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
                touchActiveRef.current = true;

                const now = performance.now();
                if (now - lastRippleTime > 300) {
                    const rect = container.getBoundingClientRect();
                    const worldX = (e.touches[0].clientX - rect.left - rect.width / 2);
                    const worldY = -(e.touches[0].clientY - rect.top - rect.height / 2);
                    createRipple(worldX, worldY);
                    lastRippleTime = now;
                }
            }
        };

        const onTouchEnd = () => {
            mouseRef.current.set(9999, 9999);
            touchActiveRef.current = false;
        };

        container.addEventListener('touchmove', onTouchMove, { passive: true });
        container.addEventListener('touchend', onTouchEnd);

        // ── Visibility-based Animation Loop ──
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
            const now = performance.now();

            // Update shader time
            nodeShaderMaterial.uniforms.uTime.value = elapsed;
            electronMaterial.uniforms.uTime.value = elapsed;

            // ── Move Nodes with mouse interaction ──
            const positions = nodeGeometry.attributes.position.array as Float32Array;
            const mouseWorldX = mouseRef.current.x * width / 2;
            const mouseWorldY = mouseRef.current.y * height / 2;
            const interactionRadius = 150;
            const repelStrength = 3.0;

            for (let i = 0; i < nodeCount; i++) {
                const ix = i * 3;
                const iy = i * 3 + 1;

                // Subtle drift
                positions[ix] += nodeVelocities[i].x;
                positions[iy] += nodeVelocities[i].y;

                // Mouse repulsion / attraction
                if (touchActiveRef.current) {
                    const dx = positions[ix] - mouseWorldX;
                    const dy = positions[iy] - mouseWorldY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < interactionRadius && dist > 0.1) {
                        const force = (1 - dist / interactionRadius) * repelStrength;
                        positions[ix] += (dx / dist) * force;
                        positions[iy] += (dy / dist) * force;
                    }
                }

                // Gentle return to base
                const baseX = nodeBasePositions[i].x;
                const baseY = nodeBasePositions[i].y;
                positions[ix] += (baseX - positions[ix]) * 0.002;
                positions[iy] += (baseY - positions[iy]) * 0.002;

                // Wrap around
                if (positions[ix] > width / 2) positions[ix] = -width / 2;
                if (positions[ix] < -width / 2) positions[ix] = width / 2;
                if (positions[iy] > height / 2) positions[iy] = -height / 2;
                if (positions[iy] < -height / 2) positions[iy] = height / 2;

                // Floating oscillation
                positions[ix] += Math.sin(elapsed * 0.5 + i * 0.3) * 0.1;
                positions[iy] += Math.cos(elapsed * 0.4 + i * 0.2) * 0.1;
            }
            nodeGeometry.attributes.position.needsUpdate = true;

            // ── Move Electrons along paths ──
            const ePos = electronGeometry.attributes.position.array as Float32Array;
            for (let i = 0; i < electronCount; i++) {
                const ed = electronData[i];
                ed.progress += ed.speed;
                if (ed.progress >= 1) ed.progress = 0;

                const totalSegments = ed.pathPoints.length - 1;
                const currentSegment = Math.floor(ed.progress * totalSegments);
                const segProgress = (ed.progress * totalSegments) - currentSegment;

                const p0 = ed.pathPoints[Math.min(currentSegment, totalSegments)];
                const p1 = ed.pathPoints[Math.min(currentSegment + 1, totalSegments)];

                ePos[i * 3] = p0.x + (p1.x - p0.x) * segProgress;
                ePos[i * 3 + 1] = p0.y + (p1.y - p0.y) * segProgress;
            }
            electronGeometry.attributes.position.needsUpdate = true;

            // ── Update Ripples ──
            for (let r = ripples.length - 1; r >= 0; r--) {
                const ripple = ripples[r];
                const age = (now - ripple.birth) / 1000;
                const lifespan = ripple.maxRadius / (ripple.speed * 60);
                const t = age / lifespan;

                if (t >= 1) {
                    scene.remove(ripple.mesh);
                    (ripple.mesh.material as THREE.MeshBasicMaterial).dispose();
                    ripple.mesh.geometry.dispose();
                    ripples.splice(r, 1);
                    continue;
                }

                const scale = 1 + t * ripple.maxRadius;
                ripple.mesh.scale.set(scale, scale, 1);
                (ripple.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.4;
            }

            // ── Subtle line glow pulse ──
            lineGroup.children.forEach((child, i) => {
                const line = child as THREE.Line;
                const mat = line.material as THREE.LineBasicMaterial;
                const pulse = Math.sin(elapsed * 1.5 + i * 0.5) * 0.5 + 0.5;
                mat.opacity = 0.03 + pulse * 0.04;
            });

            renderer.render(scene, camera);
        };

        // ── Resize Handler ──
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.left = -w / 2;
            camera.right = w / 2;
            camera.top = h / 2;
            camera.bottom = -h / 2;
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
            container.removeEventListener('pointerleave', onPointerLeave);
            container.removeEventListener('click', onClick);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);

            // Dispose Three.js resources
            nodeGeometry.dispose();
            nodeShaderMaterial.dispose();
            electronGeometry.dispose();
            electronMaterial.dispose();
            lineMaterial.dispose();
            lineGroup.children.forEach(child => {
                const line = child as THREE.Line;
                line.geometry.dispose();
                (line.material as THREE.Material).dispose();
            });
            ripples.forEach(r => {
                r.mesh.geometry.dispose();
                (r.mesh.material as THREE.Material).dispose();
            });
            renderer.dispose();
        };
    }, [id, handleInteraction]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
            {/* Three.js Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'auto' }}
            />

            {/* SVG Circuit Pattern Overlay */}
            <svg className="absolute w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id={patternId} width="200" height="200" patternUnits="userSpaceOnUse">
                        {/* Base Grid */}
                        <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        
                        {/* Traces Base */}
                        <path d="M0 40 L60 40 L80 60 L200 60" fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="1" />
                        <path d="M140 0 L140 80 L160 100 L160 200" fill="none" stroke="rgba(168,85,247,0.08)" strokeWidth="1" />
                        <path d="M0 160 L40 160 L60 140 L200 140" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="1" />
                        <path d="M80 200 L80 140 L100 120 L200 120" fill="none" stroke="rgba(236,72,153,0.08)" strokeWidth="1" />

                        {/* Nodes */}
                        <circle cx="60" cy="40" r="2" fill="rgba(34,211,238,0.3)" />
                        <circle cx="140" cy="80" r="2" fill="rgba(168,85,247,0.3)" />
                        <circle cx="40" cy="160" r="2" fill="rgba(59,130,246,0.3)" />
                        <circle cx="80" cy="140" r="2" fill="rgba(236,72,153,0.3)" />

                        {/* Moving Electrons */}
                        <path d="M0 40 L60 40 L80 60 L200 60" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="30 300" className="animate-wire-1" />
                        <path d="M140 0 L140 80 L160 100 L160 200" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="30 300" className="animate-wire-2" />
                        <path d="M0 160 L40 160 L60 140 L200 140" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="30 300" className="animate-wire-3" />
                        <path d="M80 200 L80 140 L100 120 L200 120" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="30 300" className="animate-wire-4" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.85)_80%)] pointer-events-none" />

            <style>{`
                @keyframes wireFlow1 {
                    0% { stroke-dashoffset: 300; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes wireFlow2 {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -300; }
                }
                .animate-wire-1 { animation: wireFlow1 3s linear infinite; }
                .animate-wire-2 { animation: wireFlow1 4s linear infinite; }
                .animate-wire-3 { animation: wireFlow1 3.5s linear infinite; }
                .animate-wire-4 { animation: wireFlow2 4.5s linear infinite; }
            `}</style>
        </div>
    );
};

export default CircuitBackground;
