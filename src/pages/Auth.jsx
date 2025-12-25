import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Input from '../components/ui/input';
import Button from '../components/ui/button';

// Styles
import './css/Auth.css';

const Auth = () => {
    const navigate = useNavigate();

    // State to toggle between Login (true) and Signup (false)
    const [isLogin, setIsLogin] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // TODO: Connect to Supabase Auth here later
        navigate('/home'); // Temporary redirect for demo
    };


    return (
        <div className="auth-container">
            {/* Background Blobs (Optional: reused from Landing for consistency) */}
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

                <form className="auth-form" onSubmit={handleSubmit}>

                    {/* SHOW THESE ONLY IF SIGNING UP */}
                    {!isLogin && (
                        <div className="flex gap-4">
                            <Input
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button variant="primary" type="submit" className="w-full mt-2">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>

                <div className="auth-footer">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        className="auth-link"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;