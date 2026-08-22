import React from 'react';
import { X, Wifi, Smartphone, CheckCircle2, MapPin, Zap } from 'lucide-react';
import { WIFI_HOTSPOTS } from '../../data/singaporeData';

interface WifiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WifiModal: React.FC<WifiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="wifi-modal-content"
        className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 bg-[#83439c] text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Singapore Free Wi-Fi Guide</h2>
              <p className="text-xs text-white/80">Wireless@SGx & Hotspots</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Main Hero Guide: Wireless@SGx */}
          <div className="bg-[#f9d8ff]/30 border border-[#f9d8ff] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm text-[#6c2c85] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#83439c]" /> Wireless@SGx (Govt Free Wi-Fi)
              </div>
              <span className="text-[10px] bg-[#83439c] text-white font-semibold px-2 py-0.5 rounded-full">
                Unlimited Free
              </span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Available across Singapore at thousands of locations including all MRT stations, libraries, government hubs, and retail malls.
            </p>
            <div className="space-y-1.5 text-xs text-gray-800">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1b6d24] mt-0.5 flex-shrink-0" />
                <span>Select <strong>Wireless@SGx</strong> in your Wi-Fi settings</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1b6d24] mt-0.5 flex-shrink-0" />
                <span>Sign in with foreign mobile number or download the Wireless@SGx app</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1b6d24] mt-0.5 flex-shrink-0" />
                <span>Auto-reconnects seamlessly whenever you step into any MRT station or mall!</span>
              </div>
            </div>
          </div>

          {/* List of Free Hotspot Networks */}
          <div>
            <h3 className="text-sm font-bold text-[#1a1c1e] mb-2.5">
              Other Major Free Public Networks
            </h3>
            <div className="space-y-3">
              {WIFI_HOTSPOTS.map((hotspot, idx) => (
                <div key={idx} className="p-3 bg-[#f9f9fc] border border-gray-100 rounded-xl space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-xs text-[#1a1c1e]">{hotspot.name}</div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {hotspot.speed}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#747878] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#83439c]" /> {hotspot.area}
                  </div>
                  <p className="text-[11px] text-[#444748] pt-1 border-t border-gray-100 mt-1">
                    {hotspot.howToConnect}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* eSIM / Tourist SIM note */}
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2 text-xs text-blue-900">
            <Smartphone className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Need Constant 5G Data?</strong> Tourist eSIMs from Singtel or StarHub (starting at $12 SGD for 100GB 5G data for 14 days) can be activated instantly upon arrival at Changi Airport or online.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#83439c] text-white text-xs font-semibold py-2 px-5 rounded-lg cursor-pointer hover:bg-[#6c2c85] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
