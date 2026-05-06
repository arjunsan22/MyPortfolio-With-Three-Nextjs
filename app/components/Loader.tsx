import React from 'react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#010103] flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow effect behind the logo */}
        <div className="absolute inset-0 bg-[#00d8ff]/20 blur-[50px] rounded-full w-32 h-32 animate-pulse"></div>
        
        {/* React Logo SVG */}
        <svg
          viewBox="-11.5 -10.23174 23 20.46348"
          className="w-24 h-24 animate-[spin_4s_linear_infinite] drop-shadow-[0_0_15px_rgba(0,216,255,0.8)]"
        >
          <circle cx="0" cy="0" r="2.05" fill="#fbfefeff" />
          <g stroke="#00d8ff" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>

        {/* Loading text */}
        <div className="mt-8 text-[#00d8ff] font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
          Loading Experience
        </div>
      </div>
    </div>
  );
};
