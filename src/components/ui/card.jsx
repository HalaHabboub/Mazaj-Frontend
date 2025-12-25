import React from 'react';

const Card = ({ icon, title, description }) => {
    return (
        <div className="glass-panel p-8 rounded-xl flex flex-col items-center text-center gap-4 transition-all duration-300 group hover:border-primary/30">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined !text-3xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default Card;