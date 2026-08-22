import React, { useEffect, useState } from 'react';
import {
  MessagesSquare,
  MessageCircle,
  Sparkles,
  Share2,
  HelpCircle,
  Flame,
  Lightbulb,
  Compass,
  Utensils,
  TrainFront,
  ShieldCheck,
  RefreshCw,
  Tag,
  Info,
} from 'lucide-react';

interface ForumTopicCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const TOPIC_CATEGORIES: ForumTopicCategory[] = [
  {
    id: 'all',
    name: 'All Discussions',
    icon: <MessagesSquare className="w-3.5 h-3.5" />,
    description: 'Community conversations, travel questions, and general advice',
  },
  {
    id: 'food',
    name: 'Food & Hawker Gems',
    icon: <Utensils className="w-3.5 h-3.5" />,
    description: 'Michelin hawkers, chili crab, laksa, satay, and cafe hopping',
  },
  {
    id: 'itinerary',
    name: 'Itineraries & Routes',
    icon: <Compass className="w-3.5 h-3.5" />,
    description: '1-day to 5-day route reviews, pacing, and hidden photo spots',
  },
  {
    id: 'transit',
    name: 'MRT & Transit Tips',
    icon: <TrainFront className="w-3.5 h-3.5" />,
    description: 'SimplyGo, EZ-Link cards, airport transfers, and walking routes',
  },
  {
    id: 'budget',
    name: 'Passes & Budgeting',
    icon: <Tag className="w-3.5 h-3.5" />,
    description: 'Attraction ticket bundles, GST refunds, and budget hacks',
  },
];

const PINNED_PROMPTS = [
  {
    id: 'prompt-1',
    category: 'Hawker Food',
    title: 'Top 3 must-eat dishes for first-timers in Singapore?',
    hint: 'Chinatown Complex, Maxwell, or Old Airport Road?',
  },
  {
    id: 'prompt-2',
    category: 'Transit',
    title: 'SimplyGo contactless bank card vs Tourist Pass?',
    hint: 'Which is more cost-effective for a 3-4 day trip?',
  },
  {
    id: 'prompt-3',
    category: 'Attractions',
    title: 'Optimal timing for Supertree Grove light show & Cloud Forest?',
    hint: 'How to avoid peak evening queues and crowds.',
  },
  {
    id: 'prompt-4',
    category: 'Weather & Rainy Day',
    title: 'Best indoor itineraries when tropical rain starts?',
    hint: 'Jewel Changi, National Gallery, Marina Bay Shoppes & Museums.',
  },
];

export const ForumTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [isDisqusLoaded, setIsDisqusLoaded] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Initialize or reset Disqus thread on mount and refresh
  useEffect(() => {
    let isMounted = true;
    const threadIdentifier = 'sg-travels-forum-main';
    const threadTitle = 'Singapore Travel Community Forum';
    const threadUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://sg-travels.disqus.com';

    (window as any).disqus_shortname = 'sg-travels';
    (window as any).disqus_config = function (this: any) {
      this.page = this.page || {};
      this.page.url = threadUrl;
      this.page.identifier = threadIdentifier;
      this.page.title = threadTitle;
    };

    const loadOrResetDisqus = () => {
      if (typeof (window as any).DISQUS !== 'undefined') {
        try {
          (window as any).DISQUS.reset({
            reload: true,
            config: function (this: any) {
              this.page = this.page || {};
              this.page.url = threadUrl;
              this.page.identifier = threadIdentifier;
              this.page.title = threadTitle;
            },
          });
          if (isMounted) setIsDisqusLoaded(true);
        } catch (e) {
          console.warn('Error resetting Disqus:', e);
          if (isMounted) setIsDisqusLoaded(true);
        }
      } else {
        // Remove any stale embed script tag if DISQUS is not globally initialized
        const existingScript = document.getElementById('disqus-embed-script');
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement('script');
        script.id = 'disqus-embed-script';
        script.src = 'https://sg-travels.disqus.com/embed.js';
        script.setAttribute('data-timestamp', String(+new Date()));
        script.async = true;
        script.onload = () => {
          if (isMounted) setIsDisqusLoaded(true);
        };
        script.onerror = (err) => {
          console.warn('Disqus embed.js script failed to load (possible ad-blocker or sandbox constraint):', err);
          if (isMounted) setIsDisqusLoaded(true);
        };
        (document.head || document.body).appendChild(script);

        // Load count.js script safely
        const existingCountScript = document.getElementById('dsq-count-scr');
        if (!existingCountScript) {
          const countScript = document.createElement('script');
          countScript.id = 'dsq-count-scr';
          countScript.src = 'https://sg-travels.disqus.com/count.js';
          countScript.async = true;
          countScript.onerror = () => {
            console.warn('Disqus count.js failed to load.');
          };
          (document.head || document.body).appendChild(countScript);
        }
      }

      // Refresh comment counts if count widget is available
      if (typeof (window as any).DISQUSWIDGETS !== 'undefined') {
        try {
          (window as any).DISQUSWIDGETS.getCount({ reset: true });
        } catch {
          // ignore
        }
      }
    };

    // Defer slightly to ensure #disqus_thread is rendered in the DOM
    const timer = setTimeout(loadOrResetDisqus, 60);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [refreshKey]);

  const handleCopyPrompt = (prompt: typeof PINNED_PROMPTS[0]) => {
    navigator.clipboard?.writeText?.(prompt.title);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleReloadDisqus = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div id="forum-tab-view" className="space-y-5 px-4 pb-28 pt-2 animate-in fade-in duration-200">
      {/* Forum Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#83439c] via-[#74358d] to-[#4a1c5d] text-white p-5 shadow-sm">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs">
              <MessagesSquare className="w-3.5 h-3.5" />
              Community Forum
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-purple-200 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Exchange Ideas & Tips
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Singapore Travelers Forum
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            Connect with fellow travelers and Singapore locals. Share custom itineraries, ask transit questions, discuss Michelin hawker finds, or get live trip advice!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-purple-100">
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Friendly & Moderated</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <MessageCircle className="w-3.5 h-3.5 text-sky-300" />
              <span>Disqus Universal Thread</span>
            </div>
            <button
              onClick={handleReloadDisqus}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors px-2.5 py-1 rounded-lg text-white font-medium cursor-pointer"
              title="Refresh discussion comments"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh Feed</span>
            </button>
          </div>
        </div>

        {/* Decorative graphic glow */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Discussion Topic Category Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#747878] uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#83439c]" /> Popular Discussion Topics
          </h3>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {TOPIC_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#83439c] text-white shadow-xs'
                  : 'bg-white text-[#444748] border border-[#c4c7c8]/50 hover:bg-[#f3f3f6]'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pinned Conversation Starters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#747878] uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Need Inspiration? Pinned Discussion Prompts
          </h3>
          <span className="text-[10px] text-gray-400">Click to copy title</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PINNED_PROMPTS.map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => handleCopyPrompt(prompt)}
              className="p-3 bg-white rounded-xl border border-[#c4c7c8]/50 hover:border-[#83439c]/60 shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-[#83439c]">
                    {prompt.category}
                  </span>
                  <span className="text-[10px] text-gray-400 group-hover:text-[#83439c] transition-colors flex items-center gap-1">
                    {copiedPromptId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1a1c1e] group-hover:text-[#83439c] transition-colors leading-snug">
                  {prompt.title}
                </h4>
                <p className="text-[11px] text-[#747878] leading-tight">
                  {prompt.hint}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Guidelines Notice */}
      <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed">
          <span className="font-bold">Singapore Community Etiquette:</span> Please keep all recommendations constructive, respectful, and polite. Feel free to post questions about subway lines, opening hours, local hawkers, and family trip pacing.
        </div>
      </div>

      {/* Disqus Embed Container */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#83439c]" />
            <h3 className="text-sm font-bold text-[#1a1c1e]">Active Discussions</h3>
          </div>
          <a
            href="https://disqus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#747878] hover:text-[#83439c] transition-colors"
          >
            Powered by Disqus
          </a>
        </div>

        {/* Loading state indicator rendered outside disqus_thread */}
        {!isDisqusLoaded && (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-2 text-[#747878]">
            <RefreshCw className="w-6 h-6 animate-spin text-[#83439c]" />
            <p className="text-xs font-medium">Loading Singapore Travel Forum comments...</p>
          </div>
        )}

        {/* The Disqus Thread target - unmanaged by React children */}
        <div id="disqus_thread" className="min-h-[280px]" />

        {/* Noscript fallback according to Disqus documentation */}
        <noscript>
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript" rel="nofollow" className="text-[#83439c] underline">
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </div>
  );
};
