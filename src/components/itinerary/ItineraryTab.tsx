import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Sparkles,
  Plus,
  Compass,
  DollarSign,
  Share2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  ChevronRight,
  ListFilter,
  Layers,
  Edit2,
  Check,
  BookOpen,
  ArrowRight,
  TrainFront,
  Flame,
  Info,
} from 'lucide-react';
import { TripItinerary, ItineraryDay, ItineraryStop } from '../../types';
import { PRESET_STARTER_ITINERARIES, convertStbItineraryToTrip } from '../../data/itineraryData';
import { VISIT_SINGAPORE_ITINERARIES, VisitSingaporeItinerary } from '../../data/visitSingaporeData';
import { DayTimelineView } from './DayTimelineView';
import { AddPlaceModal } from './AddPlaceModal';
import { TemplatesModal } from './TemplatesModal';
import { BudgetSummaryModal } from './BudgetSummaryModal';

interface ItineraryTabProps {
  onSelectAttraction?: (attractionId: string) => void;
  onOpenRoutePlanner?: (destinationStation: string) => void;
}

const LOCAL_STORAGE_KEY = 'sg_wanderlog_trip_itinerary_v1';

export const ItineraryTab: React.FC<ItineraryTabProps> = ({
  onSelectAttraction,
  onOpenRoutePlanner,
}) => {
  // Top view mode: 'planner' or 'stb-itineraries'
  const [itineraryViewMode, setItineraryViewMode] = useState<'planner' | 'stb-itineraries'>('planner');

  // STB Itinerary Explorer state
  const [selectedStbId, setSelectedStbId] = useState<string>('itinerary-4days');
  const [expandedStbDays, setExpandedStbDays] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  // Load saved itinerary from localStorage or fall back to default 3-Day preset
  const [trip, setTrip] = useState<TripItinerary>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved itinerary', e);
    }
    return PRESET_STARTER_ITINERARIES[0];
  });

  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState<boolean>(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState<boolean>(false);
  const [isBudgetSummaryOpen, setIsBudgetSummaryOpen] = useState<boolean>(false);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [titleInputValue, setTitleInputValue] = useState(trip.title);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trip));
    } catch (e) {
      console.error('Failed to save itinerary', e);
    }
  }, [trip]);

  const activeDay: ItineraryDay = trip.days[activeDayIndex] || trip.days[0];

  // Calculate high level metrics
  let totalCostSgd = 0;
  let totalStops = 0;
  let completedStops = 0;

  trip.days.forEach((d) => {
    d.stops.forEach((s) => {
      totalStops++;
      if (s.isCompleted) completedStops++;
      totalCostSgd += s.costSgd;
      if (s.transitToNext?.fareSgd) totalCostSgd += s.transitToNext.fareSgd;
    });
  });

  // Handlers
  const handleToggleComplete = (stopId: string) => {
    setTrip((prev) => {
      const updatedDays = prev.days.map((day) => {
        const updatedStops = day.stops.map((stop) => {
          if (stop.id === stopId) {
            return { ...stop, isCompleted: !stop.isCompleted };
          }
          return stop;
        });
        return { ...day, stops: updatedStops };
      });
      return { ...prev, days: updatedDays };
    });
  };

  const handleMoveStop = (stopIndex: number, direction: 'up' | 'down') => {
    setTrip((prev) => {
      const updatedDays = [...prev.days];
      const day = { ...updatedDays[activeDayIndex] };
      const stops = [...day.stops];

      const targetIndex = direction === 'up' ? stopIndex - 1 : stopIndex + 1;
      if (targetIndex < 0 || targetIndex >= stops.length) return prev;

      const temp = stops[stopIndex];
      stops[stopIndex] = stops[targetIndex];
      stops[targetIndex] = temp;

      day.stops = stops;
      updatedDays[activeDayIndex] = day;
      return { ...prev, days: updatedDays };
    });
  };

  const handleDeleteStop = (stopId: string) => {
    setTrip((prev) => {
      const updatedDays = prev.days.map((day) => ({
        ...day,
        stops: day.stops.filter((s) => s.id !== stopId),
      }));
      return { ...prev, days: updatedDays };
    });
  };

  const handleMoveStopToDay = (stopId: string, targetDayNumber: number) => {
    setTrip((prev) => {
      let movedStop: ItineraryStop | null = null;
      // Remove from current day
      const cleanedDays = prev.days.map((day) => {
        const found = day.stops.find((s) => s.id === stopId);
        if (found) movedStop = found;
        return {
          ...day,
          stops: day.stops.filter((s) => s.id !== stopId),
        };
      });

      if (!movedStop) return prev;

      // Add to target day
      const finalDays = cleanedDays.map((day) => {
        if (day.dayNumber === targetDayNumber) {
          return {
            ...day,
            stops: [...day.stops, movedStop!],
          };
        }
        return day;
      });

      return { ...prev, days: finalDays };
    });
  };

  const handleUpdateStopNotes = (stopId: string, notes: string) => {
    setTrip((prev) => {
      const updatedDays = prev.days.map((day) => ({
        ...day,
        stops: day.stops.map((s) => (s.id === stopId ? { ...s, notes } : s)),
      }));
      return { ...prev, days: updatedDays };
    });
  };

  const handleAddStop = (newStopData: Omit<ItineraryStop, 'id' | 'isCompleted'>) => {
    const newStop: ItineraryStop = {
      ...newStopData,
      id: `custom-stop-${Date.now()}`,
      isCompleted: false,
    };

    setTrip((prev) => {
      const updatedDays = prev.days.map((day, idx) => {
        if (idx === activeDayIndex) {
          return {
            ...day,
            stops: [...day.stops, newStop],
          };
        }
        return day;
      });
      return { ...prev, days: updatedDays };
    });
  };

  const handleAddDay = () => {
    setTrip((prev) => {
      const newDayNum = prev.days.length + 1;
      const newDay: ItineraryDay = {
        id: `day-${newDayNum}-${Date.now()}`,
        dayNumber: newDayNum,
        dateStr: `Day ${newDayNum}`,
        title: `Day ${newDayNum}: Explore Singapore`,
        themeArea: 'Custom Sightseeing',
        weatherAdvice: 'Partly sunny, humid with breezy afternoons.',
        stops: [],
      };
      return {
        ...prev,
        totalDays: newDayNum,
        days: [...prev.days, newDay],
      };
    });
    setActiveDayIndex(trip.days.length);
  };

  const handleRemoveDay = (dayIndex: number) => {
    if (trip.days.length <= 1) return;
    setTrip((prev) => {
      const filtered = prev.days.filter((_, idx) => idx !== dayIndex);
      // Re-number days
      const renumbered = filtered.map((d, idx) => ({
        ...d,
        dayNumber: idx + 1,
        dateStr: `Day ${idx + 1}`,
      }));
      return {
        ...prev,
        totalDays: renumbered.length,
        days: renumbered,
      };
    });
    if (activeDayIndex >= trip.days.length - 1) {
      setActiveDayIndex(Math.max(0, trip.days.length - 2));
    }
  };

  const handleSaveTitle = () => {
    if (titleInputValue.trim()) {
      setTrip((prev) => ({ ...prev, title: titleInputValue.trim() }));
    }
    setIsEditingTitle(false);
  };

  const handleExportItinerary = () => {
    let summaryText = `✈️ ${trip.title.toUpperCase()}\n`;
    summaryText += `Total Days: ${trip.totalDays} | Est. Total Budget: S$ ${totalCostSgd.toFixed(2)}\n\n`;

    trip.days.forEach((day) => {
      summaryText += `📅 DAY ${day.dayNumber}: ${day.title} (${day.themeArea})\n`;
      if (day.stops.length === 0) {
        summaryText += `   (No stops planned yet)\n`;
      } else {
        day.stops.forEach((s, idx) => {
          summaryText += `   ${idx + 1}. [${s.timeSlot}] ${s.title} (${s.category}) - ${s.costSgd === 0 ? 'Free' : `S$${s.costSgd}`}\n`;
          if (s.nearestMrt) summaryText += `      🚇 MRT: ${s.nearestMrt}\n`;
          if (s.notes) summaryText += `      📝 Notes: ${s.notes}\n`;
          if (s.transitToNext) summaryText += `      ➡️ Transit: ${s.transitToNext.duration} - ${s.transitToNext.instruction}\n`;
        });
      }
      summaryText += `\n`;
    });

    navigator.clipboard.writeText(summaryText);
    setCopyToast('Itinerary copied to clipboard!');
    setTimeout(() => setCopyToast(null), 3000);
  };

  const toggleStbDayExpanded = (dayNum: number) => {
    setExpandedStbDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const handleLoadStbPresetIntoTrip = (stbItineraryId: string) => {
    // Check in VISIT_SINGAPORE_ITINERARIES first
    const stbItinerary = VISIT_SINGAPORE_ITINERARIES.find((it) => it.id === stbItineraryId);
    let newTrip: TripItinerary;

    if (stbItinerary) {
      newTrip = convertStbItineraryToTrip(stbItinerary);
    } else {
      const matchingPreset =
        PRESET_STARTER_ITINERARIES.find((p) => p.id === stbItineraryId) ||
        PRESET_STARTER_ITINERARIES[0];
      // Clone to ensure a fresh instance
      newTrip = JSON.parse(JSON.stringify(matchingPreset));
    }

    setTrip(newTrip);
    setActiveDayIndex(0);
    setItineraryViewMode('planner');
    setCopyToast(`Loaded "${newTrip.title}" into Planner!`);
    setTimeout(() => setCopyToast(null), 3000);
  };

  const selectedStbItinerary =
    VISIT_SINGAPORE_ITINERARIES.find((it) => it.id === selectedStbId) ||
    VISIT_SINGAPORE_ITINERARIES[0];

  return (
    <div className="space-y-4 pb-28 pt-2 px-4 max-w-5xl mx-auto" id="itinerary-tab">
      {/* Toast */}
      {copyToast && (
        <div className="fixed top-18 right-4 z-50 bg-[#83439c] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Top View Mode Switcher: My Planner vs STB Official Itineraries */}
      <div className="bg-white p-1.5 rounded-2xl border border-[#c4c7c8]/50 shadow-xs flex gap-1">
        <button
          onClick={() => setItineraryViewMode('planner')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            itineraryViewMode === 'planner'
              ? 'bg-[#83439c] text-white shadow-xs'
              : 'text-[#444748] hover:bg-[#f3f3f6]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Interactive Trip Planner</span>
        </button>

        <button
          onClick={() => setItineraryViewMode('stb-itineraries')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            itineraryViewMode === 'stb-itineraries'
              ? 'bg-[#83439c] text-white shadow-xs'
              : 'text-[#444748] hover:bg-[#f3f3f6]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>STB Official Itineraries</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. STB RECOMMENDED OFFICIAL ITINERARIES VIEW */}
      {/* ========================================================================= */}
      {itineraryViewMode === 'stb-itineraries' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-[#83439c] via-[#6c2c85] to-[#4a1c5d] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-2 max-w-2xl">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 border border-white/20">
                <Sparkles className="w-3 h-3 text-amber-300 fill-current" /> VisitSingapore Official Blueprints
              </span>
              <h2 className="text-xl sm:text-2xl font-black">Curated Singapore Itineraries</h2>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                Expertly structured trails designed by the Singapore Tourism Board. Choose a complete itinerary below to explore day-by-day morning, afternoon, and evening plans, or load it into your interactive planner with one tap.
              </p>
            </div>
          </div>

          {/* Itinerary Cards Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {VISIT_SINGAPORE_ITINERARIES.map((it) => {
              const isSelected = it.id === selectedStbId;
              return (
                <div
                  key={it.id}
                  onClick={() => setSelectedStbId(it.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#83439c] ring-2 ring-[#83439c]/20 bg-[#faf5fc] shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#83439c] text-white">
                        {it.durationDays} Days
                      </span>
                      {it.badge && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                          {it.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 leading-snug">{it.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{it.summary}</p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-500 font-medium">{it.suitableFor.split(',')[0]}</span>
                    <span className="text-[#83439c] font-bold flex items-center gap-0.5">
                      Explore <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Itinerary Detailed Breakdown */}
          <div className="bg-white rounded-3xl border border-[#c4c7c8]/50 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#83439c] uppercase tracking-wider">
                  {selectedStbItinerary.durationDays}-Day Complete Blueprint
                </span>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mt-0.5">
                  {selectedStbItinerary.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Best for:</strong> {selectedStbItinerary.suitableFor}
                </p>
              </div>

              <button
                onClick={() => handleLoadStbPresetIntoTrip(selectedStbItinerary.id)}
                className="px-4 py-2.5 bg-[#83439c] text-white text-xs font-bold rounded-xl hover:bg-[#6c2c85] transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Into My Planner</span>
              </button>
            </div>

            {/* Day by Day Morning / Afternoon / Evening Cards */}
            <div className="space-y-4">
              {selectedStbItinerary.days.map((day) => {
                const isExpanded = expandedStbDays[day.dayNumber] ?? true;

                return (
                  <div
                    key={day.dayNumber}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-[#fbfbfd]"
                  >
                    <div
                      onClick={() => toggleStbDayExpanded(day.dayNumber)}
                      className="p-4 bg-white border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-[#83439c] text-white font-black text-xs flex items-center justify-center">
                          {day.dayNumber}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            Day {day.dayNumber}: {day.theme}
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {isExpanded ? 'Collapse' : 'Expand'}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="p-4 space-y-3 text-xs animate-in fade-in duration-150">
                        {/* Morning */}
                        <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-900 uppercase text-[10px] tracking-wider">
                              ☀️ Morning
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">
                              📍 {day.morning.location}
                            </span>
                          </div>
                          <h5 className="font-bold text-gray-900">{day.morning.title}</h5>
                          <p className="text-gray-600 leading-relaxed">{day.morning.desc}</p>
                        </div>

                        {/* Afternoon */}
                        <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider">
                              🌤️ Afternoon
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">
                              📍 {day.afternoon.location}
                            </span>
                          </div>
                          <h5 className="font-bold text-gray-900">{day.afternoon.title}</h5>
                          <p className="text-gray-600 leading-relaxed">{day.afternoon.desc}</p>
                        </div>

                        {/* Evening */}
                        <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-purple-900 uppercase text-[10px] tracking-wider">
                              🌙 Evening
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">
                              📍 {day.evening.location}
                            </span>
                          </div>
                          <h5 className="font-bold text-gray-900">{day.evening.title}</h5>
                          <p className="text-gray-600 leading-relaxed">{day.evening.desc}</p>
                        </div>

                        {/* Insider Tip */}
                        {day.insiderTip && (
                          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-900 flex items-start gap-2">
                            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-[11px] block">VisitSingapore Insider Tip:</span>
                              <p className="text-emerald-800 text-[11px] leading-relaxed">
                                {day.insiderTip}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE TRIP PLANNER VIEW */}
      {/* ========================================================================= */}
      {itineraryViewMode === 'planner' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Main Header / Trip Overview */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#f3e8f7] text-[#83439c] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Interactive Custom Planner
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {trip.totalDays} Days ({totalStops} stops)
                  </span>
                </div>

                {/* Editable Title */}
                {isEditingTitle ? (
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="text"
                      value={titleInputValue}
                      onChange={(e) => setTitleInputValue(e.target.value)}
                      className="text-base font-bold text-gray-900 px-2 py-1 border border-[#83439c] rounded-lg focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveTitle}
                      className="bg-[#83439c] text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#6c2c85]"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-2 mt-1 group cursor-pointer"
                    onClick={() => {
                      setTitleInputValue(trip.title);
                      setIsEditingTitle(true);
                    }}
                  >
                    <h2 className="text-base sm:text-xl font-black text-gray-900 group-hover:text-[#83439c] transition-colors">
                      {trip.title}
                    </h2>
                    <Edit2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#83439c] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setIsTemplatesOpen(true)}
                  className="flex items-center gap-1.5 bg-[#faf5fc] hover:bg-[#f3e8f7] text-[#83439c] border border-[#ecd5f5] text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Templates</span>
                </button>

                <button
                  onClick={() => setIsBudgetSummaryOpen(true)}
                  className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>S$ {totalCostSgd.toFixed(0)} Budget</span>
                </button>

                <button
                  onClick={handleExportItinerary}
                  title="Copy Itinerary summary"
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* High Level Quick Progress Bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-gray-700">
                  {completedStops} of {totalStops} stops visited
                </span>
              </div>
              <div className="w-36 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#83439c] h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${totalStops > 0 ? (completedStops / totalStops) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Days Horizontal Tab Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
            {trip.days.map((day, idx) => {
              const isActive = idx === activeDayIndex;
              const dayStopsCount = day.stops.length;
              const dayCost = day.stops.reduce((sum, s) => sum + s.costSgd, 0);

              return (
                <button
                  key={day.id}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`flex-shrink-0 text-left p-3 rounded-2xl border transition-all cursor-pointer min-w-[130px] ${
                    isActive
                      ? 'bg-[#83439c] text-white border-[#83439c] shadow-sm'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Day {day.dayNumber}
                    </span>
                    <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                      {dayStopsCount} stops
                    </span>
                  </div>
                  <div className="text-xs font-bold mt-1 truncate">
                    {day.title.replace(`Day ${day.dayNumber}:`, '').trim() || `Day ${day.dayNumber}`}
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 font-medium ${
                      isActive ? 'text-white/80' : 'text-emerald-700'
                    }`}
                  >
                    ~S${dayCost}
                  </div>
                </button>
              );
            })}

            {/* Add Day Button */}
            <button
              onClick={handleAddDay}
              className="flex-shrink-0 p-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 hover:bg-gray-100 text-gray-600 flex flex-col items-center justify-center min-w-[90px] h-[76px] transition-colors cursor-pointer"
              title="Add another day to trip"
            >
              <Plus className="w-4 h-4 text-[#83439c]" />
              <span className="text-[11px] font-bold mt-0.5">+ Add Day</span>
            </button>
          </div>

          {/* Active Day Timeline Content */}
          <DayTimelineView
            day={activeDay}
            totalDays={trip.totalDays}
            onToggleComplete={handleToggleComplete}
            onMoveStop={handleMoveStop}
            onDeleteStop={handleDeleteStop}
            onMoveStopToDay={handleMoveStopToDay}
            onUpdateStopNotes={handleUpdateStopNotes}
            onOpenAddModal={() => setIsAddPlaceOpen(true)}
            onSelectAttraction={onSelectAttraction}
            onOpenRoutePlanner={onOpenRoutePlanner}
          />

          {/* Delete Day button if more than 1 day */}
          {trip.days.length > 1 && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete Day ${activeDay.dayNumber} and its stops?`
                    )
                  ) {
                    handleRemoveDay(activeDayIndex);
                  }
                }}
                className="text-xs text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Day {activeDay.dayNumber}</span>
              </button>
            </div>
          )}

          {/* Add Place Modal */}
          <AddPlaceModal
            isOpen={isAddPlaceOpen}
            onClose={() => setIsAddPlaceOpen(false)}
            dayNumber={activeDay.dayNumber}
            onAddStop={handleAddStop}
          />

          {/* Templates Modal */}
          <TemplatesModal
            isOpen={isTemplatesOpen}
            onClose={() => setIsTemplatesOpen(false)}
            onSelectTemplate={(template) => {
              setTrip(template);
              setActiveDayIndex(0);
            }}
          />

          {/* Budget Summary Modal */}
          <BudgetSummaryModal
            isOpen={isBudgetSummaryOpen}
            onClose={() => setIsBudgetSummaryOpen(false)}
            trip={trip}
          />
        </div>
      )}
    </div>
  );
};
