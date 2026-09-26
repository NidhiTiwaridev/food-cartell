import { UserModel } from '../models/UserModel';

export class AuthController {
  constructor(setState) {
    this.setState = setState;
  }

  handleSplashComplete() {
    this.setState(prevState => ({
      ...prevState,
      showSplash: false,
      currentView: prevState.isAuthenticated ? 'dashboard' : 'login'
    }));
  }

  handleLogin(username, password) {
    const result = UserModel.validateLogin(username, password);
    if (result.success) {
      this.setState(prevState => ({
        ...prevState,
        user: result.user,
        isAuthenticated: true,
        currentView: 'dashboard',
        error: null
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        error: result.message
      }));
    }
  }

  handleLogout() {
    this.setState(prevState => ({
      ...prevState,
      user: null,
      isAuthenticated: false,
      currentView: 'login'
    }));
  }

  toggleTheme() {
    this.setState(prevState => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  }
}