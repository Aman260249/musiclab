"use client";
import React, { useState } from 'react';
import { useMusic } from '@/app/context/MusicContext';
import "@/app/styles/albums.css";

const AlbumsPage = () => {
  const { allSongs, playSong } = useMusic();
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // 1. Data grouping logic (Variable names fix kiye hain)
  const albums = allSongs.reduce((acc, song) => {
    const albumName = song.album || "Single Tracks";
    if (!acc[albumName]) {
      acc[albumName] = {
        name: albumName,
        artist: song.artist || "Unknown Artist",
        // FIX: song.image ke saath song.imageUrl bhi check karo
        image: song.imageUrl || song.image || "/default-album.png", 
        songs: []
      };
    }
    acc[albumName].songs.push(song);
    return acc;
  }, {});

  const albumList = Object.values(albums);

  // --- DETAIL VIEW ---
  if (selectedAlbum) {
    return (
      <div className="albums-page">
        <button className="back-btn" onClick={() => setSelectedAlbum(null)}>
          ← Back to Albums
        </button>
        
        <div className="album-detail-header">
          {/* FIX: Detail mein bhi image path check kiya */}
          <img src={selectedAlbum.image} alt={selectedAlbum.name} />
          <div className="detail-info">
            <h1>{selectedAlbum.name}</h1>
            <p>{selectedAlbum.artist} • {selectedAlbum.songs.length} Songs</p>
            <button className="play-all-btn" onClick={() => playSong(selectedAlbum.songs[0])}>
              Play All
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

  // --- GRID VIEW ---
  return (
    <div className="albums-page">
      <div className="albums-header">
        <h1>Your Albums</h1>
        <p>Aapke pasandida collections yahan hain.</p>
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
                <div className="album-play-overlay">▶</div>
              </div>
              <div className="album-info">
                <h3>{album.name}</h3>
                <p>{album.artist}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#888', textAlign: 'center', gridColumn: '1/-1' }}>
            Loading your albums...
          </p>
        )}
      </div>
    </div>
  );
};

export default AlbumsPage;