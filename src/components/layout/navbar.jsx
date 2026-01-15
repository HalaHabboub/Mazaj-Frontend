// src/components/layout/navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    // Get real user from localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userName = user?.name || 'Guest';
    const userAvatar = user?.avatarUrl || `https://i.pravatar.cc/150?u=${user?.email || 'default'}`;

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/auth');
    };

    const renderRightSide = () => {
        // 1. PARTY MODE
        if (path.startsWith('/party/')) {
            return (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => navigate('/home')} className="nav-btn nav-btn-danger">
                        Exit Party
                    </button>
                </div>
            );
        }

        // 2. GUEST MODE (Landing or Auth pages)
        if (path === '/' || path === '/auth') {
            return (
                <Link to="/auth" className="nav-btn nav-btn-primary">
                    Log In
                </Link>
            );
        }

        // 3. LOGGED IN MODE
        return (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span className="nav-text">Welcome, {userName}</span>
                <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
                    <img
                        src={userAvatar}
                        alt="Avatar"
                        style={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <button onClick={handleLogout} className="nav-btn nav-btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                    Logout
                </button>
            </div>
        );
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to={path === '/' ? '/' : '/home'} className="nav-logo">
                    <span className="material-symbols-outlined">graphic_eq</span>
                    Mazaj
                </Link>
                {renderRightSide()}
            </div>
        </nav>
    );
};

export default Navbar;