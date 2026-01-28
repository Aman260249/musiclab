"use client";

import React, { useMemo } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Repeat, Shuffle, Volume2, Heart, ListMusic 
} from 'lucide-react';
import { useMusic } from '../../context/MusicContext';
import "../../styles/layout.css"; 

const Footer = () => {
  // --- 1. CONTEXT EXTRACTION ---
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    currentTime, 
    duration, 
    seekTo,
    volume, 
    changeVolume,
    skipNext,
    skipPrevious 
  } = useMusic();

  // --- 2. HELPER FUNCTIONS ---
  
  /**
   * Formats raw seconds into a readable MM:SS format
   * @param {number} time - Time in seconds
   */
  const formatTime = (time) => {
    if (isNaN(time) || time === null) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Memoizing progress percentage for smooth UI updates
  const progressPercent = useMemo(() => {
    return (currentTime / duration) * 100 || 0;
  }, [currentTime, duration]);

  // --- 3. CONDITIONAL RENDER (Empty State) ---
  if (!currentSong) {
    return (
      <footer className="music-player-container">
        <div className="player-empty-state">
          <p>Select a track to start the rhythm!</p>
        </div>
      </footer>
    );
  }

  // --- 4. MAIN PLAYER VIEW ---
  return (
    <footer className="music-player-container">
      <div className="player-glass-bg"></div>
      
      <div className="music-player-content">
        
        {/* --- SECTION: SONG INFO --- */}
        <div className="player-left">
          <div className="current-song-img">
            <img 
              src={currentSong.image || currentSong.imageUrl || currentSong.img || "/default-disk.png"} 
              alt={currentSong.title} 
              onError={(e) => { 
                e.target.onerror = null;
                e.target.src = "/default-disk.png"; 
              }} 
            />
          </div>
          <div className="current-song-details">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
          <Heart size={18} className="like-icon" />
        </div>

        {/* --- SECTION: CONTROLS & PROGRESS --- */}
        <div className="player-center">
          <div className="controls">
            <Shuffle size={18} className="secondary-icon" />
            
            <SkipBack 
              size={24} 
              className="main-icon clickable" 
              fill="currentColor" 
              onClick={skipPrevious} 
            />
            
            <button className="play-pause-btn-pro" onClick={togglePlay}>
              {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} />}
            </button>

            <SkipForward 
              size={24} 
              className="main-icon clickable" 
              fill="currentColor" 
              onClick={skipNext} 
            />
            
            <Repeat size={18} className="secondary-icon" />
          </div>
          
          {/* Seek Bar */}
          <div className="progress-container-pro">
            <span className="time-label">{formatTime(currentTime)}</span>
            
            <div 
              className="progress-bar-pro" 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                seekTo(percent * duration);
              }}
            >
              <div 
                className="progress-filled-pro" 
                style={{ width: `${progressPercent}%` }}
              >
                <div className="progress-knob"></div>
              </div>
            </div>

            <span className="time-label">{formatTime(duration)}</span>
          </div>
        </div>

        {/* --- SECTION: VOLUME & UTILITIES --- */}
        <div className="player-right">
          <ListMusic size={20} className="secondary-icon" />
          <div className="volume-control">
            <Volume2 size={20} />
            <div className="volume-bar-wrapper">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => changeVolume(e.target.value)}
                className="volume-slider-input" 
              />
              <div className="volume-bar-pro">
                <div 
                  className="volume-filled-pro" 
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;