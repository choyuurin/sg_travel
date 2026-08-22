import { Attraction, Article, MrtStation, CurrencyRate, WifiHotspot, WeatherForecast } from '../types';

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAx4JLnZ0BtIpvtPu_YiFErzUw0ruolJp-vpHzxHRE4qkri5V7rfBIe65EvsACM56pPx97n8tF4bevPMOb6dfZA05eqSjPv-dr22P3P5175YyfcAhLoSkpKrXO0g03sCD-tWjSyAMjHpl0mz23CZ6zoXm3f5AnHaJs-xE7zh1pTnqv9SQUHz6gE75yGWnWI1ShyhkdGkV1aMvhM1aJNRys0ZYj616yDL5J01qsOxUnDulvhcafQZhCRw';

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'gardens-by-the-bay',
    name: 'Gardens by the Bay',
    category: 'Nature',
    tag: 'Nature',
    tagType: 'tertiary',
    rating: 4.9,
    reviewsCount: '12.4k reviews',
    reviewCountNumber: 12400,
    shortDescription: 'Explore the futuristic waterfront garden featuring the iconic Supertree Grove and Cloud Forest.',
    fullDescription: 'Gardens by the Bay is a world-renowned, 101-hectare nature park sanctuary in Singapore’s Marina Bay district. Renowned for its architectural wonder and botanical diversity, it features towering Supertrees wrapped in vertical flora, the climate-controlled Cloud Forest with the world’s tallest indoor waterfall, and the Flower Dome showcasing plants from Mediterranean and semi-arid subtropical regions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ySaplpS0yfc8R58aOCD7x6A0Z5M0Lcfa3vi47Y5fr5ReoLSSnJsbEgGi0m7FxGvr7nxdld4xYxv4Q1LO_aUkM_QkPE572_iZ9ioR_23NWTxr0Uuv1mC2uhhEr4hAKyX9N2kSaiu791s8Awt0_g2VSJOThwbEw43a01MJCb_1fz3IJ6m472G3bBpB-AFSHbcPP862oXfkQ7N9wDcuheQKiQayOjG8dmMAqQL7bG04LNajN7JWGMaCjQ',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ySaplpS0yfc8R58aOCD7x6A0Z5M0Lcfa3vi47Y5fr5ReoLSSnJsbEgGi0m7FxGvr7nxdld4xYxv4Q1LO_aUkM_QkPE572_iZ9ioR_23NWTxr0Uuv1mC2uhhEr4hAKyX9N2kSaiu791s8Awt0_g2VSJOThwbEw43a01MJCb_1fz3IJ6m472G3bBpB-AFSHbcPP862oXfkQ7N9wDcuheQKiQayOjG8dmMAqQL7bG04LNajN7JWGMaCjQ',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80'
    ],
    weatherPhotos: {
      sunny: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7ySaplpS0yfc8R58aOCD7x6A0Z5M0Lcfa3vi47Y5fr5ReoLSSnJsbEgGi0m7FxGvr7nxdld4xYxv4Q1LO_aUkM_QkPE572_iZ9ioR_23NWTxr0Uuv1mC2uhhEr4hAKyX9N2kSaiu791s8Awt0_g2VSJOThwbEw43a01MJCb_1fz3IJ6m472G3bBpB-AFSHbcPP862oXfkQ7N9wDcuheQKiQayOjG8dmMAqQL7bG04LNajN7JWGMaCjQ',
      rainy: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      authenticReviewer: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      reviewerName: 'Vincent K. (Google Local Guide • Level 7)',
      reviewSnippet: 'Rainy days make the Cloud Forest waterfall feel even cozier and magical! Super easy to get tickets on mobile, zero lines at turnstiles.'
    },
    location: '18 Marina Gardens Dr, Singapore 018953',
    area: 'Marina Bay',
    nearestMrt: {
      stationName: 'Gardens by the Bay MRT',
      lineCode: 'TEL TE22',
      lineColor: '#9D5B25',
      exitInfo: 'Exit 1 (Direct underground connection)',
      walkMinutes: 2
    },
    openingHours: 'Outdoor Gardens: 5:00 AM – 2:00 AM | Domes: 9:00 AM – 9:00 PM',
    admission: 'Outdoor Gardens: Free | Conservatories: ~$20–$53 SGD',
    tips: [
      'Catch the Garden Rhapsody light & sound show daily at 7:45 PM and 8:45 PM (free to watch beneath the Supertrees).',
      'Bring a light cardigan for the Cloud Forest and Flower Dome, which are chilled to 23°C–25°C.',
      'Book tickets online via official portal to skip the ticket booth queues.'
    ],
    highlights: ['Supertree Grove', 'Cloud Forest Waterfall', 'OCBC Skyway', 'Flower Dome', 'Floral Fantasy'],
    
    // Live Availability & Spontaneous Booking
    availabilityStatus: 'available',
    remainingQuota: 24,
    nextEntrySlot: 'Immediate (Next slot: 15 mins)',
    isLowPlanningRecommended: true,
    isIndoorWeatherProof: true,
    
    ticketTiers: [
      {
        id: 'gbb-standard-domes',
        name: 'Two Conservatories Pass (Cloud Forest + Flower Dome)',
        description: 'Direct mobile QR turnstile entry to both temperature-controlled conservatories. Best for all weather conditions.',
        priceSgd: 32,
        originalPriceSgd: 36,
        inclusions: ['Full access to Cloud Forest 35m Waterfall', 'Flower Dome floral exhibits', 'Air-conditioned 24°C indoor comfort', 'Instant mobile e-barcode'],
        remainingCount: 18,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Adult ticket (Ages 13+). Children under 3 enter free with accompanying adult.'
      },
      {
        id: 'gbb-all-access',
        name: 'All-Access Explorer (Domes + OCBC Skyway)',
        description: 'Includes Cloud Forest, Flower Dome, and high-altitude walk among the Supertree canopy at OCBC Skyway.',
        priceSgd: 44,
        originalPriceSgd: 50,
        inclusions: ['Cloud Forest & Waterfall', 'Flower Dome', 'OCBC Skyway Aerial Walkway (22m high)', 'Priority digital lane'],
        remainingCount: 6,
        availabilityLevel: 'low',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Limited high-level time slots remaining today.'
      },
      {
        id: 'gbb-child-pass',
        name: 'Child Explorer Pass (Ages 3–12)',
        description: 'Discounted admission for young explorers to both conservatories + educational botanical trail booklet.',
        priceSgd: 20,
        originalPriceSgd: 24,
        inclusions: ['Cloud Forest entry', 'Flower Dome entry', 'Free digital activity passport'],
        remainingCount: 35,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Valid for children aged 3 to 12. Proof of age may be verified at entrance.'
      }
    ],

    bundleOffers: [
      {
        id: 'bundle-bay-duo',
        badge: 'Best Value Duo',
        title: 'Marina Bay Dual Pass (Gardens Conservatories + MBS SkyPark)',
        priceSgd: 54,
        originalPriceSgd: 68,
        discountPercent: 21,
        plainLanguageSummary: 'Experience Singapore’s top two icons together: wander the indoor Cloud Forest waterfall and take in 360° panoramic skyline views from the MBS rooftop.',
        qualifyingConditions: [
          'Open to all visitors without resident restrictions.',
          'Flexible 30-day validity — visit both attractions on the same day or different days.',
          'Direct barcode entry at turnstiles; no voucher exchange counter required.',
          '100% full refund or date swap if heavy rain closes the MBS outdoor observation deck.'
        ],
        includedPlaces: ['Gardens by the Bay Conservatories', 'Marina Bay Sands SkyPark Observation Deck'],
        remainingCount: 14,
        isSpontaneousChoice: true
      },
      {
        id: 'bundle-spontaneous-rainproof',
        badge: 'Spontaneous Weather-Proof',
        title: 'Rain & Shine Comfort Pass (Domes + Jewel Canopy Park)',
        priceSgd: 42,
        originalPriceSgd: 54,
        discountPercent: 22,
        plainLanguageSummary: 'Zero stress about Singapore’s tropical downpours — seamless access to the world’s two grandest indoor forest domes and waterfalls.',
        qualifyingConditions: [
          'Guaranteed 100% indoor air-conditioned access throughout.',
          'Valid anytime during operating hours with open time slots.',
          'Instant QR delivery straight to your device wallet.'
        ],
        includedPlaces: ['Gardens by the Bay Domes', 'Jewel Changi Canopy Park & Hedge Maze'],
        remainingCount: 22,
        isSpontaneousChoice: true
      }
    ],

    inlineTerms: {
      cancellation: 'Free cancellation up to 2 hours before chosen entry slot for 100% refund in SGD.',
      validity: 'Pass is valid for 30 calendar days from selected travel date.',
      entryRequirements: 'Show digital QR barcode directly on phone screen at turnstile. Physical printout not required.',
      rainyDayPolicy: 'Conservatories are fully enclosed and climate-controlled (24°C). Rain does not affect your visit.',
      childSeniorPolicy: 'Children aged 0–2 enter free of charge without a ticket. Seniors aged 60+ receive on-site concession.'
    },

    dataSources: {
      liveFeeds: ['NEA Singapore 2-Hour Weather API (Marina Bay Station)', 'OneMap SLA Geospatial Coordinates', 'LTA Marina Bay Footfall & Carpark API'],
      estimatedFeeds: ['Predictive crowd density index based on time-of-day historical foot traffic', 'Conservatory queue wait time estimation']
    }
  },
  {
    id: 'marina-bay-sands',
    name: 'Marina Bay Sands & SkyPark',
    category: 'Luxury',
    tag: 'Luxury',
    tagType: 'luxury',
    rating: 4.8,
    reviewsCount: '15.1k reviews',
    reviewCountNumber: 15100,
    shortDescription: 'Experience luxury at its finest with the iconic rooftop SkyPark, panoramic views, and premium shopping.',
    fullDescription: 'Marina Bay Sands is Singapore’s premier integrated luxury resort. Designed by famed architect Moshe Safdie, it features three 55-story hotel towers connected by the breathtaking Sands SkyPark 200 meters in the air. Visitors can explore The Shoppes with indoor canals, world-class celebrity chef restaurants, the ArtScience Museum shaped like a lotus blossom, and the Spectra light & water show on the promenade.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBthnP8RiG9JXPLdGWXqC8gmaJW1XEie7eeakyuZdFZJIdGotgnil9ohpdjlMZiSI62gWqAIHMmJ7t68OwS8gIjsS9WmXkAI2-xcI_geYsCFL5gKZcbq3u4xHW5R_PhezaNXFUyZvfH2Ocy6RRmpD2eczbioYSWzhnawH_FU9Hw0u97K-hPscYnlkpXX30p0PvrTEW055779cLcQEau10pDRzKosuS_QleEPM2xPi_dNCrjfYGuwdMmIA',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBthnP8RiG9JXPLdGWXqC8gmaJW1XEie7eeakyuZdFZJIdGotgnil9ohpdjlMZiSI62gWqAIHMmJ7t68OwS8gIjsS9WmXkAI2-xcI_geYsCFL5gKZcbq3u4xHW5R_PhezaNXFUyZvfH2Ocy6RRmpD2eczbioYSWzhnawH_FU9Hw0u97K-hPscYnlkpXX30p0PvrTEW055779cLcQEau10pDRzKosuS_QleEPM2xPi_dNCrjfYGuwdMmIA',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80'
    ],
    weatherPhotos: {
      sunny: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBthnP8RiG9JXPLdGWXqC8gmaJW1XEie7eeakyuZdFZJIdGotgnil9ohpdjlMZiSI62gWqAIHMmJ7t68OwS8gIjsS9WmXkAI2-xcI_geYsCFL5gKZcbq3u4xHW5R_PhezaNXFUyZvfH2Ocy6RRmpD2eczbioYSWzhnawH_FU9Hw0u97K-hPscYnlkpXX30p0PvrTEW055779cLcQEau10pDRzKosuS_QleEPM2xPi_dNCrjfYGuwdMmIA',
      rainy: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
      authenticReviewer: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=80',
      reviewerName: 'Chloe D. (Solo Traveler)',
      reviewSnippet: 'Sunset at 6:45 PM is spectacular. Even with passing cloud cover, the skyline reflections on the bay are unbeatable.'
    },
    location: '10 Bayfront Ave, Singapore 018956',
    area: 'Marina Bay',
    nearestMrt: {
      stationName: 'Bayfront MRT',
      lineCode: 'DTL DT16 / CCL CE1',
      lineColor: '#005EC4',
      exitInfo: 'Exit C & D (Direct to The Shoppes)',
      walkMinutes: 1
    },
    openingHours: 'SkyPark Observation Deck: 11:00 AM – 9:00 PM | Mall: 10:00 AM – 10:00 PM',
    admission: 'Mall & Promenade: Free | SkyPark Observation Deck: ~$32 SGD',
    tips: [
      'The Infinity Pool is strictly reserved for hotel guests, but the SkyPark Observation Deck and CÉ LA VI rooftop bar offer the same iconic panoramic views.',
      'Watch Spectra, the 15-minute free outdoor light and water show, at 8:00 PM and 9:00 PM (plus 10:00 PM on Fri/Sat) at the Event Plaza.',
      'Sampan rides along the indoor canal run daily from 11:00 AM.'
    ],
    highlights: ['SkyPark Observation Deck', 'The Shoppes Luxury Mall', 'ArtScience Museum', 'Sampan Canal Rides', 'Celebrity Chef Dining'],
    
    availabilityStatus: 'available',
    remainingQuota: 12,
    nextEntrySlot: 'Next open slot: 4:30 PM (Sunset peak approaching)',
    isLowPlanningRecommended: true,
    isIndoorWeatherProof: false,

    ticketTiers: [
      {
        id: 'mbs-skypark-standard',
        name: 'Sands SkyPark Observation Deck (Level 57)',
        description: 'Panoramic 360-degree open-air observation deck entry overlooking Marina Bay, Gardens by the Bay, and Singapore Strait.',
        priceSgd: 32,
        originalPriceSgd: 35,
        inclusions: ['Direct elevator access to 57th Floor', '360° SkyPark observation deck', 'Free downloadable digital souvenir photos', 'Mobile barcode fast lane'],
        remainingCount: 12,
        availabilityLevel: 'low',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Standard admission for all ages 13+. Free for toddlers under 2.'
      },
      {
        id: 'mbs-artscience-single',
        name: 'ArtScience Museum: Future World Exhibition',
        description: 'Immersive interactive digital art installations created in collaboration with teamLab.',
        priceSgd: 28,
        originalPriceSgd: 30,
        inclusions: ['Full access to Future World: Where Art Meets Science', 'Interactive digital light slide and crystal universe', 'Climate-controlled museum galleries'],
        remainingCount: 20,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Timed-entry pass to maintain comfortable visitor flow.'
      }
    ],

    bundleOffers: [
      {
        id: 'bundle-sky-art',
        badge: 'Top Cultural Luxury',
        title: 'MBS Iconic Experience (SkyPark + ArtScience Museum)',
        priceSgd: 52,
        originalPriceSgd: 65,
        discountPercent: 20,
        plainLanguageSummary: 'Combine open-air high-altitude views at the SkyPark with futuristic interactive art inside the ArtScience Museum.',
        qualifyingConditions: [
          'Valid for single entry to both venues on your chosen date or up to 14 days later.',
          'ArtScience Museum is 100% weather-proof; SkyPark includes free bad-weather swap guarantee.',
          'No booking fee or hidden service surcharges.'
        ],
        includedPlaces: ['Sands SkyPark Deck', 'ArtScience Museum teamLab Exhibition'],
        remainingCount: 8,
        isSpontaneousChoice: true
      }
    ],

    inlineTerms: {
      cancellation: 'Full refund if cancelled at least 4 hours before your selected entry window.',
      validity: 'Valid for 14 days from purchase timestamp.',
      entryRequirements: 'Present digital e-ticket barcode at Tower 3 basement concourse elevators.',
      rainyDayPolicy: 'If thunder/heavy rain temporarily suspends the outdoor deck, passes are automatically converted to open-dated vouchers valid for 6 months or fully refunded on request.',
      childSeniorPolicy: 'Children under 2 enter free. Singapore Citizens & PRs can present NRIC for local rate.'
    },

    dataSources: {
      liveFeeds: ['NEA Marina Bay Weather & Lightning Alert Feed', 'SLA OneMap Geolocation Engine', 'LTA Downtown Line Station Crowding'],
      estimatedFeeds: ['Elevator wait time estimation', 'SkyPark terrace capacity index']
    }
  },
  {
    id: 'singapore-botanic-gardens',
    name: 'Singapore Botanic Gardens',
    category: 'Nature',
    tag: 'UNESCO Heritage',
    tagType: 'tertiary',
    rating: 4.9,
    reviewsCount: '9.8k reviews',
    reviewCountNumber: 9800,
    shortDescription: 'Singapore\'s first UNESCO World Heritage site featuring over 160 years of tropical botanical history.',
    fullDescription: 'The Singapore Botanic Gardens is a 165-year-old tropical garden located at the fringe of Singapore’s Orchard Road shopping district. It is the only tropical botanic garden on UNESCO’s World Heritage List. Highlights include the National Orchid Garden with over 1,000 species and 2,000 hybrids, the tranquil Swan Lake, the Rainforest boardwalk, and the Jacob Ballas Children’s Garden.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7_NOaphyZzR02X5Khu0P6-MGgta_itt45wdKi2fSVct14jWAvErO1GIgVja0NSUxWL_WS8Gki9jPrwWEPhbhXZyrqun0voNLz3a2tTiql_J0hhOWSVaE6v4EBj9RQluNvszJi14ht4plhyqwj00GxN1MD5OQqLBRKkC1eK5owT4EXoygF0MQusGrdlzFUkJZGmp7vzbIJX2WiD_uqt4yNYF_sOgr4KCjvicbNNloMO9WroguGJ2xWA',
    weatherPhotos: {
      sunny: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7_NOaphyZzR02X5Khu0P6-MGgta_itt45wdKi2fSVct14jWAvErO1GIgVja0NSUxWL_WS8Gki9jPrwWEPhbhXZyrqun0voNLz3a2tTiql_J0hhOWSVaE6v4EBj9RQluNvszJi14ht4plhyqwj00GxN1MD5OQqLBRKkC1eK5owT4EXoygF0MQusGrdlzFUkJZGmp7vzbIJX2WiD_uqt4yNYF_sOgr4KCjvicbNNloMO9WroguGJ2xWA',
      rainy: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      authenticReviewer: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      reviewerName: 'Li Wei M. (Local Botanist & Photographer)',
      reviewSnippet: 'The main park is 100% free and open until midnight. If you visit, do not skip the National Orchid Garden — best $15 spent in SG.'
    },
    location: '1 Cluny Rd, Singapore 259569',
    area: 'Bukit Timah / Tanglin',
    nearestMrt: {
      stationName: 'Botanic Gardens MRT',
      lineCode: 'CCL CC19 / DTL DT9',
      lineColor: '#FA9E0D',
      exitInfo: 'Exit A (Directly at Bukit Timah Gate)',
      walkMinutes: 1
    },
    openingHours: 'Main Gardens: 5:00 AM – 12:00 Midnight Daily | Orchid Garden: 8:30 AM – 7:00 PM',
    admission: 'Main Gardens: Free | National Orchid Garden: $15 SGD (Adults)',
    tips: [
      'Visit in the early morning (7:00 AM – 9:00 AM) or late afternoon (4:30 PM – 6:30 PM) to avoid the midday equatorial heat.',
      'Rent a bike or bring a picnic mat for the Symphony Lake lawn where free weekend orchestra concerts frequently occur.',
      'Check out the VIP Orchid Garden featuring orchids named after Nelson Mandela, Princess Diana, and Barack Obama.'
    ],
    highlights: ['National Orchid Garden', 'Swan Lake & The Bandstand', 'Rainforest Trail', 'Symphony Lake', 'Ginger Garden'],
    
    availabilityStatus: 'free-entry',
    remainingQuota: 999,
    nextEntrySlot: 'Open Access (No booking required for main park)',
    isLowPlanningRecommended: true,
    isIndoorWeatherProof: false,

    ticketTiers: [
      {
        id: 'botanic-free-main',
        name: 'Botanic Gardens Grounds & Rainforest Pass',
        description: 'Full free access to 82 hectares of heritage lawns, Bandstand, Swan Lake, and ancient rainforest trail.',
        priceSgd: 0,
        inclusions: ['Free admission 365 days a year', 'Rainforest boardwalk', 'Swan Lake & Symphony Stage', 'Children’s Garden'],
        remainingCount: 999,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: false,
        qualificationNote: 'Free for everyone. No reservation or ticket needed.'
      },
      {
        id: 'botanic-orchid-garden',
        name: 'National Orchid Garden Express Entry',
        description: 'Access the world’s largest orchid display with 60,000+ blooms and the VIP Celebrity Orchid collection.',
        priceSgd: 15,
        originalPriceSgd: 15,
        inclusions: ['National Orchid Garden access', 'VIP & Celebrity Orchids Garden', 'Mist House & Sembcorp Cool House', 'Direct QR scanning'],
        remainingCount: 50,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Adult ticket. Students and Seniors (60+) pay $3 SGD on site with valid ID.'
      }
    ],

    inlineTerms: {
      cancellation: 'National Orchid Garden tickets refundable anytime prior to QR scanning.',
      validity: 'Valid for 90 days from purchase.',
      entryRequirements: 'Show e-barcode at National Orchid Garden entrance turnstiles. Main park requires no tickets.',
      rainyDayPolicy: 'Sheltered gazebos and visitor centers located every 300 meters along main paths.',
      childSeniorPolicy: 'Children under 12 enter Orchid Garden free when accompanied by a paying adult.'
    },

    dataSources: {
      liveFeeds: ['NEA Central Region Rain Radar', 'OneMap Singapore Green Space Directory'],
      estimatedFeeds: ['Walking trail footfall tracker']
    }
  },
  {
    id: 'jewel-changi-airport',
    name: 'Jewel Changi Airport',
    category: 'Icons',
    tag: 'Must Visit',
    tagType: 'secondary',
    rating: 4.9,
    reviewsCount: '24.2k reviews',
    reviewCountNumber: 24200,
    shortDescription: 'Marvel at the HSBC Rain Vortex, the world\'s tallest indoor waterfall surrounded by a lush forest valley.',
    fullDescription: 'Jewel Changi Airport is a multi-dimensional nature-themed retail and entertainment complex at Changi Airport. Designed by Moshe Safdie, its centerpiece is the jaw-dropping 40-meter-tall HSBC Rain Vortex cascading seven storeys through an oculus in the glass roof, surrounded by the four-storey Shiseido Forest Valley with over 2,000 trees.',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    weatherPhotos: {
      sunny: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      rainy: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      authenticReviewer: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      reviewerName: 'Marcus T. (Transit Traveler)',
      reviewSnippet: 'Best airport experience on earth. 100% indoors, air-conditioned, and luggage storage on Level 1 lets you roam hands-free.'
    },
    location: '78 Airport Blvd, Singapore 819666',
    area: 'Changi',
    nearestMrt: {
      stationName: 'Changi Airport MRT',
      lineCode: 'EWL CG2',
      lineColor: '#009645',
      exitInfo: 'Follow pedestrian links from Terminals 1, 2, or 3',
      walkMinutes: 3
    },
    openingHours: 'Forest Valley & Retail: Open 24/7 (Retail typically 10:00 AM – 10:00 PM)',
    admission: 'Rain Vortex & Forest Valley: Free | Canopy Park: ~$8–$18 SGD',
    tips: [
      'The Rain Vortex light & sound show runs every hour on the hour from 7:30 PM to 11:30 PM daily.',
      'Early check-in lounges are located on Level 1 so you can drop your luggage hours before your flight and shop unencumbered.',
      'Take the Skytrain between Terminal 2 and Terminal 3 for an unbelievable view slicing right through the waterfall dome!'
    ],
    highlights: ['HSBC Rain Vortex (40m Waterfall)', 'Shiseido Forest Valley', 'Canopy Park & Bouncing Nets', 'Hedge Maze', 'Changi Experience Studio'],

    availabilityStatus: 'available',
    remainingQuota: 45,
    nextEntrySlot: 'Immediate (Open 24/7)',
    isLowPlanningRecommended: true,
    isIndoorWeatherProof: true,

    ticketTiers: [
      {
        id: 'jewel-canopy-standard',
        name: 'Canopy Park General Admission (Level 5)',
        description: 'Includes Discovery Slides, Foggy Bowls, Petal Garden, and Topiary Walk overlooking the Rain Vortex.',
        priceSgd: 8,
        originalPriceSgd: 10,
        inclusions: ['Canopy Park full access', 'Discovery Slides', 'Foggy Bowls cloud play', 'Topiary photo displays'],
        remainingCount: 45,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Suitable for all ages. Flat shoes recommended for slides.'
      },
      {
        id: 'jewel-bouncing-nets',
        name: 'Canopy Park + Manulife Bouncing Nets Combo',
        description: 'Walk on air suspended 25 meters above the forest valley on giant suspended safety nets.',
        priceSgd: 24,
        originalPriceSgd: 28,
        inclusions: ['Canopy Park admission', '45-min Bouncing Nets session', 'Complimentary locker rental', 'Instant digital ticket'],
        remainingCount: 10,
        availabilityLevel: 'low',
        instantConfirmation: true,
        mobileEntry: true,
        qualificationNote: 'Minimum height requirement of 110cm.'
      }
    ],

    bundleOffers: [
      {
        id: 'bundle-transit-joy',
        badge: 'Best for Layover & Departure',
        title: 'Changi Transit & Play Bundle (Canopy Park + Experience Studio)',
        priceSgd: 26,
        originalPriceSgd: 34,
        discountPercent: 23,
        plainLanguageSummary: 'The ideal low-effort bundle before your flight: explore interactive aviation simulation games and relax by the Canopy Park garden.',
        qualifyingConditions: [
          'Valid on any day of your transit or flight departure.',
          'Early luggage drop facility located directly within Jewel concourse.',
          'Instant mobile barcode confirmation.'
        ],
        includedPlaces: ['Jewel Canopy Park', 'Changi Experience Studio'],
        remainingCount: 16,
        isSpontaneousChoice: true
      }
    ],

    inlineTerms: {
      cancellation: 'Cancel anytime up to 1 hour before selected entry for full SGD refund.',
      validity: 'Valid for 60 days from purchase date.',
      entryRequirements: 'Scan mobile barcode at Level 5 Canopy Park gates.',
      rainyDayPolicy: 'Jewel is 100% indoors inside a climate-controlled glass biome. Completely rain-proof.',
      childSeniorPolicy: 'Children below 3 enter free. Minimum height 110cm for specific adventure nets.'
    },

    dataSources: {
      liveFeeds: ['Changi Airport Group Flight & Passenger Transit Hub', 'OneMap Singapore SLA Directory'],
      estimatedFeeds: ['Canopy Bridge queue telemetry']
    }
  },
  {
    id: 'chinatown-singapore',
    name: 'Chinatown & Buddha Tooth Relic Temple',
    category: 'Culture',
    tag: 'Heritage',
    tagType: 'tertiary',
    rating: 4.7,
    reviewsCount: '11.3k reviews',
    reviewCountNumber: 11300,
    shortDescription: 'Immerse yourself in vibrant street markets, traditional shophouses, Michelin hawkers, and sacred temples.',
    fullDescription: 'Singapore’s Chinatown is a bustling historic district blending rich Chinese heritage with hip cocktail bars and traditional medicine shops. Highlights include the majestic Tang-dynasty style Buddha Tooth Relic Temple, Sri Mariamman Temple (Singapore’s oldest Hindu temple), and the lively Chinatown Street Market on Pagoda and Sago streets.',
    image: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=1200&q=80',
    weatherPhotos: {
      sunny: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=1200&q=80',
      rainy: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=1200&q=80',
      authenticReviewer: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=1200&q=80',
      reviewerName: 'Benjamin S. (Food & Heritage Enthusiast)',
      reviewSnippet: 'Free entry to the temple. Combined it with Maxwell Food Centre across the street for chicken rice — unbeatable Singapore day out!'
    },
    location: '288 South Bridge Rd, Singapore 058840',
    area: 'Chinatown / Outram',
    nearestMrt: {
      stationName: 'Chinatown MRT / Maxwell MRT',
      lineCode: 'DTL DT19 / NEL NE4 / TEL TE18',
      lineColor: '#9016B2',
      exitInfo: 'Exit A (Pagoda Street)',
      walkMinutes: 2
    },
    openingHours: 'Temple: 7:00 AM – 5:00 PM | Chinatown Street Market: 10:00 AM – 10:00 PM',
    admission: 'Free admission to temple and street markets',
    tips: [
      'Dress respectfully when visiting the Buddha Tooth Relic Temple (shoulders and knees must be covered; sarongs are provided at the entrance).',
      'Walk 2 minutes to Maxwell Food Centre for Tian Tian Hainanese Chicken Rice and Fuzhou Oyster Cakes.',
      'Head up to the 4th floor rooftop garden of the temple to spin the giant Tibetan prayer wheel.'
    ],
    highlights: ['Buddha Tooth Relic Temple', 'Chinatown Heritage Centre', 'Sri Mariamman Temple', 'Maxwell Food Centre', 'Keong Saik Road Bars'],

    availabilityStatus: 'free-entry',
    remainingQuota: 999,
    nextEntrySlot: 'Open Daily (No booking needed)',
    isLowPlanningRecommended: true,
    isIndoorWeatherProof: false,

    ticketTiers: [
      {
        id: 'chinatown-free-walk',
        name: 'Self-Guided Heritage Walk (Free Entry)',
        description: 'Explore the Tang-dynasty temple architecture, rooftop prayer wheel garden, and Pagoda street markets.',
        priceSgd: 0,
        inclusions: ['Buddha Tooth Relic Temple free entry', 'Sri Mariamman Temple visit', 'Complimentary temple sarong rental', 'Digital heritage audio map'],
        remainingCount: 999,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: false,
        qualificationNote: 'Free entry for all. Modest attire requested inside temple halls.'
      }
    ],

    bundleOffers: [
      {
        id: 'bundle-heritage-feasting',
        badge: 'Cultural Culinary Combo',
        title: 'Chinatown Explorer & Maxwell Hawker Dining Token',
        priceSgd: 18,
        originalPriceSgd: 24,
        discountPercent: 25,
        plainLanguageSummary: 'Includes digital self-guided walking commentary plus a $15 SGD food voucher valid across participating stalls at Maxwell & Chinatown Complex.',
        qualifyingConditions: [
          'Food vouchers accepted at participating stalls including Tian Tian & Fuzhou Oyster Cake.',
          'Valid for 14 days from purchase.',
          'No minimum spend requirement.'
        ],
        includedPlaces: ['Buddha Tooth Relic Temple', 'Maxwell Food Centre Dining Pass'],
        remainingCount: 20,
        isSpontaneousChoice: true
      }
    ],

    inlineTerms: {
      cancellation: 'Free cancellation on dining vouchers prior to redemption.',
      validity: 'Valid for 14 days.',
      entryRequirements: 'Shoulders and knees must be covered inside temple (complimentary sarongs provided).',
      rainyDayPolicy: 'Shophouse covered five-foot walkways provide shelter along streets during rain.',
      childSeniorPolicy: 'Family friendly. Stroller accessible elevators inside temple.'
    },

    dataSources: {
      liveFeeds: ['OneMap SLA Chinatown Heritage Geocoding', 'NEA Air Quality & Rain Radar'],
      estimatedFeeds: ['Maxwell Food Centre lunchtime crowd gauge']
    }
  },
  {
    id: 'kampong-glam-haji-lane',
    name: 'Kampong Glam & Haji Lane',
    category: 'Culture',
    tag: 'Hip & Historic',
    tagType: 'secondary',
    rating: 4.8,
    reviewsCount: '8.4k reviews',
    reviewCountNumber: 8400,
    shortDescription: 'Explore the golden dome of Sultan Mosque, colorful street art, indie fashion boutiques, and Middle Eastern cafés.',
    fullDescription: 'Kampong Glam is Singapore’s historic Malay-Arab quarter, centered around the majestic Sultan Mosque with its immense golden dome. Just a short stroll away is Haji Lane, a narrow alleyway famous for vibrant wall murals, quirky independent boutiques, artisan coffee spots, and live music bars.',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
    weatherPhotos: {
      sunny: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
      rainy: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
      authenticReviewer: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
      reviewerName: 'Rachel N. (Art & Culture Traveler)',
      reviewSnippet: 'The murals on Haji Lane are world-class! Grab a teh tarik from Zam Zam and wander down Arab Street at dusk.'
    },
    location: 'Arab St / Haji Ln, Singapore 189224',
    area: 'Bugis / Kampong Glam',
    nearestMrt: {
      stationName: 'Bugis MRT',
      lineCode: 'EWL EW12 / DTL DT14',
      lineColor: '#009645',
      exitInfo: 'Exit B (5 min walk down Victoria Street)',
      walkMinutes: 5
    },
    openingHours: 'Street areas 24/7 | Boutiques: 11:00 AM – 8:00 PM | Cafés & Bars: 11:00 AM – Midnight',
    admission: 'Free',
    tips: [
      'Order authentic Teh Tarik (pulled milk tea) and Murtabak at the legendary Singapore Zam Zam opposite the mosque.',
      'Best photo spot for Sultan Mosque is from the palm-lined pedestrian walkway on Bussorah Street.',
      'Evening is the best time for Haji Lane when string lights illuminate the street murals and live music starts.'
    ],
    highlights: ['Sultan Mosque', 'Haji Lane Street Art', 'Bussorah Street Craft Shops', 'Singapore Zam Zam', 'Malay Heritage Centre'],

    availabilityStatus: 'free-entry',
    remainingQuota: 999,
    nextEntrySlot: 'Open 24/7 (Free Access)',
    isLowPlanningRecommended: true,
    isIndoorWeatherProof: false,

    ticketTiers: [
      {
        id: 'kampong-glam-free',
        name: 'Historic District & Street Art Access (Free)',
        description: 'Explore the historic shophouses, street art installations, and Sultan Mosque grounds at your own pace.',
        priceSgd: 0,
        inclusions: ['Sultan Mosque visitor access', 'Haji Lane street art photo trail', 'Arab Street spice and textile row'],
        remainingCount: 999,
        availabilityLevel: 'high',
        instantConfirmation: true,
        mobileEntry: false,
        qualificationNote: 'Free admission for all.'
      }
    ],

    inlineTerms: {
      cancellation: 'Free entry.',
      validity: 'Open year-round.',
      entryRequirements: 'Sultan Mosque visiting hours for non-Muslim visitors: 10:00 AM–12:00 PM & 2:00 PM–4:00 PM (Sat–Thu). Robes provided at entrance.',
      rainyDayPolicy: 'Numerous covered cafés and boutique arcades along Arab and Baghdad Streets.',
      childSeniorPolicy: 'Pedestrianised streets on Bussorah and Arab Street are easily walkable.'
    },

    dataSources: {
      liveFeeds: ['OneMap SLA Geospatial & Heritage Directory', 'NEA Rochor / Bugis Station Weather'],
      estimatedFeeds: ['Haji Lane evening foot-traffic barometer']
    }
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'top-10-hawker-centers',
    title: 'Top 10 Hawker Centers You Must Visit',
    category: 'Food & Dining',
    categoryColor: '#83439c',
    readTime: '5 min read',
    excerpt: 'Sizzling satay, Michelin-starred chicken rice, and fragrant laksa—here is your ultimate guide to Singapore’s UNESCO-recognized hawker culture.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7xbHS2WXmRY2TF5ejHubD5WRa3l_tgTDzi1rXraDgN9_UXbudRUv_iWuv68CfIZ1j1NX4JgyQBEOEZq8B1nRCUqQehYPk4RVcHXQ4BNOTIqOI9smZRF2S5LyZiIgEKBD-oFp9tE3HNzykS4PftvPaFs3-VazMGO6FamfpgzY0ia1Xya33j40hIJ8mCiVxngNwXi3kiBnZtgr26xvdyHEbEZ-_kHZttIP11x-nFbf6Qs7cHOIaRYU19A',
    author: 'Chef Marcus Tan & SG Travel Food Team',
    date: 'Updated Aug 2026',
    keyHighlights: [
      'Maxwell Food Centre (Chinatown): Home to the world-famous Tian Tian Hainanese Chicken Rice, Zhen Zhen Porridge, and crispy Fuzhou oyster cakes.',
      'Lau Pa Sat (Telok Ayer): 19th-century Victorian cast-iron architecture by day; transforms into Satay Street with open-air charcoal grills by 7:00 PM.',
      'Old Airport Road Food Centre (Dakota): Beloved by locals for over 50 years; famous for Nam Sing Hokkien Mee, Lao Fu Zi Fried Kway Teow, and soya beancurd.',
      'Amoy Street Food Centre (Tanjong Pagar): Two storeys of Michelin Bib Gourmand stalls including A Noodle Story (Singapore-style ramen) and Han Kee Fish Soup.',
      'Tiong Bahru Market (Tiong Bahru): Combine breakfast chwee kueh (steamed rice cakes with preserved radish) and roast meats with art deco shophouse exploration.'
    ],
    recommendedSpots: [
      { name: 'Maxwell Food Centre', highlight: 'Tian Tian Chicken Rice & Tapioca Cake', location: 'Maxwell MRT Exit 1' },
      { name: 'Lau Pa Sat Satay Street', highlight: 'Satay Stalls 7 & 8 + Craft Beers', location: 'Telok Ayer / Raffles Place MRT' },
      { name: 'Old Airport Road', highlight: 'Nam Sing Hokkien Mee', location: 'Dakota MRT Exit B' },
      { name: 'Newton Food Centre', highlight: 'Chilli Crab & Sambal Stingray (Crazy Rich Asians spot)', location: 'Newton MRT Exit B' }
    ],
    fullContent: [
      'In December 2020, Singapore’s Hawker Culture was officially inscribed onto UNESCO’s Representative List of the Intangible Cultural Heritage of Humanity. These bustling open-air dining pavilions are the beating heart of local life, where millionaires and construction workers sit shoulder-to-shoulder on plastic stools to savor culinary recipes perfected across generations.',
      'If you only have a few days in Singapore, prioritizing the right hawker centers will save you hours of wandering and guarantee unforgettable meals for under $6 to $10 SGD.',
      'Pro Tip: The golden rule of hawker dining is looking for the longest queue. If local Singaporeans are willing to stand in 30°C heat for 20 minutes, you can bet the wok hei (breath of the wok) is worth every second!'
    ]
  },
  {
    id: 'quiet-afternoon-botanic-gardens',
    title: 'A Quiet Afternoon at Botanic Gardens',
    category: 'Hidden Gems',
    categoryColor: '#1b6d24',
    readTime: '3 min read',
    excerpt: 'Step away from the urban bustle into lush rainforest trails, VIP orchids, and tranquil lakes at Singapore’s UNESCO World Heritage sanctuary.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7_NOaphyZzR02X5Khu0P6-MGgta_itt45wdKi2fSVct14jWAvErO1GIgVja0NSUxWL_WS8Gki9jPrwWEPhbhXZyrqun0voNLz3a2tTiql_J0hhOWSVaE6v4EBj9RQluNvszJi14ht4plhyqwj00GxN1MD5OQqLBRKkC1eK5owT4EXoygF0MQusGrdlzFUkJZGmp7vzbIJX2WiD_uqt4yNYF_sOgr4KCjvicbNNloMO9WroguGJ2xWA',
    author: 'Elena Wong, Eco & Heritage Guide',
    date: 'Updated Aug 2026',
    keyHighlights: [
      'Start at the Tanglin Gate near the historic Bandstand and swan lake for majestic century-old heritage trees.',
      'Spend 1 hour inside the National Orchid Garden with over 60,000 orchid plants and the exclusive VIP Orchid enclosure.',
      'Take the elevated boardwalk through the primary rainforest — one of only two rainforests inside city limits globally (the other being Tijuca in Rio).',
      'Wind down with an artisanal iced pandan latte at The Halia or Bee’s Knees at The Garage surrounded by birdlife.'
    ],
    recommendedSpots: [
      { name: 'The Bandstand', highlight: 'Iconic 1930 octagonal gazebo & photo spot', location: 'Tanglin Core' },
      { name: 'National Orchid Garden', highlight: 'VIP & Celebrity Orchids Collection', location: 'Central Core' },
      { name: 'Symphony Lake', highlight: 'Shaw Foundation Symphony Stage over water', location: 'Tyersall Core' }
    ],
    fullContent: [
      'Established in 1859 by an agri-horticultural society, the Singapore Botanic Gardens played a crucial role in the region’s rubber boom and orchid hybridization science. Today, its 82-hectare lush grounds offer a cooling oasis of shaded paths, trickling waterfalls, and serene lakes.',
      'For the ultimate peaceful experience, enter via the Botanic Gardens MRT (Downtown Line / Circle Line) at around 4:00 PM. The afternoon sun creates shimmering golden hour rays through the rainforest canopy, while cooler evening breezes make the walk effortless.'
    ]
  },
  {
    id: 'mrt-guide-contactless-cards',
    title: 'How to Ride Singapore MRT with Any Bank Card',
    category: 'Travel Tips',
    categoryColor: '#83439c',
    readTime: '4 min read',
    excerpt: 'You do NOT need to buy a separate tourist transit card! Learn how SimplyGo contactless payment saves you money and time.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    author: 'SG Transit Insights',
    date: 'Updated Aug 2026',
    keyHighlights: [
      'Simply tap any Mastercard, Visa contactless credit/debit card, Apple Pay, Google Pay, or Samsung Wallet at the MRT gantries and bus readers.',
      'Same fare as local transit cards ($0.95 to $2.20 SGD per trip) — no surge pricing or tourist surcharge.',
      'Remember to always tap IN and OUT with the exact SAME device or card to avoid maximum fare penalties.',
      'Trains arrive every 2 to 3 minutes during peak hours and every 5 minutes off-peak. Station announcements are in 4 languages (English, Mandarin, Malay, Tamil).'
    ],
    fullContent: [
      'Singapore operates one of the cleanest, safest, and most punctual rapid transit systems in the world. Thanks to the Land Transport Authority’s SimplyGo system, international travelers can bypass ticket machines entirely and tap directly onto trains and public buses with their own credit card or phone wallet.',
      'No registration or tourist card purchase fee is required. Fares are calculated dynamically based on distance traveled, with automatic transfer rebates applied when switching between train lines or connecting to public buses within 45 minutes.'
    ]
  },
  {
    id: 'peranakan-trail-katong-joo-chiat',
    title: 'The Ultimate Peranakan Trail: Katong & Joo Chiat Heritage',
    category: 'Heritage & Culture',
    categoryColor: '#83439c',
    readTime: '6 min read',
    excerpt: 'Pastel shophouses, Nonya kueh, intricate beadwork, and rich Straits Chinese traditions in Singapore’s most colorful neighborhood.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    author: 'Alvin Yapp, Curator & Straits Chinese Specialist',
    date: 'Updated Aug 2026',
    keyHighlights: [
      'Koon Seng Road: Admire 1920s pastel shophouses decorated with floral Peranakan tiles and Corinthian capitals.',
      'The Intan: Step inside a private shophouse museum holding over 5,000 Straits Chinese artifacts and antique tiffins.',
      'Kim Choo Kueh Chang: Savor traditional Nonya pork dumplings (bak chang) and rainbow nine-layer lapis sagu.',
      '328 Katong Laksa: Slurp spicy coconut laksa with pre-cut short noodles eaten only with a soup spoon.'
    ],
    recommendedSpots: [
      { name: 'Koon Seng Road Shophouses', highlight: 'Iconic pastel photo spot', location: 'Marine Parade MRT Exit 1' },
      { name: 'The Intan Peranakan Museum', highlight: 'Private curated tour + antique beadwork', location: '69 Joo Chiat Terrace' },
      { name: 'Kim Choo Kueh Chang', highlight: 'Nonya dumplings & beaded shoes', location: '109 East Coast Rd' },
      { name: 'Birds of Paradise Gelato', highlight: 'White Chrysanthemum & botanical flavors', location: '63 East Coast Rd' }
    ],
    fullContent: [
      'Peranakan culture emerged from the intermarriage of early Chinese and Indian traders with local Malay and Indonesian women across the Straits Settlements.',
      'In Katong and Joo Chiat, this unique fusion is celebrated in every ornate tile, aromatic spice blend, and hand-embroidered kebaya.',
      'Take the newly opened Thomson-East Coast Line (TEL) to Marine Parade MRT (TE26) to reach the heart of the district in under 20 minutes from Orchard Road.'
    ]
  }
];

export const MRT_STATIONS: MrtStation[] = [
  { code: 'NS22 / TE14', name: 'Orchard', lines: ['NSL', 'TEL'], lineColors: ['#D42E12', '#9D5B25'], isInterchange: true, zone: 'Central', popularAttractions: ['ION Orchard', 'Orchard Road Shopping', 'Takashimaya'] },
  { code: 'NS24 / NE6 / CC1', name: 'Dhoby Ghaut', lines: ['NSL', 'NEL', 'CCL'], lineColors: ['#D42E12', '#9016B2', '#FA9E0D'], isInterchange: true, zone: 'Central', popularAttractions: ['Plaza Singapura', 'Fort Canning Park (North)'] },
  { code: 'NS25 / EW13', name: 'City Hall', lines: ['NSL', 'EWL'], lineColors: ['#D42E12', '#009645'], isInterchange: true, zone: 'Central', popularAttractions: ['National Gallery Singapore', 'St Andrew Cathedral', 'Chijmes'] },
  { code: 'NS26 / EW14', name: 'Raffles Place', lines: ['NSL', 'EWL'], lineColors: ['#D42E12', '#009645'], isInterchange: true, zone: 'CBD', popularAttractions: ['Merlion Park', 'Lau Pa Sat Satay Street', 'Fullerton Hotel'] },
  { code: 'DT16 / CE1', name: 'Bayfront', lines: ['DTL', 'CCL'], lineColors: ['#005EC4', '#FA9E0D'], isInterchange: true, zone: 'Marina Bay', popularAttractions: ['Marina Bay Sands', 'ArtScience Museum', 'Gardens by the Bay'] },
  { code: 'TE22', name: 'Gardens by the Bay', lines: ['TEL'], lineColors: ['#9D5B25'], isInterchange: false, zone: 'Marina Bay', popularAttractions: ['Supertree Grove', 'Cloud Forest', 'Flower Dome', 'Marina Barrage'] },
  { code: 'DT19 / NE4', name: 'Chinatown', lines: ['DTL', 'NEL'], lineColors: ['#005EC4', '#9016B2'], isInterchange: true, zone: 'Chinatown', popularAttractions: ['Buddha Tooth Relic Temple', 'Chinatown Street Market', 'Sri Mariamman'] },
  { code: 'TE18', name: 'Maxwell', lines: ['TEL'], lineColors: ['#9D5B25'], isInterchange: false, zone: 'Chinatown', popularAttractions: ['Maxwell Food Centre', 'Ann Siang Hill', 'Club Street'] },
  { code: 'DT14 / EW12', name: 'Bugis', lines: ['DTL', 'EWL'], lineColors: ['#005EC4', '#009645'], isInterchange: true, zone: 'Bugis', popularAttractions: ['Haji Lane', 'Kampong Glam', 'Sultan Mosque', 'Bugis Street Market'] },
  { code: 'NE7 / DT12', name: 'Little India', lines: ['NEL', 'DTL'], lineColors: ['#9016B2', '#005EC4'], isInterchange: true, zone: 'Little India', popularAttractions: ['Sri Veeramakaliamman Temple', 'Mustafa Centre 24/7', 'Tekka Centre'] },
  { code: 'TE26', name: 'Marine Parade', lines: ['TEL'], lineColors: ['#9D5B25'], isInterchange: false, zone: 'East Coast', popularAttractions: ['Katong & Joo Chiat', 'Koon Seng Shophouses', '328 Katong Laksa', 'The Intan'] },
  { code: 'NE1 / CC29', name: 'HarbourFront', lines: ['NEL', 'CCL'], lineColors: ['#9016B2', '#FA9E0D'], isInterchange: true, zone: 'South', popularAttractions: ['VivoCity', 'Sentosa Express Monorail', 'Mount Faber Cable Car'] },
  { code: 'CC19 / DT9', name: 'Botanic Gardens', lines: ['CCL', 'DTL'], lineColors: ['#FA9E0D', '#005EC4'], isInterchange: true, zone: 'Bukit Timah', popularAttractions: ['Singapore Botanic Gardens', 'National Orchid Garden', 'Cluny Court'] },
  { code: 'CG2', name: 'Changi Airport', lines: ['EWL'], lineColors: ['#009645'], isInterchange: false, zone: 'East', popularAttractions: ['Jewel Changi (Rain Vortex)', 'Terminals 1, 2, 3 & 4'] },
  { code: 'CC4 / DT15', name: 'Promenade', lines: ['CCL', 'DTL'], lineColors: ['#FA9E0D', '#005EC4'], isInterchange: true, zone: 'Marina Centre', popularAttractions: ['Singapore Flyer', 'Suntec City & Fountain of Wealth', 'Helix Bridge'] }
];

export const CURRENCY_RATES: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', ratePerSgd: 0.75, flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', ratePerSgd: 0.69, flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', ratePerSgd: 0.59, flag: '🇬🇧' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', ratePerSgd: 1.15, flag: '🇦🇺' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', ratePerSgd: 114.5, flag: '🇯🇵' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', ratePerSgd: 3.32, flag: '🇲🇾' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', ratePerSgd: 5.42, flag: '🇨🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', ratePerSgd: 1025.0, flag: '🇰🇷' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', ratePerSgd: 26.8, flag: '🇹🇭' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', ratePerSgd: 64.2, flag: '🇮🇳' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', ratePerSgd: 12200.0, flag: '🇮🇩' }
];

export const WIFI_HOTSPOTS: WifiHotspot[] = [
  {
    name: 'Wireless@SGx (Nationwide Free Wi-Fi)',
    area: 'All MRT Stations, Malls, Museums & Public Hubs',
    type: 'Official Free Govt Wi-Fi',
    signalStrength: 'Excellent',
    speed: 'Up to 30 Mbps',
    howToConnect: 'Download the "Wireless@SGx" app on iOS/Android or select the network in Wi-Fi settings and sign in using your foreign mobile number via SMS OTP.'
  },
  {
    name: '#WiFi@Changi',
    area: 'Changi Airport & Jewel Changi',
    type: 'Airport High-Speed Wi-Fi',
    signalStrength: 'Excellent',
    speed: 'Up to 50 Mbps',
    howToConnect: 'Connect to #WiFi@Changi, open browser, click Accept Terms, or scan your passport at info kiosks for a 24-hr multi-device login token.'
  },
  {
    name: 'MBS Public Guest Wi-Fi',
    area: 'The Shoppes at Marina Bay Sands & SkyPark',
    type: 'Complimentary Mall Wi-Fi',
    signalStrength: 'Strong',
    speed: 'Up to 25 Mbps',
    howToConnect: 'Connect to "MBS Guest Wi-Fi" and agree to terms on the landing portal.'
  },
  {
    name: 'NLB Free Library Wi-Fi',
    area: 'National Library (Bugis) & Orchard Library',
    type: 'Quiet Study & Work Spot',
    signalStrength: 'Strong',
    speed: 'Up to 40 Mbps',
    howToConnect: 'Automatic via Wireless@SGx or free guest login with email.'
  }
];

export const HOURLY_WEATHER: WeatherForecast[] = [
  { time: 'Now', temp: 31, weather: 'Partly Cloudy', icon: 'Sun', rainProb: 15, humidity: 76 },
  { time: '14:00', temp: 32, weather: 'Sunny & Humid', icon: 'Sun', rainProb: 20, humidity: 74 },
  { time: '16:00', temp: 29, weather: 'Brief Afternoon Shower', icon: 'CloudRain', rainProb: 65, humidity: 88 },
  { time: '18:00', temp: 28, weather: 'Clear Twilight', icon: 'CloudSun', rainProb: 20, humidity: 82 },
  { time: '20:00', temp: 27, weather: 'Warm & Breezy', icon: 'Moon', rainProb: 10, humidity: 80 },
  { time: '22:00', temp: 26, weather: 'Pleasant Night', icon: 'Moon', rainProb: 10, humidity: 82 }
];

export const SINGAPORE_PRICE_CHEAT_SHEET = [
  { item: 'Hawker Chicken Rice / Laksa', sgd: 4.50, desc: 'Average price at hawker centres' },
  { item: 'Kopi / Teh Tarik (Local Coffee/Tea)', sgd: 1.60, desc: 'Traditional kopitiam drink' },
  { item: 'Kaya Toast Set with Soft-Boiled Eggs', sgd: 5.20, desc: 'Classic Singapore breakfast' },
  { item: 'Single MRT Train Ride', sgd: 1.80, desc: 'Average cross-city transit fare' },
  { item: 'Bottled Water from 7-Eleven', sgd: 2.20, desc: 'Tip: Tap water in Singapore is 100% safe to drink!' },
  { item: 'Chilli Crab at Seafood Restaurant', sgd: 75.00, desc: 'Per kg live crab (serves 2-3)' },
  { item: 'Tiger Beer Pint at Hawker', sgd: 7.50, desc: 'Large 633ml bottle with ice bucket' }
];

export const TRAVEL_TIPS = [
  {
    title: 'The "Chope" Table Etiquette',
    category: 'Local Culture',
    icon: 'Coffee',
    summary: 'At hawker centres, locals place a packet of tissue paper, an umbrella, or a lanyard on a table to reserve ("chope") it while they queue for food. Respect this unspoken rule!'
  },
  {
    title: 'Tap Water is 100% Drinkable',
    category: 'Health & Safety',
    icon: 'Droplets',
    summary: 'Singapore’s tap water exceeds WHO drinking water quality standards. Carry a reusable water bottle and refill anywhere to stay hydrated in the tropical climate.'
  },
  {
    title: 'Chewing Gum & Strict Cleanliness Laws',
    category: 'Laws & Customs',
    icon: 'ShieldCheck',
    summary: 'Chewing gum cannot be imported or sold. Littering, jaywalking, and smoking outside designated yellow boxes carry strict fines.'
  },
  {
    title: 'GST Tourist Refund (Tax-Free Shopping)',
    category: 'Money & Shopping',
    icon: 'Receipt',
    summary: 'Claim 9% GST back at Changi Airport for purchases over $100 SGD at participating stores via the eTRS self-help kiosks.'
  },
  {
    title: 'Essential Emergency Numbers',
    category: 'Emergency',
    icon: 'PhoneCall',
    summary: 'Police: 999 | Ambulance & Fire: 995 | Non-Emergency Ambulance: 1777 | Tourist Hotline: 1800 736 2000'
  }
];

export const SINGLISH_TERMS = [
  { term: 'Chope', meaning: 'To reserve a seat or table (usually with a tissue pack)', example: '"Can you help me chope that table near the fan?"' },
  { term: 'Shiok', meaning: 'Extremely delicious, pleasurable, or satisfying', example: '"This satay is so shiok!"' },
  { term: 'Tapau / Dabao', meaning: 'Takeaway / To-go food order', example: '"Auntie, one chicken rice tapau please."' },
  { term: 'Lah / Leh / Lor', meaning: 'Sentence-ending particles to add emotion, emphasis, or resignation', example: '"Don\'t worry lah, MRT comes in 2 minutes!"' },
  { term: 'Uncle / Auntie', meaning: 'Respectful and affectionate term for older locals, hawkers, or taxi drivers', example: '"Thank you Uncle, keep the change!"' },
  { term: 'Lobang', meaning: 'A tip, great deal, or insider contact', example: '"I got good lobang for discounted tickets!"' },
  { term: 'Bojio', meaning: 'Why didn’t you invite me? (used playfully when friends go somewhere without you)', example: '"You went for chilli crab and bojio?"' },
  { term: 'Steady', meaning: 'Agreed, reliable, or cool', example: '"Meeting at 7 PM at Lau Pa Sat? Steady!"' },
  { term: 'Swee', meaning: 'Beautiful, perfect, or very nice', example: '"Your photo at Marina Bay Sands is super swee!"' },
  { term: 'Ang Moh', meaning: 'Westerner / Caucasian person (Hokkien for red-haired)', example: '"A lot of ang mohs love running at East Coast Park."' }
];
