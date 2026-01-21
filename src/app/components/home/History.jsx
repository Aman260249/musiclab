"use client";
import React from 'react';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '@/app/components/music/SongCard';
import "@/app/styles/history.css";

const History = () => {
  const { recentPlayed, user } = useMusic();

  // 1. Login Check
  if (!user) {
    return (
      <div className="history-container">
        <div className="empty-history-state" style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2>Oops! 🛑</h2>
          <p>History dekhne ke liye login karna zaroori hai.</p>
        </div>
      </div>
    );
  }

  // 2. Duplicates Hatane ka Logic (Sirf unique songs dikhaye)
  const uniqueHistory = recentPlayed?.filter((song, index, self) =>
    index === self.findIndex((s) => s.id === song.id)
  ) || [];

  return (
    <div className="history-page">
      <div className="history-header-section">
        <h1>Listening History</h1>
        <p>Aapne haal hi mein ye gaane sune hain</p>
      </div>

      <div className="history-list-grid">
        {uniqueHistory.length > 0 ? (
          uniqueHistory.map((song) => (
            // Key sirf ID rakho unique hone ke liye
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          <div className="no-history-msg" style={{ gridColumn: '1/-1', textAlign: 'center', marginTop: '50px' }}>
            <p>Abhi tak koi history nahi hai. Gaane sunna shuru karein! 🎧</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;