import React from 'react';

const QueueList = ({ tracks }) => {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-glass-panel border border-white/5 backdrop-blur-lg rounded-3xl overflow-hidden mt-6">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">queue_music</span>
                    Up Next
                </h3>
                <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                    {tracks.length} Tracks
                </span>
            </div>

            <div className="overflow-y-auto p-2 space-y-2">
                {tracks.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        Queue is empty. Ask AI to add some tracks!
                    </div>
                ) : (
                    tracks.map((track) => (
                        <div key={track.id} className="group flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-white/5">
                            {/* Tiny Cover */}
                            <div className="relative size-14 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                                <img
                                    src={track.coverUrl || 'https://via.placeholder.com/150'}
                                    alt="Cover"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">{track.title}</p>
                                <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                            </div>

                            {/* Added By */}
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Added by</span>
                                    <span className={`text-xs ${track.isAi ? 'text-ai-accent font-bold' : 'text-primary'}`}>
                                        {track.user}
                                    </span>
                                </div>

                                {track.isAi ? (
                                    <div className="size-8 rounded-full bg-ai-accent/20 border border-ai-accent/50 flex items-center justify-center text-ai-accent">
                                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                                    </div>
                                ) : (
                                    <div className="size-8 rounded-full bg-blue-500/20 border border-blue-500/30 overflow-hidden">
                                        <img src={track.avatar} alt="User" className="w-full h-full" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QueueList;