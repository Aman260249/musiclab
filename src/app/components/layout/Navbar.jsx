"use client";
import React, { useState, useEffect } from 'react';
import "../../styles/navbar.css";
import { useMusic } from '../../context/MusicContext';
import Link from 'next/link';
import { trendingSongs } from '../../data/songs'; 
import { auth } from '../../context/lib/firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ onMenuClick }) => {
  // 1. Context se 'user' state bhi nikali
  const { searchQuery, setSearchQuery, playSong, setAllSongs, user } = useMusic();
  const [results, setResults] = useState([]);

  // Search logic
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = trendingSongs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleResultClick = (song) => {
    setAllSongs(trendingSongs);
    playSong(song);
    setSearchQuery("");
  };

  // 2. Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Mubarak ho, successfully logout ho gaye!");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="menu-icon" onClick={onMenuClick}>
          <span></span><span></span><span></span>
        </div>
        <div className="logo">
          {/* Logo click par home bhej dega */}
          <Link href="/">
            <img src="/images/logo-12333333.png" alt="MusicLab" style={{cursor: 'pointer'}} />
          </Link>
        </div>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {results.length > 0 && (
            <div className="search-results-dropdown">
              {results.map(song => (
                <div key={song.id} className="search-result-item" onClick={() => handleResultClick(song)}>
                  <img src={song.img} alt="" />
                  <div className="result-info">
                    <p className="res-title">{song.title}</p>
                    <p className="res-artist">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="nav-right">
        <Link href="/" className="nav-link">HOME</Link>
        
        {/* 3. Conditional Rendering: Agar user login nahi hai (!user) */}
        {!user ? (
          <>
            <Link href="/login">
              <button className="auth-btn login-text">Login</button>
            </Link>
            <Link href="/login?mode=signup">
              <button className="auth-btn signup-bg">Sign Up</button>
            </Link>
          </>
        ) : (
          /* 4. Agar user login hai (Show User Info + Logout) */
          <div className="user-profile-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span className="user-name" style={{ color: '#1db954', fontWeight: '600' }}>
              {user.email.split('@')[0]}
            </span>
            <button onClick={handleLogout} className="auth-btn logout-btn" style={{ background: 'transparent', border: '1px solid #ff4444', color: '#ff4444' }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;