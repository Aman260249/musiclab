"use client";
import React from 'react';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '@/app/components/music/SongCard'; // Path dhyan se check karna
import "@/app/styles/home.css";

export default function TrendingPage() {
    const { allSongs = [] } = useMusic();
    
    // Trending logic: Maan lo hum latest 20 gaane dikha rahe hain
    const trendingSongs = allSongs.slice(0, 20);

    return (
        <div style={{ padding: '40px 20px', background: '#121212', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ marginBottom: '10px', fontSize: '32px' }}>Trending Now 🔥</h1>
            <p style={{ color: '#b3b3b3', marginBottom: '30px' }}>What everyone is listening to right now.</p>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                gap: '25px' 
            }}>
                {trendingSongs.map((song) => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}