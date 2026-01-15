// src/components/party/partyListItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartyListItem = ({ id, title, host, time, type = 'music', attendees = [], onDelete, canDelete }) => {
    const navigate = useNavigate();

    const getIcon = () => {
        switch (type) {
            case 'hype': return { icon: 'celebration', color: 'text-purple-400', bg: 'bg-purple-500/20', hover: 'group-hover:bg-purple-500' };
            case 'workout': return { icon: 'fitness_center', color: 'text-orange-400', bg: 'bg-orange-500/20', hover: 'group-hover:bg-orange-500' };
            default: return { icon: 'headphones', color: 'text-indigo-400', bg: 'bg-indigo-500/20', hover: 'group-hover:bg-indigo-500' };
        }
    };

    const style = getIcon();

    const handleClick = () => {
        if (id) {
            navigate(`/party/${id}`);
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent navigating to party
        if (confirm('Are you sure you want to delete this party? This cannot be undone.')) {
            onDelete(id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="glass-panel rounded-2xl p-4 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <div className={`size-12 rounded-xl ${style.bg} flex items-center justify-center ${style.color} ${style.hover} group-hover:text-white transition-colors`}>
                    <span className="material-symbols-outlined">{style.icon}</span>
                </div>

                <div>
                    <h4 className="text-white font-medium text-lg">{title}</h4>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">schedule</span> {time}
                        </span>
                        <span>•</span>
                        <span>Hosted by {host}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {attendees.length > 0 && (
                    <div className="hidden sm:flex -space-x-2 mr-2">
                        {attendees.slice(0, 2).map((src, i) => (
                            <img key={i} src={src} alt="User" className="inline-block h-8 w-8 rounded-full ring-2 ring-background-dark object-cover" />
                        ))}
                        {attendees.length > 2 && (
                            <div className="h-8 w-8 rounded-full ring-2 ring-background-dark bg-white/10 flex items-center justify-center text-[10px] text-white font-bold">
                                +{attendees.length - 2}
                            </div>
                        )}
                    </div>
                )}

                {/* Delete Button (only for host) */}
                {canDelete && (
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-full text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete party"
                    >
                        <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                )}

                {/* Join Arrow */}
                <span className="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors">
                    arrow_forward
                </span>
            </div>
        </div>
    );
};

export default PartyListItem;