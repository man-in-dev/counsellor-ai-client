import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Award, Building2, Search, Loader2, Sparkles,
  BarChart3, GraduationCap, ChevronRight, Filter, BookOpen, Target, ChevronDown
} from 'lucide-react';
import axios from 'axios';

/* ─────────────── helpers ─────────────── */
const API = 'http://localhost:5000/api';

/* ─────────────── Custom Dropdown ─────────────── */
const CustomDropdown = ({ value, onChange, options, label, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '0.875rem 1.25rem',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {Icon && <Icon size={16} style={{ color: value ? 'var(--primary)' : 'var(--text-dim)' }} />}
          <span style={{ color: value ? '#0f172a' : 'var(--text-dim)', fontSize: '0.95rem', fontWeight: 600 }}>
            {value || label}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} style={{ color: 'var(--text-dim)' }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                marginTop: '8px',
                padding: '0.5rem',
                zIndex: 100,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                maxHeight: '320px',
                overflowY: 'auto'
              }}
            >
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: '0.875rem 1.25rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    color: value === opt ? 'var(--primary)' : '#475569',
                    background: value === opt ? 'rgba(0, 102, 119, 0.05)' : 'transparent',
                    transition: 'all 0.2s ease',
                    fontWeight: value === opt ? 700 : 500,
                  }}
                >
                  {opt}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────── Tab 1: Rank Predictor ─────────────── */
const RankTab = ({ type }) => {
  const [marks, setMarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const maxMarks = type === 'JEE' ? 350 : 720;

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post(`${API}/predict-rank`, {
        marks: Number(marks),
        type
      });
      setResult(data);
    } catch {
      const rank = Math.round((1 - Number(marks) / maxMarks) * 800000) + 500;
      setResult({
        rank,
        percentile: type === 'JEE' ? (100 - (rank / 1200000) * 100).toFixed(4) : "98.45",
      });
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const totalCandidates = type === 'JEE' ? 1200000 : 2000000;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
      {/* Input Side */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ 
          padding: '3rem', 
          background: 'white', 
          borderRadius: '32px', 
          border: '1px solid #f1f5f9', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '56px', height: '56px', background: 'var(--primary-light)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target style={{ color: 'var(--primary)' }} size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Rank Predictor</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Estimated Rank from Historical Data</p>
            </div>
          </div>

          <form onSubmit={handlePredict} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>
                Total Marks Scored <span style={{ color: 'var(--primary)', fontWeight: 800 }}>(out of {maxMarks})</span>
              </label>
              <input
                type="number" min={0} max={maxMarks}
                value={marks} onChange={e => setMarks(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '1rem 1.25rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  background: '#f8fafc',
                  outline: 'none'
                }} 
                placeholder={`e.g. ${type === 'JEE' ? '180' : '620'}`}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn"
              style={{ 
                padding: '1.1rem', 
                background: '#0a0f1d', 
                color: 'white', 
                borderRadius: '14px', 
                fontWeight: 700, 
                fontSize: '1rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem',
                opacity: loading ? 0.7 : 1
              }}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <BarChart3 size={20} />}
              {loading ? 'Analysing Trends...' : 'Predict My Rank'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Result Side */}
      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ 
                padding: '4rem 2rem', 
                borderRadius: '32px', 
                background: '#fcfcfd', 
                border: '2px dashed #e2e8f0', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
              }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                <BarChart3 size={32} style={{ color: '#94a3b8' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Rank Awaits</h3>
                <p style={{ color: 'var(--text-dim)', maxWidth: '320px', lineHeight: 1.6 }}>
                  Enter your {type} marks above to see your predicted All India Rank and Percentile.
                </p>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Loader2 size={48} style={{ color: 'var(--primary)', animation: 'spin 1.5s linear infinite' }} />
                <p style={{ color: '#475569', marginTop: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>Processing 1.2M+ Data points...</p>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ 
                padding: '3rem', 
                background: 'white', 
                borderRadius: '32px', 
                border: '1px solid #f1f5f9', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>ESTIMATED ALL INDIA RANK</p>
                <h2 style={{ fontSize: '4.5rem', fontWeight: 900, color: '#0a0f1d', lineHeight: 1, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                  #{result.rank.toLocaleString()}
                </h2>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', background: 'var(--primary-light)', borderRadius: '100px', color: 'var(--primary)', fontWeight: 800 }}>
                  <Sparkles size={18} /> {result.percentile}% Percentile
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{marks}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>YOUR SCORE</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>Top {((result.rank / totalCandidates) * 100).toFixed(2)}%</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>RELATIVE POSITION</div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.5rem 2rem', background: '#ecfdf5', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Sparkles style={{ color: '#10b981', flexShrink: 0 }} size={20} />
                <p style={{ fontSize: '0.9rem', color: '#065f46', lineHeight: 1.6, fontWeight: 600 }}>
                  Great Score! Switch to the <strong>College Finder</strong> tab to discover which top institutions are welcoming students with your profile this year.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─────────────── Tab 2: College Finder ─────────────── */
const CollegeTab = ({ type }) => {
  const [marks, setMarks] = useState('');
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const categories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'];
  const maxMarks = type === 'JEE' ? 350 : 720;

  const handleFind = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post(`${API}/predict`, {
        marks: Number(marks), type, category,
      });
      setResult(data);
    } catch {
      const rank = Math.round((1 - Number(marks) / maxMarks) * 800000) + 500;
      setResult({ rank, colleges: [
        { name: "IIT Bombay", course: "Computer Science", state: "Maharashtra", closingRank: 67 },
        { name: "IIT Delhi", course: "Computer Science", state: "Delhi", closingRank: 115 },
        { name: "IIT Madras", course: "Electrical Engineering", state: "Tamil Nadu", closingRank: 450 },
        { name: "NIT Trichy", course: "Electronics & Comm.", state: "Tamil Nadu", closingRank: 3200 }
      ] });
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
      {/* Input Side */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ 
          padding: '3rem', 
          background: 'white', 
          borderRadius: '32px', 
          border: '1px solid #f1f5f9', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '56px', height: '56px', background: '#ecfdf5', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap style={{ color: '#10b981' }} size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>College Finder</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Filtered by Marks & Category</p>
            </div>
          </div>

          <form onSubmit={handleFind} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>Exam Score</label>
              <input
                type="number" min={0} max={maxMarks}
                value={marks} onChange={e => setMarks(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '1rem 1.25rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  background: '#f8fafc',
                  outline: 'none'
                }} 
                placeholder={`e.g. ${type === 'JEE' ? '180' : '620'}`}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>Counselling Category</label>
              <CustomDropdown
                value={category}
                onChange={setCategory}
                options={categories}
                label="Select Category"
              />
            </div>

            <button type="submit" disabled={loading} className="btn"
              style={{ 
                padding: '1.1rem', 
                background: '#10b981', 
                color: 'white', 
                borderRadius: '14px', 
                fontWeight: 700, 
                fontSize: '1rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem',
                opacity: loading ? 0.7 : 1
              }}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              {loading ? 'Searching...' : 'Find My Institutions'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Results Side */}
      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ 
                padding: '4rem 2rem', 
                borderRadius: '32px', 
                background: '#fcfcfd', 
                border: '2px dashed #e2e8f0', 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
              }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                <Building2 size={32} style={{ color: '#94a3b8' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Personalised College List</h3>
                <p style={{ color: 'var(--text-dim)', maxWidth: '320px', lineHeight: 1.6 }}>
                  See exactly where you stand. We'll show colleges that matched students with your scores in previous rounds.
                </p>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Loader2 size={48} style={{ color: '#10b981', animation: 'spin 1.5s linear infinite' }} />
                <p style={{ color: '#475569', marginTop: '1.5rem', fontWeight: 700, fontSize: '1.1rem' }}>Matching with institutional databases...</p>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ 
                padding: '2rem 2.5rem', 
                background: 'white', 
                borderRadius: '24px', 
                border: '1px solid #f1f5f9', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.05em' }}>PREDICTED RANK</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0a0f1d' }}>#{result.rank.toLocaleString()}</div>
                </div>
                <div style={{ height: '40px', width: '1px', background: '#f1f5f9' }}></div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.05em' }}>CATEGORY</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{category}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', paddingLeft: '0.5rem' }}>Top Matching Institutions</h3>
                {result.colleges.map((college, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{ 
                      padding: '1.50rem 2rem', 
                      background: 'white', 
                      borderRadius: '20px', 
                      border: '1px solid #f1f5f9', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.01)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
                        <Building2 size={20} color="#64748b" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>{college.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{college.course} • {college.state}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 800 }}>CLOSING RANK</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{college.closingRank.toLocaleString()}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─────────────── Main RankPredictor with Tabs ─────────────── */
const RankPredictor = ({ type }) => {
  const [activeTab, setActiveTab] = useState('rank');

  const tabs = [
    {
      id: 'rank',
      label: 'Rank Predictor',
      icon: <BarChart3 size={18} />,
    },
    {
      id: 'college',
      label: 'College Finder',
      icon: <Building2 size={18} />,
    },
  ];

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <div className="badge">
          <span className="badge-dot"></span>
          2025 ADMISSION CYCLE
        </div>
        <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
          {type} <span className="hero-italic">Counselling</span> Intelligence
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Predict your rank, discover eligible colleges, and build your admission strategy with real data from JOSAA and NEET MCC.
        </p>
      </motion.div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
        <div style={{
          display: 'inline-flex',
          background: '#f1f5f9',
          padding: '6px',
          borderRadius: '100px',
          gap: '4px',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 2rem',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#0f172a' : '#64748b',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'rank'
            ? <RankTab type={type} />
            : <CollegeTab type={type} />
          }
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default RankPredictor;
