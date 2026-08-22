export type TabType = 'home' | 'explore' | 'itinerary' | 'calendar' | 'live' | 'route' | 'guide' | 'forum';

export type CategoryFilter = 'All' | 'Nature' | 'Luxury' | 'Culture' | 'Food' | 'Icons' | 'Family';

export type QuickToolType = 'wifi' | 'currency' | 'weather' | 'transit' | null;

export interface TicketTier {
  id: string;
  name: string; // Plain, human language name (e.g. "All-Access Conservatories Pass")
  operatorCode?: string;
  description: string; // Plain words on what is included
  priceSgd: number;
  originalPriceSgd?: number;
  inclusions: string[];
  remainingCount: number;
  availabilityLevel: 'high' | 'low' | 'sold-out';
  instantConfirmation: boolean;
  mobileEntry: boolean;
  qualificationNote?: string;
}

export interface BundleOffer {
  id: string;
  badge: string;
  title: string;
  priceSgd: number;
  originalPriceSgd: number;
  discountPercent: number;
  plainLanguageSummary: string;
  qualifyingConditions: string[];
  includedPlaces: string[];
  remainingCount: number;
  isSpontaneousChoice?: boolean;
}

export interface WeatherPhotoView {
  sunny: string;
  rainy: string;
  authenticReviewer: string;
  reviewerName: string;
  reviewSnippet: string;
}

export interface AttractionInlineTerms {
  cancellation: string;
  validity: string;
  entryRequirements: string;
  rainyDayPolicy: string;
  childSeniorPolicy: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: 'Nature' | 'Luxury' | 'Culture' | 'Food' | 'Icons' | 'Family';
  tag: string;
  tagType: 'tertiary' | 'luxury' | 'secondary' | 'neutral';
  rating: number;
  reviewsCount: string;
  reviewCountNumber?: number;
  shortDescription: string;
  fullDescription: string;
  image: string;
  galleryImages?: string[];
  weatherPhotos?: WeatherPhotoView;
  location: string;
  area: string;
  nearestMrt: {
    stationName: string;
    lineCode: string;
    lineColor: string;
    exitInfo: string;
    walkMinutes: number;
  };
  openingHours: string;
  admission: string;
  tips: string[];
  highlights: string[];
  coordinates?: { lat: number; lng: number };
  
  // Real-time booking & live event enhancements
  availabilityStatus?: 'available' | 'limited' | 'sold-out' | 'free-entry';
  remainingQuota?: number;
  nextEntrySlot?: string;
  isLowPlanningRecommended?: boolean;
  isIndoorWeatherProof?: boolean;
  ticketTiers?: TicketTier[];
  bundleOffers?: BundleOffer[];
  inlineTerms?: AttractionInlineTerms;
  dataSources?: {
    liveFeeds: string[];
    estimatedFeeds: string[];
  };
}

export interface Article {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
  excerpt: string;
  fullContent: string[];
  image: string;
  author: string;
  date: string;
  keyHighlights: string[];
  recommendedSpots?: { name: string; highlight: string; location: string }[];
}

export interface MrtStation {
  code: string;
  name: string;
  lines: string[];
  lineColors: string[];
  isInterchange: boolean;
  zone: string;
  popularAttractions?: string[];
}

export interface MrtRouteResult {
  origin: MrtStation;
  destination: MrtStation;
  durationMinutes: number;
  fareSgd: number;
  stationsPassed: string[];
  interchanges: { atStation: string; fromLine: string; toLine: string }[];
  steps: {
    type: 'board' | 'transfer' | 'alight';
    station: string;
    line: string;
    lineColor: string;
    details: string;
  }[];
}

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  ratePerSgd: number; // 1 SGD = X target currency
  flag: string;
}

export interface WifiHotspot {
  name: string;
  area: string;
  type: string;
  signalStrength: 'Strong' | 'Excellent' | 'Good';
  speed: string;
  howToConnect: string;
}

export interface WeatherForecast {
  time: string;
  temp: number;
  weather: string;
  icon: string;
  rainProb: number;
  humidity: number;
}

export interface DayForecast {
  day: string;
  date: string;
  highTemp: number;
  lowTemp: number;
  weather: string;
  icon: string;
  rainProb: number;
  uvIndex: number;
  humidity: number;
  description: string;
}

export interface MonthTrend {
  week: string;
  dateRange: string;
  avgHigh: number;
  avgLow: number;
  rainfallTrend: 'Heavy Afternoon Showers' | 'Scattered Showers' | 'Generally Fair & Humid' | 'Monsoon Surge';
  expectedRainDays: number;
  summary: string;
  advisory: string;
}

export interface CrowdStatusItem {
  id: string;
  name: string;
  category: 'Attractions' | 'Hawker & Food' | 'MRT & Hubs' | 'Shopping Belts';
  area: string;
  crowdLevel: 'Low' | 'Moderate' | 'Busy' | 'Surge / Packed';
  crowdIndex: number; // 0 to 100
  waitTimeMinutes: number;
  statusText: string;
  peakHours: string;
  bestTimeToVisit: string;
  liveTrend: 'rising' | 'steady' | 'falling';
  updateMinsAgo: number;
}

export interface CarparkItem {
  id: string;
  name: string;
  area: 'Marina Bay & CBD' | 'Orchard Road' | 'Sentosa & HarbourFront' | 'Civic & Bugis' | 'East & Changi';
  availableLots: number;
  totalLots: number;
  status: 'Plenty' | 'Limited' | 'Full / Queueing';
  rates: {
    weekday: string;
    weekend: string;
    gracePeriod: string;
  };
  mrtAlternative: string;
  lastUpdated: string;
}

export type ItineraryCategory = 'Sightseeing' | 'Food & Drinks' | 'Culture & Heritage' | 'Nature & Parks' | 'Shopping' | 'Entertainment' | 'Transit' | 'Stay';

export interface ItineraryStop {
  id: string;
  placeId?: string; // Links to Attraction ID if matched
  title: string;
  category: ItineraryCategory;
  timeSlot: string; // e.g. "09:30 AM" or "Morning"
  duration: string; // e.g. "2 hrs"
  costSgd: number; // 0 for free
  location: string;
  nearestMrt?: string;
  notes: string;
  isCompleted: boolean;
  transitToNext?: {
    type: 'mrt' | 'walk' | 'bus' | 'taxi';
    duration: string;
    instruction: string;
    fareSgd?: number;
  };
  image?: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  dateStr?: string;
  title: string; // e.g. "Marina Bay & Civic District"
  themeArea: string;
  weatherAdvice?: string;
  stops: ItineraryStop[];
}

export interface TripItinerary {
  id: string;
  title: string;
  subtitle: string;
  startDate?: string;
  totalDays: number;
  days: ItineraryDay[];
}

export interface OneMapPlanningArea {
  id: string;
  planningArea: string;
  region: string;
  residentPopulation: number;
  landAreaKm2: number;
  residentDensityPerKm2: number;
  daytimeFootTraffic: number;
  densityLevel: 'Low' | 'Moderate' | 'Busy' | 'High Surge';
  crowdIndex: number;
  peakHours: string;
  bestTimeToVisit: string;
  coordinates: { lat: number; lng: number };
  landmarks: string[];
  subzones: string[];
  demographics: {
    workingPopPercent: number;
    touristFootfallRank: string;
    transitAccessRating: string;
  };
}

export interface OneMapSearchResult {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export interface OneMapRouteSummary {
  total_time: number;
  total_distance: number;
  start_point: string;
  end_point: string;
}

