import React from 'react';

export const AnglerFish = React.forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  return (
    <div ref={ref} className={`relative w-[400px] h-[300px] ${className}`}>
      <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]">
        <defs>
          <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="body-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2b5099" />
            <stop offset="100%" stopColor="#1a2e61" />
          </linearGradient>

          <linearGradient id="mouth-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111d42" />
            <stop offset="100%" stopColor="#080e21" />
          </linearGradient>
        </defs>

        {/* Tail Fin */}
        <path d="M 380 180 Q 420 150 450 170 Q 460 200 450 230 Q 420 250 380 220 Z" fill="#2963a8" />
        <path d="M 400 175 L 430 185 M 395 195 L 440 200 M 395 210 L 430 215" stroke="#5cb3ff" strokeWidth="4" strokeLinecap="round" />

        {/* Top Fin */}
        <path d="M 260 130 Q 290 80 340 130 Z" fill="#2963a8" />
        <path d="M 280 120 L 310 95 M 300 125 L 325 110" stroke="#5cb3ff" strokeWidth="4" strokeLinecap="round" />

        {/* Bottom Fin (Belly spikes) */}
        <path d="M 200 280 Q 190 320 180 300" fill="none" stroke="#2963a8" strokeWidth="8" strokeLinecap="round" />
        <path d="M 240 290 Q 240 330 250 310" fill="none" stroke="#2963a8" strokeWidth="8" strokeLinecap="round" />
        <path d="M 280 280 Q 290 310 300 295" fill="none" stroke="#2963a8" strokeWidth="8" strokeLinecap="round" />

        {/* Side Fin */}
        <path d="M 260 200 Q 300 180 320 220 Q 280 240 260 200 Z" fill="#2963a8" />
        <path d="M 275 205 L 305 205 M 270 215 L 295 220" stroke="#5cb3ff" strokeWidth="3" strokeLinecap="round" />

        {/* Top head spikes */}
        <path d="M 220 120 Q 220 80 190 70" fill="none" stroke="#2963a8" strokeWidth="6" strokeLinecap="round" />
        <path d="M 240 115 Q 250 70 220 50" fill="none" stroke="#2963a8" strokeWidth="6" strokeLinecap="round" />
        <path d="M 260 115 Q 280 60 250 40" fill="none" stroke="#2963a8" strokeWidth="6" strokeLinecap="round" />

        {/* Main Body */}
        <ellipse cx="270" cy="200" rx="130" ry="110" fill="url(#body-gradient)" />

        {/* Belly dots */}
        <circle cx="280" cy="280" r="4" fill="#5cb3ff" opacity="0.6" />
        <circle cx="260" cy="275" r="5" fill="#5cb3ff" opacity="0.6" />
        <circle cx="240" cy="265" r="3" fill="#5cb3ff" opacity="0.6" />
        <circle cx="310" cy="265" r="4" fill="#5cb3ff" opacity="0.6" />
        <circle cx="330" cy="245" r="5" fill="#5cb3ff" opacity="0.6" />

        {/* Glowing Stalk */}
        <path d="M 210 110 Q 150 -20 60 120" fill="none" stroke="#2963a8" strokeWidth="10" strokeLinecap="round" />

        {/* Bulb */}
        <circle cx="55" cy="125" r="22" fill="#ffffff" className="angler-bulb" filter="url(#bulb-glow)" />
        
        {/* Giant Mouth Inside */}
        <path d="M 145 170 Q 250 140 270 200 Q 250 280 145 255 Q 160 210 145 170 Z" fill="url(#mouth-gradient)" stroke="#5cb3ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Eye */}
        <circle cx="235" cy="155" r="14" fill="#000000" />
        <circle cx="230" cy="150" r="4" fill="#ffffff" />
        
        {/* Teeth - Top */}
        <path d="M 155 168 L 140 210 L 175 167 Z" fill="#ffeebd" />
        <path d="M 175 167 L 165 215 L 195 169 Z" fill="#ffeebd" />
        <path d="M 195 169 L 190 220 L 215 174 Z" fill="#ffeebd" />
        <path d="M 215 174 L 215 215 L 235 180 Z" fill="#ffeebd" />
        <path d="M 235 180 L 235 205 L 248 188 Z" fill="#ffeebd" />

        {/* Teeth - Bottom */}
        <path d="M 150 255 L 145 210 L 165 258 Z" fill="#ffeebd" />
        <path d="M 165 258 L 170 205 L 185 261 Z" fill="#ffeebd" />
        <path d="M 185 261 L 195 210 L 205 264 Z" fill="#ffeebd" />
        <path d="M 205 264 L 215 220 L 220 265 Z" fill="#ffeebd" />
        <path d="M 220 265 L 230 235 L 235 262 Z" fill="#ffeebd" />

      </svg>
    </div>
  );
});
AnglerFish.displayName = 'AnglerFish';
