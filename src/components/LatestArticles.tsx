import React from 'react';
import { Article } from '../types';

interface LatestArticlesProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({ articles, onSelectArticle }) => {
  return (
    <section id="latest-articles-section" className="px-4 mb-8">
      <h3 className="text-[20px] font-semibold text-[#1a1c1e] mb-3">
        Latest Articles
      </h3>

      <div className="flex flex-col gap-3">
        {articles.map((article) => {
          return (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="flex bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#c4c7c8]/50 hover:bg-[#f3f3f6] transition-all cursor-pointer active:scale-[0.99] duration-150 group"
            >
              {/* Thumbnail */}
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Text Meta */}
              <div className="p-3 flex flex-col justify-center flex-1 min-w-0">
                <span
                  className="text-[10px] md:text-[11px] font-semibold mb-1 uppercase tracking-wider"
                  style={{ color: article.categoryColor }}
                >
                  {article.category}
                </span>

                <h4 className="text-[15px] md:text-[16px] font-semibold text-[#1a1c1e] leading-tight mb-1 group-hover:text-[#83439c] transition-colors line-clamp-2">
                  {article.title}
                </h4>

                <p className="text-[12px] text-[#444748]">
                  {article.readTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
