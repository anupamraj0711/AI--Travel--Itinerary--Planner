// Cost estimation data per country
// Base costs per day in local currency

const costData = {
  "India": {
    baseCosts: { accommodation: 1500, food: 800, activities: 500, localTransport: 300 },
    transportBetweenCities: { flight: 4500, train: 800, bus: 500 },
    multipliers: { Backpacker: 0.5, Comfort: 1, Luxury: 2.5 }
  },
  "United States": {
    baseCosts: { accommodation: 150, food: 60, activities: 50, localTransport: 30 },
    transportBetweenCities: { flight: 250, train: 80, bus: 40 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.8 }
  },
  "United Kingdom": {
    baseCosts: { accommodation: 120, food: 45, activities: 40, localTransport: 25 },
    transportBetweenCities: { flight: 80, train: 60, bus: 25 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.5 }
  },
  "France": {
    baseCosts: { accommodation: 110, food: 50, activities: 35, localTransport: 20 },
    transportBetweenCities: { flight: 100, train: 60, bus: 30 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.5 }
  },
  "Japan": {
    baseCosts: { accommodation: 10000, food: 4000, activities: 3000, localTransport: 2000 },
    transportBetweenCities: { flight: 15000, train: 12000, bus: 5000 },
    multipliers: { Backpacker: 0.5, Comfort: 1, Luxury: 2.5 }
  },
  "Australia": {
    baseCosts: { accommodation: 160, food: 55, activities: 50, localTransport: 25 },
    transportBetweenCities: { flight: 200, train: 80, bus: 50 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.5 }
  },
  "Thailand": {
    baseCosts: { accommodation: 1200, food: 500, activities: 400, localTransport: 200 },
    transportBetweenCities: { flight: 2500, train: 600, bus: 350 },
    multipliers: { Backpacker: 0.5, Comfort: 1, Luxury: 3 }
  },
  "Italy": {
    baseCosts: { accommodation: 100, food: 45, activities: 30, localTransport: 20 },
    transportBetweenCities: { flight: 90, train: 50, bus: 25 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.5 }
  },
  "Germany": {
    baseCosts: { accommodation: 100, food: 40, activities: 30, localTransport: 18 },
    transportBetweenCities: { flight: 80, train: 50, bus: 25 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.5 }
  },
  "UAE": {
    baseCosts: { accommodation: 500, food: 150, activities: 200, localTransport: 80 },
    transportBetweenCities: { flight: 300, train: 50, bus: 30 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 3 }
  },
  "Singapore": {
    baseCosts: { accommodation: 200, food: 40, activities: 50, localTransport: 20 },
    transportBetweenCities: { flight: 0, train: 0, bus: 0 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 3 }
  },
  "Spain": {
    baseCosts: { accommodation: 90, food: 40, activities: 25, localTransport: 15 },
    transportBetweenCities: { flight: 70, train: 40, bus: 20 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.5 }
  },
  "Turkey": {
    baseCosts: { accommodation: 1500, food: 500, activities: 300, localTransport: 100 },
    transportBetweenCities: { flight: 1500, train: 300, bus: 200 },
    multipliers: { Backpacker: 0.5, Comfort: 1, Luxury: 2.5 }
  },
  "Indonesia": {
    baseCosts: { accommodation: 400000, food: 150000, activities: 100000, localTransport: 50000 },
    transportBetweenCities: { flight: 800000, train: 200000, bus: 100000 },
    multipliers: { Backpacker: 0.5, Comfort: 1, Luxury: 3 }
  },
  "Switzerland": {
    baseCosts: { accommodation: 200, food: 70, activities: 60, localTransport: 30 },
    transportBetweenCities: { flight: 120, train: 80, bus: 40 },
    multipliers: { Backpacker: 0.6, Comfort: 1, Luxury: 2.5 }
  }
};

// Calculate total budget
export function calculateBudget(country, duration, budgetLevel, travelMode) {
  const data = costData[country];
  if (!data) return null;

  const mult = data.multipliers[budgetLevel] || 1;
  const days = Math.max(1, duration);

  const accommodation = Math.round(data.baseCosts.accommodation * mult * days);
  const food = Math.round(data.baseCosts.food * mult * days);
  const activities = Math.round(data.baseCosts.activities * mult * days);
  const localTransport = Math.round(data.baseCosts.localTransport * mult * days);

  let interCityTransport = 0;
  const modeKey = travelMode === 'Auto' ? 'train' : travelMode.toLowerCase();
  if (data.transportBetweenCities[modeKey]) {
    interCityTransport = Math.round(data.transportBetweenCities[modeKey] * mult);
  }

  const total = accommodation + food + activities + localTransport + interCityTransport;

  return {
    accommodation,
    food,
    activities,
    localTransport,
    transport: interCityTransport,
    total,
    perDay: Math.round(total / days),
    potentialSaving: Math.round(total * 0.2)
  };
}

// Get transport suggestion
export function getTransportSuggestion(travelMode, country) {
  const data = costData[country];
  if (!data) return { mode: travelMode, note: '' };

  if (travelMode === 'Auto') {
    if (data.transportBetweenCities.train > 0) {
      return { mode: 'Train', note: 'AI selected Train as the best value option for this route.' };
    }
    return { mode: 'Bus', note: 'AI selected Bus as the most available option.' };
  }

  return { mode: travelMode, note: `${travelMode} selected by user.` };
}

// Get savings tips
export function getSavingTips(budgetLevel, country) {
  const tips = {
    Backpacker: [
      'Stay in hostels or budget guesthouses to save on accommodation.',
      'Eat at local street food stalls for authentic and affordable meals.',
      'Use public buses and metro instead of taxis.',
      'Visit free attractions like parks, markets, and temples.',
      'Travel during off-peak season for lower prices.'
    ],
    Comfort: [
      'Consider boutique hotels instead of international chains to save ~15%.',
      'Book train tickets 2 weeks in advance for early-bird discounts.',
      'Mix dining between local restaurants and mid-range places.',
      'Use city travel passes for unlimited public transport.',
      'Book activities through local providers for better rates.'
    ],
    Luxury: [
      'Use hotel loyalty programs for complimentary upgrades.',
      'Book business class flights during sales for premium savings.',
      'Consider private tours grouped with other luxury travelers.',
      'Use concierge services for exclusive local dining experiences.',
      'Book multi-day packages for premium activities at discounted rates.'
    ]
  };
  return tips[budgetLevel] || tips.Comfort;
}

export default costData;
