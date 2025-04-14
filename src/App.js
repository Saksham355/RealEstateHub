import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Properties from './components/Properties';
import Agents from './components/Agents';
import Clients from './components/Clients';
import Home from './components/Home';
import Admin from './components/Admin';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="main-nav">
                    <div className="nav-brand">Real Estate Hub</div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/properties">Properties</Link></li>
                        <li><Link to="/agents">Agents</Link></li>
                        <li><Link to="/clients">Clients</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
