import React from 'react';
import { Menu, SlidersHorizontal } from 'lucide-react';

interface TopAppBarProps {
  onOpenDrawer: () => void;
  onOpenFilter: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onOpenDrawer, onOpenFilter }) => {
  return (
    <header
      id="top-app-bar"
      className="w-full top-0 sticky z-40 bg-[#f9f9fc] border-b border-[#c4c7c8]/40 shadow-xs flex items-center justify-between px-4 py-2"
    >
      <button
        id="btn-menu-drawer"
        onClick={onOpenDrawer}
        aria-label="Open Navigation Menu"
        className="p-2 text-[#5d5f5f] hover:bg-[#e8e8ea] transition-colors rounded-full active:scale-95 duration-150 flex items-center justify-center cursor-pointer"
      >
        <Menu className="w-6 h-6 stroke-[2]" />
      </button>

      <h1 className="text-[22px] md:text-[24px] font-bold text-[#83439c] tracking-tight select-none">
        SG Travel
      </h1>

      <button
        id="btn-filter-settings"
        onClick={onOpenFilter}
        aria-label="Filter Preferences"
        className="p-2 text-[#5d5f5f] hover:bg-[#e8e8ea] transition-colors rounded-full active:scale-95 duration-150 flex items-center justify-center cursor-pointer"
      >
        <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
      </button>
    </header>
  );
};
