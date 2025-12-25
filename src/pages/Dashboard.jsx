// src/pages/Dashboard.jsx
import React from 'react';

// Import your new components
import HostCard from '../components/party/hostCard';
import JoinCard from '../components/party/joinCard';
import PartyListItem from '../components/party/partyListItem';
import './css/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="relative w-full">

      {/* Ambient Background Effects */}
      <div className="ambient-glow top-[-200px] left-[-200px]"></div>
      <div className="ambient-glow bottom-[-300px] right-[-100px]" style={{ background: 'radial-gradient(circle, rgba(54, 226, 123, 0.05) 0%, rgba(17, 33, 23, 0) 70%)' }}></div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full animate-fade-in-up">

        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Let's set the <span className="text-primary">vibe</span>.
          </h1>
          <p className="text-lg text-white/60">Choose your path to the perfect playlist.</p>
        </div>

        {/* Action Cards Grid - CLEAN & REUSABLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <HostCard />
          <JoinCard />
        </div>

        {/* Recent Activity Section */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Parties</h3>
          </div>

          <div className="flex flex-col gap-3">
            <PartyListItem
              title="Chill Lo-Fi Session"
              host="You"
              time="2 hours ago"
              type="music"
              attendees={["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3"]}
            />
            <PartyListItem
              title="Friday Night Hype"
              host="Sarah"
              time="Yesterday"
              type="hype"
              attendees={["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5"]}
            />
            <PartyListItem
              title="Workout Mix"
              host="You"
              time="3 days ago"
              type="workout"
              attendees={[]}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;