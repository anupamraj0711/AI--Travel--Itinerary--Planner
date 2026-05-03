import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Plane, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-1"></div>
      <div className="auth-orb auth-orb-2"></div>

      <div className="auth-card glass-card">
        <div className="auth-brand">
          <div className="auth-logo-circle">
            <Plane size={28} />
          </div>
          <h1>Join TravelAI</h1>
          <p>Create your account and start exploring</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="reg-name">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input id="reg-name" type="text" className="input-field" placeholder="John Doe"
                value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input id="reg-email" type="email" className="input-field" placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input id="reg-password" type={showPwd ? 'text' : 'password'} className="input-field"
                placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="pwd-toggle" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full auth-submit" disabled={loading}>
            {loading ? <span className="btn-spinner"></span> : <>Create Account <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
