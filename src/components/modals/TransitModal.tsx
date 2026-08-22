import React from 'react';
import { X, TrainFront, CreditCard, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface TransitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRoutePlanner: () => void;
}

export const TransitModal: React.FC<TransitModalProps> = ({
  isOpen,
  onClose,
  onOpenRoutePlanner,
}) => {
  if (!isOpen) return null;

  const lines = [
    { code: 'NSL', name: 'North-South Line', color: '#D42E12', bg: 'bg-[#D42E12]', stops: 'Jurong East ↔ Marina South Pier (Orchard, City Hall)' },
    { code: 'EWL', name: 'East-West Line', color: '#009645', bg: 'bg-[#009645]', stops: 'Tuas Link ↔ Pasir Ris / Changi Airport' },
    { code: 'CCL', name: 'Circle Line', color: '#FA9E0D', bg: 'bg-[#FA9E0D]', stops: 'Dhoby Ghaut / Marina Bay ↔ HarbourFront' },
    { code: 'DTL', name: 'Downtown Line', color: '#005EC4', bg: 'bg-[#005EC4]', stops: 'Bukit Panjang ↔ Expo (Bayfront, Chinatown, Bugis)' },
    { code: 'NEL', name: 'North-East Line', color: '#9016B2', bg: 'bg-[#9016B2]', stops: 'HarbourFront ↔ Punggol (Chinatown, Little India)' },
    { code: 'TEL', name: 'Thomson-East Coast Line', color: '#9D5B25', bg: 'bg-[#9D5B25]', stops: 'Woodlands ↔ Bayshore (Gardens by the Bay, Maxwell)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="transit-modal-content"
        className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 bg-[#83439c] text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <TrainFront className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Singapore MRT Transit</h2>
              <p className="text-xs text-white/80">Mass Rapid Transit Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Tap & Go Highlight */}
          <div className="bg-[#f9d8ff]/30 border border-[#f9d8ff] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-[#6c2c85] font-bold text-sm">
              <CreditCard className="w-4 h-4 text-[#83439c]" /> SimplyGo: No Ticket Needed!
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Tap directly at any MRT gantry using your foreign Visa/Mastercard or phone (Apple Pay / Google Pay). Fares range from S$0.95 to S$2.20 per trip.
            </p>
          </div>

          {/* MRT Lines Summary */}
          <div>
            <h3 className="text-sm font-bold text-[#1a1c1e] mb-2.5">MRT Color Guide & Lines</h3>
            <div className="space-y-2">
              {lines.map((line) => (
                <div
                  key={line.code}
                  className="p-2.5 bg-[#f9f9fc] rounded-xl border border-gray-100 flex items-center gap-3"
                >
                  <div
                    className="w-10 h-7 rounded-md text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#1a1c1e]">{line.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">{line.stops}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Operating Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#83439c] mt-0.5" />
              <div>
                <div className="font-bold text-gray-900">Operating Hours</div>
                <div className="text-[11px] text-gray-600">5:30 AM – 12:30 AM</div>
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1b6d24] mt-0.5" />
              <div>
                <div className="font-bold text-gray-900">Train Frequency</div>
                <div className="text-[11px] text-gray-600">Every 2–3 mins (Peak)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Route Planner Button */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenRoutePlanner();
            }}
            className="w-full bg-[#83439c] text-white text-xs font-semibold py-2.5 px-4 rounded-xl cursor-pointer hover:bg-[#6c2c85] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Open Interactive Route Planner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
