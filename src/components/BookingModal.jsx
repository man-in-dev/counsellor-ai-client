import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, ChevronRight, CheckCircle2, ChevronDown } from 'lucide-react';

/* ─── Custom Dropdown ─── */
const CustomSelect = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setIsOpen(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.8rem 1rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          background: 'white',
          cursor: 'pointer',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#0f172a',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s',
          ...(isOpen ? { borderColor: 'var(--primary)' } : {})
        }}
      >
        <span style={{ color: selected ? '#0f172a' : '#94a3b8' }}>
          {selected ? selected.label : label}
        </span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} color="#94a3b8" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              zIndex: 100,
              overflow: 'hidden',
              padding: '0.4rem'
            }}
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                style={{
                  width: '100%',
                  display: 'block',
                  padding: '0.7rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: value === opt.value ? 'rgba(0, 102, 119, 0.06)' : 'transparent',
                  color: value === opt.value ? 'var(--primary)' : '#475569',
                  fontWeight: value === opt.value ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.background = '#f8fafc'; }}
                onMouseLeave={e => { if (value !== opt.value) e.currentTarget.style.background = 'transparent'; }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Input Field helper ─── */
const InputField = ({ icon: Icon, type = 'text', name, value, onChange, placeholder, required, inputMode, pattern }) => (
  <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
    <Icon
      size={16}
      style={{
        position: 'absolute',
        left: '0.9rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94a3b8',
        pointerEvents: 'none',
        flexShrink: 0
      }}
    />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      inputMode={inputMode}
      pattern={pattern}
      style={{
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        padding: '0.8rem 0.9rem 0.8rem 2.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        outline: 'none',
        fontSize: '0.9rem',
        fontWeight: 500,
        color: '#0f172a',
        background: 'white',
        transition: 'border-color 0.2s'
      }}
      onFocus={e => e.target.style.borderColor = 'var(--primary)'}
      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
    />
  </div>
);

/* ─── Main Modal ─── */
const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    exam: 'JEE',
    goal: 'College Shortlisting',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const examOptions = [
    { value: 'JEE', label: 'JEE (Engineering)' },
    { value: 'NEET', label: 'NEET (Medical)' },
    { value: 'Other', label: 'Other Counselling' }
  ];

  const goalOptions = [
    { value: 'College Shortlisting', label: 'College Shortlisting' },
    { value: 'Branch Selection', label: 'Branch Selection' },
    { value: 'Counselling Strategy', label: 'Counselling Strategy' },
    { value: 'General Guidance', label: 'General Guidance' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 10000, display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: '1rem'
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(10, 15, 29, 0.45)', backdropFilter: 'blur(8px)'
            }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            style={{
              width: '100%', maxWidth: '560px', background: 'white',
              borderRadius: '32px', position: 'relative', zIndex: 1,
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.3)', overflow: 'hidden'
            }}
          >
            {submitted ? (
              /* ── Success Screen ── */
              <div style={{ padding: '4rem 3rem', textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
                  style={{
                    width: '80px', height: '80px', background: '#ecfdf5',
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 2rem'
                  }}
                >
                  <CheckCircle2 size={40} color="#10b981" />
                </motion.div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
                  Session Booked!
                </h2>
                <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  Thanks <strong>{formData.name}</strong>! Our expert counsellor will reach out to you at <strong>{formData.phone}</strong> within the next 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="btn btn-primary"
                  style={{ padding: '1rem 2.5rem', borderRadius: '14px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                {/* Close */}
                <button
                  onClick={handleClose}
                  style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    background: '#f1f5f9', border: 'none', borderRadius: '50%',
                    width: '36px', height: '36px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
                  }}
                >
                  <X size={18} color="#64748b" />
                </button>

                <div style={{ maxHeight: '92vh', overflowY: 'auto', padding: '2.5rem 2.5rem 2rem' }}>
                  <div className="badge" style={{ marginBottom: '1rem' }}>
                    <span className="badge-dot"></span>
                    1:1 EXPERT GUIDANCE
                  </div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                    Book a Session
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                    Get personalised strategy from IIT/NIT alumni who have navigated the same path.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Name + Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', minWidth: 0 }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Full Name</label>
                        <InputField
                          icon={User} name="name" value={formData.name}
                          onChange={handleChange} placeholder="Your name" required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', minWidth: 0 }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Phone</label>
                        <InputField
                          icon={Phone} type="tel" name="phone" value={formData.phone}
                          onChange={handleChange} placeholder="+91 98765..." required
                        />
                      </div>
                    </div>

                    {/* Email — full width, text type to avoid browser email icon */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Email Address</label>
                      <InputField
                        icon={Mail}
                        type="text"
                        inputMode="email"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    {/* Exam + Goal — custom dropdowns */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', minWidth: 0 }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Exam</label>
                        <CustomSelect
                          value={formData.exam}
                          onChange={val => setFormData(p => ({ ...p, exam: val }))}
                          options={examOptions}
                          label="Select exam"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', minWidth: 0 }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Primary Goal</label>
                        <CustomSelect
                          value={formData.goal}
                          onChange={val => setFormData(p => ({ ...p, goal: val }))}
                          options={goalOptions}
                          label="Select goal"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                        Any specific questions? <span style={{ color: '#94a3b8', fontWeight: 500 }}>(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="e.g. JEE rank 12,000 — confused between NIT Trichy ECE and NIT Warangal CS..."
                        style={{
                          width: '100%', boxSizing: 'border-box',
                          padding: '0.8rem 1rem', borderRadius: '12px',
                          border: '1px solid #e2e8f0', outline: 'none',
                          minHeight: '90px', resize: 'none',
                          fontSize: '0.9rem', color: '#0f172a',
                          fontFamily: 'inherit', lineHeight: 1.6,
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                      style={{
                        padding: '1rem', borderRadius: '14px', fontWeight: 800,
                        fontSize: '1rem', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.6rem', opacity: loading ? 0.7 : 1, marginTop: '0.5rem'
                      }}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%' }}
                          />
                          Booking...
                        </>
                      ) : (
                        <>Confirm Booking Request <ChevronRight size={18} /></>
                      )}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8', marginTop: '-0.25rem' }}>
                      By clicking confirm, you agree to our privacy policy.
                    </p>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
