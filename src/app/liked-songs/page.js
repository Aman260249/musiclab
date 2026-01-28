"use client";

import React from 'react';
import { useMusic } from '../context/MusicContext';
import SongCard from '../components/music/SongCard';
import "@/app/styles/liked-songs.css";

const LikedSongsPage = () => {
  // --- 1. DATA FROM CONTEXT ---
  const { likedSongs, user } = useMusic();

  // --- 2. AUTHENTICATION GUARD ---
  if (!user) {
    return (
      <div className="empty-state">
        <div className="empty-content">
          <h2>Authentication Required 🛑</h2>
          <p>Please log in to access your personal library and liked tracks.</p>
        </div>
      </div>
    );
  }

  // --- 3. MAIN RENDER ---
  return (
    <div className="liked-songs-container">
      {/* Header Section: Spotify Inspired Hero Layout */}
      <div className="liked-header">
        <div className="heart-icon-big">
          <span role="img" aria-label="heart">❤️</span>
        </div>
        <div className="header-text">
          <p className="playlist-label">PLAYLIST</p>
          <h1 className="playlist-title">Liked Songs</h1>
          <div className="playlist-stats">
            <span className="user-name">{user.email?.split('@')[0]}</span>
            <span className="dot">•</span>
            <span>{likedSongs.length} songs</span>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Songs Display Logic */}
      <div className="liked-songs-grid">
        {likedSongs.length > 0 ? (
          /* Grid of Liked Tracks */
          likedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          /* Empty State: Prompt user to add songs */
          <div className="no-songs">
            <h3>Your collection is empty</h3>
            <p>Start exploring and heart your favorite tracks to see them here! 🎧</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongsPage;