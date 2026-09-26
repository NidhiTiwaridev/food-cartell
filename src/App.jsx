import React, { useState } from 'react';
import SplashView from './views/SplashView';
import DashboardView from './views/DashboardView';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [state, setState] = useState({
    showSplash: true,
    theme: 'light',
  });

  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <div className={`app-wrapper ${state.theme}-mode`}>
      {state.showSplash ? (
        <SplashView
          onComplete={() =>
            setState((prev) => ({
              ...prev,
              showSplash: false,
            }))
          }
        />
      ) : (
        <>
          <DashboardView
            theme={state.theme}
            onToggleTheme={toggleTheme}
          />

          <WhatsAppButton />
        </>
      )}
    </div>
  );
}