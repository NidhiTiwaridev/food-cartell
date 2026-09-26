import React, { useState } from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
const [isOpen, setIsOpen] = useState(false);

// Apna WhatsApp number yahan daalein
const phoneNumber = "917000770716";

const message = encodeURIComponent(
"Hello Food Cartell! I want to know about your menu and offers."
);

const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

return (
<>
{/* WhatsApp Floating Button */}
<button
className="whatsapp-float"
onClick={() => setIsOpen(!isOpen)}
aria-label="Open WhatsApp chat"
> <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"> <path d="M20.52 3.48A11.8 11.8 0 0 0 12.04 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.6 5.93L.08 24l6.36-1.67a11.9 11.9 0 0 0 5.6 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.39-8.41ZM12.05 21.7a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.83 9.83 0 0 1-1.51-5.18c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.83-9.94 9.83Zm5.45-7.4c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" /> </svg> </button>

```
  {/* WhatsApp Popup */}
  {isOpen && (
    <div className="whatsapp-popup">
      <div className="whatsapp-header">
        <div className="whatsapp-header-icon">✦</div>
        <div>
          <h3>Food Cartell</h3>
          <p>Typically replies instantly</p>
        </div>
        <button
          className="whatsapp-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
        >
          ×
        </button>
      </div>

      <div className="whatsapp-body">
        <div className="whatsapp-message">
          <strong>Welcome to Food Cartell! 👋</strong>
          <p>
            Hungry? 🍕 We are here to help you!
            Ask us about our menu, special offers
            and delicious food.
          </p>
          <small>Just now</small>
        </div>
      </div>

      <div className="whatsapp-footer">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-chat-link"
        >
          <span>☏</span> Start Chat on WhatsApp
        </a>
      </div>
    </div>
  )}
</>


);
};

export default WhatsAppButton;
