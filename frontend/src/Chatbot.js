// src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const user_id = uuidv4(); // Unique user ID for conversation memory

function Chatbot() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');

    const handleSendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:5000/chat', { message, user_id });
            if (res.data.error) {
                setError(res.data.error);
                setResponse('');
            } else {
                setResponse(res.data.response);
                setError('');
            }
        } catch (error) {
            setError('Sorry, something went wrong.');
            setResponse('');
        }
    };

    return (
        <div>
            <h1>❈  🎀  𝒢𝓇𝒶𝓉𝒾𝒶 𝒞𝒶𝓇𝒾𝓉𝒶𝓈  🎀  ❈</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Breath, you are doing great.😊 How may I be of assistance?"
            />
            <button onClick={handleSendMessage}>Send</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
}

export default Chatbot;
