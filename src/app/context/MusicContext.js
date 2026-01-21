"use client";
import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { auth, db } from "../context/lib/firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, updateDoc, getDoc, setDoc, collection, onSnapshot, query } from "firebase/firestore";
import { arrayUnion, arrayRemove } from "firebase/firestore";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [searchQuery, setSearchQuery] = useState("");
  const [allSongs, setAllSongs] = useState([]); 
  const [user, setUser] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]); 
  const [recentPlayed, setRecentPlayed] = useState([]); // Default empty array

  const audioRef = useRef(null);

  // --- 1. REAL-TIME DATA FETCHING ---
  useEffect(() => {
    const q = query(collection(db, "songs"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const songsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure src is always there for audio player
        src: doc.data().audioUrl || doc.data().src 
      }));
      setAllSongs(songsData);
    });
    return () => unsubscribe();
  }, []);

  // --- 2. USER AUTH & DATA SYNC ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          // Filter out any default/broken data during sync
          setLikedSongs(data.likedSongs || []);
          setRecentPlayed(data.recentPlayed || []);
        } else {
          await setDoc(userRef, { likedSongs: [], recentPlayed: [] });
          setLikedSongs([]);
          setRecentPlayed([]);
        }
      } else {
        setLikedSongs([]);
        setRecentPlayed([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // --- 3. UPDATED RECENTLY PLAYED LOGIC (Removes Duplicates & Fixes Mix-up) ---
  const addToRecent = async (song) => {
    if (!auth.currentUser) return;
    
    const userRef = doc(db, "users", auth.currentUser.uid);
    
    // Yahan hum filter lagate hain taaki PURANA data mix na ho
    // Aur agar same gaana phir se play ho, toh purana wala hat kar naya top par aa jaye
    setRecentPlayed((prev) => {
      const filtered = prev.filter(s => s.id !== song.id);
      const updated = [song, ...filtered].slice(0, 15); // Max 15 songs in history
      
      // Firestore update in background
      updateDoc(userRef, { recentPlayed: updated }).catch(err => console.error(err));
      
      return updated;
    });
  };

  const playSong = (song) => {
    if (!song) return;
    setCurrentSong(song);
    setIsPlaying(true);
    addToRecent(song); // Only 1 argument needed now
  };

  // --- 4. LIKE LOGIC ---
  const toggleLike = async (song) => {
    if (!user) return alert("Pehle login kar lo bhai! 😂");
    const userRef = doc(db, "users", user.uid);
    const isAlreadyLiked = likedSongs.some((s) => s.id === song.id);

    try {
      if (isAlreadyLiked) {
        await updateDoc(userRef, { likedSongs: arrayRemove(song) });
        setLikedSongs((prev) => prev.filter((s) => s.id !== song.id));
      } else {
        await updateDoc(userRef, { likedSongs: arrayUnion(song) });
        setLikedSongs((prev) => [...prev, song]);
      }
    } catch (error) {
      console.error("Like Toggle Error:", error);
    }
  };

  // --- 5. AUDIO CONTROLS & EFFECTS ---
  const logout = () => signOut(auth);
  const handleTimeUpdate = () => { if(audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedMetadata = () => { if(audioRef.current) setDuration(audioRef.current.duration); };
  const seekTo = (time) => { if (audioRef.current) audioRef.current.currentTime = time; };
  const changeVolume = (val) => { setVolume(val); if (audioRef.current) audioRef.current.volume = val; };

  const skipNext = () => {
    if (!currentSong || allSongs.length === 0) return;
    const idx = allSongs.findIndex(s => s.id === currentSong.id);
    if (idx !== -1) playSong(allSongs[(idx + 1) % allSongs.length]);
  };

  const skipPrevious = () => {
    if (!currentSong || allSongs.length === 0) return;
    const idx = allSongs.findIndex(s => s.id === currentSong.id);
    if (idx !== -1) playSong(allSongs[(idx - 1 + allSongs.length) % allSongs.length]);
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.src || currentSong.audioUrl; 
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
      }
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

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
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata} 
        onEnded={skipNext} 
      />
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);