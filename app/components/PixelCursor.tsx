'use client';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const NeonCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        // Direct follow without delay for the main pointer to feel native
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.05, ease: "none" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.05, ease: "none" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseEnter = (e: MouseEvent) => {
            const isClickable = (e.target as HTMLElement).closest('a, button, .clickable');
            if (isClickable) {
                // Subtle scale up and glow increase on hover
                gsap.to(svgRef.current, { 
                    scale: 1.1, 
                    filter: "drop-shadow(0 0 12px rgba(34, 211, 238, 1)) drop-shadow(0 0 24px rgba(34, 211, 238, 0.8))", 
                    duration: 0.2 
                });
            }
        };

        const onMouseLeave = (e: MouseEvent) => {
            const isClickable = (e.target as HTMLElement).closest('a, button, .clickable');
            if (isClickable) {
                gsap.to(svgRef.current, { 
                    scale: 1, 
                    filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 16px rgba(34, 211, 238, 0.3))", 
                    duration: 0.2 
                });
            }
        };

        const onMouseDown = () => {
            gsap.to(svgRef.current, { scale: 0.9, duration: 0.1 });
        };

        const onMouseUp = () => {
            gsap.to(svgRef.current, { scale: 1, duration: 0.2, ease: "back.out(2)" });
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
        <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[999999]">
            <svg
                ref={svgRef}
                className="w-[28px] h-[32px] -ml-[2px] -mt-[2px]"
                viewBox="0 0 28 32"
                style={{
                    filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 16px rgba(34, 211, 238, 0.3))",
                    transformOrigin: "top left"
                }}
            >
                <path
                    d="M2 2 L2 26 L9 19 L15 28 L19 26 L13 16 L22 16 Z"
                    fill="rgba(2, 6, 23, 0.9)"
                    stroke="#22d3ee"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default NeonCursor;