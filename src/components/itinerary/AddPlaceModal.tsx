import React, { useState } from 'react';
import { X, Plus, Search, MapPin, DollarSign, Clock, TrainFront, Sparkles } from 'lucide-react';
import { ItineraryCategory, ItineraryStop } from '../../types';
import { SUGGESTED_PLACES_CATALOG, CatalogPlace } from '../../data/itineraryData';

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  onAddStop: (stop: Omit<ItineraryStop, 'id' | 'isCompleted'>) => void;
}

const CATEGORIES: ItineraryCategory[] = [
  'Sightseeing',
  'Food & Drinks',
  'Culture & Heritage',
  'Nature & Parks',
  'Shopping',
  'Entertainment',
  'Transit',
  'Stay',
];

export const AddPlaceModal: React.FC<AddPlaceModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  onAddStop,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'custom'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Custom Form state
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState<ItineraryCategory>('Sightseeing');
  const [customTime, setCustomTime] = useState('10:00 AM');
  const [customDuration, setCustomDuration] = useState('1.5 hrs');
  const [customCost, setCustomCost] = useState('0');
  const [customLocation, setCustomLocation] = useState('');
  const [customMrt, setCustomMrt] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  if (!isOpen) return null;

  const filteredCatalog = SUGGESTED_PLACES_CATALOG.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === 'All' || place.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleSelectCatalogPlace = (place: CatalogPlace) => {
    onAddStop({
      placeId: place.id,
      title: place.name,
      category: place.category,
      timeSlot: place.recommendedTime || '10:00 AM',
      duration: place.defaultDuration || '1.5 hrs',
      costSgd: place.defaultCostSgd || 0,
      location: place.location,
      nearestMrt: place.nearestMrt,
      notes: place.recommendedNotes || '',
      image: place.image,
      transitToNext: {
        type: 'mrt',
        duration: '10 mins',
        instruction: `Take MRT from ${place.nearestMrt.split('(')[0].trim() || 'nearby station'} to next destination.`,
        fareSgd: 1.25,
      },
    });
    onClose();
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    onAddStop({
      title: customTitle.trim(),
      category: customCategory,
      timeSlot: customTime || '10:00 AM',
      duration: customDuration || '1 hr',
      costSgd: parseFloat(customCost) || 0,
      location: customLocation.trim() || 'Singapore',
      nearestMrt: customMrt.trim() || undefined,
      notes: customNotes.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        id="add-place-modal"
      >
        {/* Header */}
        <div className="p-4 bg-[#83439c] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#f9d8ff]" />
              <h3 className="text-lg font-bold">Add Stop to Day {dayNumber}</h3>
            </div>
            <p className="text-xs text-[#f9d8ff]/90 mt-0.5">
              Choose from popular Singapore highlights or create a custom stop
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Catalog vs Custom */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-4 pt-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'catalog'
                ? 'border-[#83439c] text-[#83439c]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Singapore Places Catalog ({SUGGESTED_PLACES_CATALOG.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'custom'
                ? 'border-[#83439c] text-[#83439c]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            + Custom Activity
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'catalog' ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search places, food, Chinatown, Sentosa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-100/90 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {['All', 'Sightseeing', 'Food & Drinks', 'Culture & Heritage', 'Nature & Parks', 'Entertainment'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                      selectedCategoryFilter === cat
                        ? 'bg-[#83439c] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Catalog List */}
            <div className="space-y-2.5 pt-1">
              {filteredCatalog.map((place) => (
                <div
                  key={place.id}
                  className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-xl bg-white hover:border-[#83439c]/40 hover:bg-[#faf5fc] transition-all group cursor-pointer"
                  onClick={() => handleSelectCatalogPlace(place)}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#f3e8f7] text-[#83439c]">
                        {place.category}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">{place.area}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 truncate mt-0.5 group-hover:text-[#83439c] transition-colors">
                      {place.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5 flex items-center gap-2">
                      <span>⏱️ {place.defaultDuration}</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-700">
                        {place.defaultCostSgd === 0 ? 'Free' : `S$ ${place.defaultCostSgd}`}
                      </span>
                    </p>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full bg-[#f3e8f7] text-[#83439c] flex items-center justify-center group-hover:bg-[#83439c] group-hover:text-white transition-colors flex-shrink-0"
                    title="Add stop"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {filteredCatalog.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-xs">
                  No places found matching your search. Try switching categories or create a custom activity!
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateCustom} className="flex-1 overflow-y-auto p-4 space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                Place / Activity Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Breakfast at Ya Kun Kaya Toast"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Category
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as ItineraryCategory)}
                  className="w-full text-xs px-2.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900 bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10:00 AM"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Est. Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.5 hrs"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                  Est. Cost (SGD)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">
                    S$
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={customCost}
                    onChange={(e) => setCustomCost(e.target.value)}
                    className="w-full text-xs pl-7 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                Location / Address (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 18 Marina Gardens Dr"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                Nearest MRT Station (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Bayfront MRT (DT16)"
                value={customMrt}
                onChange={(e) => setCustomMrt(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">
                Personal Notes & Tips (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Book fast pass online; order ice kachang dessert..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-900 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#83439c] hover:bg-[#6c2c85] text-white text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer shadow-md"
              >
                + Add Stop to Day {dayNumber}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs text-gray-600 hover:text-gray-900 font-semibold px-4 py-1.5 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
