import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { TripContext } from '../App';
import './LoadingScreen.css';

const messages = [
  'Analyzing your preferences...',
  'Finding the best routes...',
  'Crafting your daily itinerary...',
  'Checking weather forecasts...',
  'Discovering hidden gems...',
  'Optimizing your budget...',
  'Finalizing your journey...'
];

export default function LoadingScreen() {
  const navigate = useNavigate();
  const { tripData } = useContext(TripContext);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!tripData) {
      navigate('/');
      return;
    }

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    const msgTimer = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % messages.length);
    }, 500);

    const navTimer = setTimeout(() => {
      navigate('/itinerary');
    }, 3200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(msgTimer);
      clearTimeout(navTimer);
    };
  }, [tripData, navigate]);

  return (
    <div className="loading-page">
      <div className="loading-content">
        <div className="loading-icon-wrap">
          <div className="loading-ring"></div>
          <Plane size={32} className="loading-plane" />
        </div>
        <h2>Crafting Your Journey</h2>
        <p className="loading-destination">
          {tripData?.source?.city} → {tripData?.destination?.city}
        </p>
        <p className="loading-msg">{messages[msgIndex]}</p>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-pct">{Math.min(progress, 100)}%</span>
      </div>
    </div>
  );
}
