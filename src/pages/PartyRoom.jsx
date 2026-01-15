// src/pages/PartyRoom.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config/api';

// Components
import NowPlaying from '../components/party/nowPlaying';
import QueueList from '../components/party/queueList';
import ChatInterface from '../components/party/chatInterface';

const PartyRoom = () => {
  const { id } = useParams();

  // State
  const [party, setParty] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch party data
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

  // Fetch queue
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

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchParty();
      await fetchQueue();
      setLoading(false);
    };
    loadData();
  }, [id]);

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Loading state
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

  // Derive current track and upcoming queue
  const currentTrack = queue[currentIndex] || null;
  const queueTracks = queue.slice(currentIndex + 1);

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">

      <div className="lg:col-span-7 flex flex-col h-full overflow-hidden">
        <NowPlaying
          track={currentTrack}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < queue.length - 1}
        />
        <QueueList tracks={queueTracks} />
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