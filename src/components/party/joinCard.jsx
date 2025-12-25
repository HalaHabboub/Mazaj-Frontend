import React, { useState } from 'react';

const JoinCard = () => {
    const [code, setCode] = useState('');

    const handleJoin = () => {
        // TODO: Add join logic later
        console.log("Joining party:", code);
    };

    return (
        <div className="group relative glass-panel rounded-3xl overflow-hidden p-8 flex flex-col justify-between h-[340px] glass-panel-hover">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop")' }}>
            </div>

            <div className="z-10 mt-4 relative">
                <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                    <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Join the Crowd</h2>
                <p className="text-white/60 text-lg max-w-sm">Have a code? Jump straight into the action with your friends.</p>
            </div>

            <div className="z-10 mt-auto pt-8 relative w-full">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-white/40">key</span>
                        </div>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter Party Code..."
                            type="text"
                        />
                    </div>
                    <button
                        onClick={handleJoin}
                        className="flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/10 transition-colors"
                    >
                        <span>Join</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinCard;