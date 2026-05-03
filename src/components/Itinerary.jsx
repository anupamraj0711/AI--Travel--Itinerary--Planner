import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, RefreshCw, Download, Star, Clock, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const Itinerary = () => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTrip = localStorage.getItem('currentTrip');
    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Crafting your perfect itinerary...</p>
      <style>{`
        .loader-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80vh; gap: 20px; }
        .loader { width: 50px; height: 50px; border: 5px solid var(--glass-border); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  const mockDays = [
    {
      day: 1,
      date: 'May 7, 2026',
      location: trip?.destination || 'Paris, France',
      activities: [
        { time: '09:00', title: 'Breakfast at Le Marais', description: 'Enjoy local pastries and coffee in a historic district.', cost: 15 },
        { time: '11:00', title: 'Visit the Louvre Museum', description: 'Explore world-class art including the Mona Lisa.', cost: 22 },
        { time: '14:00', title: 'Lunch near Seine River', description: 'Relaxing lunch with a view of the water.', cost: 30 }
      ]
    },
    {
      day: 2,
      date: 'May 8, 2026',
      location: trip?.destination || 'Paris, France',
      activities: [
        { time: '10:00', title: 'Eiffel Tower Tour', description: 'Skip-the-line access to the summit for breathtaking views.', cost: 45 },
        { time: '13:30', title: 'Garden of Versailles', description: 'Walk through the magnificent royal gardens.', cost: 20 }
      ]
    }
  ];

  return (
    <div className="itinerary-page">
      <header className="itinerary-header">
        <div className="header-info">
          <h1>{trip?.destination}</h1>
          <p>Day 1 of 6 • {new Date(trip?.startDate).toLocaleDateString()}</p>
        </div>
        <div className="header-actions">
          <button className="action-btn"><Download size={18} /> PDF</button>
          <button className="action-btn"><Map size={18} /> View Map</button>
          <button className="action-btn regenerate"><RefreshCw size={18} /> Regenerate Day</button>
        </div>
      </header>

      <section className="itinerary-content">
        <div className="hotels-section">
          <h3>Recommended Hotels</h3>
          <div className="hotel-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card hotel-card">
                <div className="hotel-img" style={{ backgroundImage: `url('https://source.unsplash.com/random/400x300?hotel,${i}')` }}></div>
                <div className="hotel-details">
                  <div className="hotel-title">
                    <h4>Grand Palace {i}</h4>
                    <span className="rating"><Star size={12} fill="currentColor" /> 4.8</span>
                  </div>
                  <p className="location"><MapPin size={12} /> 0.5km to center</p>
                  <div className="hotel-footer">
                    <span className="price">$120 / night</span>
                    <button className="btn-primary btn-sm">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-section">
          <h3>Today's Itinerary</h3>
          <div className="timeline">
            {mockDays[0].activities.map((act, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="timeline-item"
              >
                <div className="time-tag">
                  <Clock size={14} /> {act.time}
                </div>
                <div className="glass-card activity-card">
                  <div className="act-header">
                    <h4>{act.title}</h4>
                    <button className="swap-btn"><RefreshCw size={14} /></button>
                  </div>
                  <p>{act.description}</p>
                  <div className="act-footer">
                    <span><Navigation size={12} /> Downtown</span>
                    <span className="cost">${act.cost}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bottom-nav">
        <Link to="/" className="b-nav-item"><Map size={20} /> Home</Link>
        <Link to="/itinerary" className="b-nav-item active"><Navigation size={20} /> Itinerary</Link>
        <Link to="/budget" className="b-nav-item"><DollarSign size={20} /> Budget</Link>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .itinerary-page { max-width: 1000px; margin: 0 auto; padding: 40px 20px 100px; }
        .itinerary-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .header-info h1 { font-size: 3rem; margin-bottom: 8px; }
        .header-info p { color: var(--text-dim); }
        .header-actions { display: flex; gap: 12px; }
        .action-btn { background: var(--glass); border: 1px solid var(--glass-border); color: white; padding: 10px 16px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .action-btn:hover { background: var(--glass-border); }
        .action-btn.regenerate { color: var(--primary); }

        .hotels-section h3, .timeline-section h3 { margin-bottom: 24px; font-size: 1.5rem; }
        .hotel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 48px; }
        .hotel-card { overflow: hidden; }
        .hotel-img { height: 160px; background-size: cover; background-position: center; }
        .hotel-details { padding: 16px; }
        .hotel-title { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .rating { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: #fbbf24; }
        .location { font-size: 0.8rem; color: var(--text-dim); margin-bottom: 16px; display: flex; align-items: center; gap: 4px; }
        .hotel-footer { display: flex; justify-content: space-between; align-items: center; }
        .price { font-weight: 600; color: #10b981; }
        .btn-sm { padding: 8px 16px; font-size: 0.8rem; border-radius: 8px; }

        .timeline { position: relative; padding-left: 32px; }
        .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--glass-border); }
        .timeline-item { position: relative; margin-bottom: 32px; }
        .timeline-item::before { content: ''; position: absolute; left: -36px; top: 8px; width: 10px; height: 10px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); }
        .time-tag { margin-bottom: 12px; font-weight: 600; color: var(--primary); display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
        .activity-card { padding: 20px; }
        .act-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .swap-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; }
        .act-footer { display: flex; justify-content: space-between; margin-top: 16px; font-size: 0.85rem; color: var(--text-dim); }
        .cost { color: #10b981; font-weight: 600; }

        .bottom-nav { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 8px; border-radius: 20px; display: flex; gap: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); z-index: 100; }
        .b-nav-item { text-decoration: none; color: var(--text-dim); padding: 10px 20px; border-radius: 14px; display: flex; align-items: center; gap: 10px; font-weight: 500; transition: 0.3s; }
        .b-nav-item.active { background: var(--primary); color: white; }
      `}} />
    </div>
  );
};

const MapPin = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;

export default Itinerary;
