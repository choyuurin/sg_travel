import React from 'react';
import { X, Clock, User, Bookmark, Utensils, MapPin, CheckCircle2 } from 'lucide-react';
import { Article } from '../../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="article-modal-content"
        className="bg-white w-full max-w-2xl md:rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        {/* Header Image */}
        <div className="relative h-60 md:h-64 w-full bg-gray-900 flex-shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-md cursor-pointer z-10"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Article Header info */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-xs"
              style={{ backgroundColor: article.categoryColor }}
            >
              {article.category}
            </span>
            <h1 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-200 mt-2">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-[#1a1c1e]">
          {/* Excerpt Lead */}
          <p className="text-base font-medium text-[#444748] italic border-l-4 border-[#83439c] pl-4 py-1 leading-relaxed bg-[#f9f9fc] rounded-r-lg">
            {article.excerpt}
          </p>

          {/* Key Highlights / Recommendations */}
          <div>
            <h3 className="text-lg font-bold text-[#1a1c1e] mb-3 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#83439c]" /> Must-Know Highlights
            </h3>
            <div className="space-y-2.5">
              {article.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-[#444748] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#1b6d24] mt-0.5 flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Spots (if available) */}
          {article.recommendedSpots && article.recommendedSpots.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-[#1a1c1e] mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#83439c]" /> Top Recommended Stalls & Spots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {article.recommendedSpots.map((spot, i) => (
                  <div key={i} className="p-3.5 bg-[#f9f9fc] border border-gray-100 rounded-xl">
                    <div className="font-semibold text-sm text-[#1a1c1e]">{spot.name}</div>
                    <div className="text-xs text-[#83439c] font-medium mt-0.5">{spot.highlight}</div>
                    <div className="text-xs text-[#747878] flex items-center gap-1 mt-1.5">
                      <MapPin className="w-3 h-3 text-[#1b6d24]" /> {spot.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Content Paragraphs */}
          <div className="space-y-4 text-sm md:text-[15px] text-[#444748] leading-relaxed">
            {article.fullContent.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f9f9fc] border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#83439c] hover:bg-[#6c2c85] text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
