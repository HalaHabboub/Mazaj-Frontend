// src/components/party/messageBubble.jsx
import React from 'react';

const MessageBubble = ({ message }) => {
    const { type, text, user, song } = message;

    const isUser = type === 'user';
    const isMe = user?.isMe; // Check if this is the current user's message

    const getBubbleStyle = () => {
        switch (type) {
            case 'user':
                return isMe
                    ? 'bg-primary/10 border border-primary/20 text-white rounded-tr-none'
                    : 'bg-blue-500/10 border border-blue-500/20 text-white rounded-tl-none';
            case 'ai-deny': return 'bg-red-500/10 border border-red-500/20 text-red-200 rounded-tl-none';
            case 'ai-accept': return 'bg-green-500/10 border border-green-500/20 text-green-100 rounded-tl-none';
            default: return 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none';
        }
    };

    return (
        <div className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
            {/* Avatar */}
            <div className={`size-8 shrink-0 rounded-full flex items-center justify-center overflow-hidden mt-1
                  ${isUser
                    ? (isMe ? 'bg-primary/20 border border-primary/30' : 'bg-blue-500/20 border border-blue-500/30')
                    : 'bg-ai-accent/20 border border-ai-accent/50 text-ai-accent'}`}>

                {isUser ? (
                    <img src={user?.avatar || "https://i.pravatar.cc/150?u=user"} alt="User" className="w-full h-full object-cover" />
                ) : (
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                )}
            </div>

            {/* Message Content */}
            <div className={`flex flex-col gap-1 max-w-[85%] ${isMe ? 'items-end' : ''}`}>
                <span className="text-[10px] text-gray-400 font-bold ml-1">
                    {isUser ? (isMe ? 'You' : user?.name || 'Guest') : 'Mazaj AI'}
                </span>

                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${getBubbleStyle()}`}>
                    {type === 'ai-deny' && (
                        <div className="flex items-center gap-2 mb-1 text-red-400 font-bold text-xs uppercase tracking-wide">
                            <span className="material-symbols-outlined text-sm">block</span> Denied
                        </div>
                    )}
                    {type === 'ai-accept' && (
                        <div className="flex items-center gap-2 mb-1 text-primary font-bold text-xs uppercase tracking-wide">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Accepted
                        </div>
                    )}

                    {text}

                    {song && (
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 mt-2">
                            <div className="size-10 rounded-lg bg-gray-800 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">music_note</span>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-white truncate">{song.title}</p>
                                <p className="text-[10px] text-gray-400 truncate">{song.artist}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;