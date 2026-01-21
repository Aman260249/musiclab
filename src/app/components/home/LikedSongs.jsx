"use client";

// Latest Version: Added Suspense & Dynamic Rendering for Vercel Build Fix
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from 'react';
import { auth, db } from '@/app/context/lib/firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import "../styles/liked-songs.css";

// Separate Content Component
const LikedSongsContent = () => {
    const [likedSongs, setLikedSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Real-time Firestore query for liked songs
                const q = query(
                    collection(db, "likedSongs"),
                    where("userId", "==", user.uid)
                );

                const unsubscribeDocs = onSnapshot(q, (snapshot) => {
                    const songs = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setLikedSongs(songs);
                    setLoading(false);
                });

                return () => unsubscribeDocs();
            } else {
                // Redirect if not logged in
                router.push('/login');
            }
        });

        return () => unsubscribeAuth();
    }, [router]);

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching your favorite vibes...</p>
        </div>
    );

    return (
        <div className="liked-songs-wrapper">
            <div className="liked-header">
                <div className="header-glass">
                    <h1>Liked Songs 💖</h1>
                    <p>{likedSongs.length} tracks in your collection</p>
                </div>
            </div>

            <div className="liked-list">
                {likedSongs.length > 0 ? (
                    likedSongs.map((song) => (
                        <div key={song.id} className="liked-song-card">
                            <img src={song.coverImg || '/default-cover.jpg'} alt={song.title} />
                            <div className="song-details">
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                            </div>
                            <button className="play-btn-circle">▶</button>
                        </div>
                    ))
                ) : (
                    <div className="no-songs">
                        <p>Your heart list is empty! Go discover some music.</p>
                        <button onClick={() => router.push('/')}>Go Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Export with Suspense Boundary
export default function LikedSongsPage() {
    return (
        <Suspense fallback={<div>Loading Library...</div>}>
            <LikedSongsContent />
        </Suspense>
    );
}