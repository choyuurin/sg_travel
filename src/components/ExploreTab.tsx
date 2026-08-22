import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  MapPin,
  Heart,
  Navigation,
  Zap,
  Flame,
  ShieldCheck,
  Sparkles,
  CloudRain,
  RotateCcw,
  Ticket,
  Compass,
  TrainFront,
  Clock,
  UtensilsCrossed,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ATTRACTIONS } from '../data/singaporeData';
import { VISIT_SINGAPORE_PRECINCTS, VisitSingaporePrecinct } from '../data/visitSingaporeData';
import { Attraction, CategoryFilter } from '../types';

interface ExploreTabProps {
  onSelectAttraction: (attraction: Attraction) => void;
  onPlanRouteTo: (attractionName: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({
  onSelectAttraction,
  onPlanRouteTo,
  savedIds,
  onToggleSave,
  selectedCategory,
  onSelectCategory,
}) => {
  // Top view toggle: 'attractions' or 'precincts'
  const [exploreViewMode, setExploreViewMode] = useState<'attractions' | 'precincts'>('attractions');

  // Precinct state
  const [selectedPrecinctId, setSelectedPrecinctId] = useState<string>('katong-joo-chiat');
  const selectedPrecinct =
    VISIT_SINGAPORE_PRECINCTS.find((p) => p.id === selectedPrecinctId) ||
    VISIT_SINGAPORE_PRECINCTS[0];

  // Attraction search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyLowPlanning, setOnlyLowPlanning] = useState(false);
  const [onlyRainProof, setOnlyRainProof] = useState(false);
  const [sortOption, setSortOption] = useState<'featured' | 'reviews' | 'rating'>('featured');

  const categories: CategoryFilter[] = ['All', 'Nature', 'Luxury', 'Culture', 'Food', 'Icons', 'Family'];

  const filteredAttractions = useMemo(() => {
    let list = ATTRACTIONS.filter((a) => {
      const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLowPlanning = !onlyLowPlanning || a.isLowPlanningRecommended;
      const matchesRainProof = !onlyRainProof || a.isIndoorWeatherProof;

      return matchesCat && matchesSearch && matchesLowPlanning && matchesRainProof;
    });

    if (sortOption === 'reviews') {
      list = [...list].sort((a, b) => (b.reviewCountNumber || 0) - (a.reviewCountNumber || 0));
    } else if (sortOption === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, onlyLowPlanning, onlyRainProof, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery('');
    onSelectCategory('All');
    setOnlyLowPlanning(false);
    setOnlyRainProof(false);
    setSortOption('featured');
  };

  return (
    <div id="explore-tab-view" className="space-y-4 px-4 pb-28 pt-2 max-w-5xl mx-auto">
      {/* Top View Mode Switcher: Attractions vs STB Precincts */}
      <div className="bg-white p-1.5 rounded-2xl border border-[#c4c7c8]/50 shadow-xs flex gap-1">
        <button
          onClick={() => setExploreViewMode('attractions')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            exploreViewMode === 'attractions'
              ? 'bg-[#83439c] text-white shadow-xs'
              : 'text-[#444748] hover:bg-[#f3f3f6]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Attractions & Sights</span>
        </button>

        <button
          onClick={() => setExploreViewMode('precincts')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            exploreViewMode === 'precincts'
              ? 'bg-[#83439c] text-white shadow-xs'
              : 'text-[#444748] hover:bg-[#f3f3f6]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Precincts & Enclaves (STB)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. STB PRECINCTS & HERITAGE ENCLAVES VIEW */}
      {/* ========================================================================= */}
      {exploreViewMode === 'precincts' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Header Description */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#83439c] text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-1.5 max-w-2xl">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 border border-white/20">
                <Sparkles className="w-3 h-3 text-amber-300 fill-current" /> Singapore Tourism Board (STB)
              </span>
              <h2 className="text-xl sm:text-2xl font-black">Official Precincts & Cultural Enclaves</h2>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                Step into Singapore's most distinctive neighborhoods. Discover 1920s Peranakan shophouses in Katong, aromatic spice trade streets in Little India, majestic Sultan Mosque in Kampong Gelam, and futuristic skyline trails.
              </p>
            </div>
          </div>

          {/* Horizontal Precinct Selector Cards */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                Select Neighborhood
              </span>
              <span className="text-[11px] text-[#83439c] font-semibold">
                {VISIT_SINGAPORE_PRECINCTS.length} Curated Enclaves
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {VISIT_SINGAPORE_PRECINCTS.map((precinct) => {
                const isSelected = precinct.id === selectedPrecinctId;
                return (
                  <button
                    key={precinct.id}
                    onClick={() => setSelectedPrecinctId(precinct.id)}
                    className={`flex-shrink-0 w-44 sm:w-52 rounded-2xl border text-left overflow-hidden transition-all cursor-pointer group ${
                      isSelected
                        ? 'border-[#83439c] ring-2 ring-[#83439c]/30 shadow-md bg-[#faf5fc]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="h-24 w-full relative overflow-hidden bg-gray-100">
                      <img
                        src={precinct.heroImage}
                        alt={precinct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {precinct.tag}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1 group-hover:text-[#83439c] transition-colors">
                        {precinct.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                        {precinct.nearestMrt.stationName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Precinct Showcase Card */}
          <div className="bg-white rounded-3xl border border-[#c4c7c8]/50 shadow-sm overflow-hidden space-y-5">
            {/* Hero Image Header */}
            <div className="relative h-56 sm:h-72 overflow-hidden bg-gray-900">
              <img
                src={selectedPrecinct.heroImage}
                alt={selectedPrecinct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="bg-[#83439c] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {selectedPrecinct.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">{selectedPrecinct.name}</h3>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-1">{selectedPrecinct.subtitle}</p>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {/* Overview & Vibe */}
              <div className="space-y-2">
                <div className="bg-[#f9f9fc] rounded-2xl p-4 border border-purple-100">
                  <span className="text-[10px] font-bold uppercase text-[#83439c] tracking-wider block mb-1">
                    Neighborhood Vibe & Character
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed">
                    &quot;{selectedPrecinct.vibe}&quot;
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {selectedPrecinct.overview}
                </p>
              </div>

              {/* Transit & MRT Quick Navigation */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-2xl p-4 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TrainFront className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold text-gray-900">
                      Nearest MRT: {selectedPrecinct.nearestMrt.stationName}
                    </span>
                    <span
                      style={{ backgroundColor: selectedPrecinct.nearestMrt.lineColor }}
                      className="text-white text-[10px] font-black px-2 py-0.5 rounded-md"
                    >
                      {selectedPrecinct.nearestMrt.lineCode}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {selectedPrecinct.nearestMrt.exitInfo} • ~{selectedPrecinct.nearestMrt.walkMinutes} min walk
                  </p>
                </div>

                <button
                  onClick={() => onPlanRouteTo(selectedPrecinct.nearestMrt.stationName)}
                  className="px-4 py-2 bg-[#83439c] text-white text-xs font-bold rounded-xl hover:bg-[#6c2c85] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Plan Route on MRT</span>
                </button>
              </div>

              {/* Curated Walking Trail */}
              <div className="bg-[#f4f2f7] rounded-2xl p-4 border border-[#e2dcee] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#83439c] flex items-center gap-1.5 uppercase tracking-wider">
                    <Compass className="w-4 h-4" /> Recommended Walking Trail
                  </span>
                  <span className="text-xs bg-white text-gray-700 font-bold px-2.5 py-0.5 rounded-full border border-gray-200 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#83439c]" /> {selectedPrecinct.walkingTrail.duration}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-gray-700 font-medium">
                  {selectedPrecinct.walkingTrail.stops.map((stop, idx) => (
                    <React.Fragment key={idx}>
                      <span className="bg-white px-2.5 py-1 rounded-lg border border-gray-200 text-gray-800 shadow-2xs">
                        {idx + 1}. {stop}
                      </span>
                      {idx < selectedPrecinct.walkingTrail.stops.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 italic pt-1">
                  💡 Best time to visit: {selectedPrecinct.walkingTrail.bestTime}
                </p>
              </div>

              {/* Architectural & Cultural Highlights */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#83439c]" />
                  What to See & Experience
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPrecinct.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">{item.title}</span>
                        <span className="text-[10px] bg-purple-100 text-[#83439c] font-bold px-2 py-0.5 rounded-md">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* STB-Recommended Authentic Food Haunts */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                  STB-Recommended Food Haunts & Heritage Bites
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedPrecinct.foodHaunts.map((food, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <h5 className="font-bold text-xs text-gray-900">{food.name}</h5>
                        <p className="text-[11px] text-gray-600 leading-snug mt-1">{food.specialty}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 text-[11px]">
                        <span className="text-[10px] text-[#83439c] font-bold block uppercase">
                          Must Order:
                        </span>
                        <span className="font-semibold text-gray-800">{food.mustOrder}</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">📍 {food.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ATTRACTIONS & SIGHTS VIEW */}
      {/* ========================================================================= */}
      {exploreViewMode === 'attractions' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl flex items-center px-3.5 py-2.5 shadow-sm border border-[#c4c7c8]/50 focus-within:border-[#83439c] transition-colors">
            <Search className="w-4 h-4 text-[#747878] ml-1 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Singapore destinations, domes, food hubs..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-[#1a1c1e] placeholder:text-[#747878]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 px-1 font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#83439c] text-white shadow-xs'
                    : 'bg-[#f3f3f6] text-[#444748] hover:bg-[#e8e8ea]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Persona Smart Filters Bar (Low-Planning & Rainproof Filters) */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f4f2f7] p-2 rounded-2xl border border-[#e2dcee]">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setOnlyLowPlanning((p) => !p)}
                className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  onlyLowPlanning
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Zap className="w-3 h-3 fill-current" /> Low-Planning Spontaneous
              </button>

              <button
                onClick={() => setOnlyRainProof((p) => !p)}
                className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  onlyRainProof
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <CloudRain className="w-3 h-3" /> 100% Rain-Proof
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span className="font-semibold text-[11px] text-gray-500">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-white border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-semibold text-gray-800 outline-none cursor-pointer"
              >
                <option value="featured">✨ Top Curated</option>
                <option value="reviews">💬 Most Reviewed</option>
                <option value="rating">⭐ Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center text-xs text-[#747878] px-1">
            <span>Showing {filteredAttractions.length} destinations with live quota status</span>
            {(onlyLowPlanning || onlyRainProof || selectedCategory !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="text-[#83439c] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Descriptive Empty State */}
          {filteredAttractions.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-[#c4c7c8]/50 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-[#83439c] mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">No destinations match your filters</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                  We couldn't find any places matching your current criteria. Try resetting filters to explore all Singapore highlights.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#83439c] text-white text-xs font-bold rounded-xl hover:bg-[#6c2c85] transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> View All Destinations
              </button>
            </div>
          ) : (
            /* Attraction Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAttractions.map((attraction) => {
                const isSaved = savedIds.includes(attraction.id);

                return (
                  <div
                    key={attraction.id}
                    onClick={() => onSelectAttraction(attraction)}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#c4c7c8]/50 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Container with Live Quota Badges */}
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Top Right Save Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(attraction.id);
                          }}
                          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'bg-black/40 text-white hover:bg-black/60'
                          }`}
                          aria-label="Save place"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>

                        {/* Top Left Live Availability Badge */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          {attraction.availabilityStatus === 'available' && (
                            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                              <Zap className="w-2.5 h-2.5 fill-current" /> {attraction.remainingQuota} passes left
                            </span>
                          )}
                          {attraction.availabilityStatus === 'limited' && (
                            <span className="bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                              <Flame className="w-2.5 h-2.5 fill-current" /> Low Quota ({attraction.remainingQuota} left)
                            </span>
                          )}
                          {attraction.availabilityStatus === 'free-entry' && (
                            <span className="bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                              <ShieldCheck className="w-2.5 h-2.5" /> Free Admission
                            </span>
                          )}
                        </div>

                        {/* Bottom Category Tag */}
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                            {attraction.category}
                          </span>
                          {attraction.isIndoorWeatherProof && (
                            <span className="bg-blue-900/70 backdrop-blur-md text-blue-100 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <CloudRain className="w-2.5 h-2.5" /> Indoor
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-bold text-[#1a1c1e] group-hover:text-[#83439c] transition-colors line-clamp-1">
                            {attraction.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#747878]">
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{attraction.rating}</span>
                            <span className="text-[#747878] font-normal">({attraction.reviewsCount})</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1 truncate">
                            <MapPin className="w-3.5 h-3.5 text-[#83439c] flex-shrink-0" />
                            <span className="truncate">{attraction.area}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#444748] line-clamp-2 leading-relaxed">
                          {attraction.shortDescription}
                        </p>

                        {/* Ticket Tier Summary Tag */}
                        {attraction.ticketTiers && attraction.ticketTiers.length > 0 && (
                          <div className="pt-2 flex items-center justify-between text-xs border-t border-gray-100">
                            <span className="text-[11px] text-gray-500 flex items-center gap-1">
                              <Ticket className="w-3 h-3 text-[#83439c]" /> {attraction.ticketTiers.length} Pass Options
                            </span>
                            <span className="font-bold text-[#83439c]">
                              From S$ {attraction.ticketTiers[0].priceSgd}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlanRouteTo(attraction.name);
                        }}
                        className="text-[#83439c] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Plan Route
                      </button>
                      <span className="text-gray-400 font-medium">View Details &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
