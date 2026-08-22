import React from 'react';
import { X, SunMedium, CloudRain, Droplets, Wind, Umbrella, AlertTriangle, ShieldCheck } from 'lucide-react';
import { HOURLY_WEATHER } from '../../data/singaporeData';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLive?: () => void;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({ isOpen, onClose, onNavigateToLive }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="weather-modal-content"
        className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        {/* Header Hero */}
        <div className="p-5 bg-gradient-to-br from-[#83439c] to-[#4a154b] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="text-xs font-semibold text-purple-200 uppercase tracking-wider mb-1">
            Singapore Live Weather
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-4xl font-bold">31°C</div>
              <div className="text-sm text-purple-100 font-medium mt-1">Partly Cloudy & Warm</div>
              <div className="text-xs text-purple-200">Feels like 36°C (Tropical Humidity)</div>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <SunMedium className="w-10 h-10 text-amber-300 animate-pulse" />
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-center">
            <div className="bg-white/10 rounded-lg p-1.5">
              <div className="text-[10px] text-purple-200 flex items-center justify-center gap-1">
                <Droplets className="w-3 h-3" /> Humidity
              </div>
              <div className="text-xs font-bold mt-0.5">76%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-1.5">
              <div className="text-[10px] text-purple-200 flex items-center justify-center gap-1">
                <Wind className="w-3 h-3" /> Wind
              </div>
              <div className="text-xs font-bold mt-0.5">14 km/h</div>
            </div>
            <div className="bg-white/10 rounded-lg p-1.5">
              <div className="text-[10px] text-purple-200 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> UV Index
              </div>
              <div className="text-xs font-bold text-amber-300 mt-0.5">9 (Very High)</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Hourly Forecast */}
          <div>
            <h3 className="text-sm font-bold text-[#1a1c1e] mb-2.5">Today&apos;s Hourly Forecast</h3>
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
              {HOURLY_WEATHER.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-20 p-2.5 rounded-xl text-center border transition-all ${
                    idx === 0
                      ? 'bg-[#f9d8ff]/40 border-[#83439c]'
                      : 'bg-[#f9f9fc] border-gray-100'
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-700">{item.time}</div>
                  <div className="my-1.5 flex justify-center">
                    {item.icon === 'CloudRain' ? (
                      <CloudRain className="w-5 h-5 text-blue-500" />
                    ) : (
                      <SunMedium className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <div className="text-sm font-bold text-gray-900">{item.temp}°</div>
                  <div className="text-[10px] text-blue-600 font-medium mt-1">
                    {item.rainProb}% rain
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tropical Weather Travel Advisory */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Singapore Weather Tips
            </div>
            <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
              <li>
                <strong>Passing Showers:</strong> Afternoon tropical rain is common (usually lasting 30–45 mins). Most city attractions are linked via sheltered walkways or underground malls.
              </li>
              <li>
                <strong>Sun Protection:</strong> Apply sunscreen (SPF 50+) and stay hydrated between 11 AM and 3 PM.
              </li>
              <li>
                <strong>Indoor Respite:</strong> Step into Gardens by the Bay domes (23°C) or Marina Bay Sands if midday heat picks up.
              </li>
            </ul>
          </div>

          {/* Emergency Umbrella / Underground Network */}
          <div className="p-3 bg-[#f3f3f6] rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#83439c] text-white flex items-center justify-center flex-shrink-0">
              <Umbrella className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1a1c1e]">Sheltered Walkway Guarantee</div>
              <div className="text-[11px] text-gray-600">
                Over 200km of covered linkways connect Singapore MRT stations directly to hotels, hawker centers, and attractions.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          {onNavigateToLive ? (
            <button
              onClick={() => {
                onClose();
                onNavigateToLive();
              }}
              className="text-xs font-bold text-[#83439c] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Full 7-Day & 1-Month Forecast &rarr;</span>
            </button>
          ) : <div />}
          <button
            onClick={onClose}
            className="bg-[#83439c] text-white text-xs font-semibold py-2 px-5 rounded-lg cursor-pointer hover:bg-[#6c2c85] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
