import React, { useState, useRef, useEffect, useContext } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { TripContext } from '../App';
import { getChatResponse, quickReplies } from '../data/chatbot';
import './Chatbot.css';

export default function Chatbot() {
  const { tripData } = useContext(TripContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: `Hi! I'm your AI travel assistant 🌍\nAsk me anything about your trip!`,
      time: formatTime()
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  function formatTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput('');

    const userMsg = { id: Date.now(), from: 'user', text: userText, time: formatTime() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      const tripContext = tripData
        ? { destination: tripData.destination?.city, budget: tripData.budget }
        : null;
      const reply = getChatResponse(userText, tripContext);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'bot',
        text: reply,
        time: formatTime()
      }]);
      setTyping(false);
    }, 700 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chat-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Chat assistant"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chat-fab-badge">AI</span>}
      </button>

      {/* Chat Window */}
      <div className={`chat-window glass-card ${open ? 'visible' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-bot-avatar">
            <Bot size={18} />
          </div>
          <div className="chat-header-info">
            <span className="chat-bot-name">Travel Assistant</span>
            <span className="chat-bot-status">
              <span className="status-dot"></span> Online
            </span>
          </div>
          <button className="chat-close-btn" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="msg-avatar bot-av"><Bot size={14} /></div>
              )}
              <div className="msg-bubble">
                <p>{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
              {msg.from === 'user' && (
                <div className="msg-avatar user-av"><User size={14} /></div>
              )}
            </div>
          ))}

          {typing && (
            <div className="chat-msg bot">
              <div className="msg-avatar bot-av"><Bot size={14} /></div>
              <div className="msg-bubble typing-bubble">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="quick-replies">
            {quickReplies.map(qr => (
              <button key={qr} className="quick-reply-btn" onClick={() => sendMessage(qr)}>
                {qr}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Ask anything about your trip..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chat-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
