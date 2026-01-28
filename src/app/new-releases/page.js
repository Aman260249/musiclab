"use client";

import React, { useMemo } from 'react';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '@/app/components/music/SongCard';
import "@/app/styles/home.css";

export default function NewReleasesPage() {
    // --- 1. DATA FROM CONTEXT ---
    const { allSongs = [] } = useMusic();

    // --- 2. OPTIMIZED FILTERING ---
    /**
     * useMemo ensures we don't re-filter and re-reverse 
     * the songs array unless allSongs actually changes.
     */
    const newSongs = useMemo(() => {
        return allSongs
            .filter(song => song.isNewRelease === true)
            .reverse();
    }, [allSongs]);

    // --- 3. MAIN RENDER ---
    return (
        <div style={{ 
            padding: '40px 20px', 
            background: 'linear-gradient(to bottom, #1e1e1e, #121212)', 
            minHeight: '100vh', 
            color: 'white' 
        }}>
            {/* Header Section */}
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ marginBottom: '10px', fontSize: '36px', fontWeight: '800' }}>
                    New Releases ✨
                </h1>
                <p style={{ color: '#b3b3b3', fontSize: '1.1rem' }}>
                    Freshly baked tracks just for you. Discover the latest hits.
                </p>
            </header>
            
            {/* Responsive Grid System */}
            {newSongs.length > 0 ? (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '30px' 
                }}>
                    {newSongs.map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            ) : (
                /* Loading / Empty State */
                <div style={{ textAlign: 'center', padding: '100px 0', color: '#666' }}>
                    <p>Fetching the newest rhythms...</p>
                </div>
            )}
        </div>
    );
}