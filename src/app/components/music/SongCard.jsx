"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';
import "../../styles/songcard.css";

const SongCard = ({ song }) => {
  // --- 1. CONTEXT & STATE ---
  const { playSong, likedSongs, toggleLike } = useMusic(); 

  // Check if this specific song is in the user's liked collection
  const isLiked = likedSongs.some(s => s.id === song.id);

  // --- 2. EVENT HANDLERS ---
  /**
   * Prevents the card's onClick (playSong) from firing 
   * when the user only wants to toggle the Like status.
   */
  const handleLikeClick = (e) => {
    e.stopPropagation(); 
    toggleLike(song);
  };

  // --- 3. RENDER COMPONENT ---
  return (
    <motion.div 
      className="song-card"
      // Hover Effect: Card lifts slightly for better depth
      whileHover={{ y: -8, transition: { duration: 0.2 } }} 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => playSong(song)} 
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Thumbnail Container */}
      <div className="card-image-wrapper">
        <img 
          src={song.imageUrl || "/default-disk.png"} 
          alt={song.title} 
          loading="lazy"
        />
        
        {/* Floating Heart Button */}
        <button 
          className={`card-like-btn ${isLiked ? 'active' : ''}`} 
          onClick={handleLikeClick}
          aria-label={isLiked ? "Remove from Liked" : "Add to Liked"}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        {/* Play Icon Overlay on Hover */}
        <div className="play-overlay">
          <div className="play-btn-circle">▶</div>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="card-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="artist-name">{song.artist}</p>
      </div>
    </motion.div>
  );
};

export default SongCard;