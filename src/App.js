import React, { useEffect, useState } from 'react';
import Sitebar from './components/site/Navbar';
import Auth from './components/auth/Auth';
import FavIndex from './components/favorites/FavIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }
  

const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
        <FavIndex token={sessionToken} />
    ) : (
        <Auth updateToken={updateToken} />
    );
};

  return (
    <div className="App">
      <Sitebar clickLogout={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
