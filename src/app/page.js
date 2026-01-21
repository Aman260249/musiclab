"use client";
import React from 'react';
import { useMusic } from '@/app/context/MusicContext';
// Static imports hata kar Context ka use karenge hum
import TrendingNow from "@/app/components/home/TrendingNow";
import TopCharts from "@/app/components/home/TopCharts";
import RecommendedArtists from "@/app/components/home/RecommendedArtists";
import DeveloperInfo from "./components/home/DeveloperInfo";
import NewReleases from "./components/layout/NewReleases";
import CategorySection from "./components/home/CategorySection";
import SongCard from "./components/music/SongCard";

export default function Home() {
  // 1. Context se allSongs (Firebase data) aur search query nikali
  const { allSongs, searchQuery, setSearchQuery } = useMusic();

  // 2. Filter Logic: Static data ke bajaye ab hum allSongs use karenge
  const filteredSongs = allSongs?.filter(song => {
    const query = searchQuery.toLowerCase();
    return (
      song.title?.toLowerCase().includes(query) ||
      song.artist?.toLowerCase().includes(query) ||
      song.category?.toLowerCase() === query // Category match logic
    );
  }) || [];

  return (
    <div className="home-page" style={{ paddingBottom: '100px' }}>

      {/* 1. AGAR SEARCH KHALI HAI (Default Home View) */}
      {!searchQuery ? (
        <>
          <section id="trending">
            <TrendingNow />
          </section>
          
          <section id="new-releases">
            <NewReleases />
          </section>
          
          <section id="top-charts">
            <TopCharts />
          </section>
          
          <section id="top-artists">
            <RecommendedArtists />
          </section>
        </>
      ) : (
        /* 2. AGAR CATEGORY CLICK HUI YA SEARCH KIYA (Search View) */
        <section className="search-results-container" style={{ padding: '20px', minHeight: '60vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.8rem' }}>
              Results for "<span style={{ color: '#1db954' }}>{searchQuery}</span>"
            </h2>
            <button
              onClick={() => setSearchQuery("")}
              style={{ 
                background: '#1db954', 
                color: 'black', 
                border: 'none', 
                padding: '8px 20px', 
                borderRadius: '20px', 
                cursor: 'pointer', 
                fontWeight: 'bold' 
              }}
            >
              Back to Home
            </button>
          </div>

          {/* Results Grid */}
          <div className="songs-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '25px' 
          }}>
            {filteredSongs.length > 0 ? (
              filteredSongs.map(song => (
                <SongCard key={song.id} song={song} />
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', marginTop: '50px' }}>
                <p style={{ color: '#888', fontSize: '1.2rem' }}>
                  Oops! Is category mein koi song nahi mila.
                </p>
                <p style={{ color: '#555' }}>Admin panel se is category mein gaane add karein!</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. ALWAYS VISIBLE SECTIONS */}
      <hr style={{ opacity: 0.05, margin: '40px 0' }} />
      
      <CategorySection />
      
      <DeveloperInfo />

      <section className="developer-info" style={{ marginTop: '50px', textAlign: 'center' }}>
        <p style={{ color: '#888' }}>Code by me **CodeLAB**</p>
      </section>
    </div>
  );
}