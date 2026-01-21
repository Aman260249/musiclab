"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import "../../styles/home.css";

const DeveloperInfo = () => {
  return (
    <div className="developer-info-container">
      <div className="stylish-line"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="dev-content-wrapper pro-layout" 
      >
        {/* Badi Profile Image with Animated Border */}
        <div className="dev-profile-pic-large">
          <img src="/images/codelabbro.png" alt="CodeLAB Profile" />
          <div className="pic-glow"></div>
        </div>

        <div className="dev-text-content">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="dev-greeting"
          >
            Behind the Code
          </motion.p>
          
          <h2 className="dev-name">I'm <span>CodeLAbBro</span></h2>
          
          <p className="dev-bio-pro">
            A creative developer blending the art of design with the logic of programming. 
            I built <b>MusicLab</b> to push the boundaries of web-based music experiences. 
            Every pixel and every line of code is crafted to bring you closer to the rhythm.
          </p>

          <div className="social-links-pro">
            <motion.a whileHover={{ y: -5 }} href="https://github.com/your-github" target="_blank"><Github size={28} /></motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://linkedin.com/in/your-linkedin" target="_blank"><Linkedin size={28} /></motion.a>
            <motion.a whileHover={{ y: -5 }} href="mailto:your-email@example.com"><Mail size={28} /></motion.a>
          </div>
        </div>
      </motion.div>

      <div className="stylish-line"></div>

      {/* Signature with Logo Merged */}
      <div className="final-signature-merged">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="footer-logo-box"
        >
          <img src="/images/logo-retouch.png" alt="Logo" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="made-by-codelab"
        >
          Project Vision by <span>CodeLAbBro</span> &copy; 2025
        </motion.p>
      </div>
    </div>
  );
};

export default DeveloperInfo;