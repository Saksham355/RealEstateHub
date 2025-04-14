import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="glass-nav">
      <div className="nav-links">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/agents" className="nav-btn">Agents</Link>
        <Link to="/properties" className="nav-btn">Properties</Link>
        <Link to="/contact" className="nav-btn">Contact</Link>
        <Link to="/admin" className="nav-btn">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;