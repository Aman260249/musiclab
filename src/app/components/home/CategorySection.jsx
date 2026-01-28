"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useMusic } from '../../context/MusicContext';
import { categoriesList } from '../../data/categories'; 
import "../../styles/categories.css";

const CategorySection = () => {
  // --- 1. HOOKS & CONTEXT ---
  const { setSearchQuery } = useMusic();

  // --- 2. EVENT HANDLERS ---
  /**
   * Handles category selection:
   * 1. Updates the global search query to filter songs by category.
   * 2. Scrolls the window to the top for better visibility of results.
   */
  const handleCategoryClick = (categoryName) => {
    setSearchQuery(categoryName);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // --- 3. COMPONENT RENDER ---
  return (
    <section id="categories" className="category-section">
      <h2 className="section-title">Explore Categories</h2>
      
      <div className="category-grid">
        {categoriesList.map((cat, index) => (
          <motion.div 
            key={index}
            className="category-card"
            style={{ backgroundColor: cat.color }} 
            
            // --- Animations ---
            whileHover={{ 
              scale: 1.05, 
              rotate: 1,
              transition: { duration: 0.2 } 
            }}
            whileTap={{ scale: 0.95 }}
            
            // --- Interactions ---
            onClick={() => handleCategoryClick(cat.name)}
          >
            <h3>{cat.name}</h3>
            
            {/* Visual design element for card depth */}
            <div className="card-decoration"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;