// Hotel recommendation engine with map coordinates

const hotelDatabase = {
  Backpacker: [
    { name: 'Wanderlust Hostel', priceMultiplier: 0.4, rating: 4.1, distance: '1.2km to center', type: 'Hostel', offset: [0.008, 0.012] },
    { name: 'Budget Inn Express', priceMultiplier: 0.5, rating: 3.8, distance: '0.8km to center', type: 'Budget Hotel', offset: [-0.005, 0.008] },
    { name: 'Backpackers Paradise', priceMultiplier: 0.35, rating: 4.3, distance: '1.5km to center', type: 'Hostel', offset: [0.012, -0.006] },
    { name: 'City Dorm Stay', priceMultiplier: 0.3, rating: 3.9, distance: '2.0km to center', type: 'Dormitory', offset: [-0.015, -0.010] },
    { name: 'Nomad Guest House', priceMultiplier: 0.45, rating: 4.0, distance: '0.5km to center', type: 'Guest House', offset: [0.003, 0.004] },
  ],
  Comfort: [
    { name: 'Grand Central Hotel', priceMultiplier: 1.0, rating: 4.5, distance: '0.3km to center', type: 'Hotel', offset: [0.002, 0.003] },
    { name: 'Riverside Boutique', priceMultiplier: 1.1, rating: 4.6, distance: '0.5km to center', type: 'Boutique', offset: [-0.004, 0.005] },
    { name: 'Heritage Comfort Inn', priceMultiplier: 0.9, rating: 4.4, distance: '0.7km to center', type: 'Hotel', offset: [0.006, -0.004] },
    { name: 'Skyline Suites', priceMultiplier: 1.2, rating: 4.7, distance: '0.2km to center', type: 'Suite Hotel', offset: [-0.001, 0.002] },
    { name: 'Palm View Resort', priceMultiplier: 1.15, rating: 4.3, distance: '1.0km to center', type: 'Resort', offset: [0.009, 0.007] },
  ],
  Luxury: [
    { name: 'The Royal Palace', priceMultiplier: 2.5, rating: 4.9, distance: '0.1km to center', type: '5-Star', offset: [0.001, 0.001] },
    { name: 'Diamond Grand Resort', priceMultiplier: 2.8, rating: 4.8, distance: '0.2km to center', type: '5-Star', offset: [-0.002, 0.003] },
    { name: 'Imperial Suites & Spa', priceMultiplier: 3.0, rating: 4.9, distance: '0.3km to center', type: 'Luxury Resort', offset: [0.003, -0.002] },
    { name: 'Prestige Tower Hotel', priceMultiplier: 2.6, rating: 4.7, distance: '0.4km to center', type: '5-Star', offset: [-0.004, 0.004] },
    { name: 'The Platinum Collection', priceMultiplier: 3.2, rating: 5.0, distance: '0.1km to center', type: 'Ultra Luxury', offset: [0.001, -0.001] },
  ]
};

const basePricePerCountry = {
  'India': 2000,
  'United States': 120,
  'United Kingdom': 100,
  'France': 95,
  'Japan': 8000,
  'Australia': 130,
  'Thailand': 1000,
  'Italy': 90,
  'Germany': 85,
  'UAE': 400,
  'Singapore': 180,
  'Spain': 80,
  'Turkey': 1200,
  'Indonesia': 350000,
  'Switzerland': 180
};

// City center coordinates for map
const cityCoordinates = {
  // India
  'Mumbai': [19.0760, 72.8777],
  'Pune': [18.5204, 73.8567],
  'Delhi': [28.6139, 77.2090],
  'Jaipur': [26.9124, 75.7873],
  'Agra': [27.1767, 78.0081],
  'Lucknow': [26.8467, 80.9462],
  'Varanasi': [25.3176, 83.0064],
  'Bengaluru': [12.9716, 77.5946],
  'Mysuru': [12.2958, 76.6394],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Hyderabad': [17.3850, 78.4867],
  'Goa': [15.2993, 74.1240],
  'Kochi': [9.9312, 76.2673],
  'Patna': [25.6093, 85.1376],
  'Bodh Gaya': [24.6961, 84.9869],
  'Ranchi': [23.3441, 85.3096],
  'Shimla': [31.1048, 77.1734],
  'Manali': [32.2396, 77.1887],
  'Amritsar': [31.6340, 74.8723],
  'Udaipur': [24.5854, 73.7125],
  'Jodhpur': [26.2389, 73.0243],
  'Ahmedabad': [23.0225, 72.5714],
  'Surat': [21.1702, 72.8311],

  // US
  'New York': [40.7128, -74.0060],
  'Los Angeles': [34.0522, -118.2437],
  'San Francisco': [37.7749, -122.4194],
  'Las Vegas': [36.1699, -115.1398],
  'Miami': [25.7617, -80.1918],
  'Chicago': [41.8781, -87.6298],
  'Houston': [29.7604, -95.3698],
  'Seattle': [47.6062, -122.3321],

  // UK
  'London': [51.5074, -0.1278],
  'Manchester': [53.4808, -2.2426],
  'Edinburgh': [55.9533, -3.1883],

  // France
  'Paris': [48.8566, 2.3522],
  'Nice': [43.7102, 7.2620],
  'Lyon': [45.7640, 4.8357],

  // Japan
  'Tokyo': [35.6762, 139.6503],
  'Osaka': [34.6937, 135.5023],
  'Kyoto': [35.0116, 135.7681],

  // Australia
  'Sydney': [-33.8688, 151.2093],
  'Melbourne': [-37.8136, 144.9631],

  // Thailand
  'Bangkok': [13.7563, 100.5018],
  'Phuket': [7.8804, 98.3923],
  'Chiang Mai': [18.7883, 98.9853],

  // Italy
  'Rome': [41.9028, 12.4964],
  'Venice': [45.4408, 12.3155],
  'Milan': [45.4642, 9.1900],

  // Germany
  'Berlin': [52.5200, 13.4050],
  'Munich': [48.1351, 11.5820],

  // UAE
  'Dubai': [25.2048, 55.2708],
  'Abu Dhabi': [24.4539, 54.3773],

  // Singapore
  'Singapore': [1.3521, 103.8198],

  // Spain
  'Barcelona': [41.3874, 2.1686],
  'Madrid': [40.4168, -3.7038],

  // Turkey
  'Istanbul': [41.0082, 28.9784],

  // Indonesia
  'Bali': [-8.3405, 115.0920],
  'Jakarta': [-6.2088, 106.8456],

  // Switzerland
  'Zurich': [47.3769, 8.5417],
  'Geneva': [46.2044, 6.1432],
};

export function getCityCoordinates(city) {
  return cityCoordinates[city] || [28.6139, 77.2090]; // Default Delhi
}

export function getHotels(country, budgetLevel, symbol) {
  const hotels = hotelDatabase[budgetLevel] || hotelDatabase.Comfort;
  const basePrice = basePricePerCountry[country] || 100;

  return hotels.map(hotel => ({
    ...hotel,
    price: Math.round(basePrice * hotel.priceMultiplier),
    priceFormatted: `${symbol}${Math.round(basePrice * hotel.priceMultiplier).toLocaleString()}`,
    perNight: true
  }));
}

export function getHotelImages() {
  return [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];
}
