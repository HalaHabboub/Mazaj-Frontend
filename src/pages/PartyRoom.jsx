// src/pages/PartyRoom.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Components
import NowPlaying from '../components/party/nowPlaying';
import QueueList from '../components/party/queueList';
import ChatInterface from '../components/party/chatInterface';

// 1. Define the Master Playlist Data
const INITIAL_PLAYLIST = [
  {
    id: 1,
    title: "Levitating",
    artist: "Dua Lipa • Future Nostalgia",
    cover: "https://upload.wikimedia.org/wikipedia/en/2/25/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png",
    duration: "3:23",
    user: "System"
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
    user: "Alex",
    avatar: "https://i.pravatar.cc/150?u=Alex"
  },
  {
    id: 3,
    title: "As It Was",
    artist: "Harry Styles",
    cover: "https://upload.wikimedia.org/wikipedia/en/b/b1/Harry_Styles_-_As_It_Was.png",
    user: "You",
    avatar: "https://i.pravatar.cc/150?u=You"
  },
  {
    id: 4,
    title: "Midnight City",
    artist: "M83",
    cover: "https://upload.wikimedia.org/wikipedia/en/7/74/M83_-_Midnight_City.jpg",
    user: "Mazaj AI",
    isAi: true
  },
  {
    id: 5,
    title: "Save Your Tears",
    artist: "The Weeknd",
    cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_After_Hours_-_Save_Your_Tears.png",
    user: "Sarah",
    avatar: "https://i.pravatar.cc/150?u=Sarah"
  }
];

const PartyRoom = () => {
  const { id } = useParams();

  // 2. State to track which song is playing
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Logic to move forward/backward
  const handleNext = () => {
    if (currentIndex < INITIAL_PLAYLIST.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // 4. Derived State: Who is playing? Who is next?
  const currentTrack = INITIAL_PLAYLIST[currentIndex];

  // The queue is everything AFTER the current index
  const queueTracks = INITIAL_PLAYLIST.slice(currentIndex + 1);

  const partyData = {
    id: id,
    vibe: {
      title: "Energetic Pop Only",
      mood: "High Energy",
      rules: ["No Ballads", "BPM > 110"]
    }
  };

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">

      <div className="lg:col-span-7 flex flex-col h-full overflow-hidden">
        {/* Pass the functions and data down */}
        <NowPlaying
          track={currentTrack}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < INITIAL_PLAYLIST.length - 1}
        />

        {/* Pass only the REMAINING tracks */}
        <QueueList tracks={queueTracks} />
      </div>

      <div className="lg:col-span-5 h-full min-h-[500px]">
        <ChatInterface vibeData={partyData.vibe} />
      </div>

    </div>
  );
};

export default PartyRoom;