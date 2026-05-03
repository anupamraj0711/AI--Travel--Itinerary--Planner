import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Map, BarChart2, Settings } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { path: '/itinerary', icon: Map, label: 'Itinerary' },
    { path: '/budget', icon: BarChart2, label: 'Budget' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            className={`bnav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
            aria-label={tab.label}
          >
            <tab.icon size={22} />
            <span>{tab.label}</span>
            {isActive && <span className="bnav-indicator"></span>}
          </button>
        );
      })}
    </nav>
  );
}
