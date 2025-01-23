import { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/messages');
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }

        fetchMessages();
    }, []);

    return (
        <div className="chat-container">
            <h3>Chat</h3>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Chat;
