import React from 'react';
import { useNavigate } from 'react-router-dom';

//Reusable UI Components
import Button from '../components/ui/button';
import Card from '../components/ui/card';

import './css/landing.css';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex flex-col font-display overflow-hidden">

            {/* Decorative Background (Keep this here as it's specific to Landing) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-20"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-20"></div>
            </div>

            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 text-center max-w-7xl mx-auto w-full">

                {/* Hero Text */}
                <div className="max-w-3xl mx-auto mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        AI-Powered DJ
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Mazaj
                    </h1>

                    <p className="text-xl sm:text-3xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        Let AI Curate Your Party.
                    </p>

                    <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">
                        Transform your social gatherings with an intelligent music companion that listens to your guests and keeps the vibe perfect.
                    </p>
                </div>

                {/* Features - CARD UI COMPONENT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
                    <Card
                        icon="tune"
                        title="Host Sets Vibe"
                        description="You pick the genre and mood, we handle the flow and transitions seamlessly."
                    />
                    <Card
                        icon="chat_bubble"
                        title="Guests Chat with AI"
                        description="Requests handled instantly by intelligence. No awkward interruptions."
                    />
                    <Card
                        icon="admin_panel_settings"
                        title="AI Enforces Rules"
                        description="No bad tracks. Just pure vibe. The AI filters out the noise."
                    />
                </div>

                {/* Button UI COMPONENT */}
                <div className="flex flex-col items-center gap-6">
                    <Button
                        variant="primary"
                        onClick={() => navigate('/auth')}
                        className="group" // Pass extra class for the arrow animation
                    >
                        <span>Get Started</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform ml-2">
                            arrow_forward
                        </span>
                    </Button>

                    <p className="text-slate-500 text-sm">No credit card required • Free trial available</p>
                </div>

            </main>
        </div>
    );
};

export default Landing;