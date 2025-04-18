import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div>
      {/* Navbar */}
      <nav style={{ background: '#222', padding: '1rem', color: '#fff' }}>
        <h3>Welcome, {user.name}</h3>
        <button onClick={() => navigate(`/chat/${user.name}`)} style={{ marginLeft: '20px' }}>
          Go to Chat
        </button>
      </nav>

      {/* Dashboard Content */}
      <div style={{ padding: '2rem' }}>
        <h2>Dashboard</h2>
        <div>
          <h4>Profile Info:</h4>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>

        <hr />

        <div>
          <h4>Dummy Section</h4>
          <ul>
            <li>📌 Notifications</li>
            <li>📦 Orders</li>
            <li>⚙️ Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
