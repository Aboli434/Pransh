import React from 'react';

interface LogoProps {
  className?: string;
  fill?: string;
}

export default function Logo({ className = "w-32 h-auto", fill = "currentColor" }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 200 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Leaves Icon */}
      <g transform="translate(100, 20) scale(0.8)">
        {/* Center Leaf */}
        <path 
          d="M0,0 C-5,-10 0,-20 0,-20 C0,-20 5,-10 0,0 Z" 
          fill={fill} 
        />
        {/* Left Leaf */}
        <path 
          d="M-2,2 C-12,0 -18,-8 -18,-8 C-18,-8 -10,-2 -2,2 Z" 
          fill={fill} 
        />
        {/* Right Leaf */}
        <path 
          d="M2,2 C12,0 18,-8 18,-8 C18,-8 10,-2 2,2 Z" 
          fill={fill} 
        />
      </g>
      
      {/* Text */}
      <text 
        x="100" 
        y="65" 
        textAnchor="middle" 
        fill={fill} 
        style={{ 
          fontFamily: 'var(--font-cormorant), serif', 
          fontWeight: 700, 
          fontSize: '42px',
          letterSpacing: '0.05em'
        }}
      >
        PRANSH
      </text>
    </svg>
  );
}
