"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import "../../styles/sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();

  // --- 1. NAVIGATION & SCROLL LOGIC ---
  /**
   * Handles navigation based on the current route.
   * If on home, it scrolls smoothly to the section.
   * If on another page, it redirects to home with a hash.
   */
  const handleNavigation = (id) => {
    if (pathname !== '/') {
      // Redirect to home page with section hash
      router.push(`/#${id}`);
    } else {
      // Internal smooth scroll if already on home
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
    
    // Close sidebar on mobile devices after click
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  // --- 2. RENDER COMPONENT ---
  return (
    <>
      {/* Background Overlay for mobile view */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Mobile Close Button */}
        <div className="mobile-close" onClick={closeSidebar}>✕</div>

        {/* --- BROWSE SECTION --- */}
        <div className="menu-section">
          <p className="section-title">BROWSE</p>
          <ul>
            <li onClick={() => handleNavigation('new-releases')}>New Releases</li>
            <li onClick={() => handleNavigation('top-charts')}>Top Charts</li>
            <li onClick={() => handleNavigation('recommendedartists')}>Top Artists</li>
            <li>
              <Link href="/albums" className="sidebar-link" onClick={closeSidebar}>
                Albums
              </Link>
            </li>
            <li onClick={() => handleNavigation('categories')}>Categories</li>
          </ul>
        </div>

        {/* --- LIBRARY SECTION --- */}
        <div className="menu-section">
          <p className="section-title">LIBRARY</p>
          <ul>
            <li>
              <Link href="/history" className="sidebar-link" onClick={closeSidebar}>
                History
              </Link>
            </li>
            <li>
              <Link href="/liked-songs" className="sidebar-link" onClick={closeSidebar}>
                Liked Songs
              </Link>
            </li>
          </ul>
          
          {/* Call to Action: Playlist Creation */}
          <button className="new-playlist-btn">
            + New Playlist
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;