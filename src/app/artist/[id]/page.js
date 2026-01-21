"use client";
import React from 'react';
import { Play, Pause, Heart, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusic } from '@/app/context/MusicContext'; 
import { useParams } from 'next/navigation'; // URL se ID lene ke liye
import "@/app/styles/artist.css";

const ArtistPage = () => {
  const { id } = useParams(); // URL se artist ID lo (e.g., 'arijit-singh')
  const { allSongs, playSong, currentSong, isPlaying, searchQuery, togglePlay, setAllSongs } = useMusic();

  // --- 1. Filter Songs from Firebase ---
  // Hum pooray allSongs mein se is artist ke gaane nikal rahe hain
  const artistSongs = allSongs.filter(song => {
    const songArtistId = song.artist?.toLowerCase().replace(/\s+/g, '-');
    return songArtistId === id;
  });

  // Agar gaane mil gaye, toh pehle gaane se artist ka real name lo
  const artistName = artistSongs.length > 0 ? artistSongs[0].artist : "Artist";
  const artistImg = artistSongs.length > 0 ? (artistSongs[0].image || artistSongs[0].imageUrl) : "";

  // --- 2. Logic: Search Query filter ---
  const filteredArtistSongs = artistSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayAll = () => {
    if (artistSongs.length === 0) return;
    
    if (currentSong?.artist === artistName) {
      togglePlay();
    } else {
      // Pura playlist update karo aur pehla gaana bajao
      setAllSongs(artistSongs);
      playSong(artistSongs[0]);
    }
  };

  const handleSongClick = (song) => {
    setAllSongs(artistSongs); // Taki 'Next' dabane par isi artist ke gaane bajein
    playSong(song);
  };

  if (allSongs.length === 0) return <div className="artist-page">Loading...</div>;

  return (
    <div className="artist-page">
      {/* 1. Hero Banner - Dynamic Image */}
      <div className="artist-header" style={{ 
        backgroundImage: `linear-gradient(transparent, rgba(0,0,0,0.8)), url(${artistImg || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9'})` 
      }}>
        <div className="header-content">
          <div className="verified">
            <CheckCircle2 size={20} fill="#3d91ff" color="white" />
            <span>Verified Artist</span>
          </div>
          <h1>{artistName}</h1>
          <p>Global Streaming Artist</p>
        </div>
      </div>

      {/* 2. Action Bar */}
      <div className="artist-actions">
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          className="main-play-btn"
          onClick={handlePlayAll}
        >
          {(isPlaying && currentSong?.artist === artistName) ? <Pause fill="black" /> : <Play fill="black" />}
        </motion.button>
        <button className="follow-btn">Follow</button>
        <MoreHorizontal color="#666" cursor="pointer" />
      </div>

      {/* 3. Popular Songs List from Firebase */}
      <div className="songs-list-container">
        <h2>{searchQuery ? `Searching for "${searchQuery}"` : "Popular Tracks"}</h2>
        <div className="songs-table">
          <div className="table-header">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Category</span>
            <span>Action</span>
          </div>
          
          {filteredArtistSongs.length > 0 ? (
            filteredArtistSongs.map((song, index) => (
              <motion.div 
                key={song.id} 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className={`song-row ${currentSong?.id === song.id ? "active-song" : ""}`}
                onClick={() => handleSongClick(song)}
                style={{ cursor: 'pointer' }}
              >
                <span className="song-num">
                  {currentSong?.id === song.id && isPlaying ? "🔊" : index + 1}
                </span>
                <div className="song-title-cell">
                  <img src={song.image || song.imageUrl} alt="" />
                  <span style={{ color: currentSong?.id === song.id ? "#1db954" : "inherit" }}>
                    {song.title}
                  </span>
                </div>
                <span className="song-album">{song.album || "Single"}</span>
                <span className="song-plays">{song.category || "Music"}</span>
                <span className="song-duration"><Heart size={16} /></span>
              </motion.div>
            ))
          ) : (
            <div style={{ padding: "20px", color: "#888" }}>
              Is artist ka koi gaana nahi mila. Admin panel se add karo!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;