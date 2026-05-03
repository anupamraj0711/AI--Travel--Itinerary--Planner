import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Send, Plane, Train, Bus, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('Comfort');
  const [travelMode, setTravelMode] = useState('Flight');
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    // In a real app, we'd call the AI API here.
    // For the demo, we'll navigate to a mock itinerary.
    const tripData = { source, destination, startDate, endDate, budget, travelMode };
    localStorage.setItem('currentTrip', JSON.stringify(tripData));
    navigate('/itinerary');
  };

  return (
    <div className="home-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card planner-card"
      >
        <div className="planner-header">
          <h1>Plan Your Perfect Trip</h1>
          <p>Tell us your preferences and let AI create your dream itinerary</p>
        </div>

        <form onSubmit={handleGenerate}>
          <div className="form-section">
            <h3 className="section-title"><MapPin size={18} /> From (Source)</h3>
            <div className="input-group">
              <label>Location</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter city, country"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title" style={{ color: '#10b981' }}><MapPin size={18} /> To (Destination)</h3>
            <div className="input-group">
              <label>Location</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group flex-1">
              <label>Start Date</label>
              <input 
                type="date" 
                className="input-field" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="input-group flex-1">
              <label>End Date</label>
              <input 
                type="date" 
                className="input-field" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title"><DollarSign size={18} /> Budget Level</h3>
            <div className="card-grid">
              {['Backpacker', 'Comfort', 'Luxury'].map((lvl) => (
                <div 
                  key={lvl}
                  className={`option-card ${budget === lvl ? 'active' : ''}`}
                  onClick={() => setBudget(lvl)}
                >
                  <div className="option-icon">
                    {lvl === 'Backpacker' ? '🎒' : lvl === 'Comfort' ? '🏨' : '💎'}
                  </div>
                  <h4>{lvl}</h4>
                  <p>{lvl === 'Backpacker' ? 'Budget-friendly' : lvl === 'Comfort' ? 'Balanced' : 'Premium'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title"><Plane size={18} /> Travel Mode</h3>
            <div className="icon-grid">
              {[
                { name: 'Flight', icon: Plane },
                { name: 'Train', icon: Train },
                { name: 'Bus', icon: Bus },
                { name: 'Auto', icon: Car }
              ].map((mode) => (
                <div 
                  key={mode.name}
                  className={`icon-card ${travelMode === mode.name ? 'active' : ''}`}
                  onClick={() => setTravelMode(mode.name)}
                >
                  <mode.icon size={20} />
                  <span>{mode.name}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full generate-btn">
            <Send size={18} /> Generate My Itinerary
          </button>
        </form>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
        }
        .planner-card {
          padding: 40px;
        }
        .planner-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .planner-header h1 {
          font-size: 2.5rem;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #fff, var(--text-dim));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          font-size: 1.1rem;
          color: var(--primary);
        }
        .form-section {
          margin-bottom: 32px;
        }
        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
        }
        .flex-1 { flex: 1; }
        
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .option-card {
          padding: 20px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        .option-card.active {
          border-color: var(--primary);
          background: rgba(139, 92, 246, 0.1);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
        }
        .option-icon { font-size: 1.5rem; margin-bottom: 8px; }
        .option-card h4 { margin-bottom: 4px; }
        .option-card p { font-size: 0.8rem; color: var(--text-dim); }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .icon-card {
          padding: 16px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .icon-card.active {
          border-color: var(--primary);
          background: rgba(139, 92, 246, 0.1);
          color: var(--primary);
        }
        .generate-btn {
          margin-top: 20px;
          padding: 18px;
          font-size: 1.1rem;
        }
      `}} />
    </div>
  );
};

export default Home;
