"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMusic } from '@/app/context/MusicContext'; // Context import kiya
import SongCard from '../music/SongCard';
import "../../styles/home.css";

const TrendingNow = () => {
  const { allSongs } = useMusic(); // Firebase data yahan se lo

  return (
    <section className="trending-section">
    <div className="section-header">
  <h2>Trending Now</h2>
  {/* Link ke andar motion.span dala hai taaki hover bhi kare aur click bhi */}
  <Link href="/trending" style={{ textDecoration: 'none' }}>
    <motion.span 
      whileHover={{ scale: 1.1 }} 
      className="see-all"
      style={{ cursor: 'pointer' }}
    >
      See ALL
    </motion.span>
  </Link>
</div>
      <div className="songs-container">
        {/* Firebase se aaye hue pehle 10 gaane dikhao */}
        {allSongs.slice(0, 10).map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default TrendingNow;