import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

// Connect to the backend server (make sure it's running on the correct URL)
const socket = io("http://localhost:5000");

function Home() {
  const { user } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up when the component is unmounted
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage = {
      sender: user,
      text: input,
    };

    // Emit the message to the server
    socket.emit('send_message', newMessage);

    // Add the message to the local state immediately
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>💬 Welcome to the Chat, {user}!</h2>
      <p>This is your chat room. Start messaging now...</p>

      {/* Chat box */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'auto',
          background: '#f9f9f9',
          borderRadius: '10px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              textAlign: msg.sender === user ? 'right' : 'left',
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input & Send */}
      <div style={{ marginTop: '1rem', display: 'flex' }}>
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            border: '1px solid #aaa',
            borderRadius: '4px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Home;
