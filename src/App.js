import React from 'react';
import Sitebar from './components/site/Navbar';
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {

  return (
      <Router>
        <Sitebar />
      </Router>
  );
};