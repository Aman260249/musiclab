"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMusic } from '@/app/context/MusicContext';
import "../../styles/home.css";

const RecommendedArtists = () => {
  const { allSongs = [] } = useMusic();
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Data filtering logic
    if (allSongs.length > 0) {
      const seen = new Set();
      const filtered = allSongs.reduce((acc, song) => {
        if (song.artist && !seen.has(song.artist)) {
          seen.add(song.artist);
          acc.push({
            name: song.artist,
            img: song.artistImage || song.imageUrl || song.image || "/default-artist.png", 
            id: song.artist.toLowerCase().trim().replace(/\s+/g, '-') 
          });
        }
        return acc;
      }, []);
      setUniqueArtists(filtered);
      setIsLoaded(true);
    }
  }, [allSongs]);

  // Agar data load nahi hua, toh gayab hone ki jagah khali space rakhega
  if (!isLoaded && allSongs.length === 0) {
    return <div className="trending-section" style={{ height: '200px', opacity: 0 }}></div>;
  }

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Artists to Follow</h2>
        <Link href="/profileartis" className="see-all">See ALL</Link>
      </div>
      
      <div className="songs-container artist-grid-layout">
        {uniqueArtists.map((artist) => (
          <Link 
            href={`/artist/${artist.id}`} 
            key={artist.id} 
            style={{ textDecoration: 'none' }}
          >
            <motion.div 
              whileTap={{ scale: 0.95 }} 
              className="artist-card"
            >
              <div className="artist-image-wrapper">
                <img 
                  src={artist.img} 
                  alt={artist.name} 
                  loading="lazy"
                  onError={(e) => { e.target.src = "/default-artist.png" }}
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