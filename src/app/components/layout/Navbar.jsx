"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../../context/lib/firebase';
import { useMusic } from '../../context/MusicContext';
import { trendingSongs } from '../../data/songs'; 
import "../../styles/navbar.css";

const Navbar = ({ onMenuClick }) => {
  // --- 1. CONTEXT & STATE ---
  const { searchQuery, setSearchQuery, playSong, setAllSongs, user } = useMusic();
  const [results, setResults] = useState([]);

  // --- 2. SEARCH LOGIC ---
  useEffect(() => {
    /**
     * Filters trendingSongs based on user input in the search bar.
     * Matches against both song title and artist name.
     */
    if (searchQuery.trim().length > 0) {
      const filtered = trendingSongs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  // --- 3. EVENT HANDLERS ---

  /**
   * Triggers when a user clicks a search result.
   * Plays the song, updates the queue, and clears the search state.
   */
  const handleResultClick = (song) => {
    setAllSongs(trendingSongs);
    playSong(song);
    setSearchQuery("");
    setResults([]);
  };

  /**
   * Handles Firebase Sign-out logic.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Authentication Error: Logout failed", error.message);
    }
  };

  // --- 4. RENDER LOGIC ---
  return (
    <nav className="navbar">
      
      {/* LEFT: Branding & Toggle Menu */}
      <div className="nav-left">
        <button 
          className="menu-icon" 
          onClick={onMenuClick} 
          aria-label="Toggle Side Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link href="/" className="logo">
          <img src="/images/logo-12333333.png" alt="MusicLab" />
        </Link>
      </div>

      {/* CENTER: Search Functionality */}
      <div className="nav-center">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Search Dropdown Overlay */}
          {results.length > 0 && (
            <div className="search-results-dropdown">
              {results.map(song => (
                <div 
                  key={song.id} 
                  className="search-result-item" 
                  onClick={() => handleResultClick(song)}
                >
                  <img src={song.img} alt={song.title} />
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

      {/* RIGHT: Navigation & Auth Management */}
      <div className="nav-right">
        <Link href="/" className="nav-link hide-tablet">
          HOME
        </Link>
        
        {!user ? (
          /* Logged Out State */
          <div className="auth-group">
            <Link href="/login">
              <button className="login-link">Login</button>
            </Link>
            <Link href="/login?mode=signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </div>
        ) : (
          /* Logged In State */
          <div className="user-profile">
            <div className="user-info hide-mobile">
              <p className="welcome-msg">Welcome,</p>
              <p className="user-id">
                {user.email ? user.email.split('@')[0] : 'User'}
              </p>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;