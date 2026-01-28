"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMusic } from '@/app/context/MusicContext';
import "@/app/styles/all-artists.css"; 

const AllArtistsPage = () => {
  const { allSongs = [] } = useMusic();

  // --- 1. OPTIMIZED DATA LOGIC ---
  /**
   * We use useMemo to extract unique artists from the allSongs array.
   * This prevents re-calculation on every re-render unless songs change.
   */
  const uniqueArtists = useMemo(() => {
    return allSongs.reduce((acc, song) => {
      // Logic: If artist exists and isn't already in our accumulator
      if (song.artist && !acc.find(a => a.name === song.artist)) {
        acc.push({
          name: song.artist,
          // Image Priority: Specific Artist Image > Song Thumbnail > Default
          img: song.artistImage || song.imageUrl || song.image || "/default-artist.png",
          id: song.artist.toLowerCase().trim().replace(/\s+/g, '-')
        });
      }
      return acc;
    }, []);
  }, [allSongs]);

  // --- 2. RENDER UI ---
  return (
    <div className="all-artists-wrapper">
      <header className="section-header">
        <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          All Artists
        </h1>
        <p style={{ color: '#b3b3b3', marginTop: '4px' }}>
          Explore music from your favorite creators
        </p>
      </header>

      <div className="artists-grid">
        {uniqueArtists.length > 0 ? (
          uniqueArtists.map((artist) => (
            <Link 
              href={`/artist/${artist.id}`} 
              key={artist.id} 
              className="artist-card-link"
            >
              <motion.div 
                whileHover={{ scale: 1.05, translateY: -5 }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="artists-card"
              >
                <div className="artists-image-wrapper">
                  <img 
                    src={artist.img} 
                    alt={artist.name} 
                    loading="lazy"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "/default-artist.png"; 
                    }} 
                  />
                </div>
                <p className="artists-name-label">{artist.name}</p>
                <span className="artist-badge">Artist</span>
              </motion.div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <p>No artists found. Start building your library!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArtistsPage;