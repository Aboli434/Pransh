import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-6 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-[var(--primary)] text-[var(--color-ivory)] hover:bg-[var(--color-deep-olive)] focus:ring-[var(--primary)]',
      secondary: 'bg-[var(--color-sage)] text-white hover:bg-[var(--color-deep-olive)] focus:ring-[var(--color-sage)]',
      outline: 'border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--color-ivory)] focus:ring-[var(--primary)]',
      text: 'text-[var(--primary)] hover:text-[var(--accent)] px-0 py-0 focus:ring-[var(--primary)]'
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
export default Button;
