// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';

// Components
import Input from '../components/ui/input';
import Button from '../components/ui/button';

// Styles
import './css/Auth.css';

const Auth = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        avatarUrl: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    // Signup function
    const signup = async () => {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                avatarUrl: formData.avatarUrl || `https://i.pravatar.cc/150?u=${formData.email}`
            }),
        });
        return await response.json();
    };

    // Login function
    const login = async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            }),
        });
        return await response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = isLogin ? await login() : await signup();

            if (result.success) {
                localStorage.setItem('user', JSON.stringify(result.user));
                navigate('/home');
            } else {
                setError(result.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError('Connection error. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className="auth-container">
            {/* Background Blobs */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-20"></div>
            </div>

            <div className="auth-card relative z-10">
                <div className="auth-header">
                    <h1 className="auth-title">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="auth-subtitle">
                        {isLogin
                            ? 'Enter your credentials to access your party.'
                            : 'Join Mazaj and start curating better vibes.'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>

                    {/* SHOW THESE ONLY IF SIGNING UP */}
                    {!isLogin && (
                        <>
                            <div className="flex gap-4">
                                <Input
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    required
                                />
                                <Input
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Avatar URL Input */}
                            <div className="flex items-center gap-4">
                                <div className="size-14 shrink-0 rounded-full overflow-hidden bg-white/10 border border-white/20">
                                    <img
                                        src={formData.avatarUrl || `https://i.pravatar.cc/150?u=${formData.email || 'default'}`}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.src = 'https://i.pravatar.cc/150?u=default'}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        name="avatarUrl"
                                        type="url"
                                        placeholder="Profile photo URL (optional)"
                                        value={formData.avatarUrl}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                    <p className="text-xs text-gray-500 mt-1 pl-1">
                                        Leave empty for auto-generated avatar
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />

                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />

                    <Button variant="primary" type="submit" className="w-full mt-2" disabled={isLoading}>
                        {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </Button>
                </form>

                <div className="auth-footer">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        className="auth-link"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        disabled={isLoading}
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;