/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { HeroSection } from './components/HeroSection';
import { QuickAccess } from './components/QuickAccess';
import { RecommendedSection } from './components/RecommendedSection';
import { LatestArticles } from './components/LatestArticles';
import { BottomNavBar } from './components/BottomNavBar';
import { ExploreTab } from './components/ExploreTab';
import { ItineraryTab } from './components/itinerary/ItineraryTab';
import { CalendarTab } from './components/CalendarTab';
import { LiveUpdatesTab } from './components/LiveUpdatesTab';
import { RouteTab } from './components/RouteTab';
import { GuideTab } from './components/GuideTab';
import { ForumTab } from './components/ForumTab';

// Modals
import { AttractionModal } from './components/modals/AttractionModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { CurrencyModal } from './components/modals/CurrencyModal';
import { WeatherModal } from './components/modals/WeatherModal';
import { WifiModal } from './components/modals/WifiModal';
import { TransitModal } from './components/modals/TransitModal';
import { DrawerMenu } from './components/modals/DrawerMenu';
import { FilterModal } from './components/modals/FilterModal';

// Data & Types
import { ATTRACTIONS, ARTICLES } from './data/singaporeData';
import { TabType, Attraction, Article, QuickToolType, CategoryFilter } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedQuickTool, setSelectedQuickTool] = useState<QuickToolType>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [routeDestinationPreset, setRouteDestinationPreset] = useState<string>('Bayfront');

  // Filter & Explore State
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'popular' | 'name'>('popular');

  // Saved Bookmarks with LocalStorage persistence
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sg_travel_saved');
      return saved ? JSON.parse(saved) : ['gardens-by-the-bay'];
    } catch {
      return ['gardens-by-the-bay'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sg_travel_saved', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  const toggleSaveId = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const savedAttractions = ATTRACTIONS.filter((a) => savedIds.includes(a.id));

  const handlePlanRouteTo = (stationName: string) => {
    setRouteDestinationPreset(stationName);
    setActiveTab('route');
  };

  const handleSearchSubmit = (query: string) => {
    setSelectedCategory('All');
    setActiveTab('explore');
  };

  return (
    <div className="min-h-screen bg-[#f9f9fc] text-[#1a1c1e] flex flex-col font-sans">
      {/* Top Header */}
      <TopAppBar
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenFilter={() => setIsFilterOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-screen-xl w-full mx-auto md:px-4">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-150 pb-20">
            {/* Hero Section */}
            <HeroSection
              onSelectAttraction={(attraction) => setSelectedAttraction(attraction)}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Quick Access */}
            <QuickAccess onSelectTool={(tool) => setSelectedQuickTool(tool)} />

            {/* Recommended for You */}
            <RecommendedSection
              attractions={ATTRACTIONS}
              onSelectAttraction={(attraction) => setSelectedAttraction(attraction)}
              onSeeAll={() => setActiveTab('explore')}
            />

            {/* Latest Articles */}
            <LatestArticles
              articles={ARTICLES}
              onSelectArticle={(article) => setSelectedArticle(article)}
            />
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="animate-in fade-in duration-150">
            <ExploreTab
              onSelectAttraction={(attraction) => setSelectedAttraction(attraction)}
              onPlanRouteTo={handlePlanRouteTo}
              savedIds={savedIds}
              onToggleSave={toggleSaveId}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="animate-in fade-in duration-150">
            <ItineraryTab
              onSelectAttraction={(attractionId) => {
                const matched = ATTRACTIONS.find((a) => a.id === attractionId);
                if (matched) setSelectedAttraction(matched);
              }}
              onOpenRoutePlanner={(stationName) => {
                setRouteDestinationPreset(stationName);
                setActiveTab('route');
              }}
            />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="animate-in fade-in duration-150">
            <CalendarTab onPlanRouteTo={handlePlanRouteTo} />
          </div>
        )}

        {activeTab === 'live' && (
          <div className="animate-in fade-in duration-150">
            <LiveUpdatesTab />
          </div>
        )}

        {activeTab === 'route' && (
          <div className="animate-in fade-in duration-150">
            <RouteTab initialDestinationStation={routeDestinationPreset} />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="animate-in fade-in duration-150">
            <GuideTab onPlanRouteTo={handlePlanRouteTo} />
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="animate-in fade-in duration-150">
            <ForumTab />
          </div>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNavBar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      {/* Modals & Drawers */}
      <AttractionModal
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
        onPlanRouteTo={handlePlanRouteTo}
        savedIds={savedIds}
        onToggleSave={toggleSaveId}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <CurrencyModal
        isOpen={selectedQuickTool === 'currency'}
        onClose={() => setSelectedQuickTool(null)}
        onNavigateToLive={() => setActiveTab('live')}
      />

      <WeatherModal
        isOpen={selectedQuickTool === 'weather'}
        onClose={() => setSelectedQuickTool(null)}
        onNavigateToLive={() => setActiveTab('live')}
      />

      <WifiModal
        isOpen={selectedQuickTool === 'wifi'}
        onClose={() => setSelectedQuickTool(null)}
      />

      <TransitModal
        isOpen={selectedQuickTool === 'transit'}
        onClose={() => setSelectedQuickTool(null)}
        onOpenRoutePlanner={() => setActiveTab('route')}
      />

      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        savedAttractions={savedAttractions}
        onSelectAttraction={(attraction) => setSelectedAttraction(attraction)}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        sortBy={sortBy}
        onSelectSort={setSortBy}
      />
    </div>
  );
}
