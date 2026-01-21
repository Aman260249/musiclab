"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';
import "../../styles/songcard.css";

const SongCard = ({ song }) => {
  // Context se zaroori cheezein nikali
  const { playSong, likedSongs, toggleLike } = useMusic(); 

  // Check karo ki ye gaana liked hai ya nahi
  const isLiked = likedSongs.some(s => s.id === song.id);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 👈 Ye gaana bajne se rokega jab tum sirf like karoge
    toggleLike(song);
  };

  return (
    <motion.div 
      className="song-card"
      whileHover={{ y: -10 }} 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => playSong(song)} 
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <div className="card-image-wrapper">
        <img src={song.imageUrl} alt={song.title} />
        
        {/* Like Button - Image ke upar mast dikhega */}
        <button 
          className={`card-like-btn ${isLiked ? 'active' : ''}`} 
          onClick={handleLikeClick}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        <div className="play-overlay">
          <div className="play-btn-circle">▶</div>
        </div>
      </div>

      <div className="card-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="artist-name">{song.artist}</p>
      </div>
    </motion.div>
  );
};

export default SongCard;