// src/pages/CreateParty.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';
import './css/CreateParty.css';

const CreateParty = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Redirect if not logged in
    useEffect(() => {
        if (!user?.id) {
            navigate('/auth');
        }
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        vibe: ''
    });

    // Function to create party via API
    const createParty = async () => {
        const response = await fetch(`${API_URL}/party`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                vibeDescription: formData.vibe,
                hostId: user.id
            }),
        });
        const data = await response.json();
        return data;
    };

    const handleStart = async () => {
        if (!formData.name) return;

        setIsLoading(true);
        try {
            const result = await createParty();
            if (result.success) {
                // Navigate to the REAL party ID from API
                navigate(`/party/${result.party.id}`);
            } else {
                alert('Failed to create party');
            }
        } catch (error) {
            console.error('Failed to create party:', error);
            alert('Connection error');
        }
        setIsLoading(false);
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">

            {/* Background Ambient Glows */}
            <div className="glow-effect-center"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Central Card */}
            <div className="glass-panel relative z-10 w-full max-w-[640px] rounded-2xl p-8 sm:p-12 md:p-14 animate-fade-in-up">

                {/* Header Section */}
                <div className="mb-10 text-center sm:text-left">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20">
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        <span>AI Powered Setup</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-white mb-3">
                        Create New Party
                    </h1>
                    <p className="text-zinc-400 text-lg font-normal max-w-md">
                        Configure your session and let our AI curate the perfect soundscape for your guests.
                    </p>
                </div>

                {/* Form Section */}
                <div className="flex flex-col gap-8">

                    {/* Party Name Input */}
                    <div className="group">
                        <label className="block text-sm font-medium text-zinc-300 mb-2 pl-1" htmlFor="party-name">
                            Party Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500">
                                <span className="material-symbols-outlined">celebration</span>
                            </div>
                            <input
                                id="party-name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="block w-full rounded-full border border-zinc-700 bg-[#121214]/50 p-4 pl-12 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 outline-none"
                                placeholder="e.g., Friday Night Hype"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Vibe Description Textarea */}
                    <div className="group">
                        <div className="flex items-center justify-between mb-2 pl-1">
                            <label className="block text-sm font-medium text-zinc-300" htmlFor="vibe-desc">
                                Vibe Description
                            </label>
                            <span className="text-xs text-primary font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">psychology</span>
                                AI Prompt
                            </span>
                        </div>
                        <div className="relative">
                            <textarea
                                id="vibe-desc"
                                rows="4"
                                value={formData.vibe}
                                onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                                className="custom-scrollbar block w-full rounded-2xl border border-zinc-700 bg-[#121214]/50 p-4 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 resize-none leading-relaxed outline-none"
                                placeholder="Describe the mood... e.g., Upbeat 2000s Pop, no slow ballads, high energy dance hits only."
                                disabled={isLoading}
                            ></textarea>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <button
                            onClick={handleStart}
                            disabled={isLoading || !formData.name}
                            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary p-4 transition-all hover:bg-[#2bc466] hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_20px_rgba(54,226,123,0.3)] hover:shadow-[0_0_30px_rgba(54,226,123,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <div className="relative z-10 flex items-center gap-3 text-background-dark text-lg font-bold tracking-tight">
                                {isLoading ? (
                                    <>
                                        <span className="material-symbols-outlined text-[24px] animate-spin">sync</span>
                                        <span>Creating Party...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[24px]">play_circle</span>
                                        <span>Start Party</span>
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                        </button>

                        <p className="mt-4 text-center text-xs text-zinc-500">
                            By starting, you agree to the music licensing terms.
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default CreateParty;