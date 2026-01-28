"use client";

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import "../../styles/layout.css"; 

const SocialFooter = () => {
  // --- 1. CONFIGURATION: SOCIAL LINKS ---
  const socialLinks = [
    { 
      id: 'github', 
      icon: <Github size={24} />, 
      url: "https://github.com/Aman260249" 
    },
    { 
      id: 'linkedin', 
      icon: <Linkedin size={24} />, 
      url: "https://www.linkedin.com/in/aman-sharma-2b0183210" 
    },
    { 
      id: 'mail', 
      icon: <Mail size={24} />, 
      url: "mailto:your-email@gmail.com" 
    }
  ];

  // --- 2. RENDER COMPONENT ---
  return (
    <footer className="social-footer">
      <div className="footer-content">
        
        {/* Top Section: CTA & Icons */}
        <div className="footer-top">
          <h3>Let's Connect</h3>
          <div className="footer-social-icons">
            {socialLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url} 
                target={link.id !== 'mail' ? "_blank" : "_self"} 
                rel="noopener noreferrer"
                aria-label={`Visit our ${link.id}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright & Branding */}
        <div className="footer-bottom">
          <p>
            Handcrafted with passion by <span>CodeLAbBro</span> © 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;