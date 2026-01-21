"use client";
import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import "../../styles/layout.css"; 

const SocialFooter = () => {
  return (
    <footer className="social-footer">
      <div className="footer-content">
        <div className="footer-top">
          <h3>Let's Connect</h3>
          <div className="footer-social-icons">
            <a href="https://github.com/your-github" target="_blank"><Github size={24} /></a>
            <a href="https://linkedin.com/in/your-linkedin" target="_blank"><Linkedin size={24} /></a>
            <a href="mailto:your-email@gmail.com"><Mail size={24} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Handcrafted with passion by <span>CodeLAB</span> © 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;