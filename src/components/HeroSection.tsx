import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Sparkles } from 'lucide-react';
import { ATTRACTIONS, HERO_IMAGE } from '../data/singaporeData';
import { Attraction } from '../types';

interface HeroSectionProps {
  onSelectAttraction: (attraction: Attraction) => void;
  onSearchSubmit: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectAttraction, onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Attraction[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const results = ATTRACTIONS.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.area.toLowerCase().includes(q) ||
          a.shortDescription.toLowerCase().includes(q)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (filteredResults.length > 0) {
        onSelectAttraction(filteredResults[0]);
        setIsFocused(false);
      } else if (searchQuery.trim().length > 0) {
        onSearchSubmit(searchQuery);
        setIsFocused(false);
      }
    }
  };

  const handleSelect = (item: Attraction) => {
    onSelectAttraction(item);
    setSearchQuery('');
    setIsFocused(false);
  };

  return (
    <section
      id="hero-section"
      className="relative w-full h-[397px] min-h-[300px] flex flex-col justify-end p-4 md:p-8 rounded-b-2xl md:rounded-2xl overflow-hidden shadow-xs mb-6"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <h2
          id="hero-title"
          className="text-white font-bold text-[32px] leading-[40px] md:text-[36px] md:leading-[44px] text-center mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] tracking-tight"
        >
          Explore the Lion City
        </h2>

        {/* Search Bar Container */}
        <div ref={searchContainerRef} className="w-full relative">
          <div
            id="hero-search-bar"
            className="w-full bg-[#ffffff] rounded-xl flex items-center px-3 py-1 shadow-lg border-2 border-transparent focus-within:border-[#83439c] transition-all duration-200"
          >
            <Search className="w-5 h-5 text-[#747878] ml-2 mr-3 flex-shrink-0" />
            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Where to go in Singapore?"
              className="flex-1 bg-transparent border-none outline-none text-[#1a1c1e] text-[16px] placeholder:text-[#747878] py-2 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#747878] hover:text-[#1a1c1e] transition-colors rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete / Suggestions Dropdown */}
          {isFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {filteredResults.length > 0 ? (
                <div className="p-2 divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  <div className="px-3 py-1.5 text-xs font-semibold text-[#83439c] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Popular Destinations
                  </div>
                  {filteredResults.map((attraction) => (
                    <button
                      key={attraction.id}
                      onClick={() => handleSelect(attraction)}
                      className="w-full px-3 py-2.5 text-left hover:bg-[#f9f9fc] flex items-center gap-3 rounded-lg transition-colors group cursor-pointer"
                    >
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 group-hover:brightness-95 transition-all"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-[#1a1c1e] truncate group-hover:text-[#83439c] transition-colors">
                          {attraction.name}
                        </div>
                        <div className="text-xs text-[#747878] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#1b6d24]" />
                          <span>{attraction.area}</span> •{' '}
                          <span className="text-amber-600 font-medium">★ {attraction.rating}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim().length > 0 ? (
                <div className="p-4 text-center text-sm text-[#747878]">
                  No exact matches for &quot;{searchQuery}&quot;. Press enter to search all guides.
                </div>
              ) : (
                <div className="p-3">
                  <div className="px-2 pb-1.5 text-xs font-semibold text-[#747878] uppercase tracking-wider">
                    Quick Suggestions
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ATTRACTIONS.slice(0, 4).map((a) => (
                      <button
                        key={a.id}
                        onClick={() => handleSelect(a)}
                        className="flex items-center gap-2 p-2 hover:bg-[#f9f9fc] rounded-lg text-left transition-colors cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#83439c] flex-shrink-0" />
                        <span className="text-xs font-medium text-[#1a1c1e] truncate">{a.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
