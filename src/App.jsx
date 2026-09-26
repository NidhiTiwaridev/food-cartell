import React, { useState } from 'react';
import { AuthController } from './controllers/AuthController';
import SplashView from './views/SplashView';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
const [state, setState] = useState({
showSplash: true,
isAuthenticated: false,
user: null,
theme: 'light',
error: null
});

const controller = new AuthController(setState);

return (
<div className={`app-wrapper ${state.theme}-mode`}>
{state.showSplash ? (
<SplashView
onComplete={() => controller.handleSplashComplete()}
/>
) : state.isAuthenticated ? (
<>
<DashboardView
user={state.user}
theme={state.theme}
onLogout={() => controller.handleLogout()}
onToggleTheme={() => controller.toggleTheme()}
/> <WhatsAppButton />
</>
) : (
<LoginView
error={state.error}
theme={state.theme}
onLogin={(u, p) => controller.handleLogin(u, p)}
onToggleTheme={() => controller.toggleTheme()}
/>
)} </div>
);
}
