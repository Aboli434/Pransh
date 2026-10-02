import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionHeading({
  title,
  eyebrow,
  description,
  className,
  align = 'left'
}: SectionHeadingProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  return (
    <div className={cn("space-y-4 max-w-2xl", alignments[align], className)}>
      {eyebrow && (
        <span className="block text-xs uppercase tracking-[0.3em] text-[var(--color-sage)] font-semibold">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-serif text-[var(--primary)] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-[var(--color-charcoal)]/80 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
