"use client";

import React, { useState, useMemo } from 'react';
import { useMusic } from '@/app/context/MusicContext';
import { ChevronLeft, Play, Disc } from 'lucide-react';
import "@/app/styles/albums.css";

const AlbumsPage = () => {
  // --- 1. HOOKS & STATE MANAGEMENT ---
  const { allSongs, playSong } = useMusic();
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // --- 2. DATA PROCESSING (Grouping Songs into Albums) ---
  // Memoizing the list to prevent unnecessary re-renders
  const albumList = useMemo(() => {
    const albums = allSongs.reduce((acc, song) => {
      const albumName = song.album || "Single Tracks";
      
      if (!acc[albumName]) {
        acc[albumName] = {
          name: albumName,
          artist: song.artist || "Unknown Artist",
          image: song.imageUrl || song.image || "/default-album.png", 
          songs: []
        };
      }
      acc[albumName].songs.push(song);
      return acc;
    }, {});

    return Object.values(albums);
  }, [allSongs]);

  // --- 3. SUB-COMPONENT: ALBUM DETAIL VIEW ---
  // Displays when a specific album is selected
  if (selectedAlbum) {
    return (
      <div className="albums-page">
        {/* Navigation Header */}
        <button className="back-btn-minimal" onClick={() => setSelectedAlbum(null)}>
          <ChevronLeft size={18} /> Back to Library
        </button>
        
        {/* Album Metadata Header */}
        <div className="album-detail-header">
          <div className="detail-img-container">
            <img src={selectedAlbum.image} alt={selectedAlbum.name} />
          </div>
          <div className="detail-info">
            <h1>{selectedAlbum.name}</h1>
            <p>{selectedAlbum.artist} • {selectedAlbum.songs.length} Tracks</p>
            <button 
              className="play-all-btn" 
              onClick={() => playSong(selectedAlbum.songs[0])}
            >
              <Play size={20} fill="white" /> Play All
            </button>
          </div>
        </div>

        {/* Tracklist Table */}
        <div className="song-list">
          {selectedAlbum.songs.map((song, index) => (
            <div 
              key={song.id || index} 
              className="song-row" 
              onClick={() => playSong(song)}
            >
              <span className="index">{index + 1}</span>
              <div className="song-meta">
                <p className="song-name">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- 4. MAIN RENDER: ALBUM GRID VIEW ---
  return (
    <div className="albums-page">
      {/* Page Introduction */}
      <div className="albums-header">
        <h1>Your Albums</h1>
        <p>Curated collections for your mood.</p>
      </div>

      {/* Grid Display */}
      <div className="albums-grid">
        {albumList.length > 0 ? (
          albumList.map((album, index) => (
            <div 
              key={index} 
              className="album-card" 
              onClick={() => setSelectedAlbum(album)}
            >
              <div className="album-img-wrapper">
                <img src={album.image} alt={album.name} />
                <div className="album-play-overlay">
                  <Play size={22} fill="white" color="white" />
                </div>
              </div>
              <div className="album-info">
                <h3>{album.name}</h3>
                <p>{album.artist}</p>
              </div>
            </div>
          ))
        ) : (
          /* Fallback Loader while fetching data */
          <div className="loading-state-container">
             <Disc className="animate-spin" size={40} color="#1db954" />
             <p>Assembling your collection...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumsPage;