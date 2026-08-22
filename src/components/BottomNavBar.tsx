import React from 'react';
import {
  Home,
  Compass,
  CalendarDays,
  Calendar,
  Activity,
  TrainFront,
  BookOpen,
  MessagesSquare,
} from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      id="bottom-nav-bar"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#c4c7c8]/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex justify-around items-center h-16 max-w-screen-xl mx-auto px-1"
    >
      {/* Home Tab */}
      <button
        id="nav-tab-home"
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer ${
          activeTab === 'home'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <Home
          className={`w-5 h-5 mb-0.5 transition-transform ${
            activeTab === 'home' ? 'stroke-[2.5] fill-[#83439c]/20' : 'stroke-[1.75]'
          }`}
        />
        <span className="text-[10px] leading-tight whitespace-nowrap">Home</span>
      </button>

      {/* Explore Tab */}
      <button
        id="nav-tab-explore"
        onClick={() => onTabChange('explore')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer ${
          activeTab === 'explore'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <Compass
          className={`w-5 h-5 mb-0.5 transition-transform ${
            activeTab === 'explore' ? 'stroke-[2.5] fill-[#83439c]/20' : 'stroke-[1.75]'
          }`}
        />
        <span className="text-[10px] leading-tight whitespace-nowrap">Explore</span>
      </button>

      {/* Itinerary Tab */}
      <button
        id="nav-tab-itinerary"
        onClick={() => onTabChange('itinerary')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer ${
          activeTab === 'itinerary'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <CalendarDays
          className={`w-5 h-5 mb-0.5 transition-transform ${
            activeTab === 'itinerary' ? 'stroke-[2.5] fill-[#83439c]/20' : 'stroke-[1.75]'
          }`}
        />
        <span className="text-[10px] leading-tight whitespace-nowrap">Itinerary</span>
      </button>

      {/* Calendar (Festivals) Tab */}
      <button
        id="nav-tab-calendar"
        onClick={() => onTabChange('calendar')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer ${
          activeTab === 'calendar'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <Calendar
          className={`w-5 h-5 mb-0.5 transition-transform ${
            activeTab === 'calendar' ? 'stroke-[2.5] fill-[#83439c]/20' : 'stroke-[1.75]'
          }`}
        />
        <span className="text-[10px] leading-tight whitespace-nowrap">Calendar</span>
      </button>

      {/* Live Updates Tab */}
      <button
        id="nav-tab-live"
        onClick={() => onTabChange('live')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer relative ${
          activeTab === 'live'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <div className="relative">
          <Activity
            className={`w-5 h-5 mb-0.5 transition-transform ${
              activeTab === 'live' ? 'stroke-[2.5]' : 'stroke-[1.75]'
            }`}
          />
          <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
        </div>
        <span className="text-[10px] leading-tight whitespace-nowrap">Live</span>
      </button>

      {/* Route Tab */}
      <button
        id="nav-tab-route"
        onClick={() => onTabChange('route')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer ${
          activeTab === 'route'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <TrainFront
          className={`w-5 h-5 mb-0.5 transition-transform ${
            activeTab === 'route' ? 'stroke-[2.5]' : 'stroke-[1.75]'
          }`}
        />
        <span className="text-[10px] leading-tight whitespace-nowrap">Route</span>
      </button>

      {/* Guide Tab */}
      <button
        id="nav-tab-guide"
        onClick={() => onTabChange('guide')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer ${
          activeTab === 'guide'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <BookOpen
          className={`w-5 h-5 mb-0.5 transition-transform ${
            activeTab === 'guide' ? 'stroke-[2.5]' : 'stroke-[1.75]'
          }`}
        />
        <span className="text-[10px] leading-tight whitespace-nowrap">Guide</span>
      </button>

      {/* Forum Tab */}
      <button
        id="nav-tab-forum"
        onClick={() => onTabChange('forum')}
        className={`flex flex-col items-center justify-center flex-1 h-full active:scale-90 duration-150 transition-colors rounded-xl cursor-pointer ${
          activeTab === 'forum'
            ? 'text-[#83439c] font-semibold'
            : 'text-[#747878] hover:text-[#1a1c1e] hover:bg-[#f3f3f6]'
        }`}
      >
        <MessagesSquare
          className={`w-5 h-5 mb-0.5 transition-transform ${
            activeTab === 'forum' ? 'stroke-[2.5] fill-[#83439c]/20' : 'stroke-[1.75]'
          }`}
        />
        <span className="text-[10px] leading-tight whitespace-nowrap">Forum</span>
      </button>
    </nav>
  );
};
