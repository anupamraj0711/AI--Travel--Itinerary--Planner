import React, { useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Wallet, Send, Plane, Train, Bus, Car, ChevronDown, Sparkles, LogOut } from 'lucide-react';
import locationData from '../data/locations';
import { TripContext } from '../App';
import './PlannerForm.css';

export default function PlannerForm() {
  const { setTripData } = useContext(TripContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Source
  const [srcCountry, setSrcCountry] = useState('');
  const [srcState, setSrcState] = useState('');
  const [srcCity, setSrcCity] = useState('');

  // Destination
  const [destCountry, setDestCountry] = useState('');
  const [destState, setDestState] = useState('');
  const [destCity, setDestCity] = useState('');

  // Dates
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Preferences
  const [budget, setBudget] = useState('Comfort');
  const [travelMode, setTravelMode] = useState('Auto');
  const [errors, setErrors] = useState({});

  const countries = Object.keys(locationData);

  const srcStates = srcCountry ? Object.keys(locationData[srcCountry].states) : [];
  const srcCities = srcCountry && srcState ? locationData[srcCountry].states[srcState] || [] : [];

  const destStates = destCountry ? Object.keys(locationData[destCountry].states) : [];
  const destCities = destCountry && destState ? locationData[destCountry].states[destState] || [] : [];

  const tripDuration = useMemo(() => {
    if (startDate && endDate) {
      const diff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  }, [startDate, endDate]);

  const destCurrency = destCountry ? locationData[destCountry] : null;

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const e = {};
    if (!srcCountry) e.srcCountry = true;
    if (!srcState) e.srcState = true;
    if (!srcCity) e.srcCity = true;
    if (!destCountry) e.destCountry = true;
    if (!destState) e.destState = true;
    if (!destCity) e.destCity = true;
    if (!startDate) e.startDate = true;
    if (!endDate) e.endDate = true;
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) e.endDate = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const trip = {
      source: { country: srcCountry, state: srcState, city: srcCity },
      destination: { country: destCountry, state: destState, city: destCity },
      startDate,
      endDate,
      duration: tripDuration,
      budget,
      travelMode,
      currency: destCurrency?.currency || 'USD',
      currencySymbol: destCurrency?.symbol || '$',
      countryCode: destCurrency?.code || 'US'
    };

    setTripData(trip);
    navigate('/loading');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="planner-page">
      <header className="planner-topbar">
        <div className="topbar-left">
          <Plane size={22} className="topbar-icon" />
          <span className="topbar-brand">TravelAI</span>
        </div>
        <div className="topbar-right">
          <span className="topbar-user">{user.name || 'Traveler'}</span>
          <button className="topbar-logout" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="planner-container">
        <div className="planner-hero">
          <h1><Sparkles size={28} /> Plan Your Perfect Trip</h1>
          <p>Tell us your preferences and let AI create your dream itinerary</p>
        </div>

        <form onSubmit={handleGenerate} className="planner-form">
          {/* ---- FROM (Source) ---- */}
          <div className="glass-card form-section">
            <div className="section-dot blue"></div>
            <h3 className="section-label">FROM (SOURCE)</h3>

            <div className="form-group">
              <label>Country</label>
              <div className={`select-wrapper ${errors.srcCountry ? 'has-error' : ''}`}>
                <select className="input-field" value={srcCountry} onChange={(e) => { setSrcCountry(e.target.value); setSrcState(''); setSrcCity(''); }}>
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={18} className="select-chevron" />
              </div>
            </div>

            <div className="form-group">
              <label>State / Region</label>
              <div className={`select-wrapper ${errors.srcState ? 'has-error' : ''}`}>
                <select className="input-field" value={srcState} onChange={(e) => { setSrcState(e.target.value); setSrcCity(''); }} disabled={!srcCountry}>
                  <option value="">Select State</option>
                  {srcStates.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={18} className="select-chevron" />
              </div>
            </div>

            <div className="form-group">
              <label>City</label>
              <div className={`select-wrapper ${errors.srcCity ? 'has-error' : ''}`}>
                <select className="input-field" value={srcCity} onChange={(e) => setSrcCity(e.target.value)} disabled={!srcState}>
                  <option value="">Select City</option>
                  {srcCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={18} className="select-chevron" />
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="form-arrow">
            <div className="arrow-circle"><Send size={18} /></div>
          </div>

          {/* ---- TO (Destination) ---- */}
          <div className="glass-card form-section">
            <div className="section-dot green"></div>
            <h3 className="section-label">TO (DESTINATION)</h3>

            <div className="form-group">
              <label>Country</label>
              <div className={`select-wrapper ${errors.destCountry ? 'has-error' : ''}`}>
                <select className="input-field" value={destCountry} onChange={(e) => { setDestCountry(e.target.value); setDestState(''); setDestCity(''); }}>
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={18} className="select-chevron" />
              </div>
            </div>

            <div className="form-group">
              <label>State / Region</label>
              <div className={`select-wrapper ${errors.destState ? 'has-error' : ''}`}>
                <select className="input-field" value={destState} onChange={(e) => { setDestState(e.target.value); setDestCity(''); }} disabled={!destCountry}>
                  <option value="">Select State</option>
                  {destStates.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={18} className="select-chevron" />
              </div>
            </div>

            <div className="form-group">
              <label>City</label>
              <div className={`select-wrapper ${errors.destCity ? 'has-error' : ''}`}>
                <select className="input-field" value={destCity} onChange={(e) => setDestCity(e.target.value)} disabled={!destState}>
                  <option value="">Select City</option>
                  {destCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={18} className="select-chevron" />
              </div>
            </div>
          </div>

          {/* ---- Dates ---- */}
          <div className="glass-card form-section">
            <h3 className="section-label"><Calendar size={16} /> Travel Dates</h3>
            <div className="date-row">
              <div className="form-group flex-1">
                <label>Start Date</label>
                <input type="date" className={`input-field ${errors.startDate ? 'input-error' : ''}`}
                  value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="form-group flex-1">
                <label>End Date</label>
                <input type="date" className={`input-field ${errors.endDate ? 'input-error' : ''}`}
                  value={endDate} min={startDate || today} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
            {tripDuration > 0 && (
              <div className="duration-badge">
                <Calendar size={14} /> {tripDuration} day{tripDuration !== 1 ? 's' : ''} trip
                {destCurrency && <span className="currency-badge">{destCurrency.symbol} {destCurrency.currency}</span>}
              </div>
            )}
          </div>

          {/* ---- Budget Level ---- */}
          <div className="glass-card form-section">
            <h3 className="section-label"><Wallet size={16} /> Budget Level</h3>
            <div className="budget-grid">
              {[
                { key: 'Backpacker', emoji: '🎒', desc: 'Budget-friendly' },
                { key: 'Comfort', emoji: '🏨', desc: 'Balanced experience' },
                { key: 'Luxury', emoji: '💎', desc: 'Premium luxury' }
              ].map(b => (
                <button type="button" key={b.key}
                  className={`budget-option ${budget === b.key ? 'active' : ''}`}
                  onClick={() => setBudget(b.key)}>
                  <span className="budget-emoji">{b.emoji}</span>
                  <span className="budget-name">{b.key}</span>
                  <span className="budget-desc">{b.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ---- Travel Mode ---- */}
          <div className="glass-card form-section">
            <h3 className="section-label"><Plane size={16} /> Travel Mode</h3>
            <div className="mode-grid">
              {[
                { key: 'Flight', icon: Plane, label: 'Flight' },
                { key: 'Train', icon: Train, label: 'Train' },
                { key: 'Bus', icon: Bus, label: 'Bus' },
                { key: 'Auto', icon: Car, label: 'Auto (AI)' }
              ].map(m => (
                <button type="button" key={m.key}
                  className={`mode-option ${travelMode === m.key ? 'active' : ''}`}
                  onClick={() => setTravelMode(m.key)}>
                  <m.icon size={20} />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ---- Submit ---- */}
          <button type="submit" className="btn-primary w-full generate-btn">
            <Sparkles size={20} /> Generate My Itinerary
          </button>
        </form>
      </div>
    </div>
  );
}
