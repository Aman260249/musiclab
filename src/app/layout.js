"use client"; // Client component bananapadega state ke liye
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footermusic";
import BottomNav from "./components/layout/BottomNav"
// import SocialFooter from "./components/layout/SocialFooter";
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
      <body>
        <MusicProvider>
        <div className="app-wrapper">
          {/* Navbar ko toggle function bhej rahe hain */}
          <Navbar onMenuClick={toggleSidebar} />
          
          <div className="main-container">
            {/* Sidebar ko state bhej rahe hain */}
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            
            <main className="scrollable-content">
              {children}
              {/* <SocialFooter /> */}
            </main>
          </div>
          <Footer />
           <BottomNav />
        </div>
        </MusicProvider>
      </body>
    </html>
  );
}