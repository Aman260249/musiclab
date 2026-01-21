"use client";
import React from 'react';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '@/app/components/music/SongCard';
import "@/app/styles/home.css";

export default function NewReleasesPage() {
    const { allSongs = [] } = useMusic();
    
    // Filter: New Releases aur reverse taaki latest upar aaye
    const newSongs = allSongs.filter(song => song.isNewRelease === true).reverse();

    return (
        <div style={{ padding: '40px 20px', background: '#121212', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ marginBottom: '10px', fontSize: '32px' }}>New Releases ✨</h1>
            <p style={{ color: '#b3b3b3', marginBottom: '30px' }}>Freshly baked tracks just for you.</p>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                gap: '25px' 
            }}>
                {newSongs.map((song) => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}