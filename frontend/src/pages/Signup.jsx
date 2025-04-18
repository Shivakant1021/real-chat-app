import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    const { name, email, phone, password } = form;
    if (name && email && phone && password) {
      const userData = { name, email, phone, password };
      sessionStorage.setItem('chatUser', JSON.stringify(userData));

      // ✅ Navigate to login instead of chat
      navigate('/login');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSignup}>Signup</button>
      <p>Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'blue', cursor: 'pointer' }}>Login</span></p>
    </div>
  );
}

export default Signup
