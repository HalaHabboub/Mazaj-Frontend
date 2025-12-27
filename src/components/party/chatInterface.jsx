import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './messageBubble';

const ChatInterface = ({ vibeData }) => {
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    // 1. Initial Dummy Data
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: `I've analyzed the vibe: "${vibeData.title}". We are keeping it ${vibeData.mood}! ⚡️` },
    ]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // 2. Handle User Send
    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add User Message
        const newMessage = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            user: { name: 'You', avatar: 'https://i.pravatar.cc/150?u=You' }
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // 3. Simulate AI Reply (Mock Logic)
        setTimeout(() => {
            generateAIResponse(inputValue);
        }, 1500);
    };

    // 4. Mock AI Logic
    const generateAIResponse = (userText) => {
        let aiMsg = { id: Date.now() + 1, type: 'ai', text: "I'm listening..." };

        // Simple keyword matching for demo purposes
        if (userText.toLowerCase().includes("sad") || userText.toLowerCase().includes("slow")) {
            aiMsg = {
                ...aiMsg,
                type: 'ai-deny',
                text: "Too sad for this vibe. Try something faster! (BPM must be > 110)"
            };
        } else if (userText.toLowerCase().includes("funk") || userText.toLowerCase().includes("happy")) {
            aiMsg = {
                ...aiMsg,
                type: 'ai-accept',
                text: "That works! 🔥 Adding to queue.",
                song: { title: "Requested Track", artist: "Artist Name" }
            };
        } else {
            aiMsg.text = "I'll check if that fits the vibe rules...";
        }

        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
    };

    return (
        <div className="h-full flex flex-col rounded-3xl overflow-hidden border border-ai-accent/30 shadow-[0_0_40px_-10px_rgba(124,58,237,0.15)] bg-[#0f0f13] relative">

            {/* Background Decoration */}
            <div className="absolute -top-20 -right-20 size-64 bg-ai-accent/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Dynamic Vibe Banner */}
            <div className="relative z-10 p-4 bg-gradient-to-r from-ai-accent/20 to-ai-accent/5 border-b border-ai-accent/10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-ai-accent flex items-center justify-center text-white shadow-lg shadow-ai-accent/40 animate-pulse">
                        <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-ai-accent uppercase tracking-widest leading-tight">Current Vibe</p>
                        <p className="text-white font-bold text-sm">{vibeData.title}</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-0">
                <div className="flex justify-center">
                    <span className="text-[10px] font-medium text-gray-600 bg-white/5 px-3 py-1 rounded-full">Today</span>
                </div>

                {/* Render Message Components */}
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex gap-3">
                        <div className="size-8 rounded-full bg-ai-accent/20 border border-ai-accent/50 flex items-center justify-center text-ai-accent">
                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-2xl text-xs text-gray-400">
                            Analyzing request...
                        </div>
                    </div>
                )}

                {/* Invisible element to auto-scroll to */}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-[#112117]/80 backdrop-blur-md border-t border-white/5 relative z-10">
                <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-3xl p-1.5 focus-within:border-primary/50 focus-within:bg-white/10 transition-colors">
                    <button type="button" className="size-10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>

                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 bg-transparent border-none text-white placeholder-gray-500 text-sm py-2.5 focus:ring-0 outline-none"
                        placeholder="Request a song or chat with AI..."
                        type="text"
                    />

                    <button type="submit" className="size-10 rounded-full bg-primary hover:bg-green-400 text-background-dark flex items-center justify-center shadow-lg shadow-primary/20 transition-all hover:scale-105">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;