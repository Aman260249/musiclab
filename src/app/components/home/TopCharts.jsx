"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useMusic } from '@/app/context/MusicContext'; // Context lo
import SongCard from '../music/SongCard';
import "../../styles/home.css";

const TopCharts = () => {
  const { allSongs } = useMusic(); // Firebase data yahan se aayega

  // --- Logic: Sirf Top Charts wale gaane filter karo ---
  const topChartsSongs = allSongs
    .filter(song => song.isTopChart === true) // Wahi gaane jinka isTopChart true hai
    .slice(0, 5); // Sirf top 5 dikhao (Spotify style)

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2>Top Charts</h2>
        <motion.span 
          whileHover={{ scale: 1.1 }}
          className="see-all"
        >
          See ALL
        </motion.span>
      </div>
      
      <div className="songs-container">
        {topChartsSongs.length > 0 ? (
          topChartsSongs.map((song, index) => (
            <div key={song.id} className="chart-wrapper">
              {/* Rank number: 1, 2, 3... */}
              <span className="rank-number">{index + 1}</span>
              <SongCard song={song} />
            </div>
          ))
        ) : (
          <p style={{ color: '#888', padding: '10px' }}>No songs in Top Charts yet.</p>
        )}
      </div>
    </section>
  );
};

export default TopCharts;