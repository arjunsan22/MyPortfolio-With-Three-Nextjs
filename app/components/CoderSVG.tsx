import React, { forwardRef } from 'react';

export const CoderSVG = forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  return (
    <div ref={ref} className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="monitor-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="desk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1e2f" />
            <stop offset="100%" stopColor="#0f0f17" />
          </linearGradient>
          <filter id="screen-bloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background light from monitor */}
        <circle cx="400" cy="300" r="250" fill="url(#monitor-glow)" opacity="0.3" className="coder-ambient-light" />

        {/* Chair Back */}
        <path d="M 220 250 L 220 450 Q 220 480 260 480 L 320 480" fill="none" stroke="#ff4757" strokeWidth="15" strokeLinecap="round" />
        <path d="M 235 280 L 235 440" fill="none" stroke="#2f3542" strokeWidth="20" strokeLinecap="round" />

        {/* Person - Body */}
        <path d="M 260 380 Q 270 280 340 280 Q 400 280 420 380 L 440 480 L 240 480 Z" fill="url(#body-grad)" />
        
        {/* Person - Neck */}
        <rect x="335" y="240" width="30" height="50" fill="#f5cdb0" />

        {/* Person - Head */}
        <ellipse cx="350" cy="200" rx="45" ry="55" fill="#f5cdb0" />
        
        {/* Hair */}
        <path d="M 300 200 Q 310 130 360 140 Q 400 150 405 190 Q 380 150 350 160 Q 320 170 300 200" fill="#ff6b6b" />
        <path d="M 360 140 Q 380 120 400 140 Q 370 145 360 140" fill="#ff4757" />

        {/* Glasses */}
        <rect x="360" y="185" width="25" height="15" rx="3" fill="none" stroke="#2f3542" strokeWidth="3" />
        <line x1="340" y1="192" x2="360" y2="192" stroke="#2f3542" strokeWidth="3" />
        <line x1="385" y1="192" x2="400" y2="192" stroke="#2f3542" strokeWidth="3" />

        {/* Eye/Blink animation */}
        <line x1="368" y1="192" x2="376" y2="192" stroke="#2f3542" strokeWidth="3" className="coder-eye" strokeLinecap="round" />

        {/* Arm Back (Left arm) */}
        <path d="M 290 320 Q 280 400 340 430 L 400 440" fill="none" stroke="#312e81" strokeWidth="28" strokeLinecap="round" />
        {/* Hand Back */}
        <ellipse cx="410" cy="440" rx="15" ry="10" fill="#f5cdb0" className="coder-hand-left" />

        {/* Desk */}
        <rect x="150" y="480" width="600" height="20" rx="5" fill="url(#desk-grad)" />
        <rect x="200" y="500" width="500" height="80" fill="#0f0f17" />
        {/* Desk Neon trim */}
        <line x1="150" y1="480" x2="750" y2="480" stroke="#8b5cf6" strokeWidth="3" />

        {/* Coffee Cup */}
        <path d="M 240 430 L 230 480 L 270 480 L 260 430 Z" fill="#ff4757" />
        <rect x="238" y="420" width="24" height="10" rx="2" fill="#2f3542" />
        <path d="M 270 440 Q 285 440 280 460 Q 275 470 265 470" fill="none" stroke="#ff4757" strokeWidth="4" />

        {/* Laptop Bottom */}
        <path d="M 430 480 L 610 480 L 630 490 L 410 490 Z" fill="#2f3542" />

        {/* Laptop Screen */}
        <path d="M 480 320 L 650 320 L 610 480 L 440 480 Z" fill="#1e1e2f" stroke="#3b82f6" strokeWidth="2" filter="url(#screen-bloom)" />
        
        {/* Screen Content (Code lines) */}
        <g className="coder-code-lines" opacity="0.8">
          <line x1="475" y1="340" x2="520" y2="340" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          <line x1="530" y1="340" x2="600" y2="340" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          
          <line x1="470" y1="360" x2="550" y2="360" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
          <line x1="465" y1="380" x2="580" y2="380" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
          
          <line x1="460" y1="400" x2="490" y2="400" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          <line x1="500" y1="400" x2="560" y2="400" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          
          <line x1="455" y1="420" x2="530" y2="420" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Laptop Glowing backplate (Orange/Red part in user's image) */}
        <path d="M 540 380 L 620 380 L 600 480 L 520 480 Z" fill="#ff4757" opacity="0.9" filter="url(#screen-bloom)" />

        {/* Arm Front (Right arm) */}
        <path d="M 370 330 Q 380 400 420 440 L 460 450" fill="none" stroke="#4f46e5" strokeWidth="25" strokeLinecap="round" />
        {/* Hand Front */}
        <ellipse cx="470" cy="450" rx="15" ry="10" fill="#f5cdb0" className="coder-hand-right" />

      </svg>
    </div>
  );
});

CoderSVG.displayName = 'CoderSVG';
