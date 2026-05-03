import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Plane, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Demo login - skip backend
  const handleDemoLogin = () => {
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify({ id: 'demo', name: 'Traveler', email: 'demo@travelai.com' }));
    navigate('/');
  };

  return (
    <div className="auth-page">
      {/* Decorative orbs */}
      <div className="auth-orb auth-orb-1"></div>
      <div className="auth-orb auth-orb-2"></div>

      <div className="auth-card glass-card">
        <div className="auth-brand">
          <div className="auth-logo-circle">
            <Plane size={28} />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue planning your adventures</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="login-email"
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="login-password"
                type={showPwd ? 'text' : 'password'}
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="pwd-toggle" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full auth-submit" disabled={loading}>
            {loading ? <span className="btn-spinner"></span> : <>Sign In <ArrowRight size={18} /></>}
          </button>

          <button type="button" className="btn-demo" onClick={handleDemoLogin}>
            Try Demo (No Backend Required)
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
