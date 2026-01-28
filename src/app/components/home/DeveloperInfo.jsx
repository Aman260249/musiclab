"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import "../../styles/home.css";

const DeveloperInfo = () => {
  // --- 1. CONSTANTS & STYLES ---
  const iconStyle = { color: 'white' };
  const signatureStyle = { marginTop: '40px', textAlign: 'center' };

  return (
    <div className="developer-info-container">
      {/* Decorative Divider */}
      <div 
        className="stylish-line" 
        style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '80%' }}
      ></div>

      {/* --- MAIN CONTENT CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // Animation triggers only once
        className="dev-content-wrapper pro-layout"
      >
        {/* Profile Image Section */}
        <div className="dev-profile-pic-large">
          <img
            src="/images/Codelabbro.png"
            alt="CodeLAB Developer"
            onError={(e) => {
              console.error("Developer profile image failed to load.");
              e.target.src = "https://via.placeholder.com/200";
            }}
          />
        </div>

        {/* Developer Text & Bio Section */}
        <div className="dev-text-content">
          <p className="dev-greeting" style={{ color: '#1db954', fontWeight: '600' }}>
            Behind the Code
          </p>
          <h2 className="dev-name">I'm <span>CodeLAbBro</span></h2>
          <p className="dev-bio-pro">
            A creative developer building <b>MusicLab</b> to push the boundaries of music streaming.
            Every pixel is crafted to bring users closer to the rhythm and experience.
          </p>

          {/* Social Media Links */}
          <div className="social-links-pro" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <motion.a 
              whileHover={{ y: -5 }} 
              href="https://github.com/Aman260249" 
              style={iconStyle}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ y: -5 }} 
              href="https://www.linkedin.com/in/aman-sharma-2b0183210" 
              style={iconStyle}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ y: -5 }} 
              href="mailto:your-email@gmail.com" 
              style={iconStyle}
            >
              <Mail size={24} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* --- FOOTER / SIGNATURE SECTION --- */}
      <div className="final-signature-merged" style={signatureStyle}>
        <div className="footer-logo-box" style={{ margin: '0 auto 10px' }}>
          <img 
            src="/images/logo-retouch.png" 
            alt="MusicLab Logo" 
            style={{ width: '200px' }} 
          />
        </div>
        <p className="made-by-codelab" style={{ color: '#666', fontSize: '14px' }}>
          Project Vision by <span style={{ color: '#1db954' }}>CodeLAbBro</span> &copy; 2026
        </p>
      </div>
    </div>
  );
};

export default DeveloperInfo;