export interface VisitSingaporePrecinct {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  heroImage: string;
  vibe: string;
  overview: string;
  nearestMrt: {
    stationName: string;
    lineCode: string;
    lineColor: string;
    exitInfo: string;
    walkMinutes: number;
  };
  highlights: {
    title: string;
    description: string;
    image?: string;
    tag: string;
  }[];
  foodHaunts: {
    name: string;
    specialty: string;
    location: string;
    mustOrder: string;
  }[];
  walkingTrail: {
    duration: string;
    stops: string[];
    bestTime: string;
  };
}

export interface VisitSingaporeItinerary {
  id: string;
  title: string;
  durationDays: number;
  badge: string;
  summary: string;
  suitableFor: string;
  coverImage: string;
  days: {
    dayNumber: number;
    theme: string;
    morning: { title: string; desc: string; location: string };
    afternoon: { title: string; desc: string; location: string };
    evening: { title: string; desc: string; location: string };
    insiderTip: string;
  }[];
}

export interface KopiOption {
  term: string;
  pronunciation: string;
  meaning: string;
  composition: string;
  sweetness: string;
  caffeine: string;
}

export interface LocalDish {
  name: string;
  chineseName?: string;
  malayName?: string;
  tamilName?: string;
  category: 'Hawker Classic' | 'Seafood' | 'Noodles' | 'Rice' | 'Dessert & Snacks';
  description: string;
  origin: string;
  dietaryTags: string[];
  spiceLevel: 0 | 1 | 2 | 3;
  bestStalls: { name: string; location: string; bibGourmand?: boolean }[];
  image: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  exactDateOrPeriod: string;
  month: string;
  monthNumber: number; // 1 to 12
  isPublicHoliday: boolean;
  category: 'National Day & Civic' | 'Cultural & Religious' | 'Arts, Food & Lifestyle' | 'Sports & Mega-Events';
  precinct: string;
  culture: string;
  description: string;
  highlights: string[];
  location: string;
  nearestMrt: string;
  bestExperienceTip: string;
  image: string;
  tagColor: string;
}

export interface GstRefundStep {
  step: number;
  title: string;
  desc: string;
}

// ==========================================
// 1. OFFICIAL PRECINCTS FROM VISITSINGAPORE
// ==========================================
export const VISIT_SINGAPORE_PRECINCTS: VisitSingaporePrecinct[] = [
  {
    id: 'katong-joo-chiat',
    name: 'Katong / Joo Chiat',
    subtitle: 'Singapore’s Peranakan Cultural Haven & Heritage Shophouses',
    tag: 'Peranakan Heritage',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Pastel shophouses, Nonya aromas, boutique coffee haunts, and intricate beadwork.',
    overview: 'Once a coconut plantation turned seaside retreat for wealthy elites, Katong and Joo Chiat now serve as Singapore’s epicenter of Peranakan (Straits Chinese) and Eurasian heritage. Stroll through candy-coloured shophouses adorned with ceramic tiles and explore home museums rich with antique curios.',
    nearestMrt: {
      stationName: 'Marine Parade MRT',
      lineCode: 'TEL TE26',
      lineColor: '#9D5B25',
      exitInfo: 'Exit 1 (3 min walk to East Coast Rd)',
      walkMinutes: 3,
    },
    highlights: [
      {
        title: 'Colourful Shophouses along Koon Seng Road',
        description: 'Snap photos at these iconic pastel-hued shophouses built in the 1920s, renowned for glazed floral ceramic tiles, intricate plaster relief Corinthian pillars, and carved wooden swing doors (pintu pagar).',
        tag: 'Photo Spot',
      },
      {
        title: 'The Intan Peranakan Home Museum',
        description: 'A private museum transformed by curator Alvin Yapp housing over 5,000 Straits Chinese artifacts, antique tiffin carriers, hand-sewn beadwork shoes (kasut manek), and gold-embroidered kebaya.',
        tag: 'Private Museum',
      },
      {
        title: 'Kim Choo Kueh Chang',
        description: 'Serving authentic traditional Nonya rice dumplings (bak chang) wrapped in bamboo leaves, rainbow nine-layer lapis sagu, and handcrafted beaded slippers since 1945.',
        tag: 'Heritage Food',
      },
      {
        title: 'Eurasian Heritage Gallery',
        description: 'Discover the rich history, World War II resilience, and distinct culinary traditions of Singapore’s Eurasian community across three vibrant interactive galleries.',
        tag: 'Cultural Museum',
      },
      {
        title: 'Sri Senpaga Vinayagar Temple',
        description: 'A striking Hindu temple dedicated to Lord Ganesha dating back to the 1850s, distinguished by musical granite pillars and a majestic 68-foot Rajagopuram entrance tower.',
        tag: 'Sacred Architecture',
      },
    ],
    foodHaunts: [
      {
        name: '328 Katong Laksa',
        specialty: 'Katong Laksa with short noodles (eaten only with a spoon), spicy coconut broth, cockles & sambal',
        location: '51 East Coast Rd',
        mustOrder: 'Laksa + Otah-otah',
      },
      {
        name: 'Kim Choo Kueh Chang',
        specialty: 'Nonya Pork Rice Dumplings infused with winter melon & spices',
        location: '109 East Coast Rd',
        mustOrder: 'Nonya Bak Chang + Kueh Salat',
      },
      {
        name: 'Birds of Paradise Gelato Boutique',
        specialty: 'Botanical gelato infused with Southeast Asian herbs, spices, and flowers',
        location: '63 East Coast Rd',
        mustOrder: 'White Chrysanthemum with Cacao Nibs in Thyme Cone',
      },
    ],
    walkingTrail: {
      duration: '2.5 to 3 hours',
      stops: ['Marine Parade MRT', 'Koon Seng Road Shophouses', 'Kim Choo Kueh Chang', 'The Intan', 'East Coast Rd Cafes'],
      bestTime: 'Morning (9:00 AM) or Late Afternoon (4:30 PM) for gentle golden hour photography',
    },
  },
  {
    id: 'chinatown',
    name: 'Chinatown',
    subtitle: 'Where Ancient Traditions, Sacred Temples & Michelin Hawkers Meet',
    tag: 'Culture & Gastronomy',
    heroImage: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Red lanterns, fragrant medicinal herbs, clattering mahjong tiles, and buzzing speakeasies.',
    overview: 'Chinatown seamlessly weaves historic Chinese medical halls, bustling souvenir streets, and sacred religious shrines belonging to four different faiths on the very same street. By night, Ann Siang Hill and Keong Saik transform into world-acclaimed cocktail bars.',
    nearestMrt: {
      stationName: 'Chinatown MRT',
      lineCode: 'DTL DT19 / NEL NE4',
      lineColor: '#0054A6',
      exitInfo: 'Exit A (Directly into Pagoda Street market)',
      walkMinutes: 1,
    },
    highlights: [
      {
        title: 'Buddha Tooth Relic Temple & Museum',
        description: 'A 5-story Tang Dynasty-style Buddhist temple made from 320kg of gold donated by devotees. Houses the sacred tooth relic in a giant solid gold stupa on the 4th floor.',
        tag: 'Architectural Wonder',
      },
      {
        title: 'Sri Mariamman Temple',
        description: 'Singapore’s oldest Hindu temple (built in 1827) on South Bridge Road, famous for its intricate 6-tier gopuram adorned with vibrant statues of deities and sacred cows.',
        tag: 'National Monument',
      },
      {
        title: 'Chinatown Complex Food Centre',
        description: 'The largest hawker centre in Singapore with over 260 food stalls, home to Michelin-starred Liao Fan Soya Sauce Chicken, claypot rice, and local craft beer on tap.',
        tag: 'UNESCO Hawker Centre',
      },
      {
        title: 'Keong Saik Road & Ann Siang Hill',
        description: 'A vibrant heritage strip featuring beautifully conserved shophouses hosting Michelin-starred restaurants, independent boutique hotels, and speakeasy cocktail bars.',
        tag: 'Nightlife & Dining',
      },
    ],
    foodHaunts: [
      {
        name: 'Liao Fan Hawker Chan',
        specialty: 'Original Michelin Soya Sauce Chicken Rice & Char Siew',
        location: 'Chinatown Complex #02-126',
        mustOrder: 'Soya Sauce Chicken Rice',
      },
      {
        name: 'Lian He Ben Ji Claypot Rice',
        specialty: 'Charcoal-cooked claypot rice with Chinese sausage, chicken & crispy crust',
        location: 'Chinatown Complex #02-198',
        mustOrder: 'Mixed Claypot Rice (Pre-order advisable)',
      },
      {
        name: 'Tong Heng Pastries',
        specialty: 'Diamond-shaped egg tarts with buttery crispy pastry and wobbly egg custard',
        location: '285 South Bridge Rd',
        mustOrder: 'Signature Egg Tart + Coconut Tart',
      },
    ],
    walkingTrail: {
      duration: '3 hours',
      stops: ['Chinatown MRT Exit A', 'Pagoda St Murals', 'Sri Mariamman Temple', 'Buddha Tooth Relic Temple', 'Chinatown Complex', 'Ann Siang Hill'],
      bestTime: 'Late morning for temple visits and lunch, extending into sunset',
    },
  },
  {
    id: 'kampong-gelam',
    name: 'Kampong Gelam',
    subtitle: 'The Royal Malay-Arab Quarter, Haji Lane Murals & Hipster Boutiques',
    tag: 'Malay & Arab Heritage',
    heroImage: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Gleaming golden domes, Persian carpet scents, energetic wall art, and indie cafes.',
    overview: 'Once the historic seat of Malay royalty and a gathering point for pilgrims sailing to Mecca, Kampong Gelam is now a kaleidoscope of traditional Middle Eastern textile shops, aromatic perfume distillers, cutting-edge indie boutiques, and Haji Lane’s world-famous murals.',
    nearestMrt: {
      stationName: 'Bugis MRT',
      lineCode: 'DTL DT14 / EWL EW12',
      lineColor: '#0054A6',
      exitInfo: 'Exit B (5 min walk along Victoria St to Arab St)',
      walkMinutes: 5,
    },
    highlights: [
      {
        title: 'Sultan Mosque (Masjid Sultan)',
        description: 'With its monumental golden domes and massive prayer hall accommodating up to 5,000 worshippers. Look closely at the base of the dome made from glass soy sauce bottles contributed by low-income devotees during construction.',
        tag: 'Historic Landmark',
      },
      {
        title: 'Haji Lane & Gelam Gallery',
        description: 'Singapore’s narrowest shopping lane, packed with colorful street murals, independent fashion labels, vintage record stores, and live acoustic cafes.',
        tag: 'Street Art & Fashion',
      },
      {
        title: 'Jamal Kazura Aromatics',
        description: 'Handcrafting non-alcoholic perfume oils (Attar), bespoke fragrances, and frankincense since 1933.',
        tag: 'Heritage Perfumery',
      },
      {
        title: 'Bussorah Street Promenade',
        description: 'A pedestrian avenue lined with palm trees, Turkish lamps, Mediterranean cafes, and traditional Murtabak stalls leading straight to the mosque entrance.',
        tag: 'Atmospheric Walk',
      },
    ],
    foodHaunts: [
      {
        name: 'Singapore Zam Zam Restaurant',
        specialty: 'Massive crispy deer/mutton/chicken Murtabak served with spiced curry dip since 1908',
        location: '697 North Bridge Rd',
        mustOrder: 'Mutton Murtabak + Teh Tarik',
      },
      {
        name: 'Hjh Maimunah Restaurant',
        specialty: 'Michelin Bib Gourmand traditional Kampung-style Nasi Padang with over 40 dishes',
        location: '11 Jalan Pisang',
        mustOrder: 'Beef Rendang + Tahu Telur + Siput Sedut',
      },
      {
        name: 'Rich & Good Cake Shop',
        specialty: 'Fluffy traditional Swiss rolls in kaya, durian, mango, and chocolate flavours',
        location: '24 Kandahar St',
        mustOrder: 'Kaya Swiss Roll',
      },
    ],
    walkingTrail: {
      duration: '2.5 hours',
      stops: ['Bugis MRT', 'Arab Street', 'Sultan Mosque', 'Bussorah Street', 'Haji Lane', 'Gelam Gallery'],
      bestTime: 'After 2:00 PM when indie boutiques and street musicians open up',
    },
  },
  {
    id: 'little-india',
    name: 'Little India',
    subtitle: 'Sensory Explosions of Fragrant Spices, Flower Garlands & 24/7 Shopping',
    tag: 'South Asian Culture',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Jasmine garlands, rhythmic Bollywood beats, kaleidoscopic shophouses, and crispy dosas.',
    overview: 'A vibrant historical enclave that originally housed racecourses, cattle herders, and brick kilns. Today, Little India is an electrifying epicenter of Indian culture, Hindu devotion, 24-hour retail giant Mustafa Centre, and South Indian spice feasts.',
    nearestMrt: {
      stationName: 'Little India MRT',
      lineCode: 'DTL DT12 / NEL NE7',
      lineColor: '#972777',
      exitInfo: 'Exit E (Tekka Centre direct link)',
      walkMinutes: 1,
    },
    highlights: [
      {
        title: 'Sri Veeramakaliamman Temple',
        description: 'One of Singapore’s oldest Hindu temples dedicated to Goddess Kali, built in 1881 by early Tamil pioneers. Survived intact through World War II air raids.',
        tag: 'Sacred Temple',
      },
      {
        title: 'Former House of Tan Teng Niah',
        description: 'Built in 1900, this 8-room rainbow villa is the last surviving Chinese villa in Little India, combining Southeast Asian, Chinese, and European architectural elements.',
        tag: 'Photo Landmark',
      },
      {
        title: 'Indian Heritage Centre',
        description: 'A four-story state-of-the-art museum with a contemporary glass facade inspired by traditional Indian stepwells, exploring the diaspora across Southeast Asia.',
        tag: 'Modern Heritage',
      },
      {
        title: 'Tekka Centre',
        description: 'Singapore’s most culturally diverse wet market and hawker center, famous for Biryani, fresh fruit juices, tailor shops, and traditional sarees.',
        tag: 'Sensory Market',
      },
    ],
    foodHaunts: [
      {
        name: 'Allauddin’s Briyani',
        specialty: 'Michelin-recommended fragrant Basmati mutton & chicken briyani served with pickled cucumber & dalcha',
        location: 'Tekka Centre #01-232',
        mustOrder: 'Mutton Briyani Set',
      },
      {
        name: 'Komala Vilas',
        specialty: 'Authentic vegetarian South Indian meals served on banana leaves since 1947',
        location: '76 Serangoon Rd',
        mustOrder: 'Masala Dosa + Filter Coffee',
      },
      {
        name: 'Muthu’s Curry',
        specialty: 'Original creators of Singapore Fish Head Curry cooked in rich tamarind chili curry',
        location: '138 Race Course Rd',
        mustOrder: 'Signature Fish Head Curry',
      },
    ],
    walkingTrail: {
      duration: '2.5 hours',
      stops: ['Little India MRT Exit E', 'Tekka Centre', 'House of Tan Teng Niah', 'Sri Veeramakaliamman Temple', 'Indian Heritage Centre', 'Mustafa Centre'],
      bestTime: 'Morning for Tekka Market breakfast or evening for festive street lights',
    },
  },
  {
    id: 'marina-bay',
    name: 'Marina Bay & Civic District',
    subtitle: 'Futuristic Architectural Marvels, Waterfront Promenades & Supertrees',
    tag: 'Futuristic Architecture',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Gleaming skyline, light-and-sound spectacles, breezy boardwalks, and world-class museums.',
    overview: 'The sparkling global symbol of modern Singapore. Transformed from reclaimed ocean waters into an architectural and ecological showcase encompassing Gardens by the Bay, Marina Bay Sands, the Merlion, and the historic Civic District.',
    nearestMrt: {
      stationName: 'Bayfront MRT',
      lineCode: 'DTL DT16 / CCL CE1',
      lineColor: '#F68B1F',
      exitInfo: 'Exit B (Direct underground link to Gardens by the Bay & MBS)',
      walkMinutes: 2,
    },
    highlights: [
      {
        title: 'Gardens by the Bay & Supertree Grove',
        description: '101-hectare green sanctuary with 18 towering vertical gardens (up to 50m high) and two cooled conservatories: Flower Dome and Cloud Forest with its 35m indoor waterfall.',
        tag: 'Global Icon',
      },
      {
        title: 'Marina Bay Sands SkyPark & Observation Deck',
        description: 'Perched 57 storeys above ground spanning across three towers, offering 360-degree panoramic views of the Singapore Strait and downtown skyline.',
        tag: 'Skyline Panorama',
      },
      {
        title: 'Merlion Park',
        description: 'The mythical half-lion, half-fish national icon spouting water into the bay, commemorating Singapore’s ancient name Singapura (Lion City) and fishing village origin (Temasek).',
        tag: 'National Symbol',
      },
      {
        title: 'ArtScience Museum',
        description: 'Iconic lotus-shaped museum hosting world-famous immersive digital exhibitions such as teamLab: Future World.',
        tag: 'Digital Art',
      },
      {
        title: 'Marina Barrage & Green Roof',
        description: 'A revolutionary flood-control dam and reservoir with a massive elevated green rooftop lawn popular for sunset kite-flying and skyline views.',
        tag: 'Sunset & Nature',
      },
    ],
    foodHaunts: [
      {
        name: 'Lau Pa Sat (Satay Street)',
        specialty: 'Historic Victorian cast-iron market turning into an open-air charcoal satay BBQ street every evening from 7 PM',
        location: '18 Raffles Quay',
        mustOrder: 'Satay Stalls 7 & 8 (Mixed Chicken, Beef, Mutton & Prawn Satay)',
      },
      {
        name: 'Makansutra Gluttons Bay',
        specialty: 'Open-air hawker dining with front-row views of the Marina Bay Sands light show',
        location: '8 Raffles Ave',
        mustOrder: 'Sambal Stingray + Oyster Omelette',
      },
    ],
    walkingTrail: {
      duration: '3.5 to 4 hours',
      stops: ['Merlion Park', 'Jubilee Bridge', 'Esplanade', 'Helix Bridge', 'ArtScience Museum', 'Marina Bay Sands', 'Gardens by the Bay'],
      bestTime: '5:00 PM to catch sunset, the 7:45 PM Garden Rhapsody, and 8:00 PM Spectra Light & Water show',
    },
  },
  {
    id: 'sentosa-island',
    name: 'Sentosa Island',
    subtitle: 'Island Resort Sanctuary with Theme Parks, Sandy Beaches & Coastal Forts',
    tag: 'Island Adventure',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Golden sand beaches, thrill rides, swaying palms, and breezy beach clubs.',
    overview: 'Just 15 minutes from downtown Singapore, Sentosa (meaning "Peace and Tranquillity" in Malay) offers Universal Studios Singapore, world-class aquariums, Fort Siloso coastal battery, and 3.2km of sun-soaked beaches.',
    nearestMrt: {
      stationName: 'HarbourFront MRT',
      lineCode: 'NEL NE1 / CCL CC29',
      lineColor: '#972777',
      exitInfo: 'Exit E (Vivocity Level 3 for Sentosa Express Monorail or Sentosa Boardwalk)',
      walkMinutes: 2,
    },
    highlights: [
      {
        title: 'Universal Studios Singapore',
        description: 'Southeast Asia’s first and only Universal Studios theme park, featuring Battlestar Galactica, Transformers 3D, and Jurassic Park rides.',
        tag: 'Theme Park',
      },
      {
        title: 'S.E.A. Aquarium',
        description: 'Home to more than 100,000 marine animals from over 1,000 species across 45 diverse habitats, including manta rays and hammerhead sharks.',
        tag: 'Marine Sanctuary',
      },
      {
        title: 'Sensoryscape & SkyHelix Sentosa',
        description: 'A 350-meter biophilic multi-sensory walkway connecting north and south Sentosa, culminating in an open-air rotating scenic ride 79 meters above sea level.',
        tag: 'Scenic & Sensory',
      },
      {
        title: 'Fort Siloso & Skywalk',
        description: 'Singapore’s only preserved coastal artillery fort from World War II with underground tunnels, authentic guns, and an 11-storey-high treetop canopy walk (free entry).',
        tag: 'Historic Heritage',
      },
    ],
    foodHaunts: [
      {
        name: 'Tanjong Beach Club',
        specialty: 'Coastal dining, fresh seafood, acai bowls, and craft cocktails with daybed beach access',
        location: '120 Tanjong Beach Walk',
        mustOrder: 'Beer Battered Fish & Chips + Coconut Mojito',
      },
      {
        name: 'Malaysian Food Street',
        specialty: 'Authentic street hawker masters from Penang, KL, and Ipoh under one roof',
        location: 'Resorts World Sentosa Level 1',
        mustOrder: 'Penang Char Kway Teow + Claypot Chicken Rice',
      },
    ],
    walkingTrail: {
      duration: 'Half to Full Day',
      stops: ['Sentosa Boardwalk', 'Resorts World Sentosa', 'Sensoryscape', 'Siloso Beach', 'Fort Siloso Skywalk', 'Tanjong Beach Sunset'],
      bestTime: 'Morning for theme parks and afternoon for beach clubs and sunset',
    },
  },
];

// ==========================================
// 2. OFFICIAL ITINERARIES FROM VISITSINGAPORE
// ==========================================
export const VISIT_SINGAPORE_ITINERARIES: VisitSingaporeItinerary[] = [
  {
    id: 'itinerary-4days',
    title: '4 Days in Singapore: The Essential Explorer',
    durationDays: 4,
    badge: 'Most Popular',
    summary: 'The definitive Singapore Tourism Board itinerary covering world-class architecture, historic cultural enclaves, UNESCO hawker gems, and the futuristic bay.',
    suitableFor: 'First-time visitors, families, culture & photography lovers',
    coverImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    days: [
      {
        dayNumber: 1,
        theme: 'Historic Heartland & Malay Royalty',
        morning: {
          title: 'Kampong Gelam & Sultan Mosque',
          desc: 'Start with traditional breakfast at Singapore Zam Zam or kaya toast, then explore the majestic gold dome of Sultan Mosque and colorful murals of Haji Lane.',
          location: 'Bugis / Kampong Gelam',
        },
        afternoon: {
          title: 'Civic District & National Gallery',
          desc: 'Walk past Raffles Hotel to the historic Civic District. Marvel at Southeast Asian art inside the neoclassical National Gallery (former City Hall & Supreme Court).',
          location: 'City Hall',
        },
        evening: {
          title: 'Singapore River Cruise & Clarke Quay',
          desc: 'Hop onto a traditional wooden bumboat along the Singapore River as the city lights up. Dine by the riverbank at Clarke Quay or Boat Quay.',
          location: 'Clarke Quay',
        },
        insiderTip: 'Order a Singapore Sling at Raffles Hotel Long Bar and enjoy tossing peanut shells onto the vintage wooden floor—the only place in Singapore where littering is encouraged!',
      },
      {
        dayNumber: 2,
        theme: 'Living Culture & Heritage Enclaves',
        morning: {
          title: 'Little India Sensory Walk',
          desc: 'Immerse your senses in Tekka Centre market for roti prata and briyani, visit the rainbow House of Tan Teng Niah, and Sri Veeramakaliamman Temple.',
          location: 'Little India',
        },
        afternoon: {
          title: 'Chinatown Temple Trail',
          desc: 'Explore the Buddha Tooth Relic Temple, Sri Mariamman Temple, and Chinatown Street Market. Savor lunch at Chinatown Complex Food Centre.',
          location: 'Chinatown',
        },
        evening: {
          title: 'Ann Siang Hill & Keong Saik Nightlife',
          desc: 'Wander through conserved heritage shophouses housing award-winning cocktail bars (like Native, Jigger & Pony, or Elephant Room).',
          location: 'Keong Saik',
        },
        insiderTip: 'Dress respectfully when entering temples: cover shoulders and knees, and remove footwear at the entrance.',
      },
      {
        dayNumber: 3,
        theme: 'Futuristic Greenery & Bay Wonders',
        morning: {
          title: 'Marina Bay Waterfront & Merlion Park',
          desc: 'Take the classic selfie with the Merlion overlooking the bay, then stroll across the Helix Bridge to the lotus-shaped ArtScience Museum.',
          location: 'Marina Bay',
        },
        afternoon: {
          title: 'Gardens by the Bay Conservatories',
          desc: 'Step into the cool mist of Cloud Forest with its 35-meter indoor waterfall and explore the Mediterranean floral displays in Flower Dome.',
          location: 'Bayfront',
        },
        evening: {
          title: 'Garden Rhapsody & Satay by the Bay',
          desc: 'Lie beneath the Supertrees for the free Garden Rhapsody musical light show (7:45 PM / 8:45 PM), followed by skewered charcoal satay at Lau Pa Sat.',
          location: 'Supertree Grove',
        },
        insiderTip: 'Book Flower Dome and Cloud Forest tickets online in advance to scan straight at the mobile turnstiles.',
      },
      {
        dayNumber: 4,
        theme: 'Island Fun or Nature Trails',
        morning: {
          title: 'Sentosa Island Resorts or Southern Ridges',
          desc: 'Choose between theme park thrills at Universal Studios / S.E.A. Aquarium or an invigorating morning canopy walk across Henderson Waves.',
          location: 'Sentosa / Southern Ridges',
        },
        afternoon: {
          title: 'Orchard Road & Design Orchard',
          desc: 'Explore Singapore’s premier shopping boulevard. Discover local Singaporean fashion, crafts, and lifestyle brands at Design Orchard.',
          location: 'Orchard Road',
        },
        evening: {
          title: 'Jewel Changi Airport HSBC Rain Vortex',
          desc: 'Conclude your trip marveling at the world’s tallest indoor waterfall (40m) surrounded by the lush Shiseido Forest Valley before your flight.',
          location: 'Changi Airport',
        },
        insiderTip: 'Jewel Changi is accessible before airport immigration, so budget at least 2 hours before your flight departure!',
      },
    ],
  },
  {
    id: 'itinerary-food',
    title: '3-Day UNESCO Foodies & Hawker Trail',
    durationDays: 3,
    badge: 'Food & Culinary',
    summary: 'A curated gastronomic journey through UNESCO-inscribed Hawker Culture, Michelin Bib Gourmand stalls, Peranakan nonya kueh, and world-top cocktail bars.',
    suitableFor: 'Foodies, coffee lovers, and culinary adventurers',
    coverImage: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
    days: [
      {
        dayNumber: 1,
        theme: 'Hawker Giants & Chinatown Classics',
        morning: {
          title: 'Kopitiam Breakfast & Chinatown Complex',
          desc: 'Order traditional Kaya Toast with runny soft-boiled eggs and Kopi-C, then head to Chinatown Complex for Michelin soya sauce chicken and chee cheong fun.',
          location: 'Chinatown Complex',
        },
        afternoon: {
          title: 'Maxwell Food Centre & Traditional Pastries',
          desc: 'Taste Tian Tian Hainanese Chicken Rice at Maxwell, then sample freshly baked diamond-shaped egg tarts at Tong Heng (since 1935).',
          location: 'Maxwell Food Centre',
        },
        evening: {
          title: 'Lau Pa Sat Satay Street Feast',
          desc: 'At 7:00 PM, Boon Tat Street closes for Satay Street. Sit on open-air plastic chairs amidst sizzling charcoal smoke and beer towers.',
          location: 'Lau Pa Sat',
        },
        insiderTip: 'Always carry a packet of tissue paper to "chope" (reserve) your hawker table before ordering your food!',
      },
      {
        dayNumber: 2,
        theme: 'Spices, Sambal & Peranakan Delights',
        morning: {
          title: 'Tekka Centre Roti Prata & Teh Tarik',
          desc: 'Watch skilled hawkers flip crispy dough and pull frothy tea from high in the air at Tekka Centre. Pair with spicy fish curry.',
          location: 'Little India',
        },
        afternoon: {
          title: 'Katong Laksa & Nonya Rice Dumplings',
          desc: 'Slurp spicy coconut Katong Laksa (eaten only with a spoon) at 328 Katong Laksa, followed by sweet blue-pea dumplings at Kim Choo.',
          location: 'Joo Chiat / Katong',
        },
        evening: {
          title: 'Chilli Crab Feast along the Waterfront',
          desc: 'Dine on jumbo mud crabs doused in spicy-sweet tomato chili egg gravy, paired with deep-fried golden mantou buns at Jumbo Seafood or Palm Beach.',
          location: 'East Coast or Boat Quay',
        },
        insiderTip: 'Dip the fried mantou buns directly into the crab gravy—it is the best part of the dish!',
      },
      {
        dayNumber: 3,
        theme: 'Malay Heritage, Botanical Gelato & World-Class Cocktails',
        morning: {
          title: 'Nasi Padang & Murtabak in Kampong Gelam',
          desc: 'Feast on Michelin Bib Gourmand Nasi Padang with Beef Rendang and Tahu Telur at Hjh Maimunah, or giant crispy mutton murtabak at Zam Zam.',
          location: 'Kampong Gelam',
        },
        afternoon: {
          title: 'Tiong Bahru Hipster Cafes & Kueh',
          desc: 'Wander Singapore’s oldest art deco public housing estate. Enjoy artisanal coffee and croissants at Tiong Bahru Bakery, and steamed chwee kueh at the market.',
          location: 'Tiong Bahru',
        },
        evening: {
          title: 'World’s 50 Best Bars Cocktail Crawl',
          desc: 'Experience Singapore’s legendary cocktail scene at Atlas (featuring a 1,000-gin tower) or Jigger & Pony (celebrating classic hospitality).',
          location: 'Bugis / Tanjong Pagar',
        },
        insiderTip: 'Dress code applies at high-end cocktail bars like Atlas (smart casual: no flip-flops or shorts).',
      },
    ],
  },
  {
    id: 'itinerary-nature',
    title: 'Outdoor Adventure & City in Nature Trail',
    durationDays: 3,
    badge: 'Nature & Eco',
    summary: 'Discover why Singapore is called the City in Nature: rainforest treetop walks, mangrove kayaking, offshore rustic islands, and UNESCO botanic gardens.',
    suitableFor: 'Nature lovers, active hikers, birdwatchers, and eco-travelers',
    coverImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    days: [
      {
        dayNumber: 1,
        theme: 'Southern Ridges Canopy Walk & Henderson Waves',
        morning: {
          title: 'Mount Faber to Henderson Waves',
          desc: 'Walk across Singapore’s highest pedestrian bridge (36m), sculpted like wave ripples. Continue through Forest Walk canopy trail to Telok Blangah Hill.',
          location: 'Southern Ridges',
        },
        afternoon: {
          title: 'Canopy Walk to Labrador Nature Reserve',
          desc: 'Explore coastal mangrove boardwalks and wartime British artillery gun emplacements along the edge of the Singapore Strait.',
          location: 'Labrador Park',
        },
        evening: {
          title: 'Sunset at Marina Barrage',
          desc: 'Fly kites and unwind on the expansive grass rooftop overlooking Gardens by the Bay and the downtown Marina Bay skyline at sunset.',
          location: 'Marina Barrage',
        },
        insiderTip: 'Bring insect repellent, plenty of water, and wear breathable athletic footwear for the 10km Southern Ridges trail.',
      },
      {
        dayNumber: 2,
        theme: 'Time-Travel to 1960s Rustic Pulau Ubin',
        morning: {
          title: 'Bumboat Ride & Cycling through Ubin Kampong',
          desc: 'Take a 10-minute traditional wooden bumboat ($4 SGD) from Changi Point Ferry Terminal to Pulau Ubin. Rent a bicycle to explore gravel paths and coconut groves.',
          location: 'Pulau Ubin',
        },
        afternoon: {
          title: 'Chek Jawa Coastal Intertidal Wetlands',
          desc: 'Walk along the 1.1km coastal boardwalk observing six distinct natural ecosystems, fiddler crabs, mangrove trees, and sea eagles from the 20m Jejawi Tower.',
          location: 'Chek Jawa Wetlands',
        },
        evening: {
          title: 'Changi Village Hawker Seafood',
          desc: 'Return to mainland for famous Changi Village Nasi Lemak and iced sugarcane juice with fresh lemon.',
          location: 'Changi Village',
        },
        insiderTip: 'Always carry cash in small denominations ($2, $5, $10) for the bumboat and bicycle rental on Pulau Ubin.',
      },
      {
        dayNumber: 3,
        theme: 'UNESCO Singapore Botanic Gardens & Mandai Wildlife',
        morning: {
          title: 'Singapore Botanic Gardens & National Orchid Garden',
          desc: 'Wander through Singapore’s 164-year-old UNESCO World Heritage site and admire over 1,000 pure orchid species and 2,000 hybrids.',
          location: 'Botanic Gardens MRT',
        },
        afternoon: {
          title: 'Bird Paradise at Mandai Wildlife Reserve',
          desc: 'Visit Asia’s newest bird sanctuary featuring eight massive walk-through aviaries mimicking diverse biomes from African rainforests to Australian eucalyptus groves.',
          location: 'Mandai',
        },
        evening: {
          title: 'World’s First Night Safari',
          desc: 'Ride the guided tram through 6 geographical zones observing nocturnal wildlife in open, naturalistic habitats under moonlight lighting.',
          location: 'Mandai Night Safari',
        },
        insiderTip: 'Book the first Night Safari tram time slot (7:15 PM) to catch twilight animal activity before crowds arrive.',
      },
    ],
  },
];

// ==========================================
// 3. "ORDER COFFEE LIKE A LOCAL" KOPI GUIDE
// ==========================================
export const KOPI_OPTIONS: KopiOption[] = [
  {
    term: 'Kopi',
    pronunciation: 'ko-pee',
    meaning: 'Coffee with condensed milk and evaporated milk',
    composition: 'Black Coffee + Sweet Condensed Milk + Evaporated Milk',
    sweetness: 'Standard Sweet',
    caffeine: 'High',
  },
  {
    term: 'Kopi-O',
    pronunciation: 'ko-pee oh',
    meaning: 'Black coffee with sugar (No milk)',
    composition: 'Black Coffee + Sugar',
    sweetness: 'Medium Sweet',
    caffeine: 'High',
  },
  {
    term: 'Kopi-O-Kosong',
    pronunciation: 'ko-pee oh ko-song',
    meaning: 'Pure black coffee without milk and without sugar',
    composition: '100% Pure Dark Roast Coffee',
    sweetness: 'Zero Sugar',
    caffeine: 'Very High',
  },
  {
    term: 'Kopi-C',
    pronunciation: 'ko-pee see',
    meaning: 'Coffee with evaporated milk and sugar ("C" stands for Carnation milk)',
    composition: 'Black Coffee + Creamy Evaporated Milk + Sugar',
    sweetness: 'Balanced Sweet',
    caffeine: 'Medium',
  },
  {
    term: 'Kopi-C-Kosong',
    pronunciation: 'ko-pee see ko-song',
    meaning: 'Coffee with evaporated milk only, zero sugar',
    composition: 'Black Coffee + Evaporated Milk (Unsweetened)',
    sweetness: 'Zero Added Sugar',
    caffeine: 'Medium',
  },
  {
    term: 'Kopi-Siew-Dai',
    pronunciation: 'ko-pee see-yew dye',
    meaning: 'Coffee with condensed milk, but less sweet (reduced sugar)',
    composition: 'Black Coffee + Half-portion Condensed Milk',
    sweetness: 'Mild Sweet (Healthier choice)',
    caffeine: 'High',
  },
  {
    term: 'Kopi-Gao',
    pronunciation: 'ko-pee gow',
    meaning: 'Extra thick and strong coffee ("Gao" means thick in Hokkien)',
    composition: 'High-Concentration Coffee Brew + Milk',
    sweetness: 'Standard',
    caffeine: 'Extra High Kick',
  },
  {
    term: 'Kopi-Po',
    pronunciation: 'ko-pee poh',
    meaning: 'Lighter, thinner coffee brew with more water',
    composition: 'Diluted Coffee Brew + Milk',
    sweetness: 'Standard',
    caffeine: 'Mild',
  },
  {
    term: 'Kopi-Peng',
    pronunciation: 'ko-pee payng',
    meaning: 'Iced coffee ("Peng" means ice in Hokkien)',
    composition: 'Coffee + Milk poured over a cup of crushed ice',
    sweetness: 'Refreshing Sweet',
    caffeine: 'High',
  },
  {
    term: 'Yuan Yang',
    pronunciation: 'yoo-ahn yahng',
    meaning: 'Spiritual blend of half coffee and half black tea with milk',
    composition: '50% Coffee + 50% Black Tea + Condensed Milk',
    sweetness: 'Medium-Sweet Aromatic',
    caffeine: 'Double Kick',
  },
  {
    term: 'Teh Tarik',
    pronunciation: 'tay tah-rik',
    meaning: 'Pulled milk tea frothily poured between two tin pitchers',
    composition: 'Strong Ceylon Black Tea + Sweet Condensed Milk',
    sweetness: 'Rich & Silky',
    caffeine: 'Medium',
  },
  {
    term: 'Milo Dinosaur',
    pronunciation: 'my-lo dye-no-saw',
    meaning: 'Iced malt chocolate drink topped with a mountainous heap of undissolved Milo powder',
    composition: 'Iced Milo + Raw Chocolate Malt Powder Heap',
    sweetness: 'Sweet Treat',
    caffeine: 'Low',
  },
];

// ==========================================
// 4. ICONIC LOCAL DISHES MASTERCLASS
// ==========================================
export const LOCAL_DISHES: LocalDish[] = [
  {
    name: 'Hainanese Chicken Rice',
    chineseName: '海南鸡饭',
    category: 'Rice',
    description: 'Poached tender chicken served over fragrant rice cooked in chicken fat, garlic, ginger, and pandan leaves. Accompanied by fiery chili sauce, dark sweet soya sauce, and grated ginger.',
    origin: 'Adapted by early Hainanese immigrants in Singapore in the 1920s from Wenchang chicken rice.',
    dietaryTags: ['Comfort Food', 'Non-Spicy Option Available'],
    spiceLevel: 1,
    bestStalls: [
      { name: 'Tian Tian Hainanese Chicken Rice', location: 'Maxwell Food Centre #01-10', bibGourmand: true },
      { name: 'Boon Tong Kee', location: 'Balestier / River Valley' },
      { name: 'Wee Nam Kee', location: 'United Square / Marina Square' },
    ],
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Singapore Chilli Crab',
    chineseName: '辣椒螃蟹',
    category: 'Seafood',
    description: 'Meaty Sri Lankan mud crabs stir-fried in a rich, sweet, savory, and tangy chili-tomato gravy thickened with ribboned eggs. Eaten with deep-fried crispy golden mantou buns.',
    origin: 'Created in 1956 by Madam Cher Yam Tian on a pushcart along the East Coast beachfront.',
    dietaryTags: ['Seafood', 'Must-Try', 'Messy & Fun'],
    spiceLevel: 2,
    bestStalls: [
      { name: 'Jumbo Seafood', location: 'East Coast Seafood Centre & Riverside Point' },
      { name: 'Palm Beach Seafood', location: 'One Fullerton overlooking Merlion' },
      { name: 'Keng Eng Kee (KEK) Seafood', location: 'Bukit Merah', bibGourmand: true },
    ],
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Katong Laksa',
    malayName: 'Laksa Nyonya',
    category: 'Noodles',
    description: 'Thick rice vermicelli served in a fiery, coconut-rich broth infused with dried shrimp, chili paste, and laksa leaves (Vietnamese coriander). Noodles are pre-cut so it is eaten solely with a soup spoon.',
    origin: 'Peranakan culinary fusion originating in the Katong coastal enclave.',
    dietaryTags: ['Spicy', 'Seafood Broth'],
    spiceLevel: 2,
    bestStalls: [
      { name: '328 Katong Laksa', location: '51 East Coast Rd', bibGourmand: true },
      { name: 'Sungei Road Laksa', location: '27 Jalan Berseh (Cooked over charcoal)' },
    ],
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Roti Prata & Murtabak',
    tamilName: 'பரோட்டா',
    category: 'Hawker Classic',
    description: 'South Indian flatbread stretched thin, flipped theatrically in the air to trap air bubbles, and pan-fried to crisp perfection on a flat griddle. Served with hearty fish or mutton curry.',
    origin: 'Introduced by Indian Muslim immigrants and perfected in Singapore.',
    dietaryTags: ['Halal', 'Vegetarian Friendly', 'Late-Night Supper'],
    spiceLevel: 1,
    bestStalls: [
      { name: 'Singapore Zam Zam', location: '697 North Bridge Rd (since 1908)' },
      { name: 'Mr and Mrs Mohgan’s Super Crispy Roti Prata', location: 'Tin Yeung Restaurant, Joo Chiat' },
      { name: 'Springleaf Prata Place', location: 'Multiple outlets' },
    ],
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Char Kway Teow',
    chineseName: '炒粿条',
    category: 'Noodles',
    description: 'Flat rice noodles and yellow wheat noodles stir-fried over extreme high heat ("wok hei") with dark sweet soya sauce, garlic, egg, Chinese sausage (lap cheong), fishcake, and fresh cockles.',
    origin: 'Originally a humble, hearty fuel meal for coolies and dock workers in early Singapore.',
    dietaryTags: ['Wok Hei', 'Rich & Savory'],
    spiceLevel: 1,
    bestStalls: [
      { name: 'Outram Park Fried Kway Teow Mee', location: 'Hong Lim Market #02-17', bibGourmand: true },
      { name: 'Hill Street Fried Kway Teow', location: 'Bedok South Market #01-41' },
    ],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Kaya Toast & Soft-Boiled Eggs',
    chineseName: '咖椰烤面包',
    category: 'Dessert & Snacks',
    description: 'Crispy charcoal-toasted bread slathered with creamy cold butter and sweet kaya (coconut egg jam infused with fragrant pandan). Eaten dipped into runny soft-boiled eggs seasoned with dark soy sauce and white pepper.',
    origin: 'Adapted from British high-tea toast by Hainanese ship cooks in early Singapore.',
    dietaryTags: ['Traditional Breakfast', 'Comfort Snack'],
    spiceLevel: 0,
    bestStalls: [
      { name: 'Ya Kun Kaya Toast', location: 'Far East Square (Flagship since 1944)' },
      { name: 'Heap Seng Leong', location: '10 North Bridge Rd (Charcoal toasted + Butter coffee)' },
      { name: 'Killiney Kopitiam', location: '67 Killiney Rd (since 1919)' },
    ],
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
  },
];

// ==========================================
// 5. OFFICIAL ANNUAL FESTIVALS CALENDAR
// ==========================================
export const VISIT_SINGAPORE_FESTIVALS: FestivalEvent[] = [
  {
    id: 'pongal-harvest',
    name: 'Pongal Harvest Festival',
    exactDateOrPeriod: '14 - 17 January',
    month: 'January',
    monthNumber: 1,
    isPublicHoliday: false,
    category: 'Cultural & Religious',
    precinct: 'Little India',
    culture: 'Tamil Harvest Festival of Thanksgiving',
    description: 'A 4-day thanksgiving harvest festival celebrated by the Tamil community. Little India transforms with livestock pens on Hastings Road, ceremonial cooking of sweet rice in clay pots until it boils over ("Pongalo Pongal!"), and intricate rangoli / kolam rice flour floor art.',
    highlights: ['Ceremonial Pongal sweet rice cooking', 'Live cattle street showcase on Hastings Rd', 'Traditional folk dance & kolam competitions'],
    location: 'Campbell Lane, Hastings Road & Sri Senpaga Vinayagar Temple',
    nearestMrt: 'Little India MRT (DT12 / NE7)',
    bestExperienceTip: 'Head to Campbell Lane pedestrian mall in the late afternoon to observe the community cooking pot rituals and cultural performances.',
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80',
    tagColor: '#d97706',
  },
  {
    id: 'thaipusam-devotion',
    name: 'Thaipusam Procession',
    exactDateOrPeriod: 'Late January / Early February (Full Moon of Thai)',
    month: 'January / February',
    monthNumber: 2,
    isPublicHoliday: false,
    category: 'Cultural & Religious',
    precinct: 'Little India to Tank Road',
    culture: 'Hindu Festival of Devotion & Thanksgiving',
    description: 'A spectacular 4km barefoot religious procession where devotees carry ornate spiked "Kavadi" altars and milk pots in honor of Lord Murugan, moving from Sri Srinivasa Perumal Temple to Sri Thendayuthapani Temple amidst uplifting rhythmic drumming.',
    highlights: ['4km barefoot procession route', 'Elaborate peacock-feather Kavadi altars', 'Urumi Melam traditional drum beats'],
    location: 'Serangoon Road to Tank Road',
    nearestMrt: 'Farrer Park MRT (NE8) & Fort Canning MRT (DT20)',
    bestExperienceTip: 'Arrive early at 6:30 AM along Serangoon Road near Sri Srinivasa Perumal Temple to witness the peaceful pre-dawn preparations.',
    image: 'https://images.unsplash.com/photo-1609137144822-79366d2fbe48?auto=format&fit=crop&w=800&q=80',
    tagColor: '#ea580c',
  },
  {
    id: 'cny-river-hongbao',
    name: 'Chinese New Year & River Hongbao',
    exactDateOrPeriod: 'January / February (1st & 2nd Day of Lunar New Year)',
    month: 'January / February',
    monthNumber: 2,
    isPublicHoliday: true,
    category: 'Cultural & Religious',
    precinct: 'Chinatown & Gardens by the Bay',
    culture: 'Chinese Lunar New Year Spring Festival',
    description: 'Chinatown comes alive with massive zodiac lantern installations, night street markets selling festive snacks, and lion dances. River Hongbao lights up Gardens by the Bay with towering floating lanterns, God of Fortune blessing shows, and nightly fireworks.',
    highlights: ['Chinatown Festive Street Bazaar & Light-up', 'River Hongbao Lantern Spectacular', 'Lion & Dragon Dance street troupes', 'Yu Sheng Prosperity salad tossing'],
    location: 'Chinatown, Marina Bay & Gardens by the Bay',
    nearestMrt: 'Chinatown MRT (NE4 / DT19) & Bayfront MRT (DT16 / CE1)',
    bestExperienceTip: 'Do not miss participating in "Lo Hei" (tossing Yu Sheng salad) at local Cantonese and Teochew restaurants for good fortune!',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80',
    tagColor: '#dc2626',
  },
  {
    id: 'chingay-parade',
    name: 'Chingay Parade Singapore',
    exactDateOrPeriod: 'First Weekend after Chinese New Year',
    month: 'February',
    monthNumber: 2,
    isPublicHoliday: false,
    category: 'Arts, Food & Lifestyle',
    precinct: 'F1 Pit Building / Marina Bay',
    culture: 'Multi-Ethnic Street Performance Carnival',
    description: 'Asia’s grandest street performance and float parade featuring thousands of performers from Singapore’s Chinese, Malay, Indian, and Eurasian communities. Giant illuminated floats, stilt-walkers, pyrotechnics, and vibrant street dancers celebrate national unity.',
    highlights: ['Giant illuminated multi-cultural floats', 'High-energy stilt walkers & lion acrobats', 'Grand finale fireworks over Marina Bay'],
    location: 'F1 Pit Building, Republic Boulevard',
    nearestMrt: 'Promenade MRT (CC4 / DT15)',
    bestExperienceTip: 'Book grandstand tickets early through SISTIC or watch the post-parade community float showcase in the heartlands for free.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    tagColor: '#9333ea',
  },
  {
    id: 'hari-raya-aidilfitri',
    name: 'Hari Raya Aidilfitri & Ramadan Bazaars',
    exactDateOrPeriod: 'March / April (1 Syawal in Islamic Calendar)',
    month: 'March / April',
    monthNumber: 4,
    isPublicHoliday: true,
    category: 'Cultural & Religious',
    precinct: 'Geylang Serai & Kampong Gelam',
    culture: 'Islamic Festive Celebration marking the end of Ramadan',
    description: 'Geylang Serai and Kampong Gelam are bathed in brilliant crescent and star street light-ups. Huge evening bazaars feature hundreds of food stalls serving Dendeng (sweet beef jerky), Ramly burgers, rainbow drinks, vadai, and traditional Kuih Tart.',
    highlights: ['Geylang Serai Ramadan Bazaar', 'Sultan Mosque festive food street', 'Ketupat lantern arches & Baju Kurung fashion'],
    location: 'Geylang Serai & Arab Street / Bussorah Street',
    nearestMrt: 'Paya Lebar MRT (EW8 / CC9) & Bugis MRT (EW12 / DT14)',
    bestExperienceTip: 'Visit the bazaar around 6:30 PM to soak in the bustling pre-iftar energy and sample street snacks right as the sunset azan prayer call sounds.',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    tagColor: '#059669',
  },
  {
    id: 'vesak-day',
    name: 'Vesak Day',
    exactDateOrPeriod: 'May (Full Moon of Vaisakha)',
    month: 'May',
    monthNumber: 5,
    isPublicHoliday: true,
    category: 'Cultural & Religious',
    precinct: 'Chinatown, Balestier & Bishan',
    culture: 'Buddhist Celebration of the Birth, Enlightenment & Nirvana of Buddha',
    description: 'A serene day of peace and merit-making. Devotees visit temples at dawn for flag-raising, hymn singing, and the ceremonial "bathing of the baby Buddha" statue. Monasteries host three-step, one-bow prostration ceremonies and free vegetarian meals.',
    highlights: ['Bathing the Baby Buddha ritual', 'Three-Step-One-Bow candlelight procession', 'Temple vegetarian feast distribution'],
    location: 'Buddha Tooth Relic Temple (Chinatown) & Kong Meng San Phor Kark See Monastery (Bright Hill)',
    nearestMrt: 'Maxwell MRT (TE18) & Bright Hill MRT (TE7)',
    bestExperienceTip: 'Visit the Buddha Tooth Relic Temple rooftop orchid garden in the evening to witness the tranquil candlelight procession.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80',
    tagColor: '#eab308',
  },
  {
    id: 'dragon-boat-festival',
    name: 'Dragon Boat Festival (Duanwu Jie)',
    exactDateOrPeriod: 'June (5th day of 5th Lunar Month)',
    month: 'June',
    monthNumber: 6,
    isPublicHoliday: false,
    category: 'Arts, Food & Lifestyle',
    precinct: 'Bedok Reservoir & Marina Bay',
    culture: 'Traditional Chinese Waterfront Sports & Gastronomy',
    description: 'Dragon boat crews row in perfect synchronization to thunderous drumbeats across Singapore waterways in honor of patriotic poet Qu Yuan. Families celebrate by savoring glutinous rice dumplings (Bak Chang / Zongzi) wrapped in fragrant bamboo leaves.',
    highlights: ['Singapore Dragon Boat Regatta races', 'Traditional Bak Chang (Nonya & Hokkien pork dumplings)', 'Thunderous dragon drum cadences'],
    location: 'Bedok Reservoir & Marina Bay Waterfront Promenade',
    nearestMrt: 'Bedok Reservoir MRT (DT30) & Bayfront MRT (DT16)',
    bestExperienceTip: 'Grab freshly steamed Peranakan chang from Kim Choo Kueh Chang in Joo Chiat before heading to the races.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    tagColor: '#0284c7',
  },
  {
    id: 'hari-raya-haji',
    name: 'Hari Raya Haji (Eid al-Adha)',
    exactDateOrPeriod: 'June / July (10 Dzulhijjah)',
    month: 'June / July',
    monthNumber: 7,
    isPublicHoliday: true,
    category: 'Cultural & Religious',
    precinct: 'Kampong Gelam & Geylang',
    culture: 'Islamic Feast of Sacrifice & Hajj Pilgrimage Completion',
    description: 'Commemorating Prophet Ibrahim’s faith and obedience. The day begins with morning prayers at mosques island-wide, followed by the Korban sacrifice where meat is packaged and distributed to families and the underprivileged.',
    highlights: ['Morning congregational prayers at Sultan Mosque', 'Charitable meat distribution to the community', 'Traditional Malay feasts with Rendang & Lontong'],
    location: 'Sultan Mosque (Arab St) & Masjid Hajjah Fatimah',
    nearestMrt: 'Bugis MRT (EW12 / DT14)',
    bestExperienceTip: 'Explore the historic shophouses of Bussorah Street in the afternoon when festive families gather in fine traditional silk attire.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    tagColor: '#10b981',
  },
  {
    id: 'singapore-food-festival',
    name: 'Singapore Food Festival (SFF)',
    exactDateOrPeriod: 'July - August',
    month: 'July / August',
    monthNumber: 8,
    isPublicHoliday: false,
    category: 'Arts, Food & Lifestyle',
    precinct: 'Marina Bay & Islandwide Hawker Hubs',
    culture: 'STB Flagship Gastronomy & Culinary Innovation Showcase',
    description: 'An epic month-long celebration of Singapore’s culinary identity, uniting UNESCO hawker masters, Michelin-starred chefs, and modern craft mixologists. Features Festival Villages, exclusive pop-up dishes, and masterclasses.',
    highlights: ['Festival Village at Bayfront', 'Exclusive one-off fusion hawker creations', 'Masterclasses by celebrity & heritage chefs'],
    location: 'Bayfront Event Space & Participating Hawkers',
    nearestMrt: 'Bayfront MRT (DT16 / CE1)',
    bestExperienceTip: 'Come with an empty stomach and sample the exclusive limited-edition festival dishes not found on regular menus.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    tagColor: '#f97316',
  },
  {
    id: 'singapore-national-day',
    name: 'Singapore National Day (NDP)',
    exactDateOrPeriod: '9 August (Annual National Birthday)',
    month: 'August',
    monthNumber: 8,
    isPublicHoliday: true,
    category: 'National Day & Civic',
    precinct: 'The Padang, Marina Bay & Heartland Sites',
    culture: 'Singapore’s National Independence Celebration (1965)',
    description: 'Singapore celebrates its independence day with the National Day Parade (NDP). Features the iconic State Flag Flypast by Chinook helicopters, supersonic F-16 aerial dogfight acrobatics, the Red Lions parachute team landing precisely on target, marching contingents, military defense displays, and an electrifying 360-degree fireworks finale reflected over the Marina Bay skyline.',
    highlights: [
      'National Day Parade (NDP) at The Padang / National Stadium',
      'Red Lions Free-Fall Parachute Team precision descent',
      'Republic of Singapore Air Force (RSAF) Fighter Jet Flypast',
      'Spectacular 360-degree Marina Bay Fireworks Finale',
      'Island-wide Heartland Celebrations & Carnivals'
    ],
    location: 'The Padang, Marina Bay Waterfront & National Stadium',
    nearestMrt: 'City Hall MRT (NS25 / EW13) & Bayfront MRT (DT16 / CE1)',
    bestExperienceTip: 'Wear red and white! Secure a free scenic picnic spot at Marina Barrage, Merlion Park, or the Esplanade waterfront by 5:00 PM to watch the aerial display and fireworks for free.',
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80',
    tagColor: '#e11d48',
  },
  {
    id: 'singapore-night-festival',
    name: 'Singapore Night Festival (SNF)',
    exactDateOrPeriod: 'Mid to Late August',
    month: 'August',
    monthNumber: 8,
    isPublicHoliday: false,
    category: 'Arts, Food & Lifestyle',
    precinct: 'Bras Basah.Bugis (BBB) Heritage District',
    culture: 'Immersive Nighttime Arts & Architectural Projections',
    description: 'Singapore’s heritage district transforms after dark with monumental light projections mapping historic facades of the National Museum and Singapore Art Museum, interactive light art installations in courtyards, and open-air street performances.',
    highlights: ['Monumental building projection mapping', 'Glow-in-the-dark interactive art installations', 'Late-night museum free admissions & street food villages'],
    location: 'Bras Basah, Bugis & National Museum of Singapore',
    nearestMrt: 'Bras Basah MRT (CC2) & Bencoolen MRT (DT21)',
    bestExperienceTip: 'The festival kicks off at 7:30 PM. Download the walking map and stroll through Armenian Street for live indie music and food stalls.',
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    tagColor: '#6366f1',
  },
  {
    id: 'hungry-ghost-festival',
    name: 'Hungry Ghost Festival (Zhongyuan Jie)',
    exactDateOrPeriod: 'August - September (7th Lunar Month)',
    month: 'August / September',
    monthNumber: 8,
    isPublicHoliday: false,
    category: 'Cultural & Religious',
    precinct: 'Heartlands, Chinatown & Geylang',
    culture: 'Traditional Taoist & Buddhist Ancestral Veneration',
    description: 'During the 7th lunar month, the gates of the underworld open and spirits roam. Locals burn joss paper and incense, prepare roadside food offerings, and erect makeshift street stages for lively "Getai" song-and-dance shows with glittering outfits and bilingual humor.',
    highlights: ['Lively high-energy Getai street music performances', 'Front-row red chairs reserved respectfully for wandering spirits', 'Charity auctions and street dinner banquets'],
    location: 'Chinatown, Toa Payoh, Ang Mo Kio & Bedok heartlands',
    nearestMrt: 'Chinatown MRT (NE4 / DT19)',
    bestExperienceTip: 'You are welcome to watch Getai shows for free, but remember: NEVER sit in the empty front row of red plastic chairs—those seats are reserved for the invisible spirits!',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    tagColor: '#b45309',
  },
  {
    id: 'mid-autumn-festival',
    name: 'Mid-Autumn Festival (Lantern & Mooncake Festival)',
    exactDateOrPeriod: 'September / October (15th day of 8th Lunar Month)',
    month: 'September / October',
    monthNumber: 9,
    isPublicHoliday: false,
    category: 'Cultural & Religious',
    precinct: 'Chinatown & Gardens by the Bay',
    culture: 'Chinese Harvest Moon & Family Reunion Festival',
    description: 'Celebrating the full harvest moon with mooncakes, Chinese tea, and lantern walks. Chinatown is adorned with illuminated lantern tunnels and giant mythical displays of Chang’e (the Moon Goddess). Gardens by the Bay hosts the magical "Mid-Autumn at Gardens" with cultural performances and floating lantern floats.',
    highlights: ['Traditional lotus seed paste and modern snowskin mooncakes', 'Elaborate lantern displays at Gardens by the Bay & Chinatown', 'Community mass lantern walks along the Singapore River'],
    location: 'Chinatown & Gardens by the Bay',
    nearestMrt: 'Chinatown MRT (NE4) & Bayfront MRT (DT16)',
    bestExperienceTip: 'Buy a pair of traditional paper lanterns and join hundreds of families strolling through the Supertree Grove under the full moon.',
    image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=800&q=80',
    tagColor: '#eab308',
  },
  {
    id: 'singapore-grand-prix',
    name: 'Singapore Grand Prix (Formula 1 Night Race)',
    exactDateOrPeriod: 'September / October (Annual Race Weekend)',
    month: 'September / October',
    monthNumber: 9,
    isPublicHoliday: false,
    category: 'Sports & Mega-Events',
    precinct: 'Marina Bay Street Circuit',
    culture: 'World’s Original Formula 1 Night Street Circuit',
    description: 'The world’s original Formula 1 night race roared across the 5km street circuit illuminated by 1,600 custom high-power floodlights. Accompanied by massive off-track pop concerts on the Padang Stage featuring global headliners, luxury parties, and culinary pop-ups.',
    highlights: ['High-speed F1 night racing past iconic colonial landmarks', 'Mega concerts at the 65,000-capacity Padang Stage', 'Grand Prix Season Singapore (GPSS) street festivals'],
    location: 'Marina Bay, City Hall, Esplanade & Raffles Avenue',
    nearestMrt: 'City Hall MRT (NS25 / EW13) & Promenade MRT (CC4 / DT15)',
    bestExperienceTip: 'Even without circuit tickets, the city atmosphere is electric with popup driving simulators, exhibitions, and viewing vantage points from rooftop bars like 1-Altitude Coast or LeVeL33.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    tagColor: '#ef4444',
  },
  {
    id: 'deepavali-lights',
    name: 'Deepavali (Festival of Lights)',
    exactDateOrPeriod: 'October / November (Kartika Amavasya)',
    month: 'October / November',
    monthNumber: 10,
    isPublicHoliday: true,
    category: 'Cultural & Religious',
    precinct: 'Little India',
    culture: 'Hindu Celebration of the Triumph of Light over Darkness',
    description: 'Little India is illuminated with monumental multi-kilometer archways of dancing peacocks, lotus blossoms, and oil lamps (diyas). Campbell Lane turns into a bustling festive fair offering gold jewelry, sweets (mithai like gulab jamun and laddu), festive apparel, and intricate henna body art.',
    highlights: ['Serangoon Road 2km Street Light-up', 'Deepavali Festival Village bazaar on Campbell Lane', 'Mithai Indian sweet tasting & intricate Henna art'],
    location: 'Serangoon Road & Campbell Lane',
    nearestMrt: 'Little India MRT (NE7 / DT12)',
    bestExperienceTip: 'Take the open-top Deepavali Light-Up Bus Tour for prime elevated photography of the glittering street arches without crowds.',
    image: 'https://images.unsplash.com/photo-1576400883215-7083980b6197?auto=format&fit=crop&w=800&q=80',
    tagColor: '#f59e0b',
  },
  {
    id: 'christmas-orchard',
    name: 'Christmas on A Great Street',
    exactDateOrPeriod: 'Mid-November to 1 January (Christmas Day 25 Dec)',
    month: 'November / December',
    monthNumber: 12,
    isPublicHoliday: true,
    category: 'Arts, Food & Lifestyle',
    precinct: 'Orchard Road',
    culture: 'Iconic Year-End Festive Light-up & Holiday Carnivals',
    description: 'Orchard Road’s 3.1km shopping boulevard transforms into an enchanted winter wonderland with millions of LED lights, interactive augmented reality arches, giant outdoor Christmas villages with carnival rides, food trucks, and nightly snowfall shows outside malls.',
    highlights: ['3.1km illuminated boulevard from Tanglin to Plaza Singapura', 'Great Christmas Village carnivals outside Ngee Ann City & ION', 'Nightly artificial "snowfall" sessions outside malls'],
    location: 'Orchard Road Shopping Belt',
    nearestMrt: 'Orchard MRT (NS22 / TE14) & Somerset MRT (NS23)',
    bestExperienceTip: 'Walk down Orchard Road in the cool evening breeze between 8:00 PM and 10:00 PM to catch the light shows and carnival buskers.',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80',
    tagColor: '#16a34a',
  },
  {
    id: 'nye-countdown-marina-bay',
    name: 'Marina Bay Singapore Countdown (NYE)',
    exactDateOrPeriod: '31 December (New Year’s Eve)',
    month: 'December',
    monthNumber: 12,
    isPublicHoliday: false,
    category: 'National Day & Civic',
    precinct: 'Marina Bay Waterfront & Civic District',
    culture: 'Singapore’s Grandest New Year’s Eve Celebration',
    description: 'Singapore bids farewell to the old year and welcomes the new with world-class countdown festivities across the Marina Bay basin. Features monumental light projection shows on The Fullerton Hotel and the Merlion, live concerts at the Esplanade, and an iconic midnight fireworks spectacle spanning the entire bay.',
    highlights: ['Monumental light projection shows on The Fullerton Hotel & ArtScience Museum', 'Choreographed midnight fireworks spectacle over the bay', 'Live music stages at Esplanade Outdoor Theatre'],
    location: 'Marina Bay Waterfront Promenade, The Promontory & Civic District',
    nearestMrt: 'Bayfront MRT (DT16) & Raffles Place MRT (NS26 / EW14)',
    bestExperienceTip: 'Arrive at the Marina Bay waterfront by 6:30 PM with water and snacks, or book early dining reservations with bay-facing terrace views.',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=800&q=80',
    tagColor: '#2563eb',
  },
];

// ==========================================
// 6. TOURIST GST REFUND & TRAVEL TIPS (eTRS)
// ==========================================
export const GST_REFUND_GUIDE: GstRefundStep[] = [
  {
    step: 1,
    title: 'Spend at Least S$100 (incl. GST) at Participating Retailers',
    desc: 'Look for the "Tax Free Shopping" or "eTRS" logo. You can combine up to 3 same-day receipts from the same merchant to reach the minimum $100 SGD threshold.',
  },
  {
    step: 2,
    title: 'Present Passport to Merchant at Point of Purchase',
    desc: 'Retailers will digitally issue an Electronic Tourist Refund Scheme (eTRS) transaction linked directly to your passport number. Keep your physical receipts.',
  },
  {
    step: 3,
    title: 'Use eTRS Self-Help Kiosks at Changi Airport or Cruise Terminals',
    desc: 'Before checking in your baggage (or at transit lounges after immigration for carry-on items), scan your passport at the eTRS self-help kiosk to verify your refund.',
  },
  {
    step: 4,
    title: 'Receive Refund Directly to Credit Card or Cash',
    desc: 'Select direct refund to your credit card, debit card, or collect cash at the designated Central Refund Counter inside the transit departure hall.',
  },
];
