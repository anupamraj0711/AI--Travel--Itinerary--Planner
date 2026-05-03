// Itinerary generation engine - creates realistic day-wise plans

const activityDatabase = {
  morning: [
    { title: 'Breakfast at Local Market', description: 'Start your day with authentic local cuisine at a bustling morning market.', category: 'food' },
    { title: 'Sunrise Viewpoint Walk', description: 'Catch the sunrise from a scenic viewpoint with panoramic city views.', category: 'activity' },
    { title: 'Heritage Walking Tour', description: 'Explore the historical district with a guided walking tour.', category: 'activity' },
    { title: 'Museum Visit', description: 'Discover local art and history at a renowned museum.', category: 'activity' },
    { title: 'Temple & Cultural Visit', description: 'Visit an iconic temple or cultural site in the area.', category: 'activity' },
    { title: 'Garden & Park Stroll', description: 'Enjoy a peaceful morning walk through lush botanical gardens.', category: 'activity' }
  ],
  afternoon: [
    { title: 'Lunch at Popular Restaurant', description: 'Enjoy a delicious lunch at a highly-rated local restaurant.', category: 'food' },
    { title: 'Shopping at Local Market', description: 'Browse through vibrant local markets for souvenirs and handicrafts.', category: 'activity' },
    { title: 'Adventure Activity', description: 'Try an exciting outdoor activity like zip-lining, kayaking, or cycling.', category: 'activity' },
    { title: 'Photography Walk', description: 'Capture stunning photos at picturesque locations around the city.', category: 'activity' },
    { title: 'Historic Fort & Palace Visit', description: 'Explore a magnificent fort or palace with rich architectural history.', category: 'activity' },
    { title: 'Art Gallery Tour', description: 'Visit contemporary art galleries featuring local and international artists.', category: 'activity' }
  ],
  evening: [
    { title: 'Sunset Viewing', description: 'Watch a breathtaking sunset from a scenic spot.', category: 'activity' },
    { title: 'Street Food Tour', description: 'Sample the best street food the city has to offer.', category: 'food' },
    { title: 'Night Market Exploration', description: 'Explore a vibrant night market with food, crafts, and entertainment.', category: 'activity' },
    { title: 'Rooftop Dining', description: 'Enjoy dinner at a rooftop restaurant with stunning city views.', category: 'food' },
    { title: 'Cultural Performance', description: 'Attend a traditional music, dance, or theater performance.', category: 'activity' },
    { title: 'River/Lake Cruise', description: 'Take a scenic evening cruise with dinner options.', category: 'activity' }
  ]
};

const cityHighlights = {
  'Mumbai': ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Chhatrapati Shivaji Terminus', 'Juhu Beach'],
  'Delhi': ['Red Fort', 'India Gate', 'Qutub Minar', 'Humayun\'s Tomb', 'Chandni Chowk'],
  'New Delhi': ['Red Fort', 'India Gate', 'Qutub Minar', 'Humayun\'s Tomb', 'Lotus Temple'],
  'Jaipur': ['Hawa Mahal', 'Amber Fort', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort'],
  'Goa': ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls', 'Old Goa Churches', 'Anjuna Flea Market'],
  'Panaji': ['Church of Our Lady', 'Fontainhas', 'Dona Paula', 'Casino Pride', 'Miramar Beach'],
  'Paris': ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées', 'Montmartre'],
  'London': ['Big Ben', 'Tower Bridge', 'British Museum', 'Buckingham Palace', 'Hyde Park'],
  'Tokyo': ['Shibuya Crossing', 'Meiji Shrine', 'Senso-ji Temple', 'Akihabara', 'Tokyo Tower'],
  'New York City': ['Statue of Liberty', 'Central Park', 'Times Square', 'Brooklyn Bridge', 'Empire State Building'],
  'Dubai': ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Dubai Marina', 'Gold Souk'],
  'Singapore': ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Chinatown', 'Orchard Road'],
  'Bangkok': ['Grand Palace', 'Wat Pho', 'Chatuchak Market', 'Khao San Road', 'Jim Thompson House'],
  'Rome': ['Colosseum', 'Vatican Museums', 'Trevi Fountain', 'Pantheon', 'Roman Forum'],
  'Barcelona': ['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter', 'Casa Batlló'],
  'Sydney': ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'The Rocks', 'Darling Harbour'],
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCityLocations(city) {
  const highlights = cityHighlights[city];
  if (highlights) return highlights;
  return ['City Center', 'Old Town', 'Market District', 'Waterfront', 'Cultural Quarter'];
}

export function generateItinerary(destination, startDate, days, budgetLevel) {
  const locations = getCityLocations(destination);
  const plan = [];

  for (let d = 0; d < days; d++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + d);

    const morningAct = getRandomItem(activityDatabase.morning);
    const afternoonAct = getRandomItem(activityDatabase.afternoon);
    const eveningAct = getRandomItem(activityDatabase.evening);

    const loc1 = locations[d % locations.length];
    const loc2 = locations[(d + 1) % locations.length];
    const loc3 = locations[(d + 2) % locations.length];

    const costMult = budgetLevel === 'Backpacker' ? 0.5 : budgetLevel === 'Luxury' ? 2.5 : 1;

    plan.push({
      day: d + 1,
      date: date.toISOString().split('T')[0],
      dateFormatted: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      activities: [
        {
          id: `d${d+1}-a1`,
          time: '09:00',
          title: d === 0 ? `Arrive & ${morningAct.title}` : morningAct.title,
          description: morningAct.description,
          location: loc1,
          cost: Math.round((15 + Math.random() * 20) * costMult),
          category: morningAct.category
        },
        {
          id: `d${d+1}-a2`,
          time: '11:00',
          title: `Visit ${loc2}`,
          description: `Explore the famous ${loc2} area with guided insights.`,
          location: loc2,
          cost: Math.round((20 + Math.random() * 30) * costMult),
          category: 'activity'
        },
        {
          id: `d${d+1}-a3`,
          time: '13:30',
          title: afternoonAct.title,
          description: afternoonAct.description,
          location: loc2,
          cost: Math.round((25 + Math.random() * 25) * costMult),
          category: afternoonAct.category
        },
        {
          id: `d${d+1}-a4`,
          time: '16:00',
          title: `Explore ${loc3}`,
          description: `Discover hidden gems and local culture at ${loc3}.`,
          location: loc3,
          cost: Math.round((10 + Math.random() * 20) * costMult),
          category: 'activity'
        },
        {
          id: `d${d+1}-a5`,
          time: '19:00',
          title: eveningAct.title,
          description: eveningAct.description,
          location: loc1,
          cost: Math.round((30 + Math.random() * 40) * costMult),
          category: eveningAct.category
        }
      ]
    });
  }

  return plan;
}

export function regenerateDay(dayPlan, destination, budgetLevel) {
  const locations = getCityLocations(destination);
  const costMult = budgetLevel === 'Backpacker' ? 0.5 : budgetLevel === 'Luxury' ? 2.5 : 1;
  const d = dayPlan.day - 1;

  return {
    ...dayPlan,
    activities: [
      {
        id: `d${d+1}-a1-r${Date.now()}`,
        time: '09:30',
        title: getRandomItem(activityDatabase.morning).title,
        description: getRandomItem(activityDatabase.morning).description,
        location: locations[Math.floor(Math.random() * locations.length)],
        cost: Math.round((15 + Math.random() * 25) * costMult),
        category: 'activity'
      },
      {
        id: `d${d+1}-a2-r${Date.now()}`,
        time: '11:30',
        title: `Explore ${locations[Math.floor(Math.random() * locations.length)]}`,
        description: 'Discover local culture and landmarks.',
        location: locations[Math.floor(Math.random() * locations.length)],
        cost: Math.round((20 + Math.random() * 30) * costMult),
        category: 'activity'
      },
      {
        id: `d${d+1}-a3-r${Date.now()}`,
        time: '14:00',
        title: getRandomItem(activityDatabase.afternoon).title,
        description: getRandomItem(activityDatabase.afternoon).description,
        location: locations[Math.floor(Math.random() * locations.length)],
        cost: Math.round((25 + Math.random() * 30) * costMult),
        category: 'food'
      },
      {
        id: `d${d+1}-a4-r${Date.now()}`,
        time: '16:30',
        title: getRandomItem(activityDatabase.afternoon).title,
        description: 'An exciting afternoon activity.',
        location: locations[Math.floor(Math.random() * locations.length)],
        cost: Math.round((15 + Math.random() * 20) * costMult),
        category: 'activity'
      },
      {
        id: `d${d+1}-a5-r${Date.now()}`,
        time: '19:30',
        title: getRandomItem(activityDatabase.evening).title,
        description: getRandomItem(activityDatabase.evening).description,
        location: locations[Math.floor(Math.random() * locations.length)],
        cost: Math.round((30 + Math.random() * 45) * costMult),
        category: 'food'
      }
    ]
  };
}

export function swapActivity(activity, destination, budgetLevel) {
  const costMult = budgetLevel === 'Backpacker' ? 0.5 : budgetLevel === 'Luxury' ? 2.5 : 1;
  const hour = parseInt(activity.time.split(':')[0]);
  const locations = getCityLocations(destination);

  let pool;
  if (hour < 12) pool = activityDatabase.morning;
  else if (hour < 17) pool = activityDatabase.afternoon;
  else pool = activityDatabase.evening;

  const newAct = getRandomItem(pool);
  return {
    ...activity,
    id: `swap-${Date.now()}`,
    title: newAct.title,
    description: newAct.description,
    location: locations[Math.floor(Math.random() * locations.length)],
    cost: Math.round((15 + Math.random() * 35) * costMult),
    category: newAct.category
  };
}
