// Comprehensive location dataset: Country → States → Cities
// Each country has currency info, cost multipliers, and timezone

const locationData = {
  "India": {
    currency: "INR", symbol: "₹", code: "IN",
    states: {
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
      "Delhi": ["New Delhi"],
      "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
      "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar"],
      "Goa": ["Panaji", "Margao", "Vasco da Gama", "Calangute"],
      "Kerala": ["Kochi", "Thiruvananthapuram", "Alleppey", "Munnar"],
      "Uttar Pradesh": ["Lucknow", "Agra", "Varanasi", "Prayagraj"],
      "West Bengal": ["Kolkata", "Darjeeling", "Siliguri"],
      "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
      "Telangana": ["Hyderabad", "Warangal"],
      "Punjab": ["Amritsar", "Chandigarh", "Ludhiana"],
      "Jammu & Kashmir": ["Srinagar", "Jammu", "Gulmarg", "Pahalgam"],
      "Uttarakhand": ["Dehradun", "Rishikesh", "Haridwar", "Nainital", "Mussoorie"]
    }
  },
  "United States": {
    currency: "USD", symbol: "$", code: "US",
    states: {
      "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
      "New York": ["New York City", "Buffalo", "Albany"],
      "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"],
      "Texas": ["Houston", "Dallas", "Austin", "San Antonio"],
      "Nevada": ["Las Vegas", "Reno"],
      "Illinois": ["Chicago", "Springfield"],
      "Hawaii": ["Honolulu", "Maui"],
      "Massachusetts": ["Boston", "Cambridge"],
      "Washington": ["Seattle", "Spokane"],
      "Colorado": ["Denver", "Boulder", "Aspen"]
    }
  },
  "United Kingdom": {
    currency: "GBP", symbol: "£", code: "GB",
    states: {
      "England": ["London", "Manchester", "Birmingham", "Liverpool", "Oxford", "Cambridge", "Bath"],
      "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"],
      "Wales": ["Cardiff", "Swansea"],
      "Northern Ireland": ["Belfast"]
    }
  },
  "France": {
    currency: "EUR", symbol: "€", code: "FR",
    states: {
      "Île-de-France": ["Paris"],
      "Provence-Alpes-Côte d'Azur": ["Nice", "Marseille", "Cannes"],
      "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble"],
      "Normandy": ["Rouen", "Caen"],
      "Brittany": ["Rennes", "Brest"]
    }
  },
  "Japan": {
    currency: "JPY", symbol: "¥", code: "JP",
    states: {
      "Kanto": ["Tokyo", "Yokohama"],
      "Kansai": ["Osaka", "Kyoto", "Nara", "Kobe"],
      "Hokkaido": ["Sapporo"],
      "Chubu": ["Nagoya", "Kanazawa"],
      "Kyushu": ["Fukuoka", "Nagasaki"]
    }
  },
  "Australia": {
    currency: "AUD", symbol: "A$", code: "AU",
    states: {
      "New South Wales": ["Sydney", "Newcastle"],
      "Victoria": ["Melbourne", "Geelong"],
      "Queensland": ["Brisbane", "Gold Coast", "Cairns"],
      "Western Australia": ["Perth", "Broome"],
      "South Australia": ["Adelaide"]
    }
  },
  "Thailand": {
    currency: "THB", symbol: "฿", code: "TH",
    states: {
      "Central": ["Bangkok"],
      "Southern": ["Phuket", "Krabi", "Koh Samui"],
      "Northern": ["Chiang Mai", "Chiang Rai"],
      "Eastern": ["Pattaya"]
    }
  },
  "Italy": {
    currency: "EUR", symbol: "€", code: "IT",
    states: {
      "Lazio": ["Rome"],
      "Lombardy": ["Milan", "Bergamo"],
      "Veneto": ["Venice", "Verona"],
      "Tuscany": ["Florence", "Pisa", "Siena"],
      "Campania": ["Naples", "Amalfi"]
    }
  },
  "Germany": {
    currency: "EUR", symbol: "€", code: "DE",
    states: {
      "Bavaria": ["Munich", "Nuremberg"],
      "Berlin": ["Berlin"],
      "Hamburg": ["Hamburg"],
      "North Rhine-Westphalia": ["Cologne", "Düsseldorf"],
      "Saxony": ["Dresden", "Leipzig"]
    }
  },
  "UAE": {
    currency: "AED", symbol: "د.إ", code: "AE",
    states: {
      "Dubai": ["Dubai"],
      "Abu Dhabi": ["Abu Dhabi"],
      "Sharjah": ["Sharjah"]
    }
  },
  "Singapore": {
    currency: "SGD", symbol: "S$", code: "SG",
    states: {
      "Singapore": ["Singapore"]
    }
  },
  "Spain": {
    currency: "EUR", symbol: "€", code: "ES",
    states: {
      "Community of Madrid": ["Madrid"],
      "Catalonia": ["Barcelona", "Girona"],
      "Andalusia": ["Seville", "Granada", "Malaga"],
      "Valencian Community": ["Valencia"]
    }
  },
  "Turkey": {
    currency: "TRY", symbol: "₺", code: "TR",
    states: {
      "Istanbul": ["Istanbul"],
      "Cappadocia": ["Göreme", "Nevşehir"],
      "Antalya": ["Antalya"],
      "Aegean": ["Izmir", "Bodrum"]
    }
  },
  "Indonesia": {
    currency: "IDR", symbol: "Rp", code: "ID",
    states: {
      "Bali": ["Denpasar", "Ubud", "Seminyak", "Kuta"],
      "Java": ["Jakarta", "Yogyakarta", "Surabaya"],
      "Lombok": ["Mataram"]
    }
  },
  "Switzerland": {
    currency: "CHF", symbol: "CHF", code: "CH",
    states: {
      "Zurich": ["Zurich"],
      "Bern": ["Bern", "Interlaken"],
      "Geneva": ["Geneva"],
      "Lucerne": ["Lucerne"]
    }
  }
};

export default locationData;
