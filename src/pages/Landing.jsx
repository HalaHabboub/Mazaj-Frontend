import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for the button "Get Started"
import './css/landing.css'; // Importing custom CSS for Laniding page

const Landing = () => {
    return (
        <div className="relative min-h-screen flex flex-col font-display overflow-hidden">

            {/* Decorative Background Gradient Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-20"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-20"></div>
            </div>

            {/* Main Content */}
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

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
                    {/* Card 1 */}
                    <div className="glass-panel p-8 rounded-xl flex flex-col items-center text-center gap-4 transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined !text-3xl">tune</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Host Sets Vibe</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            You pick the genre and mood, we handle the flow and transitions seamlessly.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-panel p-8 rounded-xl flex flex-col items-center text-center gap-4 transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined !text-3xl">chat_bubble</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">Guests Chat with AI</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Requests handled instantly by intelligence. No awkward interruptions.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-panel p-8 rounded-xl flex flex-col items-center text-center gap-4 transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined !text-3xl">admin_panel_settings</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">AI Enforces Rules</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            No bad tracks. Just pure vibe. The AI filters out the noise.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center gap-6">
                    <Link to="/auth" className="group relative flex items-center justify-center gap-3 bg-primary hover:bg-[#2fd170] text-background-dark text-lg font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-neon hover:shadow-[0_0_30px_rgba(54,226,123,0.5)] transform hover:-translate-y-0.5">
                        <span>Get Started</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                    <p className="text-slate-500 text-sm">No credit card required • Free trial available</p>
                </div>

            </main>
        </div>
    );
};

export default Landing;