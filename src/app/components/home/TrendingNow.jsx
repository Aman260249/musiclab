"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '../music/SongCard';
import "../../styles/home.css";

const TrendingNow = () => {
  // --- 1. CONTEXT DATA ---
  const { allSongs = [] } = useMusic();

  // --- 2. DATA PROCESSING ---
  // Memoizing the slice to ensure it only recalculates when allSongs changes
  const trendingSongs = useMemo(() => {
    return allSongs.slice(0, 10);
  }, [allSongs]);

  // --- 3. MAIN RENDER ---
  return (
    <section className="trending-section">
      {/* Header Section */}
      <div className="section-header">
        <h2>Trending Now</h2>
        
        <Link href="/trending" style={{ textDecoration: 'none' }}>
          <motion.span 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="see-all"
            style={{ cursor: 'pointer', display: 'inline-block' }}
          >
            See ALL
          </motion.span>
        </Link>
      </div>

      {/* Songs Display Grid */}
      <div className="songs-container">
        {trendingSongs.length > 0 ? (
          trendingSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          /* Fallback if no songs are available */
          <div className="loading-placeholder">
            <p style={{ color: '#666' }}>Fetching the latest hits...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingNow;