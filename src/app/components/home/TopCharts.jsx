"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '../music/SongCard';
import "../../styles/home.css";

const TopCharts = () => {
  // --- 1. CONTEXT DATA ---
  const { allSongs = [] } = useMusic();

  // --- 2. FILTERING LOGIC ---
  // Memoizing the filtered list for better performance
  const topChartsSongs = useMemo(() => {
    return allSongs
      .filter(song => song.isTopChart === true) // Filter only verified top hits
      .slice(0, 5); // Limit to top 5 for a clean UI
  }, [allSongs]);

  // --- 3. MAIN RENDER ---
  return (
    <section className="trending-section">
      {/* Header Section */}
      <div className="section-header">
        <h2>Top Charts</h2>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/top-charts" className="see-all">
            See ALL
          </Link>
        </motion.div>
      </div>
      
      {/* Charts Grid/List Container */}
      <div className="songs-container">
        {topChartsSongs.length > 0 ? (
          topChartsSongs.map((song, index) => (
            <div key={song.id || index} className="chart-wrapper">
              {/* Ranking Indicator: Standard for Top Charts */}
              <span className="rank-number">{index + 1}</span>
              
              {/* Reusable Song Component */}
              <SongCard song={song} />
            </div>
          ))
        ) : (
          /* Empty State Handling */
          <div className="empty-charts-fallback">
            <p style={{ color: '#888', padding: '10px' }}>
              No songs currently trending in Top Charts.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCharts;