"use client";
import React from 'react';
import { Play, Pause, Heart, MoreHorizontal, CheckCircle2, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusic } from '@/app/context/MusicContext'; 
import { useParams, useRouter } from 'next/navigation';
import "@/app/styles/artist.css";

const ArtistPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { allSongs, playSong, currentSong, isPlaying, searchQuery, togglePlay, setAllSongs } = useMusic();

  // Artist ke songs filter kar rahe hain
  const artistSongs = allSongs.filter(song => {
    const songArtistId = song.artist?.toLowerCase().replace(/\s+/g, '-');
    return songArtistId === id;
  });

  const artistName = artistSongs.length > 0 ? artistSongs[0].artist : "Artist";
  const artistImg = artistSongs.length > 0 ? (artistSongs[0].artistImage || artistSongs[0].imageUrl || artistSongs[0].image) : "";

  // Loading state agar data nahi aaya
  if (allSongs.length === 0) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="artist-page">
      {/* Back Button - Navigation ke liye */}
      <button 
        onClick={() => router.back()} 
        className="back-btn" 
        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', padding: '8px', color: 'white', cursor: 'pointer' }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Hero Header Section */}
      <div className="artist-header" style={{ 
        backgroundImage: `linear-gradient(transparent, rgba(18,18,18,1)), url(${artistImg || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9'})` 
      }}>
        <div className="header-content">
          <div className="verified">
            <CheckCircle2 size={16} fill="#3d91ff" color="white" />
            <span>Verified Artist</span>
          </div>
          <h1>{artistName}</h1>
          <p>Global Streaming Artist</p>
        </div>
      </div>

      {/* Actions Section - Follow button yahan se remove kar diya hai */}
      <div className="artist-actions">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="main-play-btn"
          onClick={() => {
            if (currentSong?.artist === artistName) togglePlay();
            else { 
              setAllSongs(artistSongs); 
              playSong(artistSongs[0]); 
            }
          }}
        >
          {(isPlaying && currentSong?.artist === artistName) ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
        </motion.button>
        
        {/* Sirf More icon rakha hai */}
        <MoreHorizontal color="#666" style={{ cursor: 'pointer', marginLeft: '10px' }} />
      </div>

      {/* Tracks List Section */}
      <div className="songs-list-container">
        <h2 className="section-title">Popular Tracks</h2>
        
        <div className="songs-table">
          {/* Table Header - Mobile par display: none rahega CSS se */}
          <div className="table-header">
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Category</span>
            <span style={{ textAlign: 'right' }}>Action</span>
          </div>
          
          {artistSongs.map((song, index) => (
            <div 
              key={song.id || index} 
              className={`song-row ${currentSong?.id === song.id ? "active-song" : ""}`}
              onClick={() => {
                setAllSongs(artistSongs);
                playSong(song);
              }}
            >
              <span className="song-num">
                {currentSong?.id === song.id && isPlaying ? "🔊" : index + 1}
              </span>

              <div className="song-title-cell">
                <img src={song.image || song.imageUrl} alt={song.title} loading="lazy" />
                <div className="song-info">
                   <p className="song-name-text" style={{ color: currentSong?.id === song.id ? "#1db954" : "inherit", margin: 0 }}>
                    {song.title}
                  </p>
                </div>
              </div>

              {/* Ye columns mobile par hide ho jayenge */}
              <span className="song-album">{song.album || "Single"}</span>
              <span className="song-plays">{song.category || "Music"}</span>
              
              <span className="song-duration">
                <Heart size={18} color={currentSong?.id === song.id ? "#1db954" : "#ccc"} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;