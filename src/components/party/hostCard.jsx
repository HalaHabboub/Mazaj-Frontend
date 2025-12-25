import React from 'react';
import { useNavigate } from 'react-router-dom';

const HostCard = () => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate('/party/create')}
            className="group relative glass-panel rounded-3xl overflow-hidden p-8 flex flex-col justify-between h-[340px] glass-panel-hover cursor-pointer"
        >
            {/* Big fading icon bg */}
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-[120px] text-white">add_circle</span>
            </div>

            <div className="z-10 mt-4">
                <div className="size-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-3xl">queue_music</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Host a Vibe</h2>
                <p className="text-white/60 text-lg max-w-sm">Create a new room and let AI curate the perfect playlist for your mood.</p>
            </div>

            <div className="z-10 mt-auto pt-8">
                <button className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-background-dark font-bold rounded-full transition-all transform group-hover:translate-x-1">
                    <span>Create Party</span>
                    <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default HostCard;