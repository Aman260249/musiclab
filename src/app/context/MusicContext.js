"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { auth, db } from "../context/lib/firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { 
  doc, updateDoc, getDoc, setDoc, collection, 
  onSnapshot, query, arrayUnion, arrayRemove 
} from "firebase/firestore";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  // --- STATE MANAGEMENT ---
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [searchQuery, setSearchQuery] = useState("");
  const [allSongs, setAllSongs] = useState([]); 
  const [user, setUser] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]); 
  const [recentPlayed, setRecentPlayed] = useState([]);

  const audioRef = useRef(null);

  // --- 1. REAL-TIME SONGS FETCHING ---
  useEffect(() => {
    // Listen to the entire 'songs' collection from Firestore
    const q = query(collection(db, "songs"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const songsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Fallback for audio source key
        src: doc.data().audioUrl || doc.data().src 
      }));
      setAllSongs(songsData);
    });
    return () => unsubscribe();
  }, []);

  // --- 2. AUTHENTICATION & USER DATA SYNC ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setLikedSongs(data.likedSongs || []);
          setRecentPlayed(data.recentPlayed || []);
        } else {
          // Initialize new user document in Firestore
          await setDoc(userRef, { likedSongs: [], recentPlayed: [] });
          setLikedSongs([]);
          setRecentPlayed([]);
        }
      } else {
        // Reset state on logout
        setLikedSongs([]);
        setRecentPlayed([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // --- 3. RECENTLY PLAYED LOGIC ---
  const addToRecent = async (song) => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    
    setRecentPlayed((prev) => {
      // Remove the song if it already exists to move it to the top
      const filtered = prev.filter(s => s.id !== song.id);
      const updated = [song, ...filtered].slice(0, 15); // History limit: 15
      
      // Update Firestore in the background
      updateDoc(userRef, { recentPlayed: updated }).catch(err => 
        console.error("Firestore History Update Error:", err)
      );
      return updated;
    });
  };

  // --- 4. PLAYBACK CONTROLS ---
  const playSong = (song) => {
    if (!song) return;
    setCurrentSong(song);
    setIsPlaying(true);
    addToRecent(song);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback Error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipNext = () => {
    if (!currentSong || allSongs.length === 0) return;
    const idx = allSongs.findIndex(s => s.id === currentSong.id);
    const nextSong = allSongs[(idx + 1) % allSongs.length];
    playSong(nextSong);
  };

  const skipPrevious = () => {
    if (!currentSong || allSongs.length === 0) return;
    const idx = allSongs.findIndex(s => s.id === currentSong.id);
    const prevSong = allSongs[(idx - 1 + allSongs.length) % allSongs.length];
    playSong(prevSong);
  };

  // --- 5. SOCIAL & UTILITY LOGIC ---
  const toggleLike = async (song) => {
    if (!user) return alert("Pehle login kar lo bhai! 😂");
    const userRef = doc(db, "users", user.uid);
    const isAlreadyLiked = likedSongs.some((s) => s.id === song.id);

    try {
      if (isAlreadyLiked) {
        await updateDoc(userRef, { likedSongs: arrayRemove(song) });
        setLikedSongs(prev => prev.filter(s => s.id !== song.id));
      } else {
        await updateDoc(userRef, { likedSongs: arrayUnion(song) });
        setLikedSongs(prev => [...prev, song]);
      }
    } catch (error) {
      console.error("Like Toggle Error:", error);
    }
  };

  const logout = () => signOut(auth);
  const seekTo = (time) => { if (audioRef.current) audioRef.current.currentTime = time; };
  const changeVolume = (val) => { 
    setVolume(val); 
    if (audioRef.current) audioRef.current.volume = val; 
  };

  // Audio Sync Effect: Triggers when currentSong changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      const src = currentSong.src || currentSong.audioUrl;
      if (audioRef.current.src !== src) {
        audioRef.current.src = src;
      }
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Auto-play blocked or failed:", e));
      }
    }
  }, [currentSong]);

  return (
    <MusicContext.Provider value={{
      currentSong, isPlaying, playSong, togglePlay,
      currentTime, duration, seekTo, volume, changeVolume,
      allSongs, setAllSongs, skipNext, skipPrevious,
      searchQuery, setSearchQuery,
      user, logout, likedSongs, toggleLike, recentPlayed
    }}>
      {children}
      <audio 
        ref={audioRef} 
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)} 
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)} 
        onEnded={skipNext} 
      />
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);