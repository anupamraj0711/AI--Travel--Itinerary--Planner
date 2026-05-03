import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Globe, Bell, MessageSquare, Bookmark, Clock, LogOut,
  ChevronRight, Moon, Palette, Plane
} from 'lucide-react';
import { TripContext } from '../App';
import './SettingsPage.css';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { tripData } = useContext(TripContext);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const initials = user.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'T';

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>

        {/* Profile Card */}
        <div className="glass-card profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            <h3>{user.name || 'Traveler'}</h3>
            <p>{user.email || 'demo@travelai.com'}</p>
          </div>
          <button className="edit-profile-btn">Edit</button>
        </div>

        {/* Current Trip */}
        {tripData && (
          <div className="glass-card-sm current-trip-card">
            <Plane size={18} style={{ color: 'var(--primary)' }} />
            <div>
              <p className="ct-label">Current Trip</p>
              <p className="ct-route">
                {tripData.source?.city} → {tripData.destination?.city}
              </p>
              <p className="ct-meta">
                {tripData.duration} days • {tripData.budget} • {tripData.currency}
              </p>
            </div>
            <button className="btn-accent" onClick={() => navigate('/itinerary')}>View</button>
          </div>
        )}

        {/* Preferences */}
        <div className="settings-group">
          <p className="group-label">PREFERENCES</p>

          <div className="glass-card-sm settings-block">
            <SettingRow icon={Globe} label="Default Currency" value={tripData?.currency || 'USD'} />
            <SettingRow icon={Bell} label="Weather Alerts" value="On" toggle />
            <SettingRow icon={MessageSquare} label="AI Chatbot" value="Enabled" toggle defaultOn />
            <SettingRow icon={Moon} label="Dark Mode" value="Always" />
            <SettingRow icon={Palette} label="Theme" value="Purple" />
          </div>
        </div>

        {/* Account */}
        <div className="settings-group">
          <p className="group-label">ACCOUNT</p>

          <div className="glass-card-sm settings-block">
            <SettingRow
              icon={Bookmark}
              label="Saved Itineraries"
              value="3 trips"
              chevron
            />
            <SettingRow
              icon={Clock}
              label="Booking History"
              value="1 upcoming"
              chevron
            />
          </div>
        </div>

        {/* Logout */}
        <button className="logout-row" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
          <ChevronRight size={18} />
        </button>

        <p className="settings-version">TravelAI v1.0 • Built with ❤️</p>
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, label, value, toggle, defaultOn, chevron }) {
  const [on, setOn] = React.useState(defaultOn ?? true);
  return (
    <div className="setting-row">
      <div className="setting-icon"><Icon size={18} /></div>
      <div className="setting-info">
        <span className="setting-label">{label}</span>
      </div>
      {toggle ? (
        <button className={`toggle-btn ${on ? 'on' : 'off'}`} onClick={() => setOn(!on)}>
          <span className="toggle-knob"></span>
        </button>
      ) : chevron ? (
        <div className="setting-right">
          <span className="setting-value">{value}</span>
          <ChevronRight size={16} />
        </div>
      ) : (
        <span className="setting-value">{value}</span>
      )}
    </div>
  );
}
