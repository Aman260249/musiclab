"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from '@/app/context/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Music2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import "@/app/styles/admin.css";

const AdminUpload = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pinInput, setPinInput] = useState("");
    const [showPinModal, setShowPinModal] = useState(false);
    const router = useRouter();

    const [song, setSong] = useState({
        title: '', artist: '', album: '', artistImage: '', 
        category: 'Romantic', isTopChart: false, isNewRelease: true, 
        imageUrl: '', audioUrl: ''
    });

    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const SECRET_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === ADMIN_EMAIL) {
                setShowPinModal(true);
            } else {
                alert("Access Denied! Login as Admin first.");
                router.push("/");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router, ADMIN_EMAIL]);

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pinInput === SECRET_PIN) {
            setIsAdmin(true);
            setShowPinModal(false);
        } else {
            alert("Galat PIN hai bhai!");
            setPinInput("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "songs"), song);
            alert("Mubarak ho CodeLab! 🚀");
            setSong({
                title: '', artist: '', album: '', artistImage: '', category: 'Romantic',
                isTopChart: false, isNewRelease: true, imageUrl: '', audioUrl: ''
            });
        } catch (err) { alert("Kuch gadbad ho gayi!"); }
    };

    if (loading) return <div className="admin-container"><h1>Verifying Admin...</h1></div>;

    return (
        <div className="admin-container">
            {showPinModal && !isAdmin && (
                <div className="pin-overlay">
                    <div className="pin-modal">
                        <ShieldCheck size={50} color="#1db954" />
                        <h3>Admin Security</h3>
                        <p>Enter 10-digit PIN to unlock</p>
                        <form onSubmit={handlePinSubmit}>
                            <input 
                                type="password" 
                                placeholder="••••••••••" 
                                maxLength={10} // PIN length 10 kiya
                                value={pinInput}
                                onChange={(e) => setPinInput(e.target.value)}
                                autoFocus
                            />
                            <button type="submit">Unlock Dashboard</button>
                        </form>
                    </div>
                </div>
            )}

            {isAdmin && (
                <div className="admin-card">
                    <div className="admin-header">
                        <Music2 color="#1db954" size={32} />
                        <h2>MusicLab Studio</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-row">
                            <input className="input-field" type="text" placeholder="Song Title" onChange={(e) => setSong({ ...song, title: e.target.value })} value={song.title} required />
                            <input className="input-field" type="text" placeholder="Artist Name" onChange={(e) => setSong({ ...song, artist: e.target.value })} value={song.artist} required />
                        </div>
                        <div className="input-row">
                            <input className="input-field" type="text" placeholder="Album Name" onChange={(e) => setSong({ ...song, album: e.target.value })} value={song.album} required />
                            <select className="input-field" value={song.category} onChange={(e) => setSong({ ...song, category: e.target.value })}>
                                <option value="Romantic">Romantic</option>
                                <option value="Party">Party</option>
                                <option value="Lo-fi">Lo-fi</option>
                                <option value="Hip Hop">Hip Hop</option>
                                <option value="English">English</option>
                            </select>
                        </div>
                        <div className="url-inputs">
                           <div className="with-icon"><ImageIcon size={18}/> <input type="text" placeholder="Artist Profile Image URL" value={song.artistImage} onChange={(e) => setSong({ ...song, artistImage: e.target.value })} /></div>
                           <div className="with-icon"><ImageIcon size={18}/> <input type="text" placeholder="Song Cover URL" onChange={(e) => setSong({ ...song, imageUrl: e.target.value })} value={song.imageUrl} required /></div>
                           <div className="with-icon"><LinkIcon size={18}/> <input type="text" placeholder="Audio File URL" onChange={(e) => setSong({ ...song, audioUrl: e.target.value })} value={song.audioUrl} required /></div>
                        </div>
                        <div className="checkbox-section">
                            <label><input type="checkbox" checked={song.isTopChart} onChange={(e) => setSong({ ...song, isTopChart: e.target.checked })} /> Top Charts</label>
                            <label><input type="checkbox" checked={song.isNewRelease} onChange={(e) => setSong({ ...song, isNewRelease: e.target.checked })} /> New Release</label>
                        </div>
                        <button type="submit" className="upload-btn">Publish to MusicLab</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminUpload;