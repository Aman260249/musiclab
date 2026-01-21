"use client";
import React from 'react';
import { useMusic } from '../context/MusicContext';
import SongCard from '../components/music/SongCard'; // Path apne hisab se check kar lena
import "../styles/liked-songs.css";

const LikedSongsPage = () => {
  const { likedSongs, user } = useMusic();

  if (!user) {
    return (
      <div className="empty-state">
        <h2>Bhai, pehle login toh kar lo! 😂</h2>
        <p>Login karoge tabhi toh apni pasand dikhegi.</p>
      </div>
    );
  }

  return (
    <div className="liked-songs-container">
      {/* Header Section */}
      <div className="liked-header">
        <div className="heart-icon-big">❤️</div>
        <div className="header-text">
          <p>PLAYLIST</p>
          <h1>Liked Songs</h1>
          <span>{user.email.split('@')[0]} • {likedSongs.length} songs</span>
        </div>
      </div>

      <hr className="divider" />

      {/* Songs Grid */}
      <div className="liked-songs-grid">
        {likedSongs.length > 0 ? (
          likedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          <div className="no-songs">
            <h3>Abhi tak koi gaana pasand nahi aaya?</h3>
            <p>Home par jao aur kuch mast music dhoondo! 🎧</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongsPage;