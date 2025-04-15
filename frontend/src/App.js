import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to your backend server
const socket = io('http://localhost:8000'); // make sure backend is running on this port

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up when component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', { text: message });
      setMessage(''); // clear input after sending
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Chat</h1>

      <div style={{ marginBottom: 20 }}>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '300px', padding: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', marginLeft: 10 }}>
          Send
        </button>
      </div>

      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
