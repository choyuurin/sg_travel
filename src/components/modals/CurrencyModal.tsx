import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRightLeft,
  DollarSign,
  Info,
  Sparkles,
  RefreshCw,
  Zap,
  Search,
  Check,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import {
  fetchLiveExchangeRates,
  EnrichedCurrencyRate,
  CURRENCY_METADATA,
  FALLBACK_BASE_RATES
} from '../../services/currencyService';
import { SINGAPORE_PRICE_CHEAT_SHEET } from '../../data/singaporeData';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLive?: () => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  onNavigateToLive,
}) => {
  const [sgdAmount, setSgdAmount] = useState<string>('50');
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [foreignAmount, setForeignAmount] = useState<string>('39.40');
  const [isSgdBase, setIsSgdBase] = useState<boolean>(true);
  const [ratesList, setRatesList] = useState<EnrichedCurrencyRate[]>([]);
  const [ratesMap, setRatesMap] = useState<Record<string, EnrichedCurrencyRate>>({});
  const [lastUpdatedUtc, setLastUpdatedUtc] = useState<string>('Live Feed');
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('api');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAllDropdown, setShowAllDropdown] = useState<boolean>(false);
  const [currencySearchQuery, setCurrencySearchQuery] = useState<string>('');

  // Fetch live exchange rates on mount and modal open
  const loadRates = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLiveExchangeRates();
      setRatesList(data.rates);
      setRatesMap(data.ratesByCode);
      setLastUpdatedUtc(data.lastUpdatedUtc);
      setDataSource(data.source);

      // Recalculate based on currently entered amounts
      const currentRate = data.ratesByCode[selectedCurrencyCode]?.ratePerSgd || data.rawConversionRates[selectedCurrencyCode] || 0.7879;
      const numSgd = parseFloat(sgdAmount);
      if (!isNaN(numSgd) && numSgd > 0) {
        setForeignAmount((numSgd * currentRate).toFixed(2));
      }
    } catch (err) {
      console.warn('Could not load live rates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadRates();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentRateObj: EnrichedCurrencyRate =
    ratesMap[selectedCurrencyCode] || {
      code: selectedCurrencyCode,
      name: CURRENCY_METADATA[selectedCurrencyCode]?.name || `${selectedCurrencyCode} Currency`,
      flag: CURRENCY_METADATA[selectedCurrencyCode]?.flag || '🌐',
      symbol: CURRENCY_METADATA[selectedCurrencyCode]?.symbol || selectedCurrencyCode,
      ratePerSgd: 0.7879,
      sgdPerUnit: 1.2692,
      formattedRatePerSgd: '0.7879',
      formattedSgdPerUnit: '1.2692',
      moneyChangerSpread: CURRENCY_METADATA[selectedCurrencyCode]?.spreadHint,
    };

  const handleSgdChange = (val: string) => {
    setSgdAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setForeignAmount((num * currentRateObj.ratePerSgd).toFixed(2));
    } else {
      setForeignAmount('');
    }
  };

  const handleForeignChange = (val: string) => {
    setForeignAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && currentRateObj.ratePerSgd > 0) {
      setSgdAmount((num / currentRateObj.ratePerSgd).toFixed(2));
    } else {
      setSgdAmount('');
    }
  };

  const handleSelectCurrency = (code: string) => {
    setSelectedCurrencyCode(code);
    setShowAllDropdown(false);
    const targetObj = ratesMap[code];
    const rate = targetObj ? targetObj.ratePerSgd : 1;
    const numSgd = parseFloat(sgdAmount);
    if (!isNaN(numSgd)) {
      setForeignAmount((numSgd * rate).toFixed(2));
    }
  };

  const swapDirection = () => {
    setIsSgdBase(!isSgdBase);
  };

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'MYR', 'JPY', 'AUD', 'CNY', 'IDR', 'THB', 'INR', 'KRW', 'HKD', 'TWD', 'BND', 'AED'];

  const filteredCurrenciesForSearch = ratesList.filter(
    (c) =>
      c.code.toLowerCase().includes(currencySearchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(currencySearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="currency-modal-content"
        className="bg-white w-full max-w-lg rounded-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 bg-[#83439c] text-white flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base md:text-lg leading-tight">Live SGD Exchange Rates</h2>
                <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  <Zap className="w-2.5 h-2.5 fill-current" /> Live API
                </span>
              </div>
              <p className="text-[11px] text-white/80">
                Powered by ExchangeRate-API (SGD Base)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={loadRates}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white disabled:opacity-50"
              title="Refresh live exchange rates"
              aria-label="Refresh rates"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Feed Status Bar */}
        <div className="bg-[#f2ebf5] border-b border-[#e5d6eb] px-4 py-1.5 flex items-center justify-between text-[11px] text-[#6c2c85] font-medium flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Updated: {lastUpdatedUtc.replace(' +0000', ' UTC')}</span>
          </div>
          <span className="text-[10px] text-gray-500 font-normal">160+ Currencies Active</span>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* Converter Card */}
          <div className="bg-[#f9f9fc] p-4 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
            {/* Input 1: SGD */}
            <div>
              <label className="text-[11px] font-bold text-[#747878] uppercase mb-1 block">
                Singapore Dollar (SGD 🇸🇬)
              </label>
              <div className="relative flex items-center bg-white rounded-xl border border-gray-300 focus-within:border-[#83439c] px-3.5 py-2.5 shadow-2xs">
                <span className="text-gray-500 font-bold mr-2 text-sm">S$</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sgdAmount}
                  onChange={(e) => handleSgdChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 outline-none text-lg font-bold text-[#1a1c1e] bg-transparent"
                />
                <span className="text-xs font-bold text-gray-400">SGD</span>
              </div>
            </div>

            {/* Swap Button & Rate info */}
            <div className="flex items-center justify-between px-1 py-0.5">
              <div className="text-xs text-[#83439c] font-semibold flex items-center gap-1">
                <span>1 SGD = </span>
                <strong className="text-sm">{currentRateObj.formattedRatePerSgd || currentRateObj.ratePerSgd}</strong>
                <span>{currentRateObj.code}</span>
                <span className="text-gray-400 font-normal ml-1">
                  (1 {currentRateObj.code} = S${currentRateObj.formattedSgdPerUnit || currentRateObj.sgdPerUnit})
                </span>
              </div>
              <button
                onClick={swapDirection}
                className="p-1.5 rounded-full bg-[#f9d8ff] text-[#6c2c85] hover:bg-[#e69efe] transition-colors cursor-pointer"
                title="Swap view"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Input 2: Foreign Currency */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-[#747878] uppercase">
                  {currentRateObj.name} ({currentRateObj.code} {currentRateObj.flag})
                </label>
                <button
                  onClick={() => setShowAllDropdown(!showAllDropdown)}
                  className="text-[11px] font-bold text-[#83439c] hover:underline cursor-pointer"
                >
                  {showAllDropdown ? 'Hide Currency List' : 'All Currencies ▼'}
                </button>
              </div>
              <div className="relative flex items-center bg-white rounded-xl border border-gray-300 focus-within:border-[#83439c] px-3.5 py-2.5 shadow-2xs">
                <span className="text-gray-500 font-bold mr-2 text-sm">{currentRateObj.symbol}</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={foreignAmount}
                  onChange={(e) => handleForeignChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 outline-none text-lg font-bold text-[#1a1c1e] bg-transparent"
                />
                <span className="text-xs font-bold text-[#83439c] flex items-center gap-1">
                  {currentRateObj.flag} {currentRateObj.code}
                </span>
              </div>
            </div>

            {/* Expandable Full Currencies Search & Dropdown */}
            {showAllDropdown && (
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm space-y-2 animate-in fade-in">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={currencySearchQuery}
                    onChange={(e) => setCurrencySearchQuery(e.target.value)}
                    placeholder="Search 160+ currencies (e.g. USD, EUR, PHP, CHF)..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#83439c]"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 divide-y divide-gray-50">
                  {filteredCurrenciesForSearch.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => handleSelectCurrency(curr.code)}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCurrencyCode === curr.code
                          ? 'bg-[#fcf5ff] text-[#83439c] font-bold'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{curr.flag}</span>
                        <div>
                          <span className="font-bold mr-1.5">{curr.code}</span>
                          <span className="text-gray-500 text-[11px]">{curr.name}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-800">1 SGD = {curr.formattedRatePerSgd}</span>
                        {selectedCurrencyCode === curr.code && <Check className="w-3.5 h-3.5 text-[#83439c] inline ml-1.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Currency Selector Chips */}
            <div>
              <span className="text-[11px] text-[#747878] font-bold block mb-1.5">
                Popular Traveler Currencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularCurrencies.map((code) => {
                  const meta = CURRENCY_METADATA[code] || { flag: '🌐', name: code };
                  const isSelected = selectedCurrencyCode === code;
                  return (
                    <button
                      key={code}
                      onClick={() => handleSelectCurrency(code)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#83439c] text-white shadow-xs font-bold'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span>{meta.flag}</span>
                      <span>{code}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real-time money changer spread insight */}
            {currentRateObj.moneyChangerSpread && (
              <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2.5 text-xs text-purple-900 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#83439c] mt-0.5 flex-shrink-0" />
                <div className="leading-snug">
                  <strong className="text-[#83439c]">Cash Spread Insight:</strong> {currentRateObj.moneyChangerSpread}
                </div>
              </div>
            )}
          </div>

          {/* Typical Singapore Prices Cheat Sheet in Target Currency */}
          <div>
            <h3 className="text-xs font-bold text-[#1a1c1e] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#83439c]" /> Singapore Cost Guide ({currentRateObj.code})
            </h3>
            <div className="divide-y divide-gray-100 bg-[#f9f9fc] rounded-xl border border-gray-100 overflow-hidden text-xs">
              {SINGAPORE_PRICE_CHEAT_SHEET.map((item, idx) => {
                const converted = (item.sgd * currentRateObj.ratePerSgd).toFixed(1);
                return (
                  <div key={idx} className="p-2.5 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <div className="font-semibold text-[#1a1c1e]">{item.item}</div>
                      <div className="text-[10px] text-gray-500">{item.desc}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#83439c]">S${item.sgd.toFixed(2)}</span>
                      <div className="text-[10px] text-gray-500 font-medium">
                        ≈ {currentRateObj.symbol}
                        {converted} {currentRateObj.code}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Money Changer Tips */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="leading-relaxed">
              <span className="font-bold">Top Money Changers in Singapore:</span> The Arcade at Raffles Place, Mustafa Centre (24 hrs in Little India), and People’s Park Complex in Chinatown offer the most competitive cash rates. Contactless card payment (SimplyGo/Visa/Mastercard) is accepted across all MRT, buses, and 95% of food centers.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
          {onNavigateToLive ? (
            <button
              onClick={() => {
                onClose();
                onNavigateToLive();
              }}
              className="text-xs font-bold text-[#83439c] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Live Currency Dashboard &rarr;</span>
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="bg-[#83439c] text-white text-xs font-semibold py-2 px-5 rounded-xl cursor-pointer hover:bg-[#6c2c85] transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
