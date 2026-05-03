import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Wallet, PieChart, Info, Lightbulb, ArrowLeft } from 'lucide-react';
import { TripContext } from '../App';
import { calculateBudget, getTransportSuggestion, getSavingTips } from '../data/costs';
import './BudgetDashboard.css';

export default function BudgetDashboard() {
  const { tripData } = useContext(TripContext);
  const navigate = useNavigate();

  const budget = useMemo(() => {
    if (!tripData) return null;
    return calculateBudget(
      tripData.destination.country,
      tripData.duration,
      tripData.budget,
      tripData.travelMode
    );
  }, [tripData]);

  const transportInfo = useMemo(() => {
    if (!tripData) return null;
    return getTransportSuggestion(tripData.travelMode, tripData.destination.country);
  }, [tripData]);

  const tips = useMemo(() => {
    if (!tripData) return [];
    return getSavingTips(tripData.budget, tripData.destination.country);
  }, [tripData]);

  if (!tripData || !budget) {
    return (
      <div className="budget-page">
        <div className="budget-empty">
          <p>No trip data found. Please plan a trip first.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Plan a Trip</button>
        </div>
      </div>
    );
  }

  const sym = tripData.currencySymbol;

  const categories = [
    {
      name: 'Transport',
      detail: `${transportInfo?.mode || tripData.travelMode}`,
      cost: budget.transport + budget.localTransport,
      color: '#8b5cf6',
      icon: '🚆',
      explanation: transportInfo?.note || ''
    },
    {
      name: 'Accommodation',
      detail: `${sym}${Math.round(budget.accommodation / tripData.duration)}/night`,
      cost: budget.accommodation,
      color: '#06b6d4',
      icon: '🏨',
      explanation: `Based on ${tripData.budget}-level stays in ${tripData.destination.city}`
    },
    {
      name: 'Food',
      detail: `Daily avg: ${sym}${Math.round(budget.food / tripData.duration)}`,
      cost: budget.food,
      color: '#f43f5e',
      icon: '🍱',
      explanation: `Estimated for ${tripData.budget}-tier dining in ${tripData.destination.country}`
    },
    {
      name: 'Activities',
      detail: 'Sightseeing & entries',
      cost: budget.activities,
      color: '#10b981',
      icon: '🎟️',
      explanation: `${tripData.duration} days of activities at ${tripData.budget} level`
    }
  ];

  const maxCost = Math.max(...categories.map(c => c.cost));

  return (
    <div className="budget-page">
      <div className="budget-container">
        {/* Header */}
        <div className="budget-header">
          <button className="back-link" onClick={() => navigate('/itinerary')}>
            <ArrowLeft size={18} />
          </button>
          <h1>Budget Analysis</h1>
        </div>

        {/* Total Card */}
        <div className="glass-card total-card">
          <div className="total-info">
            <p className="total-label">Total Estimated Plan</p>
            <h2 className="total-amount">{sym} {budget.total.toLocaleString()}</h2>
          </div>
          <div className="total-icon-wrap">
            <PieChart size={40} />
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          <div className="glass-card-sm stat-box">
            <TrendingUp size={20} style={{ color: '#f59e0b' }} />
            <div>
              <p className="stat-label">Per Day</p>
              <h3 className="stat-value">{sym} {budget.perDay.toLocaleString()}</h3>
            </div>
          </div>
          <div className="glass-card-sm stat-box">
            <Wallet size={20} style={{ color: '#10b981' }} />
            <div>
              <p className="stat-label">Potential Saving</p>
              <h3 className="stat-value">{sym} {budget.potentialSaving.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Trip Info */}
        <div className="glass-card-sm trip-summary">
          <span>{tripData.source.city} → {tripData.destination.city}</span>
          <span>{tripData.duration} days</span>
          <span>{tripData.budget}</span>
          <span>{tripData.currency}</span>
        </div>

        {/* Breakdown */}
        <section className="breakdown-section">
          <div className="section-head">
            <h3>Cost Breakdown</h3>
            <Info size={16} className="text-muted" />
          </div>

          <div className="breakdown-list">
            {categories.map((cat, idx) => (
              <div key={cat.name} className="breakdown-item" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="bk-top">
                  <div className="bk-icon">{cat.icon}</div>
                  <div className="bk-info">
                    <h4>{cat.name}</h4>
                    <p>{cat.detail}</p>
                  </div>
                  <div className="bk-values">
                    <span className="bk-cost">{sym} {cat.cost.toLocaleString()}</span>
                    <span className="bk-pct">{Math.round((cat.cost / budget.total) * 100)}%</span>
                  </div>
                </div>
                <div className="bk-bar-track">
                  <div className="bk-bar-fill" style={{ width: `${(cat.cost / maxCost) * 100}%`, background: cat.color }}></div>
                </div>
                {cat.explanation && (
                  <p className="bk-explain">{cat.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Saving Tips */}
        <div className="glass-card tips-card">
          <div className="tips-head">
            <Lightbulb size={20} style={{ color: '#10b981' }} />
            <h3>Optimization Tips</h3>
          </div>
          <ul className="tips-list">
            {tips.slice(0, 4).map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
