"use client"; // Aapka client side logic (State, Context)
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footermusic";
import BottomNav from "./components/layout/BottomNav";
import "./styles/layout.css";
import "@/app/globals.css" ;
import { MusicProvider } from "./context/MusicContext";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <head>
        {/* Viewport ko yahan Head tag ke andar dal do, isse error nahi aayegi */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <MusicProvider>
          <div className="app-wrapper">
            <Navbar onMenuClick={toggleSidebar} />
            <div className="main-container">
              <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
              <main className="scrollable-content">
                {children}
              </main>
            </div>
            {/* Mobile Footer/Player wrapper */}
            <div className="mobile-player-nav-wrapper">
               <Footer />
               
            </div>
          </div>
        </MusicProvider>
      </body>
    </html>
  );
}