// src/components/party/chatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import { API_URL } from '../../config/api';
import MessageBubble from './messageBubble';

const ChatInterface = ({ partyId, vibeData, onQueueUpdate }) => {
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Fetch chat history on mount
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${API_URL}/chat/${partyId}/history`);
                const data = await response.json();

                if (data.success && data.messages.length > 0) {
                    const formattedMessages = data.messages.map(msg => ({
                        id: msg.id,
                        type: msg.role === 'USER' ? 'user' :
                            msg.type === 'AI_ACCEPT' ? 'ai-accept' :
                                msg.type === 'AI_DENY' ? 'ai-deny' : 'ai',
                        text: msg.content,
                        user: msg.role === 'USER' ? { name: 'You', avatar: 'https://i.pravatar.cc/150?u=You' } : null
                    }));
                    setMessages(formattedMessages);
                } else {
                    // No history - show welcome message
                    setMessages([{
                        id: 'welcome',
                        type: 'ai',
                        text: `Hey! I'm Mazaj, your AI DJ. The vibe is: "${vibeData}". Request a song or just chat!`
                    }]);
                }
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
                setMessages([{
                    id: 'welcome',
                    type: 'ai',
                    text: `Hey! I'm Mazaj, your AI DJ. Request a song or just chat!`
                }]);
            }
        };

        fetchHistory();
    }, [partyId, vibeData]);

    // Send message to API
    const sendMessage = async (content) => {
        const response = await fetch(`${API_URL}/chat/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                partyId: partyId,
                senderId: 'user-123', // Hardcoded for now
                content: content
            }),
        });
        const data = await response.json();
        return data;
    };

    // Handle form submit
    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userText = inputValue;

        // Add user message immediately
        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: userText,
            user: { name: 'You', avatar: 'https://i.pravatar.cc/150?u=You' }
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Call the real API
            const result = await sendMessage(userText);

            if (result.success) {
                // Add AI response
                const aiMessage = {
                    id: result.aiResponse.id,
                    type: result.aiResponse.type === 'AI_ACCEPT' ? 'ai-accept' :
                        result.aiResponse.type === 'AI_DENY' ? 'ai-deny' : 'ai',
                    text: result.aiResponse.content
                };
                setMessages(prev => [...prev, aiMessage]);

                // If song was added, refresh the queue!
                if (result.aiResponse.type === 'AI_ACCEPT') {
                    onQueueUpdate();
                }
            } else {
                throw new Error('API returned error');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'ai',
                text: "Sorry, I'm having connection issues. Try again!"
            }]);
        }

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
                        <p className="text-white font-bold text-sm truncate max-w-[250px]">{vibeData}</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-0">
                <div className="flex justify-center">
                    <span className="text-[10px] font-medium text-gray-600 bg-white/5 px-3 py-1 rounded-full">Today</span>
                </div>

                {/* Render Messages */}
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

                {/* Auto-scroll anchor */}
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
                        disabled={isTyping}
                        className="flex-1 bg-transparent border-none text-white placeholder-gray-500 text-sm py-2.5 focus:ring-0 outline-none disabled:opacity-50"
                        placeholder="Request a song or chat with AI..."
                        type="text"
                    />

                    <button
                        type="submit"
                        disabled={isTyping || !inputValue.trim()}
                        className="size-10 rounded-full bg-primary hover:bg-green-400 text-background-dark flex items-center justify-center shadow-lg shadow-primary/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;