"use client";
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, ListMusic } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';
import "../../styles/layout.css"; 

const Footer = () => {
  // Context se saari required values nikali, including skip functions
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    currentTime, 
    duration, 
    seekTo,
    volume, 
    changeVolume,
    skipNext,      // Naya: Agla gaana bajane ke liye
    skipPrevious   // Naya: Pichla gaana bajane ke liye
  } = useMusic();

  // Time format function (0:00)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Progress bar percentage
  const progressPercent = (currentTime / duration) * 100 || 0;

  if (!currentSong) return <footer className="music-player-container">Select a song!</footer>;

  return (
    <footer className="music-player-container">
      <div className="player-glass-bg"></div>
      <div className="music-player-content">
        
        {/* 1. Song Info */}
        <div className="player-left">
          <div className="current-song-img">
           <img 
    src={currentSong.image || currentSong.imageUrl || currentSong.img || "/default-disk.png"} 
    alt={currentSong.title} 
    onError={(e) => { e.target.src = "/default-disk.png"; }} // Agar link hi kharab ho toh default image dikhao
  />
          </div>
          <div className="current-song-details">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
          <Heart size={18} className="like-icon" />
        </div>

        {/* 2. Controls & Progress Bar */}
        <div className="player-center">
          <div className="controls">
            <Shuffle size={18} className="secondary-icon" />
            
            {/* Skip Previous Button */}
            <SkipBack 
              size={24} 
              className="main-icon" 
              fill="currentColor" 
              onClick={skipPrevious} 
              style={{ cursor: 'pointer' }}
            />
            
            <div className="play-pause-btn-pro" onClick={togglePlay}>
              {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} />}
            </div>

            {/* Skip Next Button */}
            <SkipForward 
              size={24} 
              className="main-icon" 
              fill="currentColor" 
              onClick={skipNext} 
              style={{ cursor: 'pointer' }}
            />
            
            <Repeat size={18} className="secondary-icon" />
          </div>
          
          <div className="progress-container-pro">
            <span className="time">{formatTime(currentTime)}</span>
            
            <div className="progress-bar-pro" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              seekTo(percent * duration);
            }}>
              <div 
                className="progress-filled-pro" 
                style={{ width: `${progressPercent}%` }}
              >
                <div className="progress-knob"></div>
              </div>
            </div>

            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* 3. Volume Section */}
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