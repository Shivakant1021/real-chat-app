    // pages/Login.jsx
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        const storedUser = JSON.parse(sessionStorage.getItem('chatUser'));
        if (!storedUser) {
        alert('No user found. Please sign up first.');
        return;
        }

        if (form.email === storedUser.email && form.password === storedUser.password) {
        // Store logged in user session (optional if not already stored)
        sessionStorage.setItem('user', JSON.stringify(storedUser));

        // Navigate to Dashboard instead of chat
        navigate('/dashboard');
        } else {
        alert('Invalid email or password');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
        <h2>Login</h2>
        <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        /><br />
        <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        /><br />
        <button onClick={handleLogin} style={{ padding: '10px 20px' }}>Login</button>

        <p style={{ marginTop: '10px' }}>
            Don’t have an account?{' '}
            <span
            onClick={() => navigate('/')}
            style={{ color: 'blue', cursor: 'pointer' }}
            >
            Sign up
            </span>
        </p>
        </div>
    );
    }

    export default Login;
