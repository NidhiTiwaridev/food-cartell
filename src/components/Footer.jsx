import React from 'react';
import logoImg from '../assets/logo.jpeg';

export default function Footer({ lang }) {
  return (
    <footer className="imperial-footer">
      <div className="footer-container">
        {/* Brand Meta */}
        <div className="footer-col brand-col">
          <div className="footer-logo-box">
            <img src={logoImg} alt="Food Cartell" className="footer-logo" />
            <h3 className="font-serif">FOOD CARTELL</h3>
          </div>
          <p className="footer-tagline">
            {lang === 'en'
              ? 'An exquisite culinary enclave dedicated to high-gastronomy, artisanal mixology, and timeless regal hospitality.'
              : 'उत्कृष्ट पाक कला, शिल्प कला पेय और कालातीत शाही आतिथ्य को समर्पित एक विशेष भोजनालय।'}
          </p>
        </div>

        {/* Cuisines Nav */}
        <div className="footer-col">
          <h4>{lang === 'en' ? 'CUISINES' : 'व्यंजन'}</h4>
          <ul>
            <li>{lang === 'en' ? 'Imperial Indian' : 'इंपीरियल इंडियन'}</li>
            <li>{lang === 'en' ? 'Fine Italian' : 'फाइन इटैलियन'}</li>
            <li>{lang === 'en' ? 'Pan-Asian Express' : 'पैन-एशियन'}</li>
            <li>{lang === 'en' ? 'Continental Bistro' : 'कॉन्टिनेंटल'}</li>
            <li>{lang === 'en' ? 'Middle Eastern' : 'मिडिल ईस्टर्न'}</li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div className="footer-col">
          <h4>{lang === 'en' ? 'HOURS OF SERVICE' : 'सेवा का समय'}</h4>
          <p className="timing-text"><strong>{lang === 'en' ? 'Lunch:' : 'दोपहर:'}</strong> 12:30 PM – 03:45 PM</p>
          <p className="timing-text"><strong>{lang === 'en' ? 'Dinner:' : 'रात:'}</strong> 07:00 PM – 11:45 PM</p>
          <span className="valet-tag">✦ {lang === 'en' ? 'Complimentary Valet Parking' : 'निःशुल्क वैले पार्किंग'}</span>
        </div>

        {/* Location & Contact */}
        <div className="footer-col">
          <h4>{lang === 'en' ? 'RESERVATIONS' : 'आरक्षण'}</h4>
          <p className="address-text">The Grand Pavilion, Sector 62, Golf Course Road, NCR</p>
          <p className="contact-link">📞 +91 98765 43210</p>
          <p className="contact-link">✉️ concierge@foodcartell.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FOOD CARTELL HAUTE GASTRONOMY. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}