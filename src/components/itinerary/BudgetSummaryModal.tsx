import React from 'react';
import { X, DollarSign, CheckCircle2, PieChart, Info, ShoppingBag, Utensils, Ticket, Train, Camera } from 'lucide-react';
import { TripItinerary } from '../../types';

interface BudgetSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripItinerary;
}

export const BudgetSummaryModal: React.FC<BudgetSummaryModalProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  if (!isOpen) return null;

  // Calculate totals
  let totalCostSgd = 0;
  let totalStops = 0;
  let completedStops = 0;
  const categoryTotals: Record<string, number> = {
    'Sightseeing & Icons': 0,
    'Food & Drinks': 0,
    'Entertainment': 0,
    'Culture & Nature': 0,
    'Transit / Transport': 0,
    'Other': 0,
  };

  trip.days.forEach((day) => {
    day.stops.forEach((stop) => {
      totalStops++;
      if (stop.isCompleted) completedStops++;
      totalCostSgd += stop.costSgd;

      if (stop.transitToNext?.fareSgd) {
        totalCostSgd += stop.transitToNext.fareSgd;
        categoryTotals['Transit / Transport'] += stop.transitToNext.fareSgd;
      }

      if (stop.category === 'Sightseeing') {
        categoryTotals['Sightseeing & Icons'] += stop.costSgd;
      } else if (stop.category === 'Food & Drinks') {
        categoryTotals['Food & Drinks'] += stop.costSgd;
      } else if (stop.category === 'Entertainment') {
        categoryTotals['Entertainment'] += stop.costSgd;
      } else if (stop.category === 'Culture & Heritage' || stop.category === 'Nature & Parks') {
        categoryTotals['Culture & Nature'] += stop.costSgd;
      } else if (stop.category === 'Transit') {
        categoryTotals['Transit / Transport'] += stop.costSgd;
      } else {
        categoryTotals['Other'] += stop.costSgd;
      }
    });
  });

  const completionPct = totalStops > 0 ? Math.round((completedStops / totalStops) * 100) : 0;

  const categoryIcons: Record<string, React.ReactNode> = {
    'Sightseeing & Icons': <Camera className="w-4 h-4 text-purple-600" />,
    'Food & Drinks': <Utensils className="w-4 h-4 text-amber-600" />,
    'Entertainment': <Ticket className="w-4 h-4 text-blue-600" />,
    'Culture & Nature': <PieChart className="w-4 h-4 text-emerald-600" />,
    'Transit / Transport': <Train className="w-4 h-4 text-red-500" />,
    'Other': <ShoppingBag className="w-4 h-4 text-gray-500" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        id="budget-summary-modal"
      >
        {/* Header */}
        <div className="p-4 bg-[#83439c] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#f9d8ff]" />
              <h3 className="text-lg font-bold">Trip Budget & Progress</h3>
            </div>
            <p className="text-xs text-[#f9d8ff]/90 mt-0.5">
              Financial breakdown and itinerary milestone completion
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Main Stats Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                Est. Total Budget
              </span>
              <div className="text-2xl font-black text-emerald-950 mt-1">
                S$ {totalCostSgd.toFixed(2)}
              </div>
              <span className="text-[10px] text-emerald-700 mt-0.5 block">
                ≈ ${(totalCostSgd * 0.75).toFixed(2)} USD • ¥{(totalCostSgd * 5.4).toFixed(0)} CNY
              </span>
            </div>

            <div className="p-3.5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wide">
                Checklist Progress
              </span>
              <div className="text-2xl font-black text-purple-950 mt-1">
                {completedStops} / {totalStops}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 bg-purple-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#83439c] h-full rounded-full transition-all duration-300"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-purple-900">{completionPct}%</span>
              </div>
            </div>
          </div>

          {/* Category Expense Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-[#83439c]" />
              Expense Breakdown by Category
            </h4>
            <div className="space-y-2">
              {Object.entries(categoryTotals).map(([catName, amount]) => {
                const pct = totalCostSgd > 0 ? Math.round((amount / totalCostSgd) * 100) : 0;
                return (
                  <div
                    key={catName}
                    className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center">
                        {categoryIcons[catName]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-800">{catName}</div>
                        <div className="text-[10px] text-gray-500">{pct}% of total trip budget</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-gray-900">
                        S$ {amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Money Saving & Wanderlog Smart Tips */}
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Singapore Budget & Smart Tips</span>
            </div>
            <ul className="text-[11px] text-blue-950/90 space-y-1 list-disc list-inside pl-0.5 leading-relaxed">
              <li>
                <strong>Public MRT/Bus:</strong> Use your contactless Mastercard / Visa directly on gantries (no need for a separate physical EZ-Link card).
              </li>
              <li>
                <strong>Hawker Centres:</strong> Average delicious Michelin-standard meals cost S$5–S$8 per person. Pay with cash or SGQR/PayNow.
              </li>
              <li>
                <strong>GST Tax Refund:</strong> 9% GST refund is available for tourists spending over S$100 at participating shops (claim via eTRS kiosks at Changi).
              </li>
            </ul>
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
