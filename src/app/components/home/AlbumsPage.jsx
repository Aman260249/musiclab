"use client";
import React, { useState } from 'react';
import { useMusic } from '@/app/context/MusicContext';
import { ChevronLeft, Play, Disc } from 'lucide-react';
import "@/app/styles/albums.css";

const AlbumsPage = () => {
  const { allSongs, playSong } = useMusic();
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Album Grouping Logic
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

  const albumList = Object.values(albums);

  // --- 1. DETAIL VIEW (After Clicking an Album) ---
  if (selectedAlbum) {
    return (
      <div className="albums-page">
        <button className="back-btn-minimal" onClick={() => setSelectedAlbum(null)}>
          <ChevronLeft size={18} /> Back to Library
        </button>
        
        <div className="album-detail-header">
          <div className="detail-img-container">
            <img src={selectedAlbum.image} alt={selectedAlbum.name} />
          </div>
          <div className="detail-info">
            <h1>{selectedAlbum.name}</h1>
            <p>{selectedAlbum.artist} • {selectedAlbum.songs.length} Tracks</p>
            <button className="play-all-btn" onClick={() => playSong(selectedAlbum.songs[0])}>
              <Play size={20} fill="white" /> Play All
            </button>
          </div>
        </div>

        <div className="song-list">
          {selectedAlbum.songs.map((song, index) => (
            <div key={song.id || index} className="song-row" onClick={() => playSong(song)}>
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

  // --- 2. GRID VIEW (Main Albums Page) ---
  return (
    <div className="albums-page">
      <div className="albums-header">
        <h1>Your Albums</h1>
        <p>Curated collections for your mood.</p>
      </div>

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
          <div className="loading-state" style={{ textAlign: 'center', gridColumn: '1/-1', padding: '100px 0' }}>
             <Disc className="animate-spin" size={40} color="#1db954" />
             <p style={{ marginTop: '10px', color: '#888' }}>Loading your vibe...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumsPage;