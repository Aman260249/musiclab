"use client";
import React from 'react';
import "../../styles/sidebar.css";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = ({ isOpen, closeSidebar }) => {
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  }; 

  const router = useRouter();
  const pathname = usePathname(); 

  const handleNavigation = (id) => {
    if (pathname !== '/') {
      // 1. Agar user home par nahi hai, toh pehle Home par bhejo
      // Hum URL mein hash (#id) bhej rahe hain
      router.push(`/#${id}`);
    } else {
      // 2. Agar user pehle se home par hai, toh smooth scroll karo
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    // Mobile par sidebar band kar do
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-close" onClick={closeSidebar}>✕</div>

        <div className="menu-section">
          <p className="section-title">BROWSE</p>
          <ul>
            <li onClick={() => handleNavigation('new-releases')}>New Releases</li>
            <li onClick={() => handleNavigation('top-charts')}>Top Charts</li>
            <li onClick={() => handleNavigation('RecommendedArtists')}>Top Artists</li>
            
             <li> <Link href="/albums" className="sidebar-link">Albums</Link> </li>
            <li onClick={() => handleNavigation('categories')}>Categories</li>
          </ul>
        </div>

        <div className="menu-section">
          <p className="section-title">LIBRARY</p>
          <ul>
            {/* --- FIX: Har item ab <li> ke andar hai --- */}
            <li>
              <Link href="/history" className="sidebar-link">History</Link>
            </li>
            <li>
              <Link href="/liked-songs" className="sidebar-link">Liked Songs</Link>
            </li>
           
          </ul>
          <button className="new-playlist-btn">+ New Playlist</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;