'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ModernSimpleCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        // Optimized movement setters
        const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3" });
        const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3" });

        const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power2.out" });
        const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power2.out" });

        const onMouseMove = (e: MouseEvent) => {
            xToDot(e.clientX);
            yToDot(e.clientY);
            xToRing(e.clientX);
            yToRing(e.clientY);
        };

        const onMouseEnter = (e: MouseEvent) => {
            const isClickable = (e.target as HTMLElement).closest('a, button, .clickable');
            if (isClickable) {
                // Expand ring and hide dot on hover
                gsap.to(ringRef.current, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 });
                gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
            }
        };

        const onMouseLeave = (e: MouseEvent) => {
            const isClickable = (e.target as HTMLElement).closest('a, button, .clickable');
            if (isClickable) {
                gsap.to(ringRef.current, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
                gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
            }
        };

        const onMouseDown = () => {
            gsap.to(ringRef.current, { scale: 0.8, duration: 0.1 });
        };

        const onMouseUp = () => {
            gsap.to(ringRef.current, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseEnter);
        document.addEventListener('mouseout', onMouseLeave);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseEnter);
            document.removeEventListener('mouseout', onMouseLeave);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[999999] mix-blend-difference">
            {/* The Precision Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
            />

            {/* The Fluid Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
            />
        </div>
    );
};

export default ModernSimpleCursor;