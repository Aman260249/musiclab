"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMusic } from '@/app/context/MusicContext';
import "../../styles/home.css";

const RecommendedArtists = () => {
  // --- 1. CONTEXT & STATE ---
  const { allSongs = [] } = useMusic();
  const [isLoaded, setIsLoaded] = useState(false);

  // --- 2. DATA PROCESSING (Filtering Unique Artists) ---
  // Using useMemo to prevent re-filtering on every re-render
  const uniqueArtists = useMemo(() => {
    if (allSongs.length === 0) return [];

    const seen = new Set();
    return allSongs.reduce((acc, song) => {
      if (song.artist && !seen.has(song.artist)) {
        seen.add(song.artist);
        acc.push({
          name: song.artist,
          img: song.artistImage || song.imageUrl || song.image || "/default-artist.png",
          // Creating a URL-friendly slug for navigation
          id: song.artist.toLowerCase().trim().replace(/\s+/g, '-') 
        });
      }
      return acc;
    }, []);
  }, [allSongs]);

  // --- 3. LIFECYCLE EFFECTS ---
  useEffect(() => {
    if (allSongs.length > 0) {
      setIsLoaded(true);
    }
  }, [allSongs]);

  // --- 4. RENDER: LOADING / FALLBACK STATE ---
  if (!isLoaded && allSongs.length === 0) {
    return (
      <div 
        className="trending-section" 
        style={{ height: '200px', opacity: 0 }}
      >
        {/* Transparent placeholder to prevent layout shift */}
      </div>
    );
  }

  // --- 5. MAIN RENDER: ARTIST GRID ---
  return (
    <section className="trending-section">
      {/* Header Section */}
      <div className="section-header">
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
          Artists to Follow
        </h2>
        <Link href="/profileartis" className="see-all">
          See ALL
        </Link>
      </div>
      
      {/* Artist Grid Layout */}
      <div className="songs-container artist-grid-layout">
        {uniqueArtists.map((artist) => (
          <Link 
            href={`/artist/${artist.id}`} 
            key={artist.id} 
            style={{ textDecoration: 'none' }}
          >
            <motion.div 
              whileHover={{ y: -5 }} // Subtle hover lift
              whileTap={{ scale: 0.95 }} 
              className="artist-card"
            >
              {/* Image Container with Fallback Handling */}
              <div className="artist-image-wrapper">
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
              <p className="artist-name-label">{artist.name}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedArtists;