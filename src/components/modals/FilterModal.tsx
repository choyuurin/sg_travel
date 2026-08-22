import React from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import { CategoryFilter } from '../../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  sortBy: 'rating' | 'popular' | 'name';
  onSelectSort: (sort: 'rating' | 'popular' | 'name') => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
}) => {
  if (!isOpen) return null;

  const categories: CategoryFilter[] = ['All', 'Nature', 'Luxury', 'Culture', 'Food', 'Icons', 'Family'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="filter-modal-content"
        className="bg-white w-full max-w-sm rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#f9f9fc]">
          <div className="flex items-center gap-2 text-[#83439c]">
            <SlidersHorizontal className="w-5 h-5" />
            <h2 className="font-bold text-base text-[#1a1c1e]">Filters & Preferences</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Categories */}
          <div>
            <label className="text-xs font-semibold text-[#747878] uppercase block mb-2.5">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-[#83439c] text-white shadow-xs'
                      : 'bg-[#f3f3f6] text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedCategory === cat && <Check className="w-3 h-3" />}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-xs font-semibold text-[#747878] uppercase block mb-2.5">
              Sort By
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'rating', label: 'Highest Rated (★ 4.9+)' },
                { id: 'popular', label: 'Most Reviewed & Popular' },
                { id: 'name', label: 'Alphabetical (A to Z)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectSort(item.id as 'rating' | 'popular' | 'name')}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    sortBy === item.id
                      ? 'bg-[#f9d8ff]/40 text-[#6c2c85] font-semibold border border-[#83439c]/30'
                      : 'bg-[#f9f9fc] text-gray-700 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                  {sortBy === item.id && <Check className="w-4 h-4 text-[#83439c]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f9f9fc] border-t border-gray-100 flex gap-2">
          <button
            onClick={() => {
              onSelectCategory('All');
              onSelectSort('popular');
            }}
            className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#83439c] text-white text-xs font-semibold hover:bg-[#6c2c85] transition-colors cursor-pointer shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
