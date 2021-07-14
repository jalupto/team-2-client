import React, { useEffect, useState } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';

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
  
  return (
    <div className="App">
      <Sitebar clickLogout={clearToken}/>
      <Auth updateToken={updateToken}/>
    </div>
  );
}

export default App;
