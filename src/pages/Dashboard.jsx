
// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';

import HostCard from '../components/party/hostCard';
import JoinCard from '../components/party/joinCard';
import PartyListItem from '../components/party/partyListItem';
import './css/Dashboard.css';

const Dashboard = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Redirect if not logged in
  useEffect(() => {
    if (!user?.id) {
      navigate('/auth');
    }
  }, []);

  const fetchParties = async () => {
    if (!user.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/party/user/${user.id}`);
      const data = await response.json();
      if (data.success) {
        setParties(data.parties);
      }
    } catch (error) {
      console.error('Failed to fetch parties:', error);
    }
    setLoading(false);
  };

  // Delete party function
  const deleteParty = async (partyId) => {
    try {
      const response = await fetch(`${API_URL}/party/${partyId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setParties(parties.filter(p => p.id !== partyId));
      } else {
        alert(data.message || 'Failed to delete party');
      }
    } catch (error) {
      console.error('Failed to delete party:', error);
      alert('Failed to delete party');
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="relative w-full">
      <div className="ambient-glow top-[-200px] left-[-200px]"></div>
      <div className="ambient-glow bottom-[-300px] right-[-100px]" style={{ background: 'radial-gradient(circle, rgba(54, 226, 123, 0.05) 0%, rgba(17, 33, 23, 0) 70%)' }}></div>

      <div className="relative z-10 w-full animate-fade-in-up">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Hey {user.name?.split(' ')[0] || 'there'}, let's set the <span className="text-primary">vibe</span>.
          </h1>
          <p className="text-lg text-white/60">Choose your path to the perfect playlist.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <HostCard />
          <JoinCard />
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Your Parties</h3>
          </div>

          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                <span className="material-symbols-outlined animate-spin text-3xl">sync</span>
                <p className="mt-2">Loading parties...</p>
              </div>
            ) : parties.length === 0 ? (
              <div className="text-center py-8 text-gray-400 bg-white/5 rounded-2xl border border-white/10">
                <span className="material-symbols-outlined text-4xl mb-2">celebration</span>
                <p>No parties yet. Create your first one!</p>
              </div>
            ) : (
              parties.map(party => (
                <PartyListItem
                  key={party.id}
                  id={party.id}
                  title={party.vibeDescription?.slice(0, 30) || 'Untitled Party'}
                  host="You"
                  time={timeAgo(party.createdAt)}
                  type="music"
                  attendees={party.members?.map(m => m.avatarUrl || `https://i.pravatar.cc/150?u=${m.email}`) || []}
                  canDelete={true}
                  onDelete={deleteParty}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;