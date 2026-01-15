// src/components/party/nowPlaying.jsx
import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { API_URL } from '../../config/api';

const NowPlaying = ({ track, onNext, onPrev, hasNext, hasPrev, partyId }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef(null);

    // YouTube player options
    const opts = {
        height: '0',      // Hidden video (audio only)
        width: '0',
        playerVars: {
            autoplay: 1,
            controls: 0,
        },
    };

    // When player is ready
    const onReady = (event) => {
        playerRef.current = event.target;
        setDuration(event.target.getDuration());
        setIsPlaying(true);
    };

    // When video state changes
    const onStateChange = (event) => {
        // 1 = playing, 2 = paused, 0 = ended
        if (event.data === 1) {
            setIsPlaying(true);
            // Update progress every second
            const interval = setInterval(() => {
                if (playerRef.current) {
                    setCurrentTime(playerRef.current.getCurrentTime());
                }
            }, 1000);
            playerRef.current.progressInterval = interval;
        } else if (event.data === 2) {
            setIsPlaying(false);
            clearInterval(playerRef.current?.progressInterval);
        } else if (event.data === 0) {
            // Video ended - just call onNext, it handles status
            clearInterval(playerRef.current?.progressInterval);
            onNext();
        }

    };

    // Play/Pause toggle
    const togglePlay = () => {
        if (!playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    // Format time (seconds to mm:ss)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle progress bar click
    const handleProgressClick = (e) => {
        if (!playerRef.current || !duration) return;
        const bar = e.currentTarget;
        const clickX = e.nativeEvent.offsetX;
        const barWidth = bar.offsetWidth;
        const seekTime = (clickX / barWidth) * duration;
        playerRef.current.seekTo(seekTime);
        setCurrentTime(seekTime);
    };

    if (!track) {
        return (
            <div className="glass-panel border border-white/5 backdrop-blur-xl rounded-3xl p-8 text-center">
                <span className="material-symbols-outlined text-5xl text-gray-500 mb-4">music_off</span>
                <p className="text-gray-400">No track playing. Request a song!</p>
            </div>
        );
    }

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="relative glass-panel border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row gap-8 items-center shadow-2xl transition-all duration-500">

            {/* Hidden YouTube Player */}
            {track.youtubeId && (
                <YouTube
                    videoId={track.youtubeId}
                    opts={opts}
                    onReady={onReady}
                    onStateChange={onStateChange}
                    className="hidden"
                />
            )}

            {/* Album Art */}
            <div key={track.id} className="shrink-0 relative group animate-fade-in-up">
                <div className="size-48 md:size-64 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
                    <img
                        src={track.coverUrl || 'https://via.placeholder.com/300'}
                        alt="Album Art"
                        className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse' : ''}`}
                    />
                    {/* Playing indicator overlay */}
                    {isPlaying && (
                        <div className="absolute bottom-2 right-2 bg-primary px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-background-dark animate-pulse">graphic_eq</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Track Details & Controls */}
            <div className="flex-1 flex flex-col justify-center w-full min-w-0">
                <div className="mb-1 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-background-dark uppercase tracking-wider">
                        Now Playing
                    </span>
                    {!track.youtubeId && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-500/20 text-yellow-500 uppercase tracking-wider">
                            No Audio
                        </span>
                    )}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight truncate mb-1">
                    {track.title}
                </h2>
                <p className="text-lg text-primary/80 font-medium mb-8 truncate">
                    {track.artist}
                </p>

                {/* Progress Bar */}
                <div className="w-full mb-6 group/progress cursor-pointer">
                    <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
                        <span className="text-primary">{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div
                        className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative cursor-pointer"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-200"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
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

                        <button
                            onClick={togglePlay}
                            disabled={!track.youtubeId}
                            className="size-16 rounded-full bg-primary text-background-dark flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-4xl">
                                {isPlaying ? 'pause' : 'play_arrow'}
                            </span>
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