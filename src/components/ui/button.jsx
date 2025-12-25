import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {

    // 1. Base styles (always applied)
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none py-3 px-8 text-sm sm:text-base cursor-pointer";

    // 2. Variants (Different looks)
    const variants = {
        primary: "bg-primary text-background-dark hover:bg-[#2fd170] shadow-neon hover:shadow-[0_0_30px_rgba(54,226,123,0.5)]",
        secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/5",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
    };

    // 3. Combine classes manually using Template Literals
    // We use .trim() to clean up extra spaces if className is empty
    const finalClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`.trim();

    return (
        <button
            onClick={onClick}
            className={finalClass}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;