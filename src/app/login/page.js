"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { auth } from '../context/lib/firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import "../styles/auth.css";

// Force dynamic rendering for search params
export const dynamic = "force-dynamic";

const AuthContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    
    // --- 1. STATE MANAGEMENT ---
    const [isLogin, setIsLogin] = useState(mode !== 'signup');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Sync mode from URL params
    useEffect(() => {
        setIsLogin(mode !== 'signup');
    }, [mode]);

    // --- 2. AUTHENTICATION LOGIC ---
    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                // Firebase Login
                await signInWithEmailAndPassword(auth, email, password);
                setMessage("Welcome Back! 🎧");
            } else {
                // Firebase Signup
                await createUserWithEmailAndPassword(auth, email, password);
                setMessage("Welcome to MusicLab! 🚀");
            }
            
            setShowPopup(true);
            
            // Redirect after a small delay to show success popup
            setTimeout(() => {
                setShowPopup(false);
                router.push('/');
                router.refresh(); // Refresh to update context user state
            }, 1500);

        } catch (error) {
            // Mapping Firebase errors to human-readable text
            const errorMsg = error.code === 'auth/user-not-found' 
                ? "Account nahi mila! Register karlo." 
                : error.message;
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // --- 3. RENDER UI ---
    return (
        <div className="auth-wrapper">
            {/* Success Notification Pop-up */}
            {showPopup && (
                <div className="success-popup">
                    <span role="img" aria-label="success">✅</span> {message}
                </div>
            )}

            <div className="auth-glass-card">
                {/* Visual Side with Branding */}
                <div className="auth-left-image">
                    <div className="image-overlay">
                        <h2>MusicLab</h2>
                        <p>Feel the rhythm of your soul.</p>
                    </div>
                </div>

                {/* Interactive Form Side */}
                <div className="auth-right-form">
                    <div className="auth-header">
                        <h1>{isLogin ? "Welcome Back" : "Join MusicLab"}</h1>
                        <p>{isLogin ? "Enter details to vibe" : "Sign up for non-stop music"}</p>
                    </div>

                    <form onSubmit={handleAuth}>
                        <div className="input-group">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                autoComplete="current-password"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="auth-main-btn" 
                            disabled={loading}
                        >
                            {loading ? "Processing..." : (isLogin ? "Login Now" : "Create Account")}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
                            {isLogin ? "New to MusicLab? " : "Already a member? "}
                            <span>{isLogin ? "Register here" : "Login here"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Export with Suspense Boundary for useSearchParams
export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="loading-screen-full">
                <p>Loading MusicLab...</p>
            </div>
        }>
            <AuthContent />
        </Suspense>
    );
}