"use client";

/**
 * LATEST VERSION: Optimized for Vercel Builds
 * Added: Suspense, Dynamic Rendering, and Real-time Firestore Sync.
 */

export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/context/lib/firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import "../styles/liked-songs.css";

// --- 1. CONTENT COMPONENT ---
const LikedSongsContent = () => {
    const [likedSongs, setLikedSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // --- AUTHENTICATION & DATA FETCHING LOGIC ---
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Initialize Real-time Firestore query for user's liked songs
                const q = query(
                    collection(db, "likedSongs"),
                    where("userId", "==", user.uid)
                );

                // Listen for real-time document updates
                const unsubscribeDocs = onSnapshot(q, (snapshot) => {
                    const songs = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLikedSongs(songs);
                    setLoading(false);
                }, (error) => {
                    console.error("Firestore Subscription Error:", error);
                    setLoading(false);
                });

                return () => unsubscribeDocs();
            } else {
                // Redirect unauthorized users to login page
                router.push('/login');
            }
        });

        return () => unsubscribeAuth();
    }, [router]);

    // --- RENDER: LOADING STATE ---
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Fetching your favorite vibes...</p>
            </div>
        );
    }

    // --- RENDER: MAIN VIEW ---
    return (
        <div className="liked-songs-wrapper">
            {/* Page Header Section */}
            <div className="liked-header">
                <div className="header-glass">
                    <h1>Liked Songs 💖</h1>
                    <p>{likedSongs.length} tracks in your collection</p>
                </div>
            </div>

            {/* Songs List Section */}
            <div className="liked-list">
                {likedSongs.length > 0 ? (
                    likedSongs.map((song) => (
                        <div key={song.id} className="liked-song-card">
                            <img 
                                src={song.coverImg || '/default-cover.jpg'} 
                                alt={song.title} 
                                loading="lazy" 
                            />
                            <div className="song-details">
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                            </div>
                            <button className="play-btn-circle" aria-label="Play Song">▶</button>
                        </div>
                    ))
                ) : (
                    /* Empty State: Prompt user to explore */
                    <div className="no-songs">
                        <p>Your heart list is empty! Go discover some music.</p>
                        <button onClick={() => router.push('/')}>Go Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 2. MAIN EXPORT (With Suspense Boundary) ---
export default function LikedSongsPage() {
    return (
        <Suspense fallback={
            <div className="loading-container">
                <p>Loading Library...</p>
            </div>
        }>
            <LikedSongsContent />
        </Suspense>
    );
}