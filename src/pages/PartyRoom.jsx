
// src/pages/PartyRoom.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';

import NowPlaying from '../components/party/nowPlaying';
import QueueList from '../components/party/queueList';
import ChatInterface from '../components/party/chatInterface';

const PartyRoom = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { id } = useParams();

  // Redirect if not logged in
  useEffect(() => {
    if (!user?.id) {
      navigate('/auth');
    }
  }, []);

  const [party, setParty] = useState(null);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParty = async () => {
    try {
      const response = await fetch(`${API_URL}/party/${id}`);
      const data = await response.json();
      if (data.success) {
        setParty(data.party);
      }
    } catch (error) {
      console.error('Failed to fetch party:', error);
    }
  };

  const fetchQueue = async () => {
    try {
      const response = await fetch(`${API_URL}/party/${id}/queue`);
      const data = await response.json();
      if (data.success) {
        setQueue(data.queue);
      }
    } catch (error) {
      console.error('Failed to fetch queue:', error);
    }
  };

  // Update song status helper
  const updateSongStatus = async (songId, status) => {
    try {
      await fetch(`${API_URL}/party/${id}/queue/${songId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (error) {
      console.error('Failed to update song status:', error);
    }
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (user.id) {
        await fetch(`${API_URL}/party/${id}/join`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        });
      }

      await fetchParty();
      await fetchQueue();
      setLoading(false);
    };
    loadData();
  }, [id]);

  // Poll for sync every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchQueue();
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  // Derive current track from STATUS (not index!)
  const currentTrack = queue.find(s => s.status === 'PLAYING') || null;
  const currentIndex = currentTrack ? queue.findIndex(s => s.id === currentTrack.id) : -1;
  const pendingTracks = queue.filter(s => s.status === 'PENDING');

  // Auto-start first song if nothing is playing
  useEffect(() => {
    if (!loading && queue.length > 0 && !currentTrack) {
      const firstPending = queue.find(s => s.status === 'PENDING');
      if (firstPending) {
        updateSongStatus(firstPending.id, 'PLAYING').then(fetchQueue);
      }
    }
  }, [queue, currentTrack, loading]);

  // Navigation handlers
  const handleNext = async () => {
    if (currentTrack) {
      // Mark current as PLAYED
      await updateSongStatus(currentTrack.id, 'PLAYED');
    }

    // Find next pending song and mark as PLAYING
    const nextSong = pendingTracks[0];
    if (nextSong) {
      await updateSongStatus(nextSong.id, 'PLAYING');
    }

    fetchQueue();
  };

  const handlePrev = async () => {
    // Find the last played song
    const playedSongs = queue.filter(s => s.status === 'PLAYED');
    const lastPlayed = playedSongs[playedSongs.length - 1];

    if (lastPlayed) {
      // Mark current as PENDING (back to queue)
      if (currentTrack) {
        await updateSongStatus(currentTrack.id, 'PENDING');
      }
      // Mark last played as PLAYING again
      await updateSongStatus(lastPlayed.id, 'PLAYING');
      fetchQueue();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
          <p className="text-white mt-4">Loading party...</p>
        </div>
      </div>
    );
  }

  const hasNext = pendingTracks.length > 0;
  const hasPrev = queue.filter(s => s.status === 'PLAYED').length > 0;

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">
      <div className="lg:col-span-7 flex flex-col h-full overflow-hidden">
        <NowPlaying
          track={currentTrack}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={hasPrev}
          hasNext={hasNext}
          partyId={id}
        />
        <QueueList tracks={pendingTracks} />
      </div>

      <div className="lg:col-span-5 h-full min-h-[500px]">
        <ChatInterface
          partyId={id}
          vibeData={party?.vibeDescription || 'Party Vibe'}
          onQueueUpdate={fetchQueue}
        />
      </div>
    </div>
  );
};

export default PartyRoom;