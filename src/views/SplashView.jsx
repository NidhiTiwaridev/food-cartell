import React, { useEffect } from 'react';
import logoImg from '../assets/logo.jpeg';
import './splashView.css';
export default function SplashView({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="imperial-splash-wrapper">
      <div className="splash-gold-card">
        <div className="splash-logo-container">
          <img src={logoImg} alt="Food Cartell Logo" className="splash-logo-img" />
        </div>
        <h1 className="splash-brand-title">FOOD CARTELL</h1>
        <p className="splash-tagline">GOOD FOOD HAS A HIGHER STANDARD</p>
        
        <div className="splash-progress-track">
          <div className="splash-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}