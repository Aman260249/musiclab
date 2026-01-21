"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // <--- Ye miss ho sakta hai
import { useMusic } from '@/app/context/MusicContext';
import "../../styles/home.css";

const RecommendedArtists = () => {
  const { allSongs = [] } = useMusic(); // Fallback to empty array

  // --- Logic: Unique Artists nikalna ---
  const uniqueArtists = allSongs.reduce((acc, song) => {
    // Check if artist name exists and isn't already in our accumulator
    if (song.artist && !acc.find(a => a.name === song.artist)) {
      acc.push({
        name: song.artist,
        // Priority: Admin's Artist Image -> Song Image -> Default Icon
        img: song.artistImage || song.imageUrl || song.image || "/default-artist.png", 
        id: song.artist.toLowerCase().trim().replace(/\s+/g, '-') 
      });
    }
    return acc;
  }, []);

  if (uniqueArtists.length === 0) return null; // Kuch na dikhao agar artists nahi hain

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2>Recommended Artists</h2>
        <Link href="/artists" className="see-all">See ALL</Link>
      </div>
      
      <div className="songs-container">
        {uniqueArtists.map((artist) => (
          <Link 
            href={`/artist/${artist.id}`} 
            key={artist.id} 
            style={{ textDecoration: 'none' }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="artist-card"
            >
              <div className="artist-image-wrapper">
                <img 
                  src={artist.img} 
                  alt={artist.name} 
                  onError={(e) => { e.target.src = "/default-artist.png" }} // Broken link safety
                />
              </div>
              <p className="artist-name-label">{artist.name}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedArtists;