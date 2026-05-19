import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RankPredictor from './components/RankPredictor';
import Home from './components/Home';
import ChatBot from './components/ChatBot';

import BookingModal from './components/BookingModal';

const Navbar = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: "JEE Counselling", path: "/jee" },
    { name: "NEET Counselling", path: "/neet" },
    { name: "Community", path: "/#community", id: 'community' },
    { name: "What We Cover", path: "/#services", id: 'services' },
    { name: "Who It's For", path: "/#audience", id: 'audience' },
    { name: "FAQ", path: "/#faq", id: 'faq' }
  ];

  const handleNavClick = (e, link) => {
    if (link.path.startsWith('/#')) {
      e.preventDefault();
      const id = link.id;
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      } else {
        navigate(link.path);
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 1000, 
      padding: '0.75rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: '#0f172a' }}>
          <div style={{ width: '28px', height: '28px', background: '#0a0f1d', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem' }}>C</div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>CounsellorAI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex" style={{ flex: 1, justifyContent: 'center', gap: '2rem' }}>
          {navLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path} 
              onClick={(e) => handleNavClick(e, link)}
              style={{ color: '#475569', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1rem' }}>
          <button style={{ background: 'transparent', border: '1px solid #e2e8f0', padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>
            Sign In
          </button>
          <button 
            onClick={onOpenBooking} 
            style={{ 
              background: '#0a0f1d', 
              color: 'white', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '100px', 
              fontSize: '0.9rem', 
              fontWeight: 600, 
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Book a Session
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" style={{ background: 'rgba(0,0,0,0.05)', border: 'none', color: '#1e293b', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ 
              marginTop: '1rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              padding: '1.5rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
            }}
          >
            {navLinks.map((link, i) => (
              <Link 
                key={i} 
                to={link.path} 
                onClick={(e) => handleNavClick(e, link)}
                style={{ color: '#1e293b', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}
              >
                {link.name}
              </Link>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button style={{ background: 'transparent', border: '1px solid #e2e8f0', padding: '0.8rem', borderRadius: '12px', fontWeight: 600 }}>Sign In</button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }} 
                style={{ 
                  background: '#0a0f1d', 
                  color: 'white', 
                  padding: '0.8rem', 
                  borderRadius: '100px', 
                  fontWeight: 600, 
                  textAlign: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Book a Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AppContent = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'visible', background: 'white' }}>
      {/* Floating Blobs for all pages */}
      <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: '40vw', height: '40vw', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%', zIndex: -1 }}></div>
      <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '50vw', height: '50vw', background: 'var(--secondary)', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%', zIndex: -1 }}></div>

      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      <main style={{ paddingTop: isHome ? '60px' : '100px', paddingBottom: '0' }}>
        <div className={isHome ? "" : "max-w-7xl"} style={isHome ? {} : { padding: '0 1.5rem' }}>
          <Routes>
            <Route path="/" element={<Home onOpenBooking={() => setIsBookingOpen(true)} />} />
            <Route path="/jee" element={<RankPredictor type="JEE" />} />
            <Route path="/neet" element={<RankPredictor type="NEET" />} />
          </Routes>
        </div>
      </main>

      <ChatBot />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
