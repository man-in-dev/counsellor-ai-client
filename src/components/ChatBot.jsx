import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI Counselling Assistant. How can I help you today?", sender: 'bot', time: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      time: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        time: new Date()
      }]);
    }, 1000);
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('jee')) return "JEE Main 2024 results are usually a good indicator. Have you used our JEE Predictor yet?";
    if (lowerInput.includes('neet')) return "NEET counselling can be complex. I can help you understand the cut-offs for top medical colleges.";
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) return "Hello! Hope you're having a great day. Looking for college predictions?";
    if (lowerInput.includes('rank')) return "To predict your rank, please provide your marks in our predictor tool. It's quite accurate!";
    return "That's interesting! I'm still learning, but I can definitely help you with JEE/NEET rank predictions and college choices.";
  };

  const quickActions = [
    "Predict JEE Rank",
    "Predict NEET Rank",
    "Best colleges for me?",
    "Join Community?"
  ];

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              width: 'min(400px, 92vw)',
              height: 'min(640px, 80vh)',
              marginBottom: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '32px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.12)',
              position: 'relative'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.5)',
              borderBottom: '1px solid rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0, 102, 119, 0.2)' }}>
                  <Bot size={24} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a', fontFamily: 'var(--font-serif)' }}>Counsellor AI</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}
                    />
                    Live Support
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', display: 'flex', transition: '0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.background = '#f1f5f9'}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              background: 'rgba(248, 250, 252, 0.4)',
              scrollbarWidth: 'none'
            }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx === messages.length - 1 ? 0 : 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                    maxWidth: '88%',
                    alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end'
                  }}
                >
                  <div style={{
                    padding: '1rem 1.25rem',
                    borderRadius: msg.sender === 'bot' ? '4px 20px 20px 20px' : '20px 20px 4px 20px',
                    background: msg.sender === 'bot' ? 'white' : 'var(--primary)',
                    boxShadow: msg.sender === 'bot' ? '0 4px 12px rgba(0,0,0,0.03)' : '0 8px 20px rgba(0, 102, 119, 0.15)',
                    border: msg.sender === 'bot' ? '1px solid #f1f5f9' : 'none',
                    fontSize: '0.95rem',
                    color: msg.sender === 'bot' ? '#334155' : 'white',
                    lineHeight: 1.5,
                    fontWeight: 500
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.4rem', fontWeight: 600 }}>
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div style={{ padding: '0.75rem 1.25rem', display: 'flex', gap: '0.6rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '100px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.border = '1px solid var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.border = '1px solid #e2e8f0';
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.03)', background: 'white' }}>
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  background: '#f8fafc', 
                  padding: '0.5rem 0.5rem 0.5rem 1.25rem', 
                  borderRadius: '100px', 
                  border: '1px solid #f1f5f9' 
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about colleges..."
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: '#1e293b',
                    padding: '0.5rem 0',
                    outline: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0, 102, 119, 0.2)',
                    transition: '0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--primary)',
          border: 'none',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <MessageCircle size={28} />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '12px',
                  height: '12px',
                  background: '#4ade80',
                  borderRadius: '50%',
                  border: '2px solid var(--primary)'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;
