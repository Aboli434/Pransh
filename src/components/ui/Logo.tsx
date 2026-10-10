import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  fill?: string;
}

export default function Logo({ className = "w-32 h-auto" }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image 
        src="/images/Pransh_logo-removebg-preview.png"
        alt="Pransh Logo"
        width={400}
        height={160}
        className="object-contain w-full h-full"
      />
    </div>
  );
}
