import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, RefreshCw, Download, Star, Edit3, Check, X, ChevronLeft, ChevronRight, CloudSun, Sun, Cloud, CloudRain, Thermometer, Navigation } from 'lucide-react';
import { TripContext } from '../App';
import { generateItinerary, regenerateDay, swapActivity } from '../data/itineraryEngine';
import { getHotels, getHotelImages } from '../data/hotels';
import { jsPDF } from 'jspdf';
import './ItineraryView.css';

// Fake weather data based on destination
function getWeather(city) {
  const conditions = [
    { temp: 28, desc: 'Clear sky', icon: 'sun' },
    { temp: 24, desc: 'Partly cloudy', icon: 'cloud-sun' },
    { temp: 22, desc: 'Cloudy', icon: 'cloud' },
    { temp: 20, desc: 'Light rain', icon: 'cloud-rain' },
    { temp: 26, desc: 'Sunny', icon: 'sun' },
    { temp: 30, desc: 'Hot & sunny', icon: 'sun' },
    { temp: 18, desc: 'Cool breeze', icon: 'cloud-sun' },
  ];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

function WeatherIcon({ type, size = 16 }) {
  switch (type) {
    case 'sun': return <Sun size={size} style={{ color: '#f59e0b' }} />;
    case 'cloud-sun': return <CloudSun size={size} style={{ color: '#60a5fa' }} />;
    case 'cloud': return <Cloud size={size} style={{ color: '#94a3b8' }} />;
    case 'cloud-rain': return <CloudRain size={size} style={{ color: '#38bdf8' }} />;
    default: return <Sun size={size} style={{ color: '#f59e0b' }} />;
  }
}

export default function ItineraryView() {
  const { tripData } = useContext(TripContext);
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ time: '', title: '', location: '' });
  const [bookingModal, setBookingModal] = useState(null);
  const hotelScrollRef = useRef(null);

  useEffect(() => {
    if (!tripData) { navigate('/'); return; }
    const plan = generateItinerary(
      tripData.destination.city,
      tripData.startDate,
      tripData.duration,
      tripData.budget
    );
    setItinerary(plan);

    const h = getHotels(tripData.destination.country, tripData.budget, tripData.currencySymbol);
    setHotels(h);

    const w = plan.map(() => getWeather(tripData.destination.city));
    setWeatherData(w);
  }, [tripData, navigate]);

  if (!tripData || itinerary.length === 0) return null;

  const day = itinerary[currentDay];
  const weather = weatherData[currentDay];

  const handleRegenDay = () => {
    const newDay = regenerateDay(day, tripData.destination.city, tripData.budget);
    const updated = [...itinerary];
    updated[currentDay] = newDay;
    setItinerary(updated);
  };

  const handleRegenAll = () => {
    const plan = generateItinerary(
      tripData.destination.city,
      tripData.startDate,
      tripData.duration,
      tripData.budget
    );
    setItinerary(plan);
    setCurrentDay(0);
  };

  const handleSwap = (actIdx) => {
    const newAct = swapActivity(day.activities[actIdx], tripData.destination.city, tripData.budget);
    const updated = [...itinerary];
    updated[currentDay].activities[actIdx] = newAct;
    setItinerary(updated);
  };

  const startEdit = (act) => {
    setEditingId(act.id);
    setEditForm({ time: act.time, title: act.title, location: act.location });
  };

  const saveEdit = (actIdx) => {
    const updated = [...itinerary];
    updated[currentDay].activities[actIdx] = {
      ...updated[currentDay].activities[actIdx],
      ...editForm
    };
    setItinerary(updated);
    setEditingId(null);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const sym = tripData.currencySymbol;

    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('AI Travel Itinerary', 20, 20);

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`${tripData.source.city} → ${tripData.destination.city}`, 20, 30);
    doc.text(`${tripData.startDate} to ${tripData.endDate} (${tripData.duration} days)`, 20, 38);
    doc.text(`Budget: ${tripData.budget} | Travel: ${tripData.travelMode}`, 20, 46);

    let y = 60;
    itinerary.forEach(d => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`Day ${d.day} - ${d.dateFormatted}`, 20, y);
      y += 10;

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      d.activities.forEach(act => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${act.time} | ${act.title} @ ${act.location} (${sym}${act.cost})`, 25, y);
        y += 7;
      });
      y += 8;
    });

    doc.save(`TravelAI_Itinerary_${tripData.destination.city}.pdf`);
  };

  const hotelGradients = getHotelImages();

  return (
    <div className="itinerary-page">
      {/* ---- Header ---- */}
      <div className="itin-header">
        <div className="itin-header-top">
          <h1>{tripData.destination.city}</h1>
          <span className="budget-tag">{tripData.budget.toUpperCase()}</span>
        </div>
        <p className="itin-sub">
          Day {currentDay + 1} of {tripData.duration} • {day.dateFormatted}
        </p>
        <div className="itin-actions">
          <button className="btn-ghost" onClick={handleDownloadPDF}><Download size={16} /> PDF</button>
          <button className="btn-ghost" onClick={handleRegenDay}><RefreshCw size={16} /> Regenerate Day</button>
          <button className="btn-ghost" onClick={handleRegenAll}><RefreshCw size={16} /> Regenerate All</button>
        </div>
      </div>

      {/* ---- Day Navigation ---- */}
      <div className="day-nav">
        <button className="day-arrow" onClick={() => setCurrentDay(Math.max(0, currentDay - 1))} disabled={currentDay === 0}>
          <ChevronLeft size={20} />
        </button>
        <div className="day-pills">
          {itinerary.map((d, i) => (
            <button key={i} className={`day-pill ${i === currentDay ? 'active' : ''}`} onClick={() => setCurrentDay(i)}>
              D{d.day}
            </button>
          ))}
        </div>
        <button className="day-arrow" onClick={() => setCurrentDay(Math.min(itinerary.length - 1, currentDay + 1))} disabled={currentDay === itinerary.length - 1}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ---- Travel Info ---- */}
      {currentDay === 0 && (
        <div className="glass-card-sm travel-info-card">
          <div className="travel-route">
            <Navigation size={16} />
            <span>Travel: {tripData.source.city} → {tripData.destination.city}</span>
          </div>
          <div className="travel-details">
            <span>{tripData.travelMode.toUpperCase()}</span>
            <span>•</span>
            <span>Est. {Math.floor(Math.random() * 6 + 2)}h {Math.floor(Math.random() * 50)}m</span>
          </div>
        </div>
      )}

      {/* ---- Hotels ---- */}
      <section className="hotels-section">
        <h3>Recommended Hotels ({tripData.budget})</h3>
        <div className="hotel-scroll" ref={hotelScrollRef}>
          {hotels.map((hotel, i) => (
            <div key={i} className="glass-card-sm hotel-card">
              <div className="hotel-thumb" style={{ background: hotelGradients[i % hotelGradients.length] }}>
                <span className="hotel-type-badge">{hotel.type}</span>
              </div>
              <div className="hotel-body">
                <div className="hotel-name-row">
                  <h4>{hotel.name}</h4>
                  <span className="hotel-rating"><Star size={12} fill="currentColor" /> {hotel.rating}</span>
                </div>
                <p className="hotel-dist"><MapPin size={12} /> {hotel.distance}</p>
                <div className="hotel-price-row">
                  <span className="hotel-price">{hotel.priceFormatted}<small>/night</small></span>
                  <div className="hotel-actions-group">
                    <button className="icon-btn-accent" title="View on Map" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + tripData.destination.city)}`, '_blank')}>
                      <MapPin size={16} />
                    </button>
                    <button className="btn-accent" onClick={() => setBookingModal(hotel)}>Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Weather ---- */}
      {weather && (
        <div className="glass-card-sm weather-strip">
          <div className="weather-left">
            <WeatherIcon type={weather.icon} size={22} />
            <span className="weather-temp">{weather.temp}°C</span>
            <span className="weather-desc">{weather.desc}</span>
          </div>
          <span className="weather-label">Forecast</span>
        </div>
      )}

      {/* ---- Timeline ---- */}
      <section className="timeline-section">
        <h3>Today's Itinerary</h3>
        <div className="timeline">
          {day.activities.map((act, idx) => (
            <div key={act.id} className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-connector"></div>

              {editingId === act.id ? (
                <div className="glass-card-sm tl-card editing">
                  <div className="edit-row">
                    <input value={editForm.time} onChange={(e) => setEditForm({...editForm, time: e.target.value})} className="edit-input time" placeholder="HH:MM" />
                    <input value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="edit-input title" placeholder="Activity title" />
                  </div>
                  <input value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} className="edit-input location" placeholder="Location" />
                  <div className="edit-actions">
                    <button className="btn-accent" onClick={() => saveEdit(idx)}><Check size={14} /> Save</button>
                    <button className="btn-ghost" onClick={() => setEditingId(null)}><X size={14} /></button>
                  </div>
                </div>
              ) : (
                <div className="glass-card-sm tl-card">
                  <div className="tl-time"><Clock size={14} /> {act.time}</div>
                  <div className="tl-card-header">
                    <h4>{act.title}</h4>
                    <div className="tl-card-actions">
                      <button className="icon-btn" title="Edit" onClick={() => startEdit(act)}><Edit3 size={14} /></button>
                      <button className="icon-btn" title="Swap" onClick={() => handleSwap(idx)}><RefreshCw size={14} /></button>
                    </div>
                  </div>
                  <p className="tl-desc">{act.description}</p>
                  <div className="tl-footer">
                    <span className="tl-loc"><MapPin size={12} /> {act.location}</span>
                    <span className="tl-cost">{tripData.currencySymbol}{act.cost}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---- Booking Modal ---- */}
      {bookingModal && (
        <div className="modal-overlay" onClick={() => setBookingModal(null)}>
          <div className="glass-card modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Book Hotel</h3>
            <div className="modal-hotel-name">{bookingModal.name}</div>
            <div className="modal-details">
              <div className="modal-row">
                <span>Check-in</span>
                <span>{tripData.startDate}</span>
              </div>
              <div className="modal-row">
                <span>Check-out</span>
                <span>{tripData.endDate}</span>
              </div>
              <div className="modal-row">
                <span>Duration</span>
                <span>{tripData.duration} nights</span>
              </div>
              <div className="modal-row total">
                <span>Total</span>
                <span>{tripData.currencySymbol}{(bookingModal.price * tripData.duration).toLocaleString()}</span>
              </div>
            </div>
            <button className="btn-primary w-full" onClick={() => { alert('Booking confirmed! (Demo)'); setBookingModal(null); }}>
              Confirm Booking
            </button>
            <button className="btn-ghost w-full" style={{ marginTop: '8px' }} onClick={() => setBookingModal(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
