import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'; // Importing your custom CSS

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    // Mock User Data (Replace with real Auth later)
    const userName = "Hala";
    const participantCount = 12;

    // HELPER: Decide what to render on the RIGHT side
    const renderRightSide = () => {
        // 1. PARTY MODE (If URL starts with /party/)
        if (path.startsWith('/party/')) {
            return (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button className="nav-btn nav-btn-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>group</span>
                        Participants: {participantCount}
                    </button>

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

        // 3. LOGGED IN MODE (Home, Profile, Create Party)
        return (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span className="nav-text">Welcome, {userName}</span>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#36e27b' }}>
                    {/* Avatar Placeholder */}
                    <img
                        src={`https://ui-avatars.com/api/?name=${userName}&background=36e27b&color=fff`}
                        alt="Avatar"
                        style={{ borderRadius: '50%', width: '100%' }}
                    />
                </div>
            </div>
        );
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* LEFT SIDE: Always the Logo */}
                <Link to={path === '/' ? '/' : '/home'} className="nav-logo">
                    <span className="material-symbols-outlined">graphic_eq</span>
                    Mazaj
                </Link>

                {/* RIGHT SIDE: Dynamic Content */}
                {renderRightSide()}
            </div>
        </nav>
    );
};

export default Navbar;