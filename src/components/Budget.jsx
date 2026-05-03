import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Wallet, ArrowLeft, Info, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const Budget = () => {
  const categories = [
    { name: 'Transport', cost: 2639, percentage: 68, color: '#8b5cf6', icon: '🚆' },
    { name: 'Accommodation', cost: 720, percentage: 19, color: '#06b6d4', icon: '🏨' },
    { name: 'Food', cost: 240, percentage: 6, color: '#f43f5e', icon: '🍱' },
    { name: 'Activities', cost: 270, percentage: 7, color: '#10b981', icon: '🎟️' }
  ];

  return (
    <div className="budget-page">
      <header className="budget-header">
        <Link to="/itinerary" className="back-btn"><ArrowLeft size={20} /> Back to Itinerary</Link>
        <h1>Budget Analysis</h1>
      </header>

      <div className="budget-grid">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card main-summary"
        >
          <div className="summary-info">
            <p>Total Estimated Plan</p>
            <h2>€ 3,869</h2>
          </div>
          <div className="summary-chart">
            <PieChart size={48} className="chart-icon" />
          </div>
        </motion.div>

        <div className="stat-cards">
          <div className="glass-card stat-card">
            <TrendingUp size={20} className="stat-icon" />
            <div>
              <p>Per Person</p>
              <h3>€ 3,869</h3>
            </div>
          </div>
          <div className="glass-card stat-card">
            <Wallet size={20} className="stat-icon" style={{ color: '#10b981' }} />
            <div>
              <p>Potential Saving</p>
              <h3>€ 774</h3>
            </div>
          </div>
        </div>

        <section className="cost-breakdown">
          <div className="section-header">
            <h3>Cost Breakdown</h3>
            <Info size={16} />
          </div>
          <div className="breakdown-list">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="breakdown-item"
              >
                <div className="item-main">
                  <div className="item-icon">{cat.icon}</div>
                  <div className="item-info">
                    <h4>{cat.name}</h4>
                    <p>{cat.name === 'Transport' ? 'AUTO • 73h' : cat.name === 'Accommodation' ? '€120/night' : 'Daily avg: €40'}</p>
                  </div>
                  <div className="item-values">
                    <span className="item-cost">€ {cat.cost}</span>
                    <span className="item-perc">{cat.percentage}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${cat.percentage}%`, background: cat.color }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="glass-card tips-card">
          <div className="tips-header">
            <Lightbulb size={20} style={{ color: '#10b981' }} />
            <h3>Optimization Tips</h3>
          </div>
          <ul>
            <li>Consider local boutique stays instead of chain hotels to save ~15%.</li>
            <li>Booking train tickets 2 weeks in advance can reduce transport costs by 20%.</li>
            <li>Use local transport cards for unlimited city travel.</li>
          </ul>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .budget-page { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .budget-header { display: flex; align-items: center; gap: 24px; margin-bottom: 32px; }
        .back-btn { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--text-dim); transition: 0.3s; }
        .back-btn:hover { color: white; }
        .budget-header h1 { font-size: 2.5rem; }

        .main-summary { padding: 32px; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(139, 92, 246, 0.2)); margin-bottom: 24px; }
        .summary-info p { color: var(--text-dim); margin-bottom: 8px; }
        .summary-info h2 { font-size: 3rem; color: var(--primary); }
        .chart-icon { color: var(--primary); opacity: 0.5; }

        .stat-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
        .stat-card { padding: 24px; display: flex; align-items: center; gap: 16px; }
        .stat-icon { color: #f59e0b; }
        .stat-card p { font-size: 0.85rem; color: var(--text-dim); margin-bottom: 4px; }

        .cost-breakdown { margin-bottom: 40px; }
        .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; color: var(--text-dim); }
        .breakdown-item { margin-bottom: 24px; }
        .item-main { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
        .item-icon { font-size: 1.2rem; }
        .item-info { flex: 1; }
        .item-info h4 { margin-bottom: 2px; }
        .item-info p { font-size: 0.8rem; color: var(--text-dim); }
        .item-values { text-align: right; }
        .item-cost { display: block; font-weight: 600; font-size: 1.1rem; }
        .item-perc { font-size: 0.8rem; color: var(--text-dim); }
        .progress-bar { height: 6px; background: var(--glass); border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 3px; }

        .tips-card { padding: 24px; }
        .tips-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .tips-card ul { padding-left: 20px; color: var(--text-dim); font-size: 0.9rem; }
        .tips-card li { margin-bottom: 12px; }
      `}} />
    </div>
  );
};

export default Budget;
