import React from 'react';
import { Star, Zap, Flame, ShieldCheck, Ticket } from 'lucide-react';
import { Attraction } from '../types';

interface RecommendedSectionProps {
  attractions: Attraction[];
  onSelectAttraction: (attraction: Attraction) => void;
  onSeeAll: () => void;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  attractions,
  onSelectAttraction,
  onSeeAll,
}) => {
  return (
    <section id="recommended-section" className="px-4 mb-6">
      <div className="flex justify-between items-end mb-3">
        <div>
          <h3 className="text-[20px] font-bold text-[#1a1c1e]">
            Singapore Highlights & Passes
          </h3>
          <p className="text-xs text-gray-500">Live availability updated in real-time</p>
        </div>
        <button
          id="btn-see-all-recommended"
          onClick={onSeeAll}
          className="text-xs font-bold text-[#83439c] hover:text-[#6c2c85] transition-colors cursor-pointer"
        >
          See all ({attractions.length}) &rarr;
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex overflow-x-auto gap-4 pb-2 -mx-4 px-4 snap-x scrollbar-hide smooth-scroll">
        {attractions.map((attraction) => {
          return (
            <div
              key={attraction.id}
              onClick={() => onSelectAttraction(attraction)}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#c4c7c8]/50 snap-start flex-shrink-0 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              {/* Card Image */}
              <div>
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Top Left Live Quota Badge (Cluster 1 Requirement: availability visible before selection) */}
                  <div className="absolute top-2 left-2">
                    {attraction.availabilityStatus === 'available' && (
                      <span className="bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Zap className="w-2.5 h-2.5 fill-current" /> {attraction.remainingQuota} passes left
                      </span>
                    )}
                    {attraction.availabilityStatus === 'limited' && (
                      <span className="bg-amber-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Flame className="w-2.5 h-2.5 fill-current" /> Low Quota ({attraction.remainingQuota} left)
                      </span>
                    )}
                    {attraction.availabilityStatus === 'free-entry' && (
                      <span className="bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-2.5 h-2.5" /> Free Admission
                      </span>
                    )}
                  </div>

                  {/* Right Tag */}
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                      {attraction.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3.5 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-bold text-[#1a1c1e] group-hover:text-[#83439c] transition-colors line-clamp-1">
                      {attraction.name}
                    </h4>
                    <div className="flex items-center text-[#444748] text-xs font-semibold ml-1 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 mr-0.5" />
                      <span>{attraction.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#444748] line-clamp-2 leading-relaxed">
                    {attraction.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer with Price Preview */}
              <div className="p-3.5 pt-0 mt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">
                  {attraction.ticketTiers?.[0]?.priceSgd === 0
                    ? 'Free walk-in'
                    : `From $${attraction.ticketTiers?.[0]?.priceSgd ?? 0} SGD`}
                </span>
                <span className="text-[#83439c] font-bold flex items-center gap-1">
                  <Ticket className="w-3 h-3" /> Select Pass &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
