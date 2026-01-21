"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMusic } from '@/app/context/MusicContext';
import "@/app/styles/all-artists.css"; 

const AllArtistsPage = () => {
  const { allSongs = [] } = useMusic();

  // Logic: Unique Artists ki list banana (Fixed 'artists' typo)
  const uniqueArtists = allSongs.reduce((acc, song) => {
    // Hamare Database mein field ka naam 'artist' hai, isliye song.artist use kiya
    if (song.artist && !acc.find(a => a.name === song.artist)) {
      acc.push({
        name: song.artist,
        img: song.artistImage || song.imageUrl || song.image || "/default-artist.png",
        id: song.artist.toLowerCase().trim().replace(/\s+/g, '-')
      });
    }
    return acc;
  }, []);

  return (
    <div className="all-artists-wrapper">
      <div className="section-header">
        <h1 style={{ fontSize: '32px', fontWeight: '800' }}>All Artists</h1>
        <p style={{ color: '#b3b3b3' }}>Explore music from your favorite creators</p>
      </div>

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
                className="artists-card"
              >
                <div className="artists-image-wrapper">
                  <img 
                    src={artist.img} 
                    alt={artist.name} 
                    onError={(e) => { e.target.src = "/default-artist.png" }} 
                  />
                </div>
                <p className="artists-name-label">{artist.name}</p>
              </motion.div>
            </Link>
          ))
        ) : (
          <p>No artists found. Add songs to see them here!</p>
        )}
      </div>
    </div>
  );
};

export default AllArtistsPage;