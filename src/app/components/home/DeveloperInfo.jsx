"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import "../../styles/home.css";

const DeveloperInfo = () => {
  return (
    <div className="developer-info-container">
      <div className="stylish-line" style={{height:'1px', background:'rgba(255,255,255,0.1)', width:'80%'}}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="dev-content-wrapper pro-layout" 
      >
        <div className="dev-profile-pic-large">
          {/* Photo Fix: Path check karo ki public/images/codelabbro.png hai ya nahi */}
          <img src="/images/codelabbro.png" alt="CodeLAB" onError={(e) => e.target.src = "https://via.placeholder.com/200"} />
          <div className="pic-glow"></div>
        </div>

        <div className="dev-text-content">
          <p className="dev-greeting" style={{color:'#1db954', fontWeight:'600'}}>Behind the Code</p>
          <h2 className="dev-name">I'm <span>CodeLAbBro</span></h2>
          <p className="dev-bio-pro">
            A creative developer building <b>MusicLab</b> to push the boundaries of music. 
            Every pixel is crafted to bring you closer to the rhythm.
          </p>

          <div className="social-links-pro" style={{display:'flex', gap:'20px', marginTop:'20px'}}>
            <motion.a whileHover={{ y: -5 }} href="https://github.com/Aman260249" style={{color:'white'}}><Github size={24} /></motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/aman-sharma-2b0183210" style={{color:'white'}}><Linkedin size={24} /></motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://mail.google.com" style={{color:'white'}}><Mail size={24} /></motion.a>
          </div>
        </div>
      </motion.div>

      <div className="final-signature-merged" style={{marginTop:'40px', textAlign:'center'}}>
        <div className="footer-logo-box" style={{margin:'0 auto 10px'}}>
           <img src="/images/logo-retouch.png" alt="Logo" style={{width:'200px'}} />
        </div>
        <p className="made-by-codelab" style={{color:'#666', fontSize:'14px'}}>
          Project Vision by <span style={{color:'#1db954'}}>CodeLAbBro</span> &copy; 2026
        </p>
      </div>
    </div>
  );
};

export default DeveloperInfo;