"use client";
import React from 'react';
import { motion } from 'framer-motion';
import "../../styles/categories.css";
import { categoriesList } from '../../data/categories'; 
import { useMusic } from '../../context/MusicContext'; // Context import kiya logic ke liye

const CategorySection = () => {
  const { setSearchQuery } = useMusic(); // Context se function nikala

  const handleCategoryClick = (categoryName) => {
    // 1. Global search query ko category name se update karo
    setSearchQuery(categoryName);
    
    // 2. Smoothly upar scroll karo taaki user results dekh sake
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section id="categories" className="category-section">
      <h2 className="section-title">Explore Categories</h2>
      <div className="category-grid">
        {categoriesList.map((cat, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }} // Thoda rotate bhi add kiya cool lagne ke liye
            whileTap={{ scale: 0.95 }}
            className="category-card"
            style={{ backgroundColor: cat.color }} 
            onClick={() => handleCategoryClick(cat.name)} // Click event connect kiya
          >
            <h3>{cat.name}</h3>
            {/* Background design element */}
            <div className="card-decoration"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;