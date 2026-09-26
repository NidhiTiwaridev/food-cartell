import React, { useState } from 'react';
import logoImg from '../assets/logo.jpeg';

export default function LoginView({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="editorial-login-container">
      <div className="login-glass-card">
        <div className="login-brand-header">
          <img src={logoImg} alt="Food Cartell" className="login-logo-image" />
          <h2>FOOD CARTELL</h2>
          <span className="brand-subtitle">PRIVILEGE PORTAL</span>
        </div>

        {error && <div className="imperial-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="imperial-form">
          <div className="input-field-group">
            <label>User Identifier</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              required
            />
          </div>

          <div className="input-field-group">
            <label>Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="credentials-hint">
            Demo Access: <strong>admin</strong> | <strong>admin123</strong>
          </div>

          <button type="submit" className="login-submit-btn">
            ENTER DASHBOARD →
          </button>
        </form>
      </div>
    </div>
  );
}