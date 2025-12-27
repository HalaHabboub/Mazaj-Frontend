import React from 'react';

const NowPlaying = ({ track, onNext, onPrev, hasNext, hasPrev }) => {
    if (!track) return null;

    return (
        <div className="relative glass-panel border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row gap-8 items-center shadow-2xl transition-all duration-500">

            {/* Album Art with Key key to force animation on change */}
            <div key={track.id} className="shrink-0 relative group animate-fade-in-up">
                <div className="size-48 md:size-64 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
                    <img
                        src={track.cover}
                        alt="Album Art"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Track Details & Controls */}
            <div className="flex-1 flex flex-col justify-center w-full min-w-0">
                <div className="mb-1 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-background-dark uppercase tracking-wider">
                        Now Playing
                    </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight truncate mb-1">
                    {track.title}
                </h2>
                <p className="text-lg text-primary/80 font-medium mb-8 truncate">
                    {track.artist}
                </p>

                {/* Progress Bar (Visual Only) */}
                <div className="w-full mb-6 group/progress cursor-pointer">
                    <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
                        <span className="text-primary">0:00</span>
                        <span>{track.duration || "3:45"}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-[5%] bg-primary rounded-full"></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">shuffle</span>
                    </button>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={onPrev}
                            disabled={!hasPrev}
                            className={`text-white transition-colors ${!hasPrev ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary'}`}
                        >
                            <span className="material-symbols-outlined text-4xl">skip_previous</span>
                        </button>

                        <button className="size-16 rounded-full bg-primary text-background-dark flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-4xl">pause</span>
                        </button>

                        <button
                            onClick={onNext}
                            disabled={!hasNext}
                            className={`text-white transition-colors ${!hasNext ? 'opacity-30 cursor-not-allowed' : 'hover:text-primary'}`}
                        >
                            <span className="material-symbols-outlined text-4xl">skip_next</span>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default NowPlaying;