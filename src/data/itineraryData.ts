import { TripItinerary, ItineraryCategory, ItineraryStop } from '../types';

export interface CatalogPlace {
  id: string;
  name: string;
  category: ItineraryCategory;
  area: string;
  defaultDuration: string;
  defaultCostSgd: number;
  location: string;
  nearestMrt: string;
  image: string;
  recommendedNotes: string;
  recommendedTime: string;
}

export const SUGGESTED_PLACES_CATALOG: CatalogPlace[] = [
  {
    id: 'gardens-by-the-bay',
    name: 'Gardens by the Bay & Cloud Forest',
    category: 'Nature & Parks',
    area: 'Marina Bay',
    defaultDuration: '2.5 hrs',
    defaultCostSgd: 32,
    location: '18 Marina Gardens Dr',
    nearestMrt: 'Gardens by the Bay (TEL TE22) / Bayfront (DTL DT16)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ySaplpS0yfc8R58aOCD7x6A0Z5M0Lcfa3vi47Y5fr5ReoLSSnJsbEgGi0m7FxGvr7nxdld4xYxv4Q1LO_aUkM_QkPE572_iZ9ioR_23NWTxr0Uuv1mC2uhhEr4hAKyX9N2kSaiu791s8Awt0_g2VSJOThwbEw43a01MJCb_1fz3IJ6m472G3bBpB-AFSHbcPP862oXfkQ7N9wDcuheQKiQayOjG8dmMAqQL7bG04LNajN7JWGMaCjQ',
    recommendedNotes: 'Catch the Garden Rhapsody light show at 7:45 PM & 8:45 PM. Bring a light jacket for Cloud Forest dome.',
    recommendedTime: '09:30 AM',
  },
  {
    id: 'marina-bay-sands-skypark',
    name: 'Marina Bay Sands SkyPark Observation Deck',
    category: 'Sightseeing',
    area: 'Marina Bay',
    defaultDuration: '1.5 hrs',
    defaultCostSgd: 30,
    location: '10 Bayfront Ave, Hotel Tower 3',
    nearestMrt: 'Bayfront MRT (DT16 / CE1)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBthnP8RiG9JXPLdGWXqC8gmaJW1XEie7eeakyuZdFZJIdGotgnil9ohpdjlMZiSI62gWqAIHMmJ7t68OwS8gIjsS9WmXkAI2-xcI_geYsCFL5gKZcbq3u4xHW5R_PhezaNXFUyZvfH2Ocy6RRmpD2eczbioYSWzhnawH_FU9Hw0u97K-hPscYnlkpXX30p0PvrTEW055779cLcQEau10pDRzKosuS_QleEPM2xPi_dNCrjfYGuwdMmIA',
    recommendedNotes: 'Book 5:30 PM sunset slot for both daytime panoramic views and night city lights.',
    recommendedTime: '05:30 PM',
  },
  {
    id: 'merlion-park',
    name: 'Merlion Park & Marina Bay Waterfront',
    category: 'Sightseeing',
    area: 'Civic District',
    defaultDuration: '1 hr',
    defaultCostSgd: 0,
    location: '1 Fullerton Rd, Singapore 049213',
    nearestMrt: 'Raffles Place MRT (NS26 / EW14)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2bUeYgH8iW6r64dEa4l5Q0qO-dE34B5lT3yM6Y9uV1c7jB64PZ3h_dF8_25a-A027H81o9G6f4E3X7D192_u8B4d8',
    recommendedNotes: 'Singapore icon with free admission. Walk over the Jubilee Bridge toward Esplanade.',
    recommendedTime: '08:30 AM',
  },
  {
    id: 'maxwell-food-centre',
    name: 'Maxwell Food Centre (Lunch)',
    category: 'Food & Drinks',
    area: 'Chinatown',
    defaultDuration: '1 hr',
    defaultCostSgd: 12,
    location: '1 Kadayanallur St',
    nearestMrt: 'Maxwell MRT (TEL TE18) / Chinatown (NE4)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF_h89U9A7P2yR3q7bK1L4j8vN9z0X_7mC2bA1S4d8_u6yT1wE9qL3o0P7z4X8r6_u0L5b6V1y8_1P',
    recommendedNotes: 'Must try: Tian Tian Hainanese Chicken Rice, Zhen Zhen Porridge, and fresh sugarcane juice.',
    recommendedTime: '12:00 PM',
  },
  {
    id: 'lau-pa-sat-satay',
    name: 'Lau Pa Sat & Satay Street',
    category: 'Food & Drinks',
    area: 'CBD / Raffles Quay',
    defaultDuration: '1.5 hrs',
    defaultCostSgd: 18,
    location: '18 Raffles Quay',
    nearestMrt: 'Telok Ayer MRT (DT18) / Downtown (DT17)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9k7L1m8_4xT2o0P8qZ3bF1y9S7vR6wE5qC4d8_3mN9uX0bA2j5K8r7_1L4b2V9y0S3',
    recommendedNotes: 'Satay Street opens at 7:00 PM outside Boon Tat St. Order mixed chicken, beef, and mutton skewers with peanut sauce.',
    recommendedTime: '07:30 PM',
  },
  {
    id: 'chinatown-heritage',
    name: 'Buddha Tooth Relic Temple & Chinatown Shophouses',
    category: 'Culture & Heritage',
    area: 'Chinatown',
    defaultDuration: '1.5 hrs',
    defaultCostSgd: 0,
    location: '288 South Bridge Rd',
    nearestMrt: 'Chinatown MRT (NE4 / DT19)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7y8B9b1C4d2E5f6G8h0J2k4L6m8N0p2Q4r6T8v0X2z4B6d8F0h2J4l6N8p0R2t4V6x8',
    recommendedNotes: 'Modest attire required (shawls provided at entrance). Visit the peaceful 4th floor sacred chamber.',
    recommendedTime: '10:30 AM',
  },
  {
    id: 'kampong-glam-haji-lane',
    name: 'Kampong Glam, Sultan Mosque & Haji Lane',
    category: 'Culture & Heritage',
    area: 'Bugis / Arab Street',
    defaultDuration: '2 hrs',
    defaultCostSgd: 15,
    location: 'Arab St & Haji Ln, Singapore',
    nearestMrt: 'Bugis MRT (EW12 / DT14)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8e2F4h6J8l0N2p4R6t8V0x2Z4b6D8f0H2j4L6n8P0r2T4v6X8z0B2d4F6h8J0l2N4',
    recommendedNotes: 'Explore colorful street murals, hipster boutiques, and try authentic Teh Tarik and Murtabak at Zam Zam.',
    recommendedTime: '03:30 PM',
  },
  {
    id: 'singapore-botanic-gardens',
    name: 'Singapore Botanic Gardens & National Orchid Garden',
    category: 'Nature & Parks',
    area: 'Tanglin / Central',
    defaultDuration: '2 hrs',
    defaultCostSgd: 15,
    location: '1 Cluny Rd, Singapore 259569',
    nearestMrt: 'Botanic Gardens MRT (CC19 / DT9)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF2d4F6h8J0l2N4p6R8t0V2x4Z6b8D0f2H4j6L8n0P2r4T6v8X0z2B4d6F8h0J2l4',
    recommendedNotes: 'UNESCO World Heritage site. Orchid Garden features over 1,000 species. Best visited early morning.',
    recommendedTime: '08:00 AM',
  },
  {
    id: 'universal-studios-singapore',
    name: 'Universal Studios Singapore',
    category: 'Entertainment',
    area: 'Sentosa Island',
    defaultDuration: '5 hrs',
    defaultCostSgd: 83,
    location: '8 Sentosa Gateway, Resorts World Sentosa',
    nearestMrt: 'HarbourFront MRT -> Sentosa Express to Waterfront',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE9b8D0f2H4j6L8n0P2r4T6v8X0z2B4d6F8h0J2l4N6p8R0t2V4x6Z8b0D2f4H6',
    recommendedNotes: 'Download Universal Studios app for live wait times. Arrive by 10:00 AM for shortest queues on major rides.',
    recommendedTime: '10:00 AM',
  },
  {
    id: 'sentosa-siloso-beach',
    name: 'Siloso Beach & Coastal Boardwalk',
    category: 'Relaxation' as ItineraryCategory,
    area: 'Sentosa Island',
    defaultDuration: '2 hrs',
    defaultCostSgd: 0,
    location: 'Siloso Beach Walk, Sentosa',
    nearestMrt: 'Sentosa Express (Beach Station)',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    recommendedNotes: 'Relax at beach clubs (Ola Beach Club / Rumours) or take the free Sentosa beach shuttle.',
    recommendedTime: '04:00 PM',
  },
  {
    id: 'singapore-zoo-mandai',
    name: 'Singapore Zoo & Mandai Wildlife Reserve',
    category: 'Nature & Parks',
    area: 'Mandai',
    defaultDuration: '3.5 hrs',
    defaultCostSgd: 48,
    location: '80 Mandai Lake Rd',
    nearestMrt: 'Khatib MRT (NS14) + Mandai Shuttle Bus (S$1)',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    recommendedNotes: 'World’s best open-concept zoo. Don’t miss the Elephant presentation and Splash Safari.',
    recommendedTime: '09:00 AM',
  },
  {
    id: 'jewel-changi-rain-vortex',
    name: 'Jewel Changi & HSBC Rain Vortex',
    category: 'Sightseeing',
    area: 'Changi Airport',
    defaultDuration: '2.5 hrs',
    defaultCostSgd: 0,
    location: '78 Airport Blvd, Singapore 819666',
    nearestMrt: 'Changi Airport MRT (CG2)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2e4F6h8J0l2N4p6R8t0V2x4Z6b8D0f2H4j6L8n0P2r4T6v8X0z2B4d6F8h0J2l4',
    recommendedNotes: 'World’s tallest indoor waterfall. Light & sound shows run hourly in the evening. Store luggage at T1/Jewel.',
    recommendedTime: '06:00 PM',
  },
  {
    id: 'orchard-road-shopping',
    name: 'ION Orchard & Orchard Road Shopping Promenade',
    category: 'Shopping',
    area: 'Orchard Road',
    defaultDuration: '2.5 hrs',
    defaultCostSgd: 20,
    location: '2 Orchard Turn, Singapore 238801',
    nearestMrt: 'Orchard MRT (NS22 / TE14)',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
    recommendedNotes: 'Explore 2.2km shopping boulevard. Check out ION Sky for 360° views and B4 food basement.',
    recommendedTime: '02:00 PM',
  },
  {
    id: 'clarke-quay-river-cruise',
    name: 'Clarke Quay & Singapore River Cruise',
    category: 'Entertainment',
    area: 'Singapore River',
    defaultDuration: '1.5 hrs',
    defaultCostSgd: 28,
    location: 'Clarke Quay Jetty, 3E River Valley Rd',
    nearestMrt: 'Clarke Quay MRT (NE5)',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    recommendedNotes: '40-minute traditional bumboat cruise passing Boat Quay, Marina Bay, and Merlion at twilight.',
    recommendedTime: '07:00 PM',
  },
];

export const PRESET_STARTER_ITINERARIES: TripItinerary[] = [
  {
    id: '3-day-classic-highlights',
    title: '3-Day Classic Singapore Highlights',
    subtitle: 'The quintessential Lion City journey: Marina Bay icons, world-class hawker food, and lush tropical greenery.',
    totalDays: 3,
    days: [
      {
        id: 'day-1',
        dayNumber: 1,
        dateStr: 'Day 1',
        title: 'Marina Bay Waterfront & Future Greenery',
        themeArea: 'Marina Bay & Civic District',
        weatherAdvice: 'Warm & sunny morning; potential brief 30-min rain around 3 PM.',
        stops: [
          {
            id: 'stop-1-1',
            placeId: 'merlion-park',
            title: 'Merlion Park & Waterfront Walk',
            category: 'Sightseeing',
            timeSlot: '08:30 AM',
            duration: '1 hr',
            costSgd: 0,
            location: '1 Fullerton Rd, Singapore 049213',
            nearestMrt: 'Raffles Place MRT (NS26 / EW14)',
            notes: 'Take iconic fountain photo with Marina Bay Sands in background before midday sun.',
            isCompleted: false,
            transitToNext: {
              type: 'walk',
              duration: '12 mins',
              instruction: 'Walk across Jubilee Bridge toward Esplanade, then through Helix Bridge.',
              fareSgd: 0,
            },
          },
          {
            id: 'stop-1-2',
            placeId: 'gardens-by-the-bay',
            title: 'Gardens by the Bay (Cloud Forest & Flower Dome)',
            category: 'Nature & Parks',
            timeSlot: '10:00 AM',
            duration: '2.5 hrs',
            costSgd: 32,
            location: '18 Marina Gardens Dr',
            nearestMrt: 'Gardens by the Bay MRT (TE22)',
            notes: 'Walk inside the 35-meter Cloud Mountain waterfall. Great indoor air-conditioned escape.',
            isCompleted: false,
            transitToNext: {
              type: 'walk',
              duration: '8 mins',
              instruction: 'Walk via Lion Bridge directly into The Shoppes at Marina Bay Sands.',
              fareSgd: 0,
            },
          },
          {
            id: 'stop-1-3',
            title: 'Lunch at Rasapura Masters Food Hall (MBS)',
            category: 'Food & Drinks',
            timeSlot: '01:00 PM',
            duration: '1 hr',
            costSgd: 15,
            location: 'The Shoppes at Marina Bay Sands B2',
            nearestMrt: 'Bayfront MRT (DT16 / CE1)',
            notes: 'Try the authentic Bak Kut Teh or Singapore Laksa in comfortable air conditioning.',
            isCompleted: false,
            transitToNext: {
              type: 'walk',
              duration: '5 mins',
              instruction: 'Take elevator up to Marina Bay Sands Hotel Tower 3.',
              fareSgd: 0,
            },
          },
          {
            id: 'stop-1-4',
            placeId: 'marina-bay-sands-skypark',
            title: 'Marina Bay Sands SkyPark Deck & Sunset',
            category: 'Sightseeing',
            timeSlot: '05:30 PM',
            duration: '1.5 hrs',
            costSgd: 30,
            location: '10 Bayfront Ave',
            nearestMrt: 'Bayfront MRT (DT16 / CE1)',
            notes: 'Watch the sunset cast golden hues across the Straits of Singapore and CBD skyline.',
            isCompleted: false,
            transitToNext: {
              type: 'mrt',
              duration: '10 mins',
              instruction: 'Take Downtown Line from Bayfront (DT16) to Downtown (DT17).',
              fareSgd: 1.15,
            },
          },
          {
            id: 'stop-1-5',
            placeId: 'lau-pa-sat-satay',
            title: 'Satay Street at Lau Pa Sat (Dinner)',
            category: 'Food & Drinks',
            timeSlot: '07:30 PM',
            duration: '1.5 hrs',
            costSgd: 18,
            location: '18 Raffles Quay',
            nearestMrt: 'Telok Ayer MRT (DT18)',
            notes: 'Boon Tat Street closes for cars and sets up charcoal grills under the CBD skyscrapers!',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'day-2',
        dayNumber: 2,
        dateStr: 'Day 2',
        title: 'Heritage Trails: Chinatown, Kampong Glam & Little India',
        themeArea: 'Cultural Enclaves & Food',
        weatherAdvice: 'Partly cloudy, pleasant 31°C. Great walking weather.',
        stops: [
          {
            id: 'stop-2-1',
            title: 'Traditional Kaya Toast & Kopi Breakfast at Ya Kun',
            category: 'Food & Drinks',
            timeSlot: '08:30 AM',
            duration: '45 mins',
            costSgd: 6,
            location: '18 China St, Far East Square',
            nearestMrt: 'Telok Ayer MRT (DT18)',
            notes: 'Dip crispy charcoal-grilled toast with coconut jam into runny soft-boiled eggs with dark soya sauce.',
            isCompleted: false,
            transitToNext: {
              type: 'walk',
              duration: '6 mins',
              instruction: 'Walk along South Bridge Road toward Buddha Tooth Relic Temple.',
              fareSgd: 0,
            },
          },
          {
            id: 'stop-2-2',
            placeId: 'chinatown-heritage',
            title: 'Buddha Tooth Relic Temple & Chinatown Street Market',
            category: 'Culture & Heritage',
            timeSlot: '09:30 AM',
            duration: '2 hrs',
            costSgd: 0,
            location: '288 South Bridge Rd',
            nearestMrt: 'Chinatown MRT (NE4 / DT19)',
            notes: 'Explore traditional Chinese architecture and Pagoda Street souvenir shophouses.',
            isCompleted: false,
            transitToNext: {
              type: 'walk',
              duration: '4 mins',
              instruction: 'Walk 150m across South Bridge Rd to Maxwell Food Centre.',
              fareSgd: 0,
            },
          },
          {
            id: 'stop-2-3',
            placeId: 'maxwell-food-centre',
            title: 'Michelin Hawker Lunch at Maxwell Food Centre',
            category: 'Food & Drinks',
            timeSlot: '12:00 PM',
            duration: '1 hr',
            costSgd: 12,
            location: '1 Kadayanallur St',
            nearestMrt: 'Maxwell MRT (TE18)',
            notes: 'Tian Tian Chicken Rice and crispy oyster cake from Maxwell Fuzhou stall.',
            isCompleted: false,
            transitToNext: {
              type: 'mrt',
              duration: '14 mins',
              instruction: 'Take Thomson-East Coast Line TE18 to Outram Park, switch to East-West Line to Bugis (EW12).',
              fareSgd: 1.35,
            },
          },
          {
            id: 'stop-2-4',
            placeId: 'kampong-glam-haji-lane',
            title: 'Kampong Glam, Sultan Mosque & Haji Lane Boutiques',
            category: 'Culture & Heritage',
            timeSlot: '02:30 PM',
            duration: '2.5 hrs',
            costSgd: 15,
            location: 'Arab St & Haji Ln',
            nearestMrt: 'Bugis MRT (EW12 / DT14)',
            notes: 'Snap colorful mural photos in Haji Lane, visit boutique perfumes, and drink iced Teh Tarik.',
            isCompleted: false,
            transitToNext: {
              type: 'mrt',
              duration: '12 mins',
              instruction: 'Take Downtown Line from Bugis (DT14) to Fort Canning (DT20) or Clarke Quay (NE5).',
              fareSgd: 1.15,
            },
          },
          {
            id: 'stop-2-5',
            placeId: 'clarke-quay-river-cruise',
            title: 'Clarke Quay Sunset & Singapore River Cruise',
            category: 'Entertainment',
            timeSlot: '06:30 PM',
            duration: '2 hrs',
            costSgd: 28,
            location: 'Clarke Quay Jetty',
            nearestMrt: 'Clarke Quay MRT (NE5)',
            notes: 'Board the 40-minute traditional wooden bumboat just as evening lights illuminate the skyline.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'day-3',
        dayNumber: 3,
        dateStr: 'Day 3',
        title: 'Sentosa Sun, Island Thrills & Jewel Changi Finale',
        themeArea: 'Sentosa & Changi Hub',
        weatherAdvice: 'Sunny coastal breeze at Sentosa; clear evening at Changi Airport.',
        stops: [
          {
            id: 'stop-3-1',
            placeId: 'singapore-botanic-gardens',
            title: 'Morning Walk at Singapore Botanic Gardens',
            category: 'Nature & Parks',
            timeSlot: '08:00 AM',
            duration: '2 hrs',
            costSgd: 15,
            location: '1 Cluny Rd',
            nearestMrt: 'Botanic Gardens MRT (CC19 / DT9)',
            notes: 'Peaceful stroll through 160-year-old tropical gardens and the VIP Orchid Pavilion.',
            isCompleted: false,
            transitToNext: {
              type: 'mrt',
              duration: '22 mins',
              instruction: 'Take Circle Line from Botanic Gardens (CC19) south to HarbourFront (CC29).',
              fareSgd: 1.75,
            },
          },
          {
            id: 'stop-3-2',
            placeId: 'universal-studios-singapore',
            title: 'Sentosa Island (USS or S.E.A. Aquarium)',
            category: 'Entertainment',
            timeSlot: '11:00 AM',
            duration: '4.5 hrs',
            costSgd: 65,
            location: 'Resorts World Sentosa',
            nearestMrt: 'HarbourFront MRT -> Sentosa Express',
            notes: 'Experience world-class marine life at S.E.A. Aquarium and have lunch at Malaysian Food Street.',
            isCompleted: false,
            transitToNext: {
              type: 'mrt',
              duration: '45 mins',
              instruction: 'Take North-East Line from HarbourFront to Outram Park, transfer to East-West Line to Changi Airport (CG2).',
              fareSgd: 2.15,
            },
          },
          {
            id: 'stop-3-3',
            placeId: 'jewel-changi-rain-vortex',
            title: 'Jewel Changi HSBC Rain Vortex & Canopy Park',
            category: 'Sightseeing',
            timeSlot: '06:00 PM',
            duration: '3 hrs',
            costSgd: 0,
            location: '78 Airport Blvd',
            nearestMrt: 'Changi Airport MRT (CG2)',
            notes: 'Spectacular 40m indoor waterfall light show at 8:00 PM. Perfect send-off before departure flight!',
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: '2-day-foodie-trail',
    title: '2-Day Ultimate Foodie & Hawker Trail',
    subtitle: 'Taste Singapore’s UNESCO-recognized hawker cuisine, hidden alley gems, and Michelin-bib gourmand spots.',
    totalDays: 2,
    days: [
      {
        id: 'food-day-1',
        dayNumber: 1,
        dateStr: 'Day 1',
        title: 'Chinatown, Old Airport Road & Night Satay Feast',
        themeArea: 'Chinatown & East Coast Food',
        weatherAdvice: 'Warm; make sure to stay hydrated between food tastings!',
        stops: [
          {
            id: 'fstop-1',
            title: 'Tong Ah Eating House Crispy Kaya Toast',
            category: 'Food & Drinks',
            timeSlot: '08:30 AM',
            duration: '1 hr',
            costSgd: 6,
            location: '35 Keong Saik Rd',
            nearestMrt: 'Outram Park MRT (EW16 / NE3 / TE17)',
            notes: 'Famous crispy thin toast and traditional kopi brewed in claypots since 1939.',
            isCompleted: false,
          },
          {
            id: 'fstop-2',
            placeId: 'maxwell-food-centre',
            title: 'Maxwell Food Centre Hawker Feast',
            category: 'Food & Drinks',
            timeSlot: '11:45 AM',
            duration: '1.5 hrs',
            costSgd: 14,
            location: '1 Kadayanallur St',
            nearestMrt: 'Maxwell MRT (TE18)',
            notes: 'Tian Tian Chicken Rice, Popiah (fresh spring rolls), and Sugar Cane with Lemon.',
            isCompleted: false,
          },
          {
            id: 'fstop-3',
            title: 'Old Airport Road Hawker Centre (Afternoon Snack)',
            category: 'Food & Drinks',
            timeSlot: '03:30 PM',
            duration: '1.5 hrs',
            costSgd: 10,
            location: '51 Old Airport Rd',
            nearestMrt: 'Dakota MRT (CC8)',
            notes: 'Sample legendary Nam Sing Hokkien Mee and Lao Ban Soya Beancurd dessert.',
            isCompleted: false,
          },
          {
            id: 'fstop-4',
            placeId: 'lau-pa-sat-satay',
            title: 'Satay Street at Lau Pa Sat',
            category: 'Food & Drinks',
            timeSlot: '07:30 PM',
            duration: '2 hrs',
            costSgd: 22,
            location: '18 Raffles Quay',
            nearestMrt: 'Telok Ayer MRT (DT18)',
            notes: 'Sizzling chicken, beef, and prawn satays with ice cold Tiger Beer on closed street.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'food-day-2',
        dayNumber: 2,
        dateStr: 'Day 2',
        title: 'Katong Laksa, Geylang Serai & Kampong Glam',
        themeArea: 'Peranakan & Malay Flavours',
        weatherAdvice: 'Mild humidity; perfect afternoon for Peranakan desserts.',
        stops: [
          {
            id: 'fstop-5',
            title: '328 Katong Laksa (Breakfast)',
            category: 'Food & Drinks',
            timeSlot: '09:00 AM',
            duration: '1 hr',
            costSgd: 9,
            location: '51 E Coast Rd, Singapore 428770',
            nearestMrt: 'Marine Parade MRT (TEL TE26)',
            notes: 'Iconic spicy coconut soup noodles eaten with spoon only! Served with spicy Otah.',
            isCompleted: false,
          },
          {
            id: 'fstop-6',
            title: 'Geylang Serai Market & Nasi Padang',
            category: 'Food & Drinks',
            timeSlot: '12:30 PM',
            duration: '1.5 hrs',
            costSgd: 12,
            location: '1 Geylang Serai',
            nearestMrt: 'Paya Lebar MRT (EW8 / CC9)',
            notes: 'Try authentic Beef Rendang, Sambal Goreng, and sweet Chendol dessert.',
            isCompleted: false,
          },
          {
            id: 'fstop-7',
            title: 'Singapore Zam Zam (Murtabak Dinner)',
            category: 'Food & Drinks',
            timeSlot: '06:30 PM',
            duration: '1.5 hrs',
            costSgd: 16,
            location: '697-699 North Bridge Rd',
            nearestMrt: 'Bugis MRT (EW12 / DT14)',
            notes: 'Historic Indian-Muslim institution established in 1908. Order the Deer or Mutton Murtabak.',
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: '4-day-family-wildlife',
    title: '4-Day Family Fun & Wildlife Safari',
    subtitle: 'Perfect for families with kids: Singapore Zoo, River Wonders, Sentosa beach clubs, and interactive science.',
    totalDays: 4,
    days: [
      {
        id: 'fam-day-1',
        dayNumber: 1,
        dateStr: 'Day 1',
        title: 'Marina Bay Wonders & Children’s Garden',
        themeArea: 'Marina Bay & Domes',
        weatherAdvice: 'Pleasant weather; pack spare swim clothes for Far East Organization Children’s Garden splash pad.',
        stops: [
          {
            id: 'fam-1',
            placeId: 'gardens-by-the-bay',
            title: 'Gardens by the Bay & Children’s Water Playground',
            category: 'Nature & Parks',
            timeSlot: '09:30 AM',
            duration: '3 hrs',
            costSgd: 32,
            location: '18 Marina Gardens Dr',
            nearestMrt: 'Gardens by the Bay MRT (TE22)',
            notes: 'Explore Flower Dome and let kids play in the interactive water splash play zone (Free).',
            isCompleted: false,
          },
          {
            id: 'fam-2',
            title: 'ArtScience Museum (Future World: Where Art Meets Science)',
            category: 'Entertainment',
            timeSlot: '02:30 PM',
            duration: '2 hrs',
            costSgd: 28,
            location: '6 Bayfront Ave',
            nearestMrt: 'Bayfront MRT (DT16 / CE1)',
            notes: 'Immersive interactive digital light installation created with teamLab. Kids love drawing sea creatures that swim on wall.',
            isCompleted: false,
          },
          {
            id: 'fam-3',
            title: 'Spectra Light & Water Show at MBS Promenade',
            category: 'Sightseeing',
            timeSlot: '08:00 PM',
            duration: '30 mins',
            costSgd: 0,
            location: 'Event Plaza, Marina Bay Sands',
            nearestMrt: 'Bayfront MRT (DT16 / CE1)',
            notes: 'Free 15-minute outdoor laser, fountain, and orchestral light spectacle on the bay.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'fam-day-2',
        dayNumber: 2,
        dateStr: 'Day 2',
        title: 'Mandai Wildlife Safari (Zoo & River Wonders)',
        themeArea: 'Mandai Wildlife Reserve',
        weatherAdvice: 'Sunny; apply mosquito repellent and bring hat & water bottles.',
        stops: [
          {
            id: 'fam-4',
            placeId: 'singapore-zoo-mandai',
            title: 'Singapore Zoo & Tram Ride',
            category: 'Nature & Parks',
            timeSlot: '09:00 AM',
            duration: '3.5 hrs',
            costSgd: 48,
            location: '80 Mandai Lake Rd',
            nearestMrt: 'Khatib MRT (NS14) Shuttle',
            notes: 'Feed the giraffes at 10:45 AM and watch the Sea Lion show at Shaw Amphitheatre.',
            isCompleted: false,
          },
          {
            id: 'fam-5',
            title: 'River Wonders & Giant Panda Forest (Jia Jia & Kai Kai)',
            category: 'Nature & Parks',
            timeSlot: '01:30 PM',
            duration: '2.5 hrs',
            costSgd: 42,
            location: '80 Mandai Lake Rd',
            nearestMrt: 'Khatib MRT (NS14) Shuttle',
            notes: 'Air-conditioned Panda habitat and the Amazon River Quest boat ride.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'fam-day-3',
        dayNumber: 3,
        dateStr: 'Day 3',
        title: 'Universal Studios Singapore & Beach Fun',
        themeArea: 'Sentosa Island',
        weatherAdvice: 'Sunny tropical island breeze.',
        stops: [
          {
            id: 'fam-6',
            placeId: 'universal-studios-singapore',
            title: 'Universal Studios Singapore',
            category: 'Entertainment',
            timeSlot: '10:00 AM',
            duration: '5 hrs',
            costSgd: 83,
            location: 'Resorts World Sentosa',
            nearestMrt: 'HarbourFront MRT -> Sentosa Express',
            notes: 'Transformers 3D ride, Minion Land, and Sesame Street spaghetti space chase.',
            isCompleted: false,
          },
          {
            id: 'fam-7',
            placeId: 'sentosa-siloso-beach',
            title: 'Sentosa Siloso Beach & Luge Ride',
            category: 'Entertainment',
            timeSlot: '04:30 PM',
            duration: '2.5 hrs',
            costSgd: 30,
            location: 'Siloso Beach Walk',
            nearestMrt: 'Beach Station (Sentosa Express)',
            notes: 'Skyline Luge 3-ride combo and watch the Wings of Time fireworks show at 7:40 PM.',
            isCompleted: false,
          },
        ],
      },
      {
        id: 'fam-day-4',
        dayNumber: 4,
        dateStr: 'Day 4',
        title: 'Singapore Flyer & Jewel Changi Canopy Park',
        themeArea: 'Civic Bay & Changi',
        weatherAdvice: 'Pleasant morning, air-conditioned indoor afternoon.',
        stops: [
          {
            id: 'fam-8',
            title: 'Singapore Flyer Giant Observation Wheel',
            category: 'Sightseeing',
            timeSlot: '10:00 AM',
            duration: '1.5 hrs',
            costSgd: 40,
            location: '30 Raffles Ave',
            nearestMrt: 'Promenade MRT (CC4 / DT15)',
            notes: '30-minute rotation inside 165m high air-conditioned capsule with audio guide.',
            isCompleted: false,
          },
          {
            id: 'fam-9',
            placeId: 'jewel-changi-rain-vortex',
            title: 'Jewel Changi (Canopy Park, Bouncing Nets & Waterfall)',
            category: 'Entertainment',
            timeSlot: '02:00 PM',
            duration: '3.5 hrs',
            costSgd: 18,
            location: '78 Airport Blvd',
            nearestMrt: 'Changi Airport MRT (CG2)',
            notes: 'Kids love the Manulife Bouncing Nets, Discovery Slides, and Foggy Bowls.',
            isCompleted: false,
          },
        ],
      },
    ],
  },
];

// Helper to convert VisitSingaporeItinerary into a rich, editable TripItinerary for the Interactive Planner
export function convertStbItineraryToTrip(stbItinerary: {
  id: string;
  title: string;
  durationDays: number;
  badge: string;
  summary: string;
  suitableFor: string;
  days: {
    dayNumber: number;
    theme: string;
    morning: { title: string; desc: string; location: string };
    afternoon: { title: string; desc: string; location: string };
    evening: { title: string; desc: string; location: string };
    insiderTip?: string;
  }[];
}): TripItinerary {
  // Mapping of common locations to MRT and place category
  const inferMrt = (locationStr: string, titleStr: string): { nearestMrt: string; category: ItineraryCategory; cost: number; placeId?: string } => {
    const text = `${locationStr} ${titleStr}`.toLowerCase();
    if (text.includes('kampong gelam') || text.includes('zam zam') || text.includes('haji lane') || text.includes('sultan mosque') || text.includes('bugis')) {
      return { nearestMrt: 'Bugis MRT (EW12 / DT14)', category: 'Culture & Heritage', cost: text.includes('zam zam') ? 14 : 0, placeId: 'kampong-glam-haji-lane' };
    }
    if (text.includes('chinatown') || text.includes('buddha tooth') || text.includes('maxwell') || text.includes('tong heng')) {
      return { nearestMrt: 'Chinatown (NE4/DT19) / Maxwell (TE18)', category: 'Culture & Heritage', cost: text.includes('maxwell') || text.includes('food') ? 12 : 0, placeId: 'chinatown-heritage-trail' };
    }
    if (text.includes('little india') || text.includes('tekka') || text.includes('tan teng niah')) {
      return { nearestMrt: 'Little India MRT (NE7 / DT12)', category: 'Culture & Heritage', cost: text.includes('tekka') ? 10 : 0 };
    }
    if (text.includes('gardens by the bay') || text.includes('cloud forest') || text.includes('flower dome') || text.includes('supertree')) {
      return { nearestMrt: 'Gardens by the Bay (TE22) / Bayfront (DT16)', category: 'Nature & Parks', cost: 32, placeId: 'gardens-by-the-bay' };
    }
    if (text.includes('marina bay sands') || text.includes('skypark')) {
      return { nearestMrt: 'Bayfront MRT (DT16 / CE1)', category: 'Sightseeing', cost: 30, placeId: 'marina-bay-sands-skypark' };
    }
    if (text.includes('merlion') || text.includes('helix') || text.includes('waterfront')) {
      return { nearestMrt: 'Raffles Place (NS26/EW14) / Bayfront', category: 'Sightseeing', cost: 0, placeId: 'merlion-park' };
    }
    if (text.includes('lau pa sat') || text.includes('satay')) {
      return { nearestMrt: 'Telok Ayer (DT18) / Downtown (DT17)', category: 'Food & Drinks', cost: 20, placeId: 'lau-pa-sat-satay' };
    }
    if (text.includes('sentosa') || text.includes('universal') || text.includes('siloso') || text.includes('s.e.a.')) {
      return { nearestMrt: 'HarbourFront MRT -> Sentosa Express', category: 'Entertainment', cost: text.includes('universal') ? 83 : 10, placeId: 'universal-studios-singapore' };
    }
    if (text.includes('botanic') || text.includes('orchid')) {
      return { nearestMrt: 'Botanic Gardens MRT (CC19 / DT9)', category: 'Nature & Parks', cost: 15, placeId: 'singapore-botanic-gardens' };
    }
    if (text.includes('zoo') || text.includes('river wonders') || text.includes('night safari') || text.includes('bird paradise') || text.includes('mandai')) {
      return { nearestMrt: 'Khatib MRT (NS14) + Mandai Shuttle Bus', category: 'Nature & Parks', cost: 48, placeId: 'singapore-zoo-mandai' };
    }
    if (text.includes('jewel') || text.includes('changi') || text.includes('rain vortex')) {
      return { nearestMrt: 'Changi Airport MRT (CG2)', category: 'Sightseeing', cost: 0, placeId: 'jewel-changi-rain-vortex' };
    }
    if (text.includes('orchard') || text.includes('design orchard') || text.includes('ion')) {
      return { nearestMrt: 'Orchard MRT (NS22 / TE14)', category: 'Shopping', cost: 15, placeId: 'orchard-road-shopping' };
    }
    if (text.includes('clarke quay') || text.includes('river cruise') || text.includes('boat quay')) {
      return { nearestMrt: 'Clarke Quay MRT (NE5)', category: 'Entertainment', cost: 28, placeId: 'clarke-quay-river-cruise' };
    }
    if (text.includes('katong') || text.includes('joo chiat') || text.includes('peranakan') || text.includes('laksa')) {
      return { nearestMrt: 'Marine Parade MRT (TEL TE26)', category: 'Culture & Heritage', cost: 12, placeId: 'katong-joo-chiat' };
    }
    if (text.includes('southern ridges') || text.includes('henderson waves') || text.includes('mount faber') || text.includes('labrador')) {
      return { nearestMrt: 'HarbourFront MRT (NE1 / CC29)', category: 'Nature & Parks', cost: 0 };
    }
    if (text.includes('ubin') || text.includes('chek jawa')) {
      return { nearestMrt: 'Tanah Merah (EW4) + Bus 2 to Changi Point Ferry ($4 Bumboat)', category: 'Nature & Parks', cost: 14 };
    }
    if (text.includes('tiong bahru')) {
      return { nearestMrt: 'Tiong Bahru (EW17) / Havelock (TE16)', category: 'Food & Drinks', cost: 15 };
    }
    if (text.includes('national gallery') || text.includes('civic district') || text.includes('city hall')) {
      return { nearestMrt: 'City Hall MRT (NS25 / EW13)', category: 'Culture & Heritage', cost: 20, placeId: 'national-gallery-singapore' };
    }
    if (text.includes('bar') || text.includes('cocktail') || text.includes('atlas') || text.includes('jigger')) {
      return { nearestMrt: 'Bugis (EW12/DT14) / Tanjong Pagar (EW15)', category: 'Entertainment', cost: 35 };
    }
    if (text.includes('food') || text.includes('toast') || text.includes('kopi') || text.includes('seafood') || text.includes('crab')) {
      return { nearestMrt: 'City Hall / Raffles Place MRT', category: 'Food & Drinks', cost: 25 };
    }
    return { nearestMrt: 'Downtown / Bayfront MRT', category: 'Sightseeing', cost: 0 };
  };

  return {
    id: `stb-customized-${stbItinerary.id}-${Date.now()}`,
    title: stbItinerary.title,
    subtitle: stbItinerary.summary,
    totalDays: stbItinerary.durationDays,
    days: stbItinerary.days.map((d) => {
      const morningMeta = inferMrt(d.morning.location, d.morning.title);
      const afternoonMeta = inferMrt(d.afternoon.location, d.afternoon.title);
      const eveningMeta = inferMrt(d.evening.location, d.evening.title);

      const stops: ItineraryStop[] = [
        {
          id: `stb-d${d.dayNumber}-stop1-${Date.now()}`,
          placeId: morningMeta.placeId,
          title: d.morning.title,
          category: morningMeta.category,
          timeSlot: '09:00 AM',
          duration: '2.5 hrs',
          costSgd: morningMeta.cost,
          location: d.morning.location,
          nearestMrt: morningMeta.nearestMrt,
          notes: d.morning.desc,
          isCompleted: false,
          transitToNext: {
            type: 'mrt',
            duration: '15 mins',
            instruction: `Transit from ${d.morning.location} to ${d.afternoon.location} via MRT`,
            fareSgd: 1.45,
          },
        },
        {
          id: `stb-d${d.dayNumber}-stop2-${Date.now()}`,
          placeId: afternoonMeta.placeId,
          title: d.afternoon.title,
          category: afternoonMeta.category,
          timeSlot: '01:30 PM',
          duration: '3.5 hrs',
          costSgd: afternoonMeta.cost,
          location: d.afternoon.location,
          nearestMrt: afternoonMeta.nearestMrt,
          notes: d.afternoon.desc,
          isCompleted: false,
          transitToNext: {
            type: 'mrt',
            duration: '20 mins',
            instruction: `Transit from ${d.afternoon.location} to ${d.evening.location}`,
            fareSgd: 1.65,
          },
        },
        {
          id: `stb-d${d.dayNumber}-stop3-${Date.now()}`,
          placeId: eveningMeta.placeId,
          title: d.evening.title,
          category: eveningMeta.category,
          timeSlot: '06:30 PM',
          duration: '2.5 hrs',
          costSgd: eveningMeta.cost,
          location: d.evening.location,
          nearestMrt: eveningMeta.nearestMrt,
          notes: d.evening.desc,
          isCompleted: false,
        },
      ];

      return {
        id: `stb-day-${d.dayNumber}-${Date.now()}`,
        dayNumber: d.dayNumber,
        dateStr: `Day ${d.dayNumber}`,
        title: `Day ${d.dayNumber}: ${d.theme}`,
        themeArea: d.theme,
        weatherAdvice: d.insiderTip ? `STB Insider Tip: ${d.insiderTip}` : 'Partly sunny, tropical afternoon warmth.',
        stops,
      };
    }),
  };
}

