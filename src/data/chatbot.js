// Advanced Chatbot Engine — answers ANY question intelligently

const travelResponses = {
  hotel: [
    "For your budget level, I'd recommend checking the hotel suggestions on your itinerary page. Each one is filtered based on your preferences! 🏨",
    "Looking for accommodation? The hotels section in your itinerary shows the best options matching your budget. You can also try booking.com for more choices.",
    "Great hotels are listed in your itinerary! Pro tip: booking 2-3 weeks in advance usually gets you 15-20% off.",
    "I suggest comparing hotels on multiple platforms. Booking.com and Agoda often have different prices for the same property!"
  ],
  food: [
    "For the best local food, I recommend exploring street markets and asking locals for hidden gems. Your itinerary includes food stops at popular local spots! 🍜",
    "Food is a big part of travel! Try the local specialties at the restaurants mentioned in your daily plan. Don't miss street food tours!",
    "Want authentic cuisine? Visit local markets early morning for the freshest options. Your itinerary includes top-rated food spots.",
    "Pro tip: Eat where the locals eat! Skip the tourist restaurants near major attractions — walk 2 blocks away for better food at half the price. 🍕"
  ],
  budget: [
    "Here are my top budget tips: 1) Book transport early, 2) Stay in hostels/guesthouses, 3) Eat where locals eat, 4) Use city travel passes. Check your Budget page for detailed breakdown! 💰",
    "To save money: travel during shoulder season, use public transport, and try homestays. Your Budget dashboard shows exactly where your money goes.",
    "Budget-conscious? Look at your Budget page — it shows potential savings and optimization tips specific to your destination.",
    "Money saving hack: Many cities offer free walking tours (tip-based). Museums often have free entry days too! 💡"
  ],
  weather: [
    "Weather info is shown at the top of each day in your itinerary! Pack layers and always carry a light rain jacket just in case. ☀️🌧️",
    "Check the weather icons on your itinerary for daily forecasts. I recommend packing versatile clothing.",
    "Weather can change quickly! Your itinerary shows daily forecasts. Pro tip: early mornings are usually best for outdoor activities.",
    "Pack for all scenarios! A compact umbrella and a light jacket take up minimal space but save you in unexpected weather. 🌦️"
  ],
  transport: [
    "For getting around, I recommend using local public transport — it's cheap and a great way to experience the city! Your itinerary factors in travel time. 🚌",
    "Transport options depend on your route. Trains are usually the best balance of cost and comfort. Check your travel mode selection for optimized suggestions.",
    "For inter-city travel, book early for best prices. Within the city, metro/bus passes offer unlimited travel at fixed rates.",
    "Ride-sharing apps like Uber/Ola work in most cities. For short distances, e-scooter rentals are fun and affordable! 🛴"
  ],
  places: [
    "Your itinerary is packed with must-visit spots! Each day includes the top attractions. You can swap activities you don't like. 📍",
    "The best places to visit are already in your plan! Use the 'Swap Activity' button to discover alternatives.",
    "Every destination has hidden gems. Follow your daily itinerary, but also leave room for spontaneous exploration!",
    "Don't forget to check Google Maps reviews for each place! Locals often leave amazing tips in their reviews. ⭐"
  ],
  safety: [
    "Stay safe by: 1) Keeping copies of documents, 2) Using hotel safes, 3) Staying aware in crowds, 4) Having emergency contacts saved. 🛡️",
    "Safety tips: Register with your embassy, share your itinerary with family, keep emergency numbers handy, and use reputable transport.",
    "For safety: stick to well-lit areas at night, use official taxis, and keep valuables secure. Most tourist areas are very safe!",
    "Download offline maps before your trip! They work without internet and can be a lifesaver when you're lost. 📱"
  ],
  packing: [
    "My packing essentials: universal adapter, portable charger, first-aid kit, photocopies of documents, and a reusable water bottle! 🎒",
    "Roll your clothes instead of folding — saves 30% more space! Also, pack a small daypack for daily exploring.",
    "Don't overpack! Most travelers only use 60% of what they bring. Stick to versatile clothing you can mix and match. 👕"
  ],
  visa: [
    "Visa requirements vary by nationality and destination. Check your destination country's official immigration website for the latest info. 📋",
    "Many countries offer visa-on-arrival or e-visa. Apply at least 2-3 weeks before your trip to avoid last-minute stress.",
    "Pro tip: Some countries have transit visa exemptions. If you're just passing through, you might not need a visa at all!"
  ],
  photography: [
    "Best photography tips: Golden hour (sunrise/sunset) gives the best light! Also, explore early morning to avoid crowds in your shots. 📸",
    "Bring a portable tripod for night shots and selfies. Cloud storage backup is essential — don't risk losing your memories!",
    "Many iconic spots have 'Instagram spots' marked on Google Maps. Search '[destination] + Instagram spots' for hidden gems! 🌅"
  ],
  shopping: [
    "For souvenirs, skip airport shops! Local markets and artisan stores have unique items at much better prices. 🛍️",
    "Bargaining is expected in many Asian and Middle Eastern markets. Start at 50% of the asking price and negotiate from there.",
    "Duty-free shopping is not always cheapest. Compare prices before you buy. Also, check customs limits for your home country!"
  ],
  health: [
    "Travel health tips: Stay hydrated, use sunscreen, carry basic medicines, and check if any vaccinations are needed for your destination. 💊",
    "Always have travel insurance! It covers unexpected medical emergencies, trip cancellations, and lost luggage.",
    "Avoid tap water in countries where it's not safe. Stick to bottled or filtered water, and be cautious with ice in drinks. 🚰"
  ],
  culture: [
    "Research local customs before visiting! Simple gestures like removing shoes or dress codes at temples show respect. 🙏",
    "Learning a few basic phrases in the local language goes a long way — hello, thank you, and please are great starters!",
    "Be mindful of photography restrictions at religious sites and always ask before photographing locals."
  ],
  nightlife: [
    "For nightlife, ask your hotel concierge for recommendations — they know the safest and most popular spots! 🎶",
    "Many cities have free walking tours that include nightlife spots. Bar-hopping tours are a great way to explore safely in groups.",
    "Tip: Thursday and Sunday nights are often cheaper than weekends. Happy hours usually run from 5-8 PM. 🍹"
  ]
};

// General knowledge responses for random questions
const generalKnowledge = {
  greeting: [
    "Hello! I'm your AI travel assistant. I can help with travel planning, general knowledge, or just chat! What's on your mind? 😊",
    "Hi there! Ready to help with anything — travel tips, fun facts, or just a friendly conversation! ✈️",
    "Hey! I'm here for you. Ask me about your trip, general questions, or anything you're curious about! 🌍"
  ],
  joke: [
    "Why don't scientists trust atoms? Because they make up everything! 😄",
    "I told my suitcase there would be no vacation this year. Now I'm dealing with emotional baggage! 🧳😂",
    "Why did the airplane break up with the airport? It needed more space! ✈️😆",
    "What do you call a fake noodle? An impasta! 🍝😄",
    "Why don't eggs tell jokes? They'd crack each other up! 🥚😂",
    "What do you call a bear with no teeth? A gummy bear! 🐻😄",
    "Why did the scarecrow win an award? He was outstanding in his field! 🌾😆",
    "I'm reading a book about anti-gravity. It's impossible to put down! 📚😄"
  ],
  math: [
    "I can help with basic math! Just type your calculation and I'll try to solve it. 🔢",
    "Math is fun! What would you like me to calculate?"
  ],
  motivation: [
    "\"The world is a book, and those who do not travel read only a page.\" — Saint Augustine ✨",
    "\"Not all those who wander are lost.\" — J.R.R. Tolkien 🌟",
    "\"Life is short and the world is wide. Better get started!\" — Simon Raven 🚀",
    "\"Travel makes one modest. You see what a tiny place you occupy in the world.\" — Gustave Flaubert 🌍",
    "You've got this! Every journey starts with a single step. Keep going! 💪",
    "\"Adventure is worthwhile in itself.\" — Amelia Earhart ✈️",
    "Believe in yourself! The best views come after the hardest climbs. 🏔️"
  ],
  time: [
    `The current time is ${new Date().toLocaleTimeString()}. Time flies when you're planning adventures! ⏰`,
    `Right now it's ${new Date().toLocaleTimeString()}. Perfect time to plan your next trip! 🕐`
  ],
  thanks: [
    "You're welcome! Happy to help. Let me know if you need anything else! 😊",
    "My pleasure! That's what I'm here for. Feel free to ask more questions! ✨",
    "Anytime! Don't hesitate to ask if something else comes to mind! 🙌"
  ],
  goodbye: [
    "Goodbye! Have an amazing trip! Come back anytime you need help! 👋✈️",
    "See you later! Wishing you safe and wonderful travels! 🌟",
    "Bye! Remember, the best journeys are the ones that change you. Safe travels! 🌍"
  ],
  love: [
    "Aww, that's sweet! I appreciate you too! Let's make your trip unforgettable! ❤️",
    "Thanks for the love! I'm just a chatbot, but I'm blushing! 😊💕",
    "You're amazing too! Now let's focus on making your trip the best ever! ✨"
  ],
  who: [
    "I'm TravelAI Assistant — your smart travel companion! I can help plan trips, answer questions, tell jokes, and much more! 🤖✈️",
    "I'm an AI-powered travel assistant built to make your journey planning easier and more fun! Ask me anything! 🌍",
    "Think of me as your pocket travel guide + general knowledge assistant! I'm here 24/7 to help! 🎒"
  ],
  meaning: [
    "The meaning of life? 42, according to Douglas Adams! But I think it's about collecting experiences, not things. Travel more! 🌟",
    "That's the big question! I believe it's about exploring, learning, and connecting with people from different cultures. ✨"
  ],
  ai: [
    "Yes, I'm an AI! Specifically, I'm a rule-based conversational assistant with topic detection. I learn from patterns in your questions! 🤖",
    "I'm powered by smart algorithms that detect what you're asking about and provide relevant, helpful responses! No neural network here though — just clever code! 💻"
  ],
  movie: [
    "Great travel movies to watch: 'The Secret Life of Walter Mitty', 'Into the Wild', 'Eat Pray Love', 'The Beach', and 'Lost in Translation'! 🎬",
    "For travel inspiration, try 'A Map for Saturday' (documentary), 'The Motorcycle Diaries', or 'Before Sunrise' trilogy! 🍿"
  ],
  music: [
    "Travel playlist essentials: 'Somewhere Over the Rainbow', 'Don't Stop Me Now', 'On The Road Again', and 'Beautiful Day' by U2! 🎵",
    "Pro tip: Create a Spotify playlist for each trip! Years later, those songs will instantly bring back memories. 🎶"
  ],
  book: [
    "Best travel books: 'A Walk in the Woods' by Bill Bryson, 'The Alchemist' by Paulo Coelho, 'Shantaram' by Gregory David Roberts! 📚",
    "For travel inspiration, read 'Into the Wild' by Jon Krakauer or 'Vagabonding' by Rolf Potts! 📖"
  ],
  animal: [
    "Fun fact: A group of flamingos is called a 'flamboyance'! Nature is amazing! 🦩",
    "Did you know octopuses have three hearts and blue blood? The ocean is full of wonders! 🐙",
    "A cat spends 70% of its life sleeping. Maybe cats have the right idea about vacation! 🐱😴"
  ],
  space: [
    "Fun fact: A day on Venus is longer than a year on Venus! It rotates very slowly. 🪐",
    "The sun is 93 million miles away, and its light takes about 8 minutes to reach Earth! ☀️",
    "There are more stars in the universe than grains of sand on all of Earth's beaches! ⭐"
  ],
  history: [
    "Did you know the Great Wall of China is not actually visible from space with the naked eye? Common myth! 🏯",
    "The ancient Egyptians used to play a board game called Senet — one of the oldest known board games! 🎲",
    "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid! 🤯"
  ],
  science: [
    "Fun science fact: Honey never spoils! Archaeologists found 3,000-year-old honey in Egyptian tombs that was still edible! 🍯",
    "Water can boil and freeze at the same time! It's called the 'triple point' — a specific temperature and pressure where all three states exist. 🔬",
    "A teaspoon of a neutron star would weigh about 6 billion tons! Space is wild! 🌟"
  ],
  sport: [
    "Did you know? The first Olympic Games were held in 776 BC in Olympia, Greece! They only had one event — a foot race. 🏃",
    "Cricket is the second most popular sport in the world with over 2.5 billion fans! ⚾",
    "The longest tennis match lasted 11 hours and 5 minutes at Wimbledon in 2010! 🎾"
  ],
  tech: [
    "The first computer bug was an actual bug! In 1947, a moth was found inside the Harvard Mark II computer. 🐛💻",
    "The entire internet weighs about the same as a strawberry — roughly 50 grams of electrons! 🍓",
    "More people have cell phones than toilets worldwide. Technology is truly everywhere! 📱"
  ],
  language: [
    "The most spoken language by total speakers is English (~1.5 billion), followed by Mandarin Chinese! 🗣️",
    "There are about 7,000 languages spoken in the world today. Papua New Guinea alone has over 800! 🌏",
    "The word 'set' has the most definitions in the English dictionary — over 430! 📖"
  ],
  country: [
    "The smallest country in the world is Vatican City — it's only 0.44 km²! You can walk across it in minutes. 🏛️",
    "Russia spans 11 time zones! When it's morning in Moscow, it's already evening in Vladivostok. ⏰",
    "Iceland has no mosquitoes! It's one of the few places on Earth that's completely mosquito-free. 🇮🇸"
  ],
  relationship: [
    "Travel tip for couples: Plan some activities together AND some solo time. It keeps the trip balanced and everyone happy! 💑",
    "Traveling with friends? Agree on a daily budget and must-see list beforehand to avoid conflicts. Open communication is key! 👫"
  ],
  coding: [
    "Fun fact: This app was built with React, Vite, and lots of love! The frontend alone has over 20 components. 💻",
    "If you're into coding, building a travel app is a great portfolio project. It covers APIs, state management, and UI design! 🚀",
    "The first programmer in history was Ada Lovelace, who wrote the first algorithm in the 1840s! 👩‍💻"
  ]
};

function detectTopic(msg) {
  const m = msg.toLowerCase();

  // Travel topics
  if (/hotel|stay|accommodation|hostel|resort|room|lodge|airbnb|booking/i.test(m)) return 'hotel';
  if (/food|eat|restaurant|cuisine|meal|dinner|lunch|breakfast|street food|cafe|coffee/i.test(m)) return 'food';
  if (/budget|money|cost|cheap|expensive|save|price|afford|spend|currency|exchange/i.test(m)) return 'budget';
  if (/weather|rain|sun|cold|hot|temperature|climate|forecast|humid|snow/i.test(m)) return 'weather';
  if (/transport|bus|train|flight|taxi|metro|car|drive|travel mode|uber|cab|ride/i.test(m)) return 'transport';
  if (/place|visit|see|attraction|landmark|sightseeing|top|must|explore|tour/i.test(m)) return 'places';
  if (/safe|danger|secure|emergency|police|scam|theft|insurance/i.test(m)) return 'safety';
  if (/pack|luggage|suitcase|bag|carry|bring|essentials/i.test(m)) return 'packing';
  if (/visa|passport|immigration|permit|entry/i.test(m)) return 'visa';
  if (/photo|camera|picture|selfie|instagram|snap/i.test(m)) return 'photography';
  if (/shop|buy|souvenir|gift|market|mall|store/i.test(m)) return 'shopping';
  if (/health|doctor|medicine|hospital|sick|vaccine|allergy/i.test(m)) return 'health';
  if (/culture|tradition|custom|religion|temple|church|mosque|etiquette/i.test(m)) return 'culture';
  if (/night|bar|club|pub|party|dance|drink/i.test(m)) return 'nightlife';

  // General knowledge topics
  if (/^(hi|hello|hey|howdy|greetings|good morning|good evening|good afternoon|sup|yo|hola)/i.test(m)) return 'g_greeting';
  if (/joke|funny|laugh|humor|humour|make me laugh|tell me something funny/i.test(m)) return 'g_joke';
  if (/motivat|inspir|quote|encourage|cheer me up|sad|feeling down|depressed/i.test(m)) return 'g_motivation';
  if (/what time|current time|time is it|clock/i.test(m)) return 'g_time';
  if (/thank|thanks|thx|ty|appreciate/i.test(m)) return 'g_thanks';
  if (/bye|goodbye|see you|later|cya|good night|gn|take care/i.test(m)) return 'g_goodbye';
  if (/love you|i love|you're great|you're awesome|you rock|best bot|amazing bot/i.test(m)) return 'g_love';
  if (/who are you|what are you|your name|about you|tell me about yourself/i.test(m)) return 'g_who';
  if (/meaning of life|purpose|why are we here|existence|meaning/i.test(m)) return 'g_meaning';
  if (/are you ai|artificial|robot|machine|chatgpt|gpt|openai|llm|are you real/i.test(m)) return 'g_ai';
  if (/movie|film|watch|cinema|netflix|series|show/i.test(m)) return 'g_movie';
  if (/music|song|playlist|spotify|band|singer|album|concert/i.test(m)) return 'g_music';
  if (/book|read|novel|author|library|literature/i.test(m)) return 'g_book';
  if (/animal|dog|cat|bird|fish|pet|wildlife|zoo/i.test(m)) return 'g_animal';
  if (/space|planet|star|moon|galaxy|universe|nasa|rocket|mars/i.test(m)) return 'g_space';
  if (/history|ancient|historical|war|king|queen|empire|century|old/i.test(m)) return 'g_history';
  if (/science|physics|chemistry|biology|experiment|atom|molecule|dna/i.test(m)) return 'g_science';
  if (/sport|cricket|football|soccer|basketball|tennis|olympics|game|player|match/i.test(m)) return 'g_sport';
  if (/tech|computer|internet|phone|app|software|hardware|coding|programming|developer|website/i.test(m)) return 'g_tech';
  if (/language|speak|word|grammar|english|hindi|french|spanish|translate/i.test(m)) return 'g_language';
  if (/country|capital|population|flag|border|continent|nation/i.test(m)) return 'g_country';
  if (/relation|girlfriend|boyfriend|couple|partner|date|marriage|love life|friend/i.test(m)) return 'g_relationship';
  if (/code|coding|programming|developer|react|javascript|python|java|html|css/i.test(m)) return 'g_coding';

  // Math detection
  if (/^\d+[\s]*[\+\-\*\/\%\^][\s]*\d+/i.test(m) || /calculate|what is \d|how much is|solve/i.test(m)) return 'g_math';

  return null;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function solveMath(msg) {
  try {
    // Extract math expression
    const match = msg.match(/(\d+[\s]*[\+\-\*\/\%][\s]*\d+[\s\d\+\-\*\/\%]*)/);
    if (match) {
      const expr = match[1].replace(/[^0-9+\-*/%.\s]/g, '');
      const result = Function('"use strict"; return (' + expr + ')')();
      return `${expr.trim()} = **${result}** ✅`;
    }
    return "I can solve basic math! Try something like: 25 + 30, 100 * 5, 999 / 3 🔢";
  } catch {
    return "Hmm, I couldn't solve that. Try a simpler expression like: 42 + 58 🔢";
  }
}

// Smart fallback responses
const smartFallbacks = [
  "That's an interesting question! While I don't have a specific answer for that, I'd love to help with something else. Try asking about travel, fun facts, jokes, or general knowledge! 🤔",
  "Great question! I'm still learning about that topic. In the meantime, I can help with trip planning, budget tips, hotel recommendations, or even tell you a joke! 😊",
  "Hmm, that's a tricky one! I'm better at travel-related questions, general knowledge, and fun conversations. What else would you like to know? 🌟",
  "I don't have a perfect answer for that, but here's what I know: I can help with travel planning, answer fun trivia, solve basic math, tell jokes, and much more! Try me! 💡",
  "Interesting! I wish I knew more about that. But hey, did you know honey never spoils? 3,000-year-old honey found in Egyptian tombs was still edible! 🍯 Ask me anything else!",
  "That's outside my expertise, but I'm always happy to chat! Ask me about: places to visit 📍, budget tips 💰, fun facts 🧠, jokes 😂, or your trip details ✈️",
  "I'm not sure about that one, but I have tons of travel knowledge, fun facts, and conversation skills! What would you like to explore? 🚀",
  "Good question! While I think about that, here's a fun fact: A group of flamingos is called a 'flamboyance'! 🦩 What else can I help with?"
];

export function getChatResponse(message, tripContext) {
  const topic = detectTopic(message);

  // Travel topics
  if (topic && travelResponses[topic]) {
    let response = getRandomItem(travelResponses[topic]);
    if (tripContext?.destination) {
      response += `\n\n🗺️ For ${tripContext.destination}, I especially recommend exploring the local culture and trying authentic experiences!`;
    }
    return response;
  }

  // General knowledge topics
  if (topic?.startsWith('g_')) {
    const key = topic.replace('g_', '');

    if (key === 'math') return solveMath(message);
    if (key === 'time') {
      return `The current time is ${new Date().toLocaleTimeString()}. Time flies when you're planning adventures! ⏰`;
    }

    if (generalKnowledge[key]) {
      return getRandomItem(generalKnowledge[key]);
    }
  }

  // Smart fallback
  let fallback = getRandomItem(smartFallbacks);
  if (tripContext?.destination) {
    fallback += `\n\n✈️ Since you're visiting ${tripContext.destination}, feel free to ask me about hotels, food, activities, weather, budget tips, safety, shopping, nightlife, or anything else!`;
  }
  return fallback;
}

export const quickReplies = [
  "🏨 Hotel tips",
  "💰 Budget advice",
  "🍜 Local food",
  "☀️ Weather info",
  "😂 Tell a joke",
  "🧠 Fun fact",
  "📸 Photo tips",
  "🛍️ Shopping guide"
];
