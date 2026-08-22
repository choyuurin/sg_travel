import React from 'react';
import { X, Heart, Compass, CalendarDays, TrainFront, BookOpen, MapPin, ExternalLink, ShieldCheck, Moon, Sun, Info, Activity, MessagesSquare } from 'lucide-react';
import { TabType, Attraction } from '../../types';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
  savedAttractions: Attraction[];
  onSelectAttraction: (attraction: Attraction) => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  savedAttractions,
  onSelectAttraction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        id="drawer-panel"
        className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200"
      >
        <div>
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-[#83439c] to-[#6c2c85] text-white flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold tracking-tight">SG Travel</h2>
              <p className="text-xs text-purple-200 mt-0.5">Singapore Smart Companion</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="text-[11px] font-semibold text-[#747878] uppercase px-3 py-1">
              Navigation
            </div>
            <button
              onClick={() => {
                onNavigateTab('home');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f9f9fc] text-[#1a1c1e] text-sm font-medium text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f9d8ff]/50 text-[#83439c] flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span>Home & Overview</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('explore');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f9f9fc] text-[#1a1c1e] text-sm font-medium text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f9d8ff]/50 text-[#83439c] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span>Explore Attractions</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('itinerary');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f9f9fc] text-[#1a1c1e] text-sm font-medium text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f9d8ff]/50 text-[#83439c] flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between flex-1">
                <span>Itinerary Planner</span>
                <span className="text-[10px] bg-purple-100 text-[#83439c] font-bold px-1.5 py-0.5 rounded">
                  Wanderlog
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                onNavigateTab('live');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f9f9fc] text-[#1a1c1e] text-sm font-medium text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f9d8ff]/50 text-[#83439c] flex items-center justify-center relative">
                <Activity className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="flex items-center justify-between flex-1">
                <span>Live Updates</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                onNavigateTab('route');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f9f9fc] text-[#1a1c1e] text-sm font-medium text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f9d8ff]/50 text-[#83439c] flex items-center justify-center">
                <TrainFront className="w-4 h-4" />
              </div>
              <span>MRT Route Planner</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('guide');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f9f9fc] text-[#1a1c1e] text-sm font-medium text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f9d8ff]/50 text-[#83439c] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>Singapore Travel Guide</span>
            </button>

            <button
              onClick={() => {
                onNavigateTab('forum');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f9f9fc] text-[#1a1c1e] text-sm font-medium text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#f9d8ff]/50 text-[#83439c] flex items-center justify-center">
                <MessagesSquare className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between flex-1">
                <span>Community Forum</span>
                <span className="text-[10px] bg-purple-100 text-[#83439c] font-bold px-1.5 py-0.5 rounded">
                  Disqus
                </span>
              </div>
            </button>
          </div>

          {/* Saved Bookmarks */}
          <div className="px-4 py-2 border-t border-gray-100">
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-[11px] font-semibold text-[#747878] uppercase">
                Saved Favorites ({savedAttractions.length})
              </span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>

            {savedAttractions.length > 0 ? (
              <div className="space-y-1.5 mt-2 max-h-48 overflow-y-auto">
                {savedAttractions.map((attraction) => (
                  <button
                    key={attraction.id}
                    onClick={() => {
                      onSelectAttraction(attraction);
                      onClose();
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#f9f9fc] text-left transition-colors cursor-pointer"
                  >
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-8 h-8 rounded-md object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[#1a1c1e] truncate">
                        {attraction.name}
                      </div>
                      <div className="text-[10px] text-[#747878] truncate">{attraction.area}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-xs text-[#747878] bg-[#f9f9fc] rounded-lg mt-1">
                No saved places yet. Click the heart icon on any attraction to bookmark!
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-100 bg-[#f9f9fc] text-xs text-[#747878] space-y-1">
          <div className="flex items-center gap-1 text-[#1a1c1e] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1b6d24]" /> Official Singapore Guidelines
          </div>
          <div className="text-[11px]">Emergency Police: 999 | Ambulance: 995</div>
          <div className="text-[10px] text-gray-400 pt-1">SG Travel v2.4 • Civic Horizon Design</div>
        </div>
      </div>
    </div>
  );
};
