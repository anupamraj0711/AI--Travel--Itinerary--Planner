import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PlannerForm from './components/PlannerForm';
import LoadingScreen from './components/LoadingScreen';
import ItineraryView from './components/ItineraryView';
import BudgetDashboard from './components/BudgetDashboard';
import SettingsPage from './components/SettingsPage';
import BottomNav from './components/BottomNav';
import Chatbot from './components/Chatbot';

// Trip context to share data across pages
export const TripContext = createContext(null);

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function AppContent() {
  const location = useLocation();
  const [tripData, setTripData] = useState(() => {
    const saved = localStorage.getItem('tripData');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (tripData) {
      localStorage.setItem('tripData', JSON.stringify(tripData));
    }
  }, [tripData]);

  const isAuth = localStorage.getItem('token');
  const showBottomNav = isAuth && !['/login', '/register', '/loading'].includes(location.pathname);
  const showChatbot = isAuth && !['/login', '/register', '/loading'].includes(location.pathname) && tripData;

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      <div className="app-shell">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute><PlannerForm /></ProtectedRoute>
          } />
          <Route path="/loading" element={
            <ProtectedRoute><LoadingScreen /></ProtectedRoute>
          } />
          <Route path="/itinerary" element={
            <ProtectedRoute><ItineraryView /></ProtectedRoute>
          } />
          <Route path="/budget" element={
            <ProtectedRoute><BudgetDashboard /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><SettingsPage /></ProtectedRoute>
          } />
        </Routes>
        {showBottomNav && <BottomNav />}
        {showChatbot && <Chatbot />}
      </div>
    </TripContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
