import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Register from './components/Register/Register';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
  }
  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
      }}
    >

      <React.Fragment>
        <MainHeader onLogout={logoutHandler} onRegisterClick={showRegisterHandler} onLoginClick={showLoginHandler} />
        <main>
          {(!isLoggedIn && showRegister) && <Register />}
          {(!isLoggedIn && showLogin) && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;