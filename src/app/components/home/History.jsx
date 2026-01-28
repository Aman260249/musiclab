"use client";

import React, { useMemo } from 'react';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '@/app/components/music/SongCard';
import "@/app/styles/history.css";

const History = () => {
  // --- 1. CONTEXT & DATA ---
  const { recentPlayed, user } = useMusic();

  // --- 2. LOGIC: UNIQUE HISTORY FILTERING ---
  // Using useMemo to optimize performance and prevent re-filtering on every render
  const uniqueHistory = useMemo(() => {
    if (!recentPlayed) return [];
    
    return recentPlayed.filter((song, index, self) =>
      index === self.findIndex((s) => s.id === song.id)
    );
  }, [recentPlayed]);

  // --- 3. AUTHENTICATION GUARD ---
  if (!user) {
    return (
      <div className="history-container">
        <div className="empty-history-state" style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2>Access Restricted 🛑</h2>
          <p>Please log in to view your listening history.</p>
        </div>
      </div>
    );
  }

  // --- 4. MAIN RENDER ---
  return (
    <div className="history-page">
      {/* Page Header */}
      <div className="history-header-section">
        <h1>Listening History</h1>
        <p>Your recently played tracks across all devices.</p>
      </div>

      {/* History Grid Display */}
      <div className="history-list-grid">
        {uniqueHistory.length > 0 ? (
          uniqueHistory.map((song) => (
            // Using song.id as a stable key for optimized list rendering
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          /* Empty State View */
          <div 
            className="no-history-msg" 
            style={{ gridColumn: '1/-1', textAlign: 'center', marginTop: '50px' }}
          >
            <p>No recently played tracks found. Start listening now! 🎧</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;