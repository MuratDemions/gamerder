import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative font-bold uppercase tracking-wider transition-all duration-300 rounded-md overflow-hidden group";
  const widthStyles = fullWidth ? "w-full" : "";
  
  let variantStyles = "";
  
  switch (variant) {
    case 'primary':
      variantStyles = "bg-neon-purple text-white px-6 py-3 shadow-neon hover:shadow-neon-strong hover:bg-neon-light border border-neon-light";
      break;
    case 'outline':
      variantStyles = "bg-transparent text-neon-purple px-6 py-3 border-2 border-neon-purple shadow-[inset_0_0_10px_rgba(191,0,255,0.2)] hover:bg-neon-purple/10 hover:shadow-neon";
      break;
    case 'ghost':
      variantStyles = "bg-transparent text-gray-400 px-4 py-2 hover:text-neon-purple hover:bg-neon-purple/5";
      break;
  }

  return (
    <button 
      className={`${baseStyles} ${widthStyles} ${variantStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      )}
    </button>
  );
};
