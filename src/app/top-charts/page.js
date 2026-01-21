"use client";
import React from 'react';
import { useMusic } from '@/app/context/MusicContext';
import SongCard from '@/app/components/music/SongCard';
import "@/app/styles/home.css";

export default function TopChartsPage() {
    const { allSongs = [] } = useMusic();
    
    // Filter: Wahi gaane jinka isTopChart true hai
    const chartSongs = allSongs.filter(song => song.isTopChart === true);

    return (
        <div style={{ padding: '40px 20px', background: '#121212', minHeight: '100vh', color: 'white' }}>
            <h1 style={{ marginBottom: '10px', fontSize: '32px' }}>Top Charts</h1>
            <p style={{ color: '#b3b3b3', marginBottom: '30px' }}>The hottest tracks on MusicLab this week.</p>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                gap: '25px' 
            }}>
                {chartSongs.map((song, index) => (
                    <div key={song.id} style={{ position: 'relative' }}>
                        <span style={{ 
                            position: 'absolute', top: '-10px', left: '-10px', 
                            fontSize: '40px', fontWeight: '900', color: 'rgba(246, 240, 240, 0.1)',
                            zIndex: 1 
                        }}>{index + 1}</span>
                        <SongCard song={song} />
                    </div>
                ))}
            </div>
        </div>
    );
}