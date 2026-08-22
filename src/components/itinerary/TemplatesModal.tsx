import React, { useState } from 'react';
import { X, Sparkles, Check, Compass, Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { TripItinerary } from '../../types';
import { PRESET_STARTER_ITINERARIES } from '../../data/itineraryData';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TripItinerary) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    PRESET_STARTER_ITINERARIES[0].id
  );

  if (!isOpen) return null;

  const selectedPreset =
    PRESET_STARTER_ITINERARIES.find((p) => p.id === selectedPresetId) ||
    PRESET_STARTER_ITINERARIES[0];

  const totalStopsCount = selectedPreset.days.reduce(
    (acc, d) => acc + d.stops.length,
    0
  );
  const totalCost = selectedPreset.days.reduce(
    (acc, d) => acc + d.stops.reduce((sum, s) => sum + s.costSgd, 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-150"
        id="templates-modal"
      >
        {/* Header */}
        <div className="p-4 bg-[#83439c] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#f9d8ff]" />
              <h3 className="text-lg font-bold">Curated Starter Itineraries</h3>
            </div>
            <p className="text-xs text-[#f9d8ff]/90 mt-0.5">
              Choose an expertly crafted itinerary template or customize your own
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selector Tabs */}
        <div className="p-3 border-b border-gray-100 bg-gray-50/80 flex gap-2 overflow-x-auto no-scrollbar">
          {PRESET_STARTER_ITINERARIES.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`text-left p-2.5 rounded-xl border transition-all flex-1 min-w-[160px] cursor-pointer ${
                  isSelected
                    ? 'border-[#83439c] bg-[#faf5fc] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#83439c] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {preset.totalDays} Days
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#83439c]" />}
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-1.5 line-clamp-1">
                  {preset.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Preset Preview */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">{selectedPreset.title}</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              {selectedPreset.subtitle}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#83439c]" /> {selectedPreset.totalDays} Days
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> {totalStopsCount} Curated Stops
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold text-emerald-700">
                <DollarSign className="w-3.5 h-3.5" /> ~S$ {totalCost} total / pax
              </span>
            </div>
          </div>

          {/* Days Preview */}
          <div className="space-y-3 pt-1">
            {selectedPreset.days.map((day) => (
              <div
                key={day.id}
                className="border border-gray-200 rounded-xl p-3 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-gray-200/80 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#83439c] text-white text-[11px] font-bold flex items-center justify-center">
                      D{day.dayNumber}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{day.title}</h4>
                      <p className="text-[10px] text-gray-500">{day.themeArea}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500">
                    {day.stops.length} stops
                  </span>
                </div>

                <div className="space-y-1.5">
                  {day.stops.map((stop, idx) => (
                    <div
                      key={stop.id || idx}
                      className="flex items-center justify-between text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-gray-400 w-12 flex-shrink-0">
                          {stop.timeSlot}
                        </span>
                        <span className="font-semibold text-gray-800 truncate">
                          {stop.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2 font-medium">
                        {stop.costSgd === 0 ? 'Free' : `S$${stop.costSgd}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-gray-600 hover:text-gray-900 font-semibold px-4 py-2 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelectTemplate(selectedPreset);
              onClose();
            }}
            className="bg-[#83439c] hover:bg-[#6c2c85] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#f9d8ff]" />
            <span>Apply This Template</span>
          </button>
        </div>
      </div>
    </div>
  );
};
