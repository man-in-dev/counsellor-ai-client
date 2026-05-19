import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, CheckCircle2, ChevronRight, Play, Users, 
  MessageSquare, Star, ArrowRight, ShieldCheck, 
  Sparkles, GraduationCap, Target, HelpCircle, Plus, Minus, Search
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const FeatureCard = ({ icon: Icon, title, desc, color = "var(--primary)" }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    style={{
      padding: '2rem',
      borderRadius: '24px',
      background: 'white',
      border: '1px solid #f1f5f9',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}
  >
    <div style={{ 
      width: '48px', 
      height: '48px', 
      borderRadius: '12px', 
      background: `${color}10`, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: '1.5rem'
    }}>
      <Icon style={{ color }} size={24} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>{title}</h3>
    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>{desc}</p>
  </motion.div>
);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #f1f5f9' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>{question}</span>
        {isOpen ? <Minus size={20} color="#64748b" /> : <Plus size={20} color="#64748b" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: '1.5rem', color: '#64748b', lineHeight: 1.6 }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = ({ onOpenBooking }) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div style={{ background: '#fff', color: '#0f172a', width: '100%' }}>
      
      {/* Hero Section */}
      <section id="home" style={{ padding: '6rem 2rem 8rem', maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge">
            <span className="badge-dot"></span>
            Guidance for JEE · NEET · Engineering Admissions
          </div>
          <h1 className="hero-title">
            Choosing a College<br />
            Shouldn't Feel Like<br />
            <span className="hero-italic">Guesswork.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '3rem', maxWidth: '560px', lineHeight: 1.6 }}>
            You spent years preparing for the exam. Now make the decision that shapes the next four years with structured expert guidance, not YouTube comments or relatives' opinions.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <button 
              onClick={onOpenBooking}
              className="btn btn-primary" 
              style={{ padding: '1.1rem 2.2rem', borderRadius: '14px', fontSize: '1.05rem', boxShadow: '0 10px 20px rgba(0, 102, 119, 0.2)', border: 'none', cursor: 'pointer' }}
            >
              Book Your Guidance Session <ArrowRight size={18} style={{ marginLeft: '0.8rem' }} />
            </button>
            <button 
              onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn" 
              style={{ background: 'white', border: '1px solid #e2e8f0', color: '#1e293b', padding: '1.1rem 2.2rem', borderRadius: '14px', fontSize: '1.05rem', cursor: 'pointer' }}
            >
              Join Community
            </button>
          </div>

          <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 'clamp(1rem, 4vw, 4rem)', alignItems: 'center' }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', fontWeight: 800, marginBottom: '0.25rem' }}>12,000+</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}>Scenarios Analysed</div>
            </div>
            <div style={{ padding: '0.5rem', borderLeft: '1px solid #f1f5f9', height: '30px', display: 'none', visibility: 'hidden' }}></div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', fontWeight: 800, marginBottom: '0.25rem' }}>IITs · NITs · IIITs</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}>+ Top Private Colleges</div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', fontWeight: 800, marginBottom: '0.25rem' }}>1:1</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}>Personalised Strategy</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          {/* Subtle Glow Background */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)', opacity: 0.6, zIndex: -1, pointerEvents: 'none' }}></div>
          
          {/* Main Card */}
          <div className="card-shadow" style={{ background: 'white', padding: '2.5rem', borderRadius: '40px', border: '1px solid #f1f5f9', position: 'relative' }}>
            
            {/* Best Fit Badge */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ position: 'absolute', top: '-20px', right: '-10px', background: 'white', padding: '0.75rem 1.25rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 10, border: '1px solid #f1f5f9' }}
            >
              <div style={{ width: '32px', height: '32px', background: '#ecfdf5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={16} fill="#10b981" color="#10b981" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>Best Fit Found</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>3 colleges matched</div>
              </div>
            </motion.div>

            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              YOUR COUNSELLING PROFILE
            </div>

            {/* Profile Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.5rem' }}>JEE RANK</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>8,450</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>General Category</div>
              </div>
              <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.5rem' }}>PRIORITY</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>CS / ECE</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Software career path</div>
              </div>
              <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.5rem' }}>LOCATION PREF.</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>North India</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Open to relocation</div>
              </div>
              <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.5rem' }}>BUDGET</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>₹8L / yr</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Incl. hostel & fees</div>
              </div>
            </div>

            {/* Match List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600 }}>NIT Trichy — ECE</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>92% fit</span>
                </div>
                <div className="progress-bar">
                  <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.5 }} className="progress-fill" style={{ background: 'var(--primary)' }}></motion.div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600 }}>NIT Warangal — CS</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>88% fit</span>
                </div>
                <div className="progress-bar">
                  <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} transition={{ duration: 1, delay: 0.7 }} className="progress-fill" style={{ background: 'var(--primary)' }}></motion.div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600 }}>IIIT Hyderabad — CSE</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>79% fit</span>
                </div>
                <div className="progress-bar">
                  <motion.div initial={{ width: 0 }} animate={{ width: '79%' }} transition={{ duration: 1, delay: 0.9 }} className="progress-fill" style={{ background: 'var(--accent)' }}></motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges Bar */}
      <section style={{ padding: '3rem 2rem', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: '#fcfcfd' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {[
              { icon: Star, text: "Expert-Guided Decisions" },
              { icon: CheckCircle2, text: "JoSAA · CSAB · State Counselling" },
              { icon: ShieldCheck, text: "Unbiased. No Referral Fees." },
              { icon: BarChart3, text: "Placement & ROI Analysis" },
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.2rem', background: 'white', borderRadius: '100px', border: '1px solid #f1f5f9', fontSize: '0.9rem', fontWeight: 600, color: '#475569', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <item.icon size={16} color="var(--primary)" />
                  {item.text}
                </div>
                {i < 3 && <div style={{ width: '4px', height: '4px', background: '#e2e8f0', borderRadius: '50%' }}></div>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.2rem', background: 'white', borderRadius: '100px', border: '1px solid #f1f5f9', fontSize: '0.9rem', fontWeight: 600, color: '#475569', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <GraduationCap size={16} color="var(--primary)" />
              IITs · NITs · IIITs · Private Colleges
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: '8rem 2rem', background: '#fcfcfd' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="badge" style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', marginBottom: '1.5rem' }}>
              <span className="badge-dot" style={{ background: '#0369a1' }}></span>
              THE REAL PROBLEM
            </div>
            <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
              Most Students Optimise For<br />the Wrong Thing.
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
              Years of preparation, then a decision made in 72 hours — based on incomplete information, peer pressure, or a college ranking list.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {[
              { icon: GraduationCap, title: "Brand Over Fit", desc: "Choosing a college by name alone without understanding whether the branch aligns with career goals — leading to four unfulfilling years.", color: "#ef4444" },
              { icon: HelpCircle, title: "Ignoring Branch Fit", desc: "Blindly filling preference lists without understanding how branch choice shapes placements, higher education, and long-term career paths.", color: "#ef4444" },
              { icon: BarChart3, title: "Misreading Cutoffs", desc: "Using last year's closing ranks without accounting for category trends, round-wise variations, or seat matrix changes in counselling rounds.", color: "#ef4444" },
              { icon: Users, title: "Following Peer Pressure", desc: "Picking options because friends did, or because a coaching institute pushed certain colleges — with no structured analysis of personal goals.", color: "#ef4444" },
              { icon: ShieldCheck, title: "Misunderstanding Placements", desc: "Average package figures without context — no understanding of median salaries, placement percentages, or branch-specific hiring trends.", color: "#ef4444" },
              { icon: Target, title: "Poor Preference Order", desc: "Filling JoSAA preferences without a strategy — missing options due to incorrect ordering, floating vs freezing confusion, or wrong round decisions.", color: "#ef4444" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                style={{
                  padding: '2.5rem',
                  borderRadius: '32px',
                  background: 'white',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '10px', 
                  background: `${item.color}15`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <item.icon style={{ color: item.color }} size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Approach (What we offer) */}
      <section id="services" style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="badge" style={{ background: '#f0f9f9', color: 'var(--primary)', border: 'none', marginBottom: '1.5rem' }}>
              <span className="badge-dot"></span>
              WHAT WE OFFER
            </div>
            <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
              A Structured Approach to<br />Career Decisions
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
              Every session is built around your profile, goals, and constraints — not a one-size-fits-all template.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {[
              { icon: BarChart3, title: "Personalised Counselling Strategy", desc: "A tailored plan based on your rank, category, interests, budget, and career goals — not generic advice copied from a forum post.", color: "var(--primary)" },
              { icon: Target, title: "College & Branch Shortlisting", desc: "Data-driven filtering of realistic options across IITs, NITs, IIITs, and top private colleges, mapped to your profile and priorities.", color: "var(--primary)" },
              { icon: Sparkles, title: "Placement & ROI Insights", desc: "Understand real placement data — median packages, top recruiters, branch-wise hiring, and how to evaluate a college's true ROI.", color: "var(--primary)" },
              { icon: Star, title: "JoSAA / CSAB Preference Guidance", desc: "Build a smart, ordered preference list — understanding floating, freezing, withdrawal strategy, and how to protect yourself across rounds.", color: "var(--primary)" },
              { icon: Users, title: "Parent Consultation Support", desc: "Structured sessions where parents can understand the tradeoffs, ask questions, and align with their child's decision — without conflict or confusion.", color: "var(--primary)" },
              { icon: GraduationCap, title: "State Counselling Navigation", desc: "Guidance for state-level counselling processes — MHT-CET, AP EAMCET, KCET, and more — alongside national counselling strategy.", color: "var(--primary)" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                style={{
                  padding: '2.5rem',
                  borderRadius: '32px',
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.01)'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '10px', 
                  background: `${item.color}10`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <item.icon style={{ color: item.color }} size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section id="community" style={{ padding: '8rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="badge" style={{ background: '#f0f9ff', color: '#0ea5e9', border: 'none', marginBottom: '1.5rem' }}>
            <span className="badge-dot" style={{ background: '#0ea5e9' }}></span>
            EXPERT COMMUNITY
          </div>
          <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            You Don't Have to Do This Alone.
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '640px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
            Join over 50,000+ aspirants in our moderated communities. Get real-time updates and speak directly with mentors.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* JEE Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              style={{ background: 'white', padding: '3rem 2rem', borderRadius: '32px', border: '1px solid #e2e8f0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>JEE Mains & Advanced</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Covers JOSAA, CSAB, and all state engineering counselling updates.</p>
              </div>
              <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                <Users size={16} /> 32,450 members
              </div>
              <a href="#" className="btn btn-primary" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px', gap: '0.75rem' }}>
                Join JEE Community <ArrowRight size={18} />
              </a>
            </motion.div>

            {/* NEET Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              style={{ background: 'white', padding: '3rem 2rem', borderRadius: '32px', border: '1px solid #e2e8f0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare color="#10b981" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>NEET UG Admissions</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Daily updates on MCC, State quotas, and private medical seat matrix.</p>
              </div>
              <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                <Users size={16} /> 18,920 members
              </div>
              <a href="#" className="btn" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px', gap: '0.75rem', background: '#10b981', color: 'white' }}>
                Join NEET Community <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tradeoffs Section (Decision Intelligence) */}
      <section style={{ padding: '8rem 2rem', background: '#0a0f1d' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
              <span className="badge-dot" style={{ background: '#94a3b8' }}></span>
              DECISION INTELLIGENCE
            </div>
            <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'white' }}>
              The Tradeoffs That Actually<br />Matter
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
              These are the decisions most students get wrong — not because they're not smart, but because they don't have the right framework.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
            {[
              {
                left: "IIT Lower Branch", right: "NIT CS / ECE",
                title: "Brand vs. Placement Outcome",
                desc: "An IIT tag with a low-demand branch can mean fewer offers than an NIT CS student. Depends heavily on your career path — core vs. software.",
                takeaway: "Outcome depends on post-admission effort, not the IIT label alone"
              },
              {
                left: "Top College", right: "Dream Branch",
                title: "Institution vs. Specialisation",
                desc: "If you're targeting higher studies, college tier matters more. If you want a core career or startup path, branch fit often wins.",
                takeaway: "No universal answer — it depends on your specific goal"
              },
              {
                left: "Govt. NIT/IIT", right: "Top Private College",
                title: "ROI & Fee Structure",
                desc: "Government colleges offer better fee-to-placement ratios on average, but top private colleges can match outcomes in specific domains.",
                takeaway: "Compare median salary + total fees — not just package headlines"
              },
              {
                left: "Home State College", right: "Outstation Campus",
                title: "Location vs. Opportunity",
                desc: "A geographically distant NIT with strong CS placements often outperforms a closer, lower-ranked option — especially for software careers.",
                takeaway: "Proximity comfort vs. 4 years of career-defining networks"
              },
              {
                left: "Wait for Better Rank", right: "Take Best Current Option",
                title: "Drop Year Decision",
                desc: "A drop year makes sense in specific scenarios. The decision should be based on honest assessment, not emotion or parental pressure.",
                takeaway: "Structured analysis beats gut feeling on drop decisions"
              },
              {
                left: "JoSAA Float", right: "Freeze Early",
                title: "Counselling Round Strategy",
                desc: "Floating too long risks losing a secured seat. Freezing too early misses upgrades. Strategy must balance risk tolerance with preference priorities.",
                takeaway: "Your preference order order is a strategy document, not a wishlist"
              }
            ].map((item, i) => (
              <div key={i} style={{ padding: '2.5rem', borderRadius: '32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>{item.left}</span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800 }}>vs</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>{item.right}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>{item.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
                <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(0, 102, 119, 0.1)', borderLeft: '3px solid var(--primary)', borderRadius: '0 12px 12px 0' }}>
                  <p style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600, fontStyle: 'italic' }}>{item.takeaway}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section id="audience" style={{ padding: '8rem 2rem', background: '#fcfcfd' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="badge" style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', marginBottom: '1.5rem' }}>
              <span className="badge-dot" style={{ background: '#0369a1' }}></span>
              WHO THIS IS FOR
            </div>
            <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
              Designed for Every Stage<br />of the Journey
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: Target, title: "JEE Aspirants", text: "Rank in hand, confused about what comes next. We help you build a strategy before counselling begins." },
              { icon: ShieldCheck, title: "NEET Aspirants", text: "Government vs private medical colleges, branch selection, and counselling navigation across states." },
              { icon: Sparkles, title: "Droppers", text: "Deciding whether to drop — and if so, what the strategy should look like with clear-eyed realistic analysis." },
              { icon: Search, title: "Confused Students", text: "Good rank, many options, no clarity. We help you figure out what you actually want from the next four years." },
              { icon: Users, title: "Parents", text: "Wanting to make the best decision for their child — with structured information, not just the advice of a relative who \"works in engineering.\"" },
              { icon: GraduationCap, title: "Top Rankers", text: "High optionality is harder than it looks. IIT vs IIT, branch vs branch — we help optimise for long-term outcomes." },
              { icon: BarChart3, title: "Backup Planners", text: "Not targeting only top colleges — building a realistic, strong preference list across tiers with a clear strategy for each round." },
              { icon: Target, title: "Tier 2/3 Families", text: "First-generation college decisions are high-stakes. Structured guidance ensures you're not navigating alone." }
            ].map((item, i) => (
              <div key={i} style={{ padding: '2.5rem 2rem', borderRadius: '24px', background: 'white', border: '1px solid #f1f5f9', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
                <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={28} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
          <div>
            <div className="badge" style={{ background: '#f0f9f9', color: 'var(--primary)', border: 'none', marginBottom: '1.5rem' }}>
              <span className="badge-dot"></span>
              OUR APPROACH
            </div>
            <h2 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
              Guidance Built on<br />Transparency, Not Hype.
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.15rem', marginBottom: '3rem', lineHeight: 1.6 }}>
              No college tie-ups. No commission from institutions. No inflated claims. Just structured thinking in your best interest.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { title: "Focused on Fit, Not Hype", desc: "We won't tell you which college is \"the best\" — we'll help you find the best college for your specific situation." },
                { title: "Every Recommendation Considers Long-Term Outcomes", desc: "We think about where you want to be at year 4 and year 10 — not just where you can get a seat in July." },
                { title: "Built Around Informed Decision Making", desc: "You'll leave every session understanding the reasoning — not just told what to do, but equipped to think for yourself." }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem', background: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 color="#10b981" size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '4rem', borderRadius: '40px', border: '1px solid #f1f5f9', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '3rem' }}>
              OUR EVALUATION FRAMEWORK
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[
                { n: "1", title: "Rank Realism Analysis", desc: "Mapping your rank to genuine probability ranges across colleges and rounds — not best-case scenarios." },
                { n: "2", title: "Career Path Alignment", desc: "Understanding where you want to go — core engineering, software, research, or entrepreneurship — and reverse-mapping to college/branch choices." },
                { n: "3", title: "Placement Depth Review", desc: "Going beyond average packages to median salaries, placement percentages, and which companies actually recruit from that branch." },
                { n: "4", title: "Preference List Strategy", desc: "Building your JoSAA order as a structured strategy — covering safe options, stretch choices, and round-wise decision rules." },
                { n: "5", title: "Post-Admission Roadmap", desc: "Brief guidance on what to do in your first year — clubs, internships, CGPA balance — so admission is just the start." }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f0f9ff', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>
                    {item.n}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '8rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="badge" style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', marginBottom: '1.5rem' }}>
              <span className="badge-dot" style={{ background: '#0369a1' }}></span>
              COMMON QUESTIONS
            </div>
            <h2 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
              Questions We Get Asked
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
              Honest answers to what students and parents want to know before booking a session.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
            {[
              "How is this different from YouTube guidance?",
              "Is this only useful for top rankers?",
              "Can parents join the session?",
              "Do you help with state counselling too?",
              "Will you help build my actual JoSAA preference list?",
              "Is branch selection more important than college?",
              "What if I'm considering a drop year?",
              "How long does the process take?"
            ].map((q, i) => (
              <div key={i} style={{ 
                padding: '1.5rem 2rem', 
                borderRadius: '20px', 
                background: '#fcfcfd', 
                border: '1px solid #f1f5f9', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}>
                <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>{q}</span>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  <Plus size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ padding: '8rem 2rem', background: '#0a0f1d', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0, 102, 119, 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
            READY TO START
          </div>
          <h2 className="hero-title" style={{ fontSize: '3.5rem', color: 'white', marginBottom: '2rem', lineHeight: 1.2 }}>
            You prepared for the exam.<br />
            Now prepare for <span className="hero-italic" style={{ borderBottomColor: 'rgba(255,255,255,0.3)' }}>the decision</span> that shapes the next four years.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '640px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            One structured session. A documented strategy. Clarity before counselling begins.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
            <button 
              onClick={onOpenBooking}
              className="btn" 
              style={{ background: 'white', color: '#0a0f1d', padding: '1.2rem 2.5rem', borderRadius: '16px', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: 'none', cursor: 'pointer' }}
            >
              Book Your Guidance Session <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn" 
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '1.2rem 2.5rem', borderRadius: '16px', fontWeight: 700, fontSize: '1.1rem', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Join Community
            </button>
          </div>
        </div>
      </section>

      {/* Bifurcation Divider */}
      <div style={{ background: '#0a0f1d', padding: '0 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', height: '1px' }}>
          {/* Glowing line */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,102,119,0.6) 25%, rgba(255,255,255,0.15) 50%, rgba(0,102,119,0.6) 75%, transparent 100%)'
          }} />
          {/* Center glow dot */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--primary)',
            boxShadow: '0 0 16px 4px rgba(0,102,119,0.8)',
          }} />
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '6rem 2rem 4rem', background: '#0a0f1d', color: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '8px', color: '#0a0f1d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>C</div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>CounsellorAI</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '280px' }}>
              Structured college and career guidance for JEE, NEET, and engineering aspirants across India.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#475569', marginBottom: '2rem' }}>PLATFORM</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <li onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })} style={{ cursor: 'pointer' }}>Join Community</li>
              <li style={{ cursor: 'pointer' }}>What We Cover</li>
              <li style={{ cursor: 'pointer' }}>Counselling Strategy</li>
              <li style={{ cursor: 'pointer' }}>Book a Session</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#475569', marginBottom: '2rem' }}>GUIDANCE</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <li style={{ cursor: 'pointer' }}>JoSAA Navigation</li>
              <li style={{ cursor: 'pointer' }}>State Counselling</li>
              <li style={{ cursor: 'pointer' }}>Branch Selection</li>
              <li style={{ cursor: 'pointer' }}>Drop Year Analysis</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#475569', marginBottom: '2rem' }}>COMPANY</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <li style={{ cursor: 'pointer' }}>About</li>
              <li style={{ cursor: 'pointer' }}>Our Approach</li>
              <li style={{ cursor: 'pointer' }}>Contact</li>
              <li style={{ cursor: 'pointer' }}>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#475569', fontSize: '0.85rem' }}>
          <p>© 2025 CounsellorAI. All rights reserved. No college affiliations or referral commissions.</p>
          <p>Guidance for JEE · NEET · Engineering Admissions</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
