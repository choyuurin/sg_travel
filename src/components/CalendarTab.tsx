import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Search,
  Filter,
  TrainFront,
  Flame,
  Star,
  CheckCircle2,
  CalendarDays,
  Tag,
  ChevronRight,
  Info,
  ExternalLink,
  ShieldCheck,
  PartyPopper,
} from 'lucide-react';
import { VISIT_SINGAPORE_FESTIVALS, FestivalEvent } from '../data/visitSingaporeData';

interface CalendarTabProps {
  onPlanRouteTo?: (destinationStation: string) => void;
}

const MONTH_NAMES = [
  'All Months',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CATEGORIES = [
  'All Categories',
  'National Day & Civic',
  'Cultural & Religious',
  'Arts, Food & Lifestyle',
  'Sports & Mega-Events',
];

export const CalendarTab: React.FC<CalendarTabProps> = ({ onPlanRouteTo }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All Months');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFestival, setSelectedFestival] = useState<FestivalEvent | null>(null);

  // Filtered festivals
  const filteredFestivals = useMemo(() => {
    return VISIT_SINGAPORE_FESTIVALS.filter((f) => {
      const matchesMonth =
        selectedMonth === 'All Months' ||
        f.month.toLowerCase().includes(selectedMonth.toLowerCase()) ||
        (selectedMonth === 'August' && f.name.includes('National Day'));

      const matchesCategory =
        selectedCategory === 'All Categories' || f.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.precinct.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.culture.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesMonth && matchesCategory && matchesSearch;
    });
  }, [selectedMonth, selectedCategory, searchQuery]);

  return (
    <div id="calendar-tab-view" className="space-y-6 px-4 pb-28 pt-2 max-w-5xl mx-auto">
      {/* Hero Banner with Official STB Badge */}
      <div className="bg-gradient-to-br from-[#83439c] via-[#6c2c85] to-[#4a1c5d] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-current" />
              Official Singapore Tourism Board (STB)
            </span>
            <span className="text-xs text-purple-200">•</span>
            <span className="text-xs text-purple-100 font-medium">Year-Round Celebrations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Festivals & Events Calendar
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
            Experience the vibrant cultural tapestry of Singapore. From the national pride of <strong>National Day on 9 August</strong> to ethnic festive light-ups across Chinatown, Geylang Serai, and Little India.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#c4c7c8]/50 shadow-xs">
        {/* Search Bar */}
        <div className="bg-[#f3f3f6] rounded-xl flex items-center px-3.5 py-2.5 border border-transparent focus-within:border-[#83439c] focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-[#747878] mr-2.5 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search festivals by name, precinct (Chinatown, Little India), or tradition..."
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-[#1a1c1e] placeholder:text-[#747878]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 font-medium px-1 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Month Selector Scrollable Ribbon */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[11px] font-bold text-gray-600 flex items-center gap-1 uppercase tracking-wider">
              <Calendar className="w-3 h-3 text-[#83439c]" /> Filter By Month
            </span>
            {selectedMonth !== 'All Months' && (
              <button
                onClick={() => setSelectedMonth('All Months')}
                className="text-[10px] font-bold text-[#83439c] hover:underline cursor-pointer"
              >
                Reset Month
              </button>
            )}
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-hide">
            {MONTH_NAMES.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedMonth === m
                    ? 'bg-[#83439c] text-white shadow-xs'
                    : 'bg-[#f3f3f6] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[11px] font-bold text-gray-600 flex items-center gap-1 uppercase tracking-wider">
              <Filter className="w-3 h-3 text-[#83439c]" /> Category
            </span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center text-xs text-gray-500 px-1">
        <span>
          Showing <strong>{filteredFestivals.length}</strong> official festivals & celebrations
        </span>
        {(selectedMonth !== 'All Months' || selectedCategory !== 'All Categories' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedMonth('All Months');
              setSelectedCategory('All Categories');
              setSearchQuery('');
            }}
            className="text-[#83439c] font-bold hover:underline cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFestivals.map((fest) => {
          const isNational = fest.id === 'singapore-national-day';

          return (
            <div
              key={fest.id}
              onClick={() => setSelectedFestival(fest)}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-[#c4c7c8]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header Image with Tag Badges */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={fest.image}
                    alt={fest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                    <span
                      style={{ backgroundColor: fest.tagColor }}
                      className="text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1"
                    >
                      <Calendar className="w-2.5 h-2.5" />
                      {fest.exactDateOrPeriod}
                    </span>

                    {fest.isPublicHoliday && (
                      <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Public Holiday
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Title */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <div className="text-[10px] font-bold text-amber-300 tracking-wide uppercase">
                      {fest.precinct}
                    </div>
                    <h3 className="text-base font-extrabold text-white leading-tight drop-shadow-xs">
                      {fest.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-2.5">
                  <p className="text-xs text-gray-500 font-medium italic">
                    {fest.culture}
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                    {fest.description}
                  </p>

                  {/* Key Highlights Chips */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                      Key Highlights
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {fest.highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className="bg-[#f3f3f6] text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-md"
                        >
                          ✨ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-4 py-2.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                  <TrainFront className="w-3.5 h-3.5 text-[#83439c]" /> {fest.nearestMrt.split('&')[0]}
                </span>
                <span className="text-[#83439c] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Festival Modal */}
      {selectedFestival && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
            {/* Modal Hero Image */}
            <div className="relative h-52 bg-gray-900">
              <img
                src={selectedFestival.image}
                alt={selectedFestival.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedFestival(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Top Tags */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span
                  style={{ backgroundColor: selectedFestival.tagColor }}
                  className="text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs"
                >
                  {selectedFestival.exactDateOrPeriod}
                </span>
                {selectedFestival.isPublicHoliday && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    Public Holiday
                  </span>
                )}
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider block">
                  {selectedFestival.precinct} • {selectedFestival.month}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedFestival.name}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Culture Badge */}
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#83439c] block mb-0.5">
                  Cultural Significance
                </span>
                <p className="text-xs font-semibold text-purple-950">
                  {selectedFestival.culture}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  About the Celebration
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {selectedFestival.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                  Festival Highlights & What to See
                </h4>
                <div className="space-y-1.5">
                  {selectedFestival.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-[#f3f3f6] p-2.5 rounded-xl text-xs text-gray-800 font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#83439c] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insider Visitor Tip */}
              <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200/70 flex gap-2.5">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-amber-900 block">
                    VisitSingapore Insider Experience Tip
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    {selectedFestival.bestExperienceTip}
                  </p>
                </div>
              </div>

              {/* Location & MRT */}
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{selectedFestival.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 font-bold">
                    <TrainFront className="w-3.5 h-3.5 text-[#83439c]" />
                    <span>MRT: {selectedFestival.nearestMrt}</span>
                  </div>
                </div>

                {onPlanRouteTo && (
                  <button
                    onClick={() => {
                      const station = selectedFestival.nearestMrt.split(' ')[0];
                      onPlanRouteTo(station);
                      setSelectedFestival(null);
                    }}
                    className="px-3.5 py-2 bg-[#83439c] text-white text-xs font-bold rounded-xl hover:bg-[#6c2c85] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <TrainFront className="w-3.5 h-3.5" />
                    <span>Plan Route There</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-gray-100/80 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedFestival(null)}
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-gray-900 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
