import React from 'react';
import { Wifi, RefreshCw, SunMedium, TrainFront } from 'lucide-react';
import { QuickToolType } from '../types';

interface QuickAccessProps {
  onSelectTool: (tool: QuickToolType) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ onSelectTool }) => {
  return (
    <section id="quick-access-section" className="px-4 mb-6">
      <h3 className="text-[20px] font-semibold text-[#1a1c1e] mb-3">
        Quick Access
      </h3>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {/* Wi-Fi Button */}
        <button
          id="btn-quick-wifi"
          onClick={() => onSelectTool('wifi')}
          className="flex flex-col items-center justify-center bg-[#f3f3f6] rounded-xl p-3 hover:bg-[#e8e8ea] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-full bg-[#f9d8ff] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Wifi className="w-5 h-5 text-[#6c2c85] stroke-[2.2]" />
          </div>
          <span className="text-[12px] font-semibold text-[#1a1c1e] tracking-wide text-center">
            Wi-Fi
          </span>
        </button>

        {/* Currency Button */}
        <button
          id="btn-quick-currency"
          onClick={() => onSelectTool('currency')}
          className="flex flex-col items-center justify-center bg-[#f3f3f6] rounded-xl p-3 hover:bg-[#e8e8ea] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-full bg-[#f9d8ff] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <RefreshCw className="w-5 h-5 text-[#6c2c85] stroke-[2.2]" />
          </div>
          <span className="text-[12px] font-semibold text-[#1a1c1e] tracking-wide text-center">
            Currency
          </span>
        </button>

        {/* Weather Button */}
        <button
          id="btn-quick-weather"
          onClick={() => onSelectTool('weather')}
          className="flex flex-col items-center justify-center bg-[#f3f3f6] rounded-xl p-3 hover:bg-[#e8e8ea] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-full bg-[#f9d8ff] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <SunMedium className="w-5 h-5 text-[#6c2c85] stroke-[2.2]" />
          </div>
          <span className="text-[12px] font-semibold text-[#1a1c1e] tracking-wide text-center">
            Weather
          </span>
        </button>

        {/* Transit Button */}
        <button
          id="btn-quick-transit"
          onClick={() => onSelectTool('transit')}
          className="flex flex-col items-center justify-center bg-[#f3f3f6] rounded-xl p-3 hover:bg-[#e8e8ea] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] active:scale-95 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-full bg-[#f9d8ff] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <TrainFront className="w-5 h-5 text-[#6c2c85] stroke-[2.2]" />
          </div>
          <span className="text-[12px] font-semibold text-[#1a1c1e] tracking-wide text-center">
            Transit
          </span>
        </button>
      </div>
    </section>
  );
};
