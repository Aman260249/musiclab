export const dynamic = "force-dynamic";
"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { auth } from '../context/lib/firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import "../styles/auth.css";

// 1. Asli Auth Logic ko ek alag component mein rakha
const AuthContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    
    const [isLogin, setIsLogin] = useState(mode !== 'signup');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setIsLogin(mode !== 'signup');
    }, [mode]);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                setMessage("Welcome Back! 🎧");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                setMessage("Welcome to MusicLab! 🚀");
            }
            
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                router.push('/');
            }, 2000);

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="auth-wrapper">
            {showPopup && (
                <div className="success-popup">
                    <span>✅</span> {message}
                </div>
            )}

            <div className="auth-glass-card">
                <div className="auth-left-image">
                    <div className="image-overlay">
                        <h2>MusicLab</h2>
                        <p>Feel the rhythm of your soul.</p>
                    </div>
                </div>

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
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="auth-main-btn">
                            {isLogin ? "Login Now" : "Create Account"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer'}}>
                            {isLogin ? "New to MusicLab? " : "Already a member? "}
                            <span>{isLogin ? "Register here" : "Login here"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. Main Export mein Suspense use kiya taaki Vercel Build Error na aaye
export default function AuthPage() {
    return (
        <Suspense fallback={<div className="loading-screen">Loading MusicLab...</div>}>
            <AuthContent />
        </Suspense>
    );
}