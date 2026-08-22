import React, { useState } from 'react';
import {
  BookOpen,
  Coffee,
  Receipt,
  Volume2,
  ShieldAlert,
  ShieldCheck,
  HeartHandshake,
  Search,
  Sparkles,
  UtensilsCrossed,
  Flame,
  Phone,
  Droplets,
  TrainFront,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Compass,
} from 'lucide-react';
import {
  KOPI_OPTIONS,
  LOCAL_DISHES,
  GST_REFUND_GUIDE,
  KopiOption,
  LocalDish,
} from '../data/visitSingaporeData';
import { TRAVEL_TIPS, SINGLISH_TERMS } from '../data/singaporeData';

interface GuideTabProps {
  onPlanRouteTo?: (stationName: string) => void;
}

type GuideSubTab = 'kopi-hawker' | 'tax-customs' | 'singlish' | 'emergency';

export const GuideTab: React.FC<GuideTabProps> = ({ onPlanRouteTo }) => {
  const [activeSubTab, setActiveSubTab] = useState<GuideSubTab>('kopi-hawker');

  // Kopi Customizer State
  const [selectedKopi, setSelectedKopi] = useState<KopiOption>(KOPI_OPTIONS[0]);
  const [kopiSearch, setKopiSearch] = useState<string>('');

  // Dish Filter
  const [selectedDishCategory, setSelectedDishCategory] = useState<string>('All');

  // Singlish Search
  const [singlishSearch, setSinglishSearch] = useState<string>('');

  const filteredKopiOptions = KOPI_OPTIONS.filter(
    (k) =>
      k.term.toLowerCase().includes(kopiSearch.toLowerCase()) ||
      k.meaning.toLowerCase().includes(kopiSearch.toLowerCase()) ||
      k.composition.toLowerCase().includes(kopiSearch.toLowerCase())
  );

  const filteredDishes = LOCAL_DISHES.filter((d) =>
    selectedDishCategory === 'All' ? true : d.category === selectedDishCategory
  );

  const filteredSinglish = SINGLISH_TERMS.filter(
    (s) =>
      s.term.toLowerCase().includes(singlishSearch.toLowerCase()) ||
      s.meaning.toLowerCase().includes(singlishSearch.toLowerCase()) ||
      s.example.toLowerCase().includes(singlishSearch.toLowerCase())
  );

  return (
    <div id="guide-tab-view" className="space-y-5 px-4 pb-28 pt-2 max-w-5xl mx-auto">
      {/* Official Guide Hero Banner */}
      <div className="bg-gradient-to-br from-[#83439c] via-[#6c2c85] to-[#4a1c5d] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
              <Sparkles className="w-3 h-3 text-amber-300 fill-current" /> Official Traveler's Handbook
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Singapore Guide & Essentials
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-2xl">
            Master the art of ordering coffee at kopitiams, navigate UNESCO hawker culture, claim your 9% tourist GST tax refund, and decipher local Singlish vocabulary.
          </p>
        </div>
      </div>

      {/* Main Subtab Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {[
          { id: 'kopi-hawker', label: 'Order Coffee & Hawker Guide', icon: Coffee },
          { id: 'tax-customs', label: 'Customs & Tax Refund (eTRS)', icon: Receipt },
          { id: 'singlish', label: 'Singlish Dictionary 101', icon: Volume2 },
          { id: 'emergency', label: 'Emergency Contacts & Laws', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as GuideSubTab)}
              className={`text-xs px-4 py-2.5 rounded-2xl font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#83439c] text-white shadow-sm'
                  : 'bg-white text-[#444748] border border-[#c4c7c8]/40 hover:bg-[#f3f3f6]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#83439c]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. ORDER COFFEE & HAWKER GUIDE (STB) */}
      {/* ========================================================================= */}
      {activeSubTab === 'kopi-hawker' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Interactive Kopi Decoder & Audio/Phonetic Master */}
          <div className="bg-white rounded-3xl border border-[#c4c7c8]/50 shadow-xs p-5 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    STB Cultural Feature
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#1a1c1e] mt-1">
                  How to Order Coffee Like a True Local (Kopi Decoder)
                </h2>
                <p className="text-xs text-[#747878]">
                  Singapore coffee beans are roasted with butter/sugar and brewed through a cloth &quot;sock&quot; filter.
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search kopi (e.g. Kosong, Gao)..."
                  value={kopiSearch}
                  onChange={(e) => setKopiSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-[#f9f9fc] border border-gray-200 rounded-xl w-full sm:w-48 focus:outline-none focus:border-[#83439c]"
                />
              </div>
            </div>

            {/* Kopi Option Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filteredKopiOptions.map((kopi) => {
                const isSelected = kopi.term === selectedKopi.term;
                return (
                  <button
                    key={kopi.term}
                    onClick={() => setSelectedKopi(kopi)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                      isSelected
                        ? 'bg-[#83439c] text-white border-[#83439c] shadow-xs'
                        : 'bg-[#f9f9fc] text-[#444748] border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {kopi.term}
                  </button>
                );
              })}
            </div>

            {/* Selected Kopi Breakdown Showcase */}
            <div className="bg-gradient-to-br from-purple-50 via-indigo-50/40 to-pink-50/40 rounded-2xl p-5 border border-[#83439c]/20 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#83439c]">{selectedKopi.term}</h3>
                  <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-purple-200 text-[#6c2c85] font-semibold">
                    Phonetic: &quot;{selectedKopi.pronunciation}&quot;
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#1a1c1e] font-medium mt-1">{selectedKopi.meaning}</p>
              </div>

              {/* Composition Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-2xs">
                  <span className="text-[10px] text-[#747878] font-semibold block uppercase tracking-wider">Formula</span>
                  <span className="font-bold text-[#1a1c1e] text-xs">{selectedKopi.composition}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-2xs">
                  <span className="text-[10px] text-[#747878] font-semibold block uppercase tracking-wider">Sweetness Level</span>
                  <span className="font-bold text-amber-700">{selectedKopi.sweetness}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-2xs">
                  <span className="text-[10px] text-[#747878] font-semibold block uppercase tracking-wider">Caffeine Strength</span>
                  <span className="font-bold text-emerald-700">{selectedKopi.caffeine}</span>
                </div>
              </div>

              {/* How to Order Script */}
              <div className="bg-white p-3.5 rounded-xl border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="text-xs">
                  <span className="text-[10px] text-[#747878] font-bold uppercase block">How to order at the counter:</span>
                  <span className="font-bold text-[#83439c] text-sm sm:text-base">&quot;Uncle, {selectedKopi.term} satu, please!&quot;</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
                  Ready to Order
                </span>
              </div>
            </div>

            {/* Hawker Chope & Etiquette Guide */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" /> UNESCO Hawker Etiquette & &quot;Chope&quot; Culture
              </div>
              <ul className="text-xs text-[#444748] space-y-1.5 list-disc list-inside leading-relaxed">
                <li>
                  <strong>The Tissue Packet Rule:</strong> A packet of tissue paper, umbrella, or cardholder left on an empty hawker table means it is <em>&quot;choped&quot;</em> (reserved). Look for another free table.
                </li>
                <li>
                  <strong>Mandatory Tray Return:</strong> By law in Singapore, diners must return used trays, crockery, and drink cups to designated Tray Return Stations before leaving.
                </li>
                <li>
                  <strong>Payment:</strong> While cashless QR payments (PayNow/SGQR) are widespread, keep small cash ($2 and $5 notes) handy for older hawkers.
                </li>
              </ul>
            </div>
          </div>

          {/* Iconic Local Hawker Dishes Masterclass */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#1a1c1e] flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-600" /> Iconic Singapore Dishes Masterclass
                </h3>
                <p className="text-xs text-[#747878]">Origins, spice levels, and Michelin Bib Gourmand hawkers</p>
              </div>

              {/* Category Filter */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {['All', 'Rice', 'Noodles', 'Seafood', 'Hawker Classic', 'Dessert & Snacks'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedDishCategory(cat)}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                      selectedDishCategory === cat
                        ? 'bg-[#83439c] text-white'
                        : 'bg-[#f3f3f6] text-[#444748] hover:bg-[#e8e8ea]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDishes.map((dish, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-[#1a1c1e]">{dish.name}</h4>
                          {dish.chineseName && (
                            <span className="text-xs text-[#747878] font-medium">{dish.chineseName}</span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#83439c] font-bold uppercase">{dish.category}</span>
                      </div>

                      {/* Spice Level Indicator */}
                      <div className="flex items-center gap-0.5 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                        <Flame className="w-3 h-3 text-rose-500 fill-current" />
                        <span className="text-[10px] font-bold text-rose-700">
                          {dish.spiceLevel === 0 ? 'No Spice' : dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Hot'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#444748] leading-relaxed">{dish.description}</p>
                    <p className="text-[11px] text-[#747878] italic bg-[#f9f9fc] p-2 rounded-lg">
                      <strong>Origin:</strong> {dish.origin}
                    </p>
                  </div>

                  {/* Best Stalls */}
                  <div className="p-4 bg-gray-50/60 border-t border-gray-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-[#747878] uppercase block">
                      Recommended Stalls & Hawkers:
                    </span>
                    <div className="space-y-1">
                      {dish.bestStalls.map((stall, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#1a1c1e]">
                            {stall.bibGourmand && '🏅 '}
                            {stall.name}
                          </span>
                          <span className="text-[11px] text-[#747878]">{stall.location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CUSTOMS & TAX REFUND (eTRS) (STB) */}
      {/* ========================================================================= */}
      {activeSubTab === 'tax-customs' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Tourist GST Tax Refund (eTRS) Guide */}
          <div className="bg-white rounded-3xl border border-[#c4c7c8]/50 shadow-xs p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-[#1a1c1e]">
              <Receipt className="w-5 h-5 text-amber-600" />
              <span>Singapore Tourist GST Refund Scheme (eTRS) Guide</span>
            </div>
            <p className="text-xs sm:text-sm text-[#747878] leading-relaxed">
              As a tourist visiting Singapore, you can claim a refund on the <strong>9% Goods and Services Tax (GST)</strong> paid on goods purchased from participating retailers if you spend at least <strong>S$100 (including GST)</strong>.
            </p>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {GST_REFUND_GUIDE.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      Step {step.step}
                    </div>
                    <h4 className="font-bold text-xs text-[#1a1c1e]">{step.title}</h4>
                    <p className="text-[11px] text-[#444748] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Tourist Eligibility Rules */}
            <div className="bg-[#f9f9fc] rounded-2xl p-4 border border-gray-200 space-y-2 text-xs">
              <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Who is Eligible for Tourist Tax Refund?
              </span>
              <ul className="text-gray-600 space-y-1 list-disc list-inside leading-relaxed text-[11px]">
                <li>You are 16 years of age or above at the time of purchase.</li>
                <li>You are not a Singapore Citizen or Permanent Resident.</li>
                <li>You are not a crew member of the aircraft/vessel on which you are departing.</li>
                <li>You depart Singapore from Changi Airport or Seletar Airport within 2 months from date of purchase.</li>
                <li>The goods must be brought out of Singapore via checked or hand-carry baggage.</li>
              </ul>
            </div>
          </div>

          {/* Customs, Duty-Free Allowances & Prohibited Items */}
          <div className="bg-white rounded-3xl border border-[#c4c7c8]/50 shadow-xs p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-[#1a1c1e]">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Singapore Customs & Duty-Free Allowances</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Duty-Free Alcohol Allowance */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <span className="font-bold text-emerald-900 text-xs block">
                  🍺 Duty-Free Concession on Liquor (18 Years & Above)
                </span>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  Travelers arriving from countries other than Malaysia who have spent at least 48 hours outside Singapore enjoy duty-free concession on:
                </p>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100 text-[11px] text-emerald-950 font-medium space-y-1">
                  <div>• Option A: 1L Spirits + 1L Wine</div>
                  <div>• Option B: 1L Spirits + 1L Beer</div>
                  <div>• Option C: 1L Wine + 1L Beer</div>
                  <div>• Option D: 2L Wine OR 2L Beer</div>
                </div>
              </div>

              {/* Strictly Prohibited & Controlled Items */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                <span className="font-bold text-rose-900 text-xs block">
                  🚫 Strictly Prohibited Items (Heavy Fines Apply)
                </span>
                <ul className="text-rose-800 text-[11px] space-y-1 list-disc list-inside leading-relaxed">
                  <li><strong>Chewing Gum:</strong> Strictly prohibited from importation.</li>
                  <li><strong>Vaping & E-Cigarettes:</strong> Illegal to possess, purchase, or bring into Singapore (fines up to $2,000).</li>
                  <li><strong>Tobacco / Cigarettes:</strong> No duty-free allowance for cigarettes. All tobacco must be declared upon arrival.</li>
                  <li><strong>Controlled Drugs:</strong> Severe penalties including capital punishment under Singapore law.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SINGLISH DICTIONARY 101 */}
      {/* ========================================================================= */}
      {activeSubTab === 'singlish' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#c4c7c8]/50 shadow-xs p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#1a1c1e] flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#83439c]" /> Singlish Dictionary 101
                </h3>
                <p className="text-xs text-[#747878]">Essential local vocabulary, slang, and contextual examples</p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Singlish term..."
                  value={singlishSearch}
                  onChange={(e) => setSinglishSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-[#f9f9fc] border border-gray-200 rounded-xl w-full sm:w-48 focus:outline-none focus:border-[#83439c]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {filteredSinglish.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-2xs space-y-1.5 hover:border-[#83439c]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm sm:text-base text-[#83439c]">{item.term}</span>
                    <span className="text-[10px] bg-[#f9d8ff] text-[#6c2c85] font-bold px-2 py-0.5 rounded-full">
                      Local Lingo
                    </span>
                  </div>
                  <p className="text-xs text-[#1a1c1e] font-medium leading-snug">{item.meaning}</p>
                  <p className="text-[11px] text-[#747878] italic bg-[#f9f9fc] p-2 rounded-xl border border-gray-100">
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. EMERGENCY CONTACTS & LAWS */}
      {/* ========================================================================= */}
      {activeSubTab === 'emergency' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 24/7 Emergency Numbers */}
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Singapore Emergency Hotlines (24/7 Toll-Free)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Police</div>
                <div className="text-xl font-black text-rose-700">999</div>
                <div className="text-[10px] text-gray-400">Emergency dispatch</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Ambulance & Fire</div>
                <div className="text-xl font-black text-rose-700">995</div>
                <div className="text-[10px] text-gray-400">SCDF Medical/Rescue</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Tourist Helpline</div>
                <div className="text-sm font-black text-gray-900">1800 736 2000</div>
                <div className="text-[10px] text-gray-400">STB Visitor Assistance</div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-rose-100 shadow-2xs space-y-1">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Non-Emergency</div>
                <div className="text-sm font-black text-gray-900">1777</div>
                <div className="text-[10px] text-gray-400">Non-critical ambulance</div>
              </div>
            </div>
          </div>

          {/* Important Traveler Helplines */}
          <div className="bg-white rounded-3xl border border-[#c4c7c8]/50 shadow-xs p-5 space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Additional Helpful Travel Contacts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-800 block">ICA Lost Passport / Immigration</span>
                <span className="text-[11px] text-gray-500">+65 6391 6100 (Kallang Road)</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-800 block">Changi Airport 24/7 Flight Enquiries</span>
                <span className="text-[11px] text-gray-500">+65 6595 6868</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-800 block">Land Transport Authority (Transit)</span>
                <span className="text-[11px] text-gray-500">1800 2255 582</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-800 block">ComfortDelGro Taxi Booking</span>
                <span className="text-[11px] text-gray-500">+65 6552 1111</span>
              </div>
            </div>
          </div>

          {/* Travel Etiquette & Laws */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#1b6d24]" /> Essential Customs, Etiquette & Fine City Laws
            </h3>

            <div className="space-y-2.5">
              {TRAVEL_TIPS.filter((t) => t.category !== 'Emergency').map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-2xs flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-4 h-4 text-[#1b6d24]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-xs md:text-sm text-[#1a1c1e]">{tip.title}</h4>
                      <span className="text-[10px] text-[#747878] font-medium">{tip.category}</span>
                    </div>
                    <p className="text-xs text-[#444748] leading-relaxed">{tip.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
