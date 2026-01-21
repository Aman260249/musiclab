"use client";
import React from 'react';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '../music/SongCard';
import "../../styles/home.css";

const NewReleases = () => {
  const { allSongs } = useMusic();
  
  // Filter: Sirf New Releases
  const newReleases = allSongs.filter(song => song.isNewRelease === true);

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2>New Releases</h2>
        <span className="see-all">See ALL</span>
      </div>
      
      <div className="songs-container">
        {[...newReleases].reverse().map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default NewReleases;