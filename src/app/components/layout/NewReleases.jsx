"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '../music/SongCard';
import "../../styles/home.css";

const NewReleases = () => {
  // --- 1. CONTEXT DATA ---
  const { allSongs = [] } = useMusic();

  // --- 2. DATA LOGIC: FILTER & SORT ---
  /**
   * We filter songs marked as new releases and reverse the array 
   * to show the absolute latest ones first. 
   * useMemo ensures this only happens when allSongs changes.
   */
  const newReleaseSongs = useMemo(() => {
    const filtered = allSongs.filter(song => song.isNewRelease === true);
    return [...filtered].reverse(); // Latest releases at the top
  }, [allSongs]);

  // --- 3. MAIN RENDER ---
  return (
    <section className="trending-section">
      {/* Header with Navigation Link */}
      <div className="section-header">
        <h2>New Releases</h2>
        <Link href="/new-releases" className="see-all">
          See ALL
        </Link>
      </div>
      
      {/* Horizontal Scroll/Grid Container */}
      <div className="songs-container">
        {newReleaseSongs.length > 0 ? (
          newReleaseSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          /* Placeholder while data is fetching or if empty */
          <div className="empty-release-state">
            <p style={{ color: '#888', fontSize: '0.9rem' }}>
              Fresh tracks are on the way...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewReleases;