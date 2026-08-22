import React, { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  CloudSun,
  Coins,
  Users,
  Car,
  RefreshCw,
  Sun,
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  Moon,
  Droplets,
  Wind,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  ArrowRightLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Train,
  SlidersHorizontal,
  Compass,
  Info,
  Calendar,
  Radio,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building2,
  Navigation,
  Route,
  Footprints,
  Layers,
  Globe,
  LocateFixed,
  Sparkles,
  Map,
  Zap,
} from 'lucide-react';
import {
  CURRENT_WEATHER_LIVE,
  HOURLY_WEATHER_24H,
  FORECAST_7_DAYS,
  MONTH_TREND_DATA,
  LIVE_EXCHANGE_RATES,
  LIVE_CROWD_DATA,
  LIVE_CARPARK_DATA,
  INITIAL_PLANNING_AREAS_DATA,
} from '../data/liveUpdatesData';
import {
  fetchLiveExchangeRates,
  EnrichedCurrencyRate,
} from '../services/currencyService';
import {
  DayForecast,
  MonthTrend,
  CrowdStatusItem,
  CarparkItem,
  OneMapPlanningArea,
  OneMapSearchResult,
} from '../types';

type LiveSubTab = 'weather' | 'currency' | 'crowd' | 'carpark';
type WeatherPeriod = '1day' | '7days' | '1month';
type CrowdViewMode = 'attractions' | 'planning-areas' | 'onemap-tools';

export const LiveUpdatesTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<LiveSubTab>('weather');
  const [weatherPeriod, setWeatherPeriod] = useState<WeatherPeriod>('1day');
  const [crowdViewMode, setCrowdViewMode] = useState<CrowdViewMode>('planning-areas');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [liveTaxiCount, setLiveTaxiCount] = useState<number>(2840);
  const [showApiInspector, setShowApiInspector] = useState<boolean>(false);
  const [selectedInspectorEndpoint, setSelectedInspectorEndpoint] = useState<string>('two-hr-forecast');
  const [inspectorData, setInspectorData] = useState<any>(null);
  const [inspectorLoading, setInspectorLoading] = useState<boolean>(false);

  // Dynamic Weather & Carpark state from live backend
  const [liveWeather, setLiveWeather] = useState(CURRENT_WEATHER_LIVE);
  const [liveForecastDays, setLiveForecastDays] = useState<DayForecast[]>(FORECAST_7_DAYS);
  const [carparkList, setCarparkList] = useState<CarparkItem[]>(LIVE_CARPARK_DATA);

  // Live Currency state from ExchangeRate-API
  const [liveCurrencyRates, setLiveCurrencyRates] = useState<EnrichedCurrencyRate[]>(LIVE_EXCHANGE_RATES as EnrichedCurrencyRate[]);
  const [currencyLastUpdated, setCurrencyLastUpdated] = useState<string>('Live Feed');
  const [isCurrencyLoading, setIsCurrencyLoading] = useState<boolean>(false);
  const [currencyDataSource, setCurrencyDataSource] = useState<'api' | 'fallback'>('api');

  // Currency Converter State
  const [calcAmount, setCalcAmount] = useState<string>('100');
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [convertDirection, setConvertDirection] = useState<'foreignToSgd' | 'sgdToForeign'>('foreignToSgd');
  const [currencySearch, setCurrencySearch] = useState<string>('');

  // Crowd Filter State
  const [crowdCategory, setCrowdCategory] = useState<string>('All');
  const [crowdSearch, setCrowdSearch] = useState<string>('');

  // OneMap Planning Area Population Density State
  const [planningAreas, setPlanningAreas] = useState<OneMapPlanningArea[]>(INITIAL_PLANNING_AREAS_DATA);
  const [planningRegion, setPlanningRegion] = useState<string>('All');
  const [planningSearch, setPlanningSearch] = useState<string>('');
  const [islandDensitySummary, setIslandDensitySummary] = useState<any>({
    totalResidentPop: '5.92 Million (Singapore Total)',
    islandAreaKm2: '734.3 km²',
    overallDensity: '8,058 persons/km²',
    highestDaytimeFootfall: 'Downtown Core (380k daily transient influx)',
  });

  // OneMap Interactive Tools State
  const [oneMapSearchVal, setOneMapSearchVal] = useState<string>('Raffles Place');
  const [oneMapSearchResults, setOneMapSearchResults] = useState<OneMapSearchResult[]>([
    {
      SEARCHVAL: 'RAFFLES PLACE MRT STATION',
      BLK_NO: '',
      ROAD_NAME: 'RAFFLES PLACE',
      BUILDING: 'RAFFLES PLACE MRT STATION (NS26/EW14)',
      ADDRESS: '5 RAFFLES PLACE SINGAPORE 048618',
      POSTAL: '048618',
      LATITUDE: '1.2839',
      LONGITUDE: '103.8515',
    },
  ]);
  const [oneMapSearchLoading, setOneMapSearchLoading] = useState<boolean>(false);

  const [oneMapRevLocation, setOneMapRevLocation] = useState<string>('1.2839,103.8515');
  const [oneMapRevBuffer, setOneMapRevBuffer] = useState<string>('40');
  const [oneMapRevAddressType, setOneMapRevAddressType] = useState<string>('All');
  const [oneMapRevData, setOneMapRevData] = useState<any>({
    BUILDINGNAME: 'Raffles Place Central Business District',
    BLOCK: '1',
    ROAD: 'Raffles Place',
    POSTALCODE: '048618',
    LATITUDE: '1.2839',
    LONGITUDE: '103.8515',
  });
  const [oneMapRevLoading, setOneMapRevLoading] = useState<boolean>(false);

  const [oneMapRouteStart, setOneMapRouteStart] = useState<string>('1.2834,103.8607'); // MBS
  const [oneMapRouteEnd, setOneMapRouteEnd] = useState<string>('1.2815,103.8636'); // Gardens by the Bay
  const [oneMapRouteType, setOneMapRouteType] = useState<'walk' | 'pt' | 'drive' | 'cycle'>('walk');
  const [oneMapRouteData, setOneMapRouteData] = useState<any>({
    route_summary: {
      total_time: 360,
      total_distance: 500,
      start_point: '1.2834,103.8607',
      end_point: '1.2815,103.8636',
    },
    route_instructions: [
      ['Depart Marina Bay Sands Bayfront walkway', 80, '0', '0:01', '80m', '180', 'S', 80],
      ['Cross Dragonfly Bridge into Gardens by the Bay', 420, '1', '0:05', '420m', '120', 'SE', 500],
      ['Arrive at Supertree Grove promenade', 0, '2', '0:00', '0m', '0', 'N', 500],
    ],
  });
  const [oneMapRouteLoading, setOneMapRouteLoading] = useState<boolean>(false);
  const [oneMapTokenInfo, setOneMapTokenInfo] = useState<any>(null);

  // Carpark Filter State
  const [carparkZone, setCarparkZone] = useState<string>('All');
  const [carparkSearch, setCarparkSearch] = useState<string>('');

  // Helper to safely format condition strings even if an object is passed
  const safeStr = (val: any, fallback: string = 'Partly Cloudy'): string => {
    if (!val) return fallback;
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.text || val.summary || val.code || fallback;
    return String(val);
  };

  const fetchLiveBackendData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/telemetry/live');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.weather) {
          setIsBackendConnected(true);
          setLastSyncTime(new Date().toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          
          if (json.transport?.liveTaxiCount) {
            setLiveTaxiCount(json.transport.liveTaxiCount);
          }

          const parsedRegional = (json.weather.regionalNowcast || []).map((r: any) => ({
            ...r,
            condition: safeStr(r.condition, 'Partly Cloudy'),
          }));

          setLiveWeather((prev) => ({
            ...prev,
            temp: typeof json.weather.temp === 'number' ? json.weather.temp : prev.temp,
            feelsLike: typeof json.weather.feelsLike === 'number' ? json.weather.feelsLike : prev.feelsLike,
            condition: safeStr(json.weather.condition, prev.condition),
            humidity: typeof json.weather.humidity === 'number' ? json.weather.humidity : prev.humidity,
            rainProb: typeof json.weather.rainProb === 'number' ? json.weather.rainProb : prev.rainProb,
            uvIndex: typeof json.weather.uvIndex === 'number' ? json.weather.uvIndex : prev.uvIndex,
            uvLevel: safeStr(json.weather.uvLevel, prev.uvLevel),
            psi: typeof json.weather.psi === 'number' ? json.weather.psi : prev.psi,
            psiStatus: safeStr(json.weather.psiStatus, prev.psiStatus),
            windSpeed: safeStr(json.weather.windSpeed, prev.windSpeed),
            rainfallToday: safeStr(json.weather.rainfallToday, prev.rainfallToday),
            regionalNowcast: parsedRegional.length ? parsedRegional : prev.regionalNowcast,
          }));

          if (json.weather.fourDayOutlook && json.weather.fourDayOutlook.length > 0) {
            // merge 4-day outlook with the first 4 days of 7-day forecast
            setLiveForecastDays((prev) => {
              const updated = [...prev];
              json.weather.fourDayOutlook.forEach((f: any, idx: number) => {
                if (updated[idx]) {
                  updated[idx] = {
                    ...updated[idx],
                    highTemp: typeof f.highTemp === 'number' ? f.highTemp : updated[idx].highTemp,
                    lowTemp: typeof f.lowTemp === 'number' ? f.lowTemp : updated[idx].lowTemp,
                    weather: safeStr(f.weather, updated[idx].weather),
                    icon: safeStr(f.icon, updated[idx].icon),
                  };
                }
              });
              return updated;
            });
          }

          if (json.transport?.liveCarparks && json.transport.liveCarparks.length > 0) {
            // Merge updated lots into carpark list
            setCarparkList((prevList) => {
              const incoming = json.transport.liveCarparks as any[];
              return prevList.map((existing) => {
                const matched = incoming.find(
                  (inc) =>
                    inc.carparkNumber === existing.id ||
                    inc.id === existing.id ||
                    (inc.name && existing.name && inc.name.toLowerCase().includes(existing.name.toLowerCase().slice(0, 6)))
                );
                if (matched) {
                  return {
                    ...existing,
                    availableLots: matched.availableLots,
                    totalLots: matched.totalLots || existing.totalLots,
                    status: (matched.status === 'Plenty' || matched.status === 'Limited' || matched.status === 'Full / Queueing')
                      ? matched.status
                      : matched.availableLots > 60 ? 'Plenty' : matched.availableLots > 15 ? 'Limited' : 'Full / Queueing',
                    lastUpdated: 'Just now (data.gov.sg v1 + LTA)',
                  };
                }
                return existing;
              });
            });
          }

          // Fetch LTA DataMall Carpark API directly
          try {
            const ltaRes = await fetch('/api/lta/carparks');
            if (ltaRes.ok) {
              const ltaJson = await ltaRes.json();
              if (ltaJson.success && Array.isArray(ltaJson.carparks)) {
                setCarparkList((prevList) => {
                  const ltaCarparks = ltaJson.carparks;
                  return prevList.map((cp) => {
                    const matched = ltaCarparks.find((l: any) =>
                      (l.Development && cp.name.toLowerCase().includes(l.Development.toLowerCase().slice(0, 6))) ||
                      (l.Development && l.Development.toLowerCase().includes(cp.name.toLowerCase().slice(0, 6)))
                    );
                    if (matched && typeof matched.AvailableLots === 'number') {
                      const avail = matched.AvailableLots;
                      return {
                        ...cp,
                        availableLots: avail,
                        status: avail > 120 ? 'Plenty' : avail > 30 ? 'Limited' : 'Full / Queueing',
                        lastUpdated: 'Just now (LTA DataMall v2)',
                      };
                    }
                    return cp;
                  });
                });
              }
            }
          } catch (err) {
            // ignore LTA individual fetch error
          }

          // Fetch OneMap Population Density from backend
          try {
            const oneMapDensityRes = await fetch('/api/onemap/population-density');
            if (oneMapDensityRes.ok) {
              const oneMapDensityJson = await oneMapDensityRes.json();
              if (oneMapDensityJson.success && Array.isArray(oneMapDensityJson.planningAreas)) {
                setPlanningAreas(oneMapDensityJson.planningAreas);
                if (oneMapDensityJson.islandSummary) {
                  setIslandDensitySummary(oneMapDensityJson.islandSummary);
                }
              }
            }
          } catch (err) {
            // keep fallback planning areas
          }

          // Fetch OneMap Token Status
          try {
            const tokenRes = await fetch('/api/onemap/token-status');
            if (tokenRes.ok) {
              const tokenJson = await tokenRes.json();
              setOneMapTokenInfo(tokenJson);
            }
          } catch (err) {
            // ignore token status error
          }

          // Fetch Live Exchange Rates from ExchangeRate-API
          try {
            const currData = await fetchLiveExchangeRates();
            if (currData.rates && currData.rates.length > 0) {
              setLiveCurrencyRates(currData.rates);
              setCurrencyLastUpdated(currData.lastUpdatedUtc);
              setCurrencyDataSource(currData.source);
            }
          } catch (currErr) {
            console.warn('Currency fetch error in LiveUpdatesTab:', currErr);
          }

          setRefreshToast('Live feeds updated from Singapore data.gov.sg, LTA DataMall, OneMap & ExchangeRate-API.');
        }
      }
    } catch (err) {
      console.warn('Could not reach backend /api/telemetry/live, keeping fallback telemetry.', err);
      setRefreshToast('Updated local Singapore telemetry feeds.');
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setRefreshToast(null), 3500);
    }
  };

  useEffect(() => {
    fetchLiveBackendData();
  }, []);

  const handleManualRefresh = () => {
    fetchLiveBackendData();
  };

  // OneMap Interactive Handlers
  const handleRunOneMapSearch = async (queryVal?: string) => {
    const q = queryVal !== undefined ? queryVal : oneMapSearchVal;
    if (!q.trim()) return;
    setOneMapSearchLoading(true);
    try {
      const res = await fetch(`/api/onemap/search?searchVal=${encodeURIComponent(q.trim())}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
      if (res.ok) {
        const json = await res.json();
        if (json.results && Array.isArray(json.results)) {
          setOneMapSearchResults(json.results);
        } else if (json.data?.results && Array.isArray(json.data.results)) {
          setOneMapSearchResults(json.data.results);
        }
      }
    } catch (err) {
      console.error('OneMap search error:', err);
    } finally {
      setOneMapSearchLoading(false);
    }
  };

  const handleRunOneMapRevGeocode = async (locVal?: string) => {
    const loc = locVal !== undefined ? locVal : oneMapRevLocation;
    if (!loc.trim()) return;
    setOneMapRevLoading(true);
    try {
      const res = await fetch(`/api/onemap/revgeocode?location=${encodeURIComponent(loc.trim())}&buffer=${oneMapRevBuffer}&addressType=${oneMapRevAddressType}`);
      if (res.ok) {
        const json = await res.json();
        if (json.GeocodeInfo && json.GeocodeInfo.length > 0) {
          setOneMapRevData(json.GeocodeInfo[0]);
        } else if (json.data?.GeocodeInfo && json.data.GeocodeInfo.length > 0) {
          setOneMapRevData(json.data.GeocodeInfo[0]);
        } else if (json.GeocodeInfo) {
          setOneMapRevData(json.GeocodeInfo);
        } else {
          setOneMapRevData(json);
        }
      }
    } catch (err) {
      console.error('OneMap revgeocode error:', err);
    } finally {
      setOneMapRevLoading(false);
    }
  };

  const handleRunOneMapRoute = async (startVal?: string, endVal?: string, typeVal?: 'walk' | 'pt' | 'drive' | 'cycle') => {
    const start = startVal || oneMapRouteStart;
    const end = endVal || oneMapRouteEnd;
    const rType = typeVal || oneMapRouteType;
    setOneMapRouteLoading(true);
    try {
      const res = await fetch(`/api/onemap/route?start=${encodeURIComponent(start.trim())}&end=${encodeURIComponent(end.trim())}&routeType=${rType}`);
      if (res.ok) {
        const json = await res.json();
        setOneMapRouteData(json);
      }
    } catch (err) {
      console.error('OneMap route error:', err);
    } finally {
      setOneMapRouteLoading(false);
    }
  };

  const testGovEndpoint = async (endpoint: string) => {
    setInspectorLoading(true);
    setSelectedInspectorEndpoint(endpoint);
    try {
      const res = await fetch(`/api/gov/${endpoint}`);
      const json = await res.json();
      setInspectorData(json);
    } catch (err: any) {
      setInspectorData({ error: 'Failed to fetch endpoint', details: err.message });
    } finally {
      setInspectorLoading(false);
    }
  };

  // Weather Icon Resolver
  const getWeatherIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Sun':
        return <Sun className={`${className} text-amber-500`} />;
      case 'CloudSun':
        return <CloudSun className={`${className} text-amber-500`} />;
      case 'CloudRain':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'CloudLightning':
        return <CloudLightning className={`${className} text-purple-600`} />;
      case 'CloudDrizzle':
        return <CloudDrizzle className={`${className} text-cyan-600`} />;
      case 'Moon':
        return <Moon className={`${className} text-indigo-400`} />;
      default:
        return <CloudSun className={`${className} text-amber-500`} />;
    }
  };

  // Refresh Currency Rates explicitly
  const refreshLiveCurrency = async () => {
    setIsCurrencyLoading(true);
    try {
      const currData = await fetchLiveExchangeRates();
      if (currData.rates && currData.rates.length > 0) {
        setLiveCurrencyRates(currData.rates);
        setCurrencyLastUpdated(currData.lastUpdatedUtc);
        setCurrencyDataSource(currData.source);
        setRefreshToast('Exchange rates synced from ExchangeRate-API.');
        setTimeout(() => setRefreshToast(null), 3000);
      }
    } catch (err) {
      console.warn('Manual currency refresh error:', err);
    } finally {
      setIsCurrencyLoading(false);
    }
  };

  // Currency Calculation
  const selectedCurrency = useMemo(
    () => liveCurrencyRates.find((c) => c.code === selectedCurrencyCode) || liveCurrencyRates[0] || LIVE_EXCHANGE_RATES[0],
    [selectedCurrencyCode, liveCurrencyRates]
  );

  const calculatedValue = useMemo(() => {
    const num = parseFloat(calcAmount);
    if (isNaN(num) || num <= 0) return '0.00';

    if (convertDirection === 'foreignToSgd') {
      // e.g. 100 USD * 1.269 = 126.92 SGD
      return (num * selectedCurrency.sgdPerUnit).toLocaleString('en-SG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      // e.g. 100 SGD * 0.788 = 78.79 USD
      return (num * selectedCurrency.ratePerSgd).toLocaleString('en-SG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }, [calcAmount, selectedCurrency, convertDirection]);

  // Filtered Currency List
  const filteredCurrencies = useMemo(() => {
    if (!currencySearch.trim()) return liveCurrencyRates;
    const q = currencySearch.toLowerCase();
    return liveCurrencyRates.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [currencySearch, liveCurrencyRates]);

  // Filtered Crowd Data
  const filteredCrowds = useMemo(() => {
    return LIVE_CROWD_DATA.filter((item) => {
      const matchCategory = crowdCategory === 'All' || item.category === crowdCategory;
      const matchQuery =
        crowdSearch.trim() === '' ||
        item.name.toLowerCase().includes(crowdSearch.toLowerCase()) ||
        item.area.toLowerCase().includes(crowdSearch.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [crowdCategory, crowdSearch]);

  // Filtered Carpark Data
  const filteredCarparks = useMemo(() => {
    return carparkList.filter((item) => {
      const matchZone = carparkZone === 'All' || item.area.includes(carparkZone) || carparkZone.includes(item.area);
      const matchQuery =
        carparkSearch.trim() === '' ||
        item.name.toLowerCase().includes(carparkSearch.toLowerCase()) ||
        item.area.toLowerCase().includes(carparkSearch.toLowerCase());
      return matchZone && matchQuery;
    });
  }, [carparkZone, carparkSearch, carparkList]);

  // Helper for Crowd Level styling
  const getCrowdLevelBadge = (level: CrowdStatusItem['crowdLevel']) => {
    switch (level) {
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Low Crowd
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Moderate Flow
          </span>
        );
      case 'Busy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-800">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
            Busy / Queue
          </span>
        );
      case 'Surge / Packed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping"></span>
            High Surge
          </span>
        );
    }
  };

  // Filtered Planning Area Data (OneMap Population Density)
  const filteredPlanningAreas = useMemo(() => {
    return planningAreas.filter((item) => {
      const matchRegion = planningRegion === 'All' || item.region === planningRegion;
      const matchQuery =
        planningSearch.trim() === '' ||
        item.planningArea.toLowerCase().includes(planningSearch.toLowerCase()) ||
        item.subzones.some((s) => s.toLowerCase().includes(planningSearch.toLowerCase())) ||
        item.landmarks.some((l) => l.toLowerCase().includes(planningSearch.toLowerCase()));
      return matchRegion && matchQuery;
    });
  }, [planningRegion, planningSearch, planningAreas]);

  // Helper for OneMap Planning Area Density Level styling
  const getDensityLevelBadge = (level: OneMapPlanningArea['densityLevel']) => {
    switch (level) {
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Low Resident Density
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Moderate Flow
          </span>
        );
      case 'Busy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-800">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
            Busy Corridors
          </span>
        );
      case 'High Surge':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            High Foot Traffic Surge
          </span>
        );
    }
  };

  // Helper for Carpark Status styling
  const getCarparkStatusBadge = (status: CarparkItem['status'], availableLots: number, totalLots: number) => {
    const percent = Math.round((availableLots / totalLots) * 100);
    switch (status) {
      case 'Plenty':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Plenty ({percent}% Free)
          </span>
        );
      case 'Limited':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Limited ({percent}% Free)
          </span>
        );
      case 'Full / Queueing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Near Full ({percent}% Free)
          </span>
        );
    }
  };

  return (
    <div id="live-updates-tab-view" className="space-y-5 px-4 pb-28 pt-2">
      {/* Toast Notification */}
      {refreshToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1a1c1e] text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{refreshToast}</span>
        </div>
      )}

      {/* Main Header Card */}
      <div className="bg-gradient-to-br from-[#83439c] via-[#6c2c85] to-[#4a185e] text-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-xs">
              <Activity className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">Singapore Live Telemetry</h2>
                {isBackendConnected ? (
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live data.gov.sg
                  </span>
                ) : (
                  <span className="text-[10px] bg-white/10 text-purple-200 border border-white/20 px-2 py-0.5 rounded-full font-medium">
                    Telemetry Active
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-purple-200 mt-0.5">
                <span>Synced {lastSyncTime}</span>
                <span>•</span>
                <span>SGT (UTC+8)</span>
                <span>•</span>
                <span className="text-amber-200 font-semibold flex items-center gap-1">
                  🚕 {liveTaxiCount.toLocaleString()} Taxis Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowApiInspector(!showApiInspector)}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-purple-100 text-xs font-medium px-2.5 py-1.5 rounded-xl transition-all cursor-pointer border border-white/15"
              title="Test Gov API Endpoints"
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gov APIs</span>
            </button>

            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs font-medium px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-white/20"
              title="Refresh live feeds"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-purple-100/90 leading-relaxed mt-2">
          Real-time weather radar (1-day, 7-days, 1-month), live currency exchange to SGD, attraction crowd meters, and real-time carpark lot availability powered by Singapore open data feeds.
        </p>

        {/* 4 Feature Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/15">
          <button
            id="subtab-weather"
            onClick={() => setActiveSubTab('weather')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
              activeSubTab === 'weather'
                ? 'bg-white text-[#83439c] font-bold shadow-xs'
                : 'bg-white/10 text-purple-100 hover:bg-white/15 font-medium'
            }`}
          >
            <CloudSun className="w-4 h-4 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs leading-tight">Live Weather</div>
              <div className="text-[10px] opacity-75 font-normal">1D • 7D • 1M</div>
            </div>
          </button>

          <button
            id="subtab-currency"
            onClick={() => setActiveSubTab('currency')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
              activeSubTab === 'currency'
                ? 'bg-white text-[#83439c] font-bold shadow-xs'
                : 'bg-white/10 text-purple-100 hover:bg-white/15 font-medium'
            }`}
          >
            <Coins className="w-4 h-4 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs leading-tight">Live Currency</div>
              <div className="text-[10px] opacity-75 font-normal">SGD Rates & Tool</div>
            </div>
          </button>

          <button
            id="subtab-crowd"
            onClick={() => setActiveSubTab('crowd')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
              activeSubTab === 'crowd'
                ? 'bg-white text-[#83439c] font-bold shadow-xs'
                : 'bg-white/10 text-purple-100 hover:bg-white/15 font-medium'
            }`}
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs leading-tight">Live Crowds</div>
              <div className="text-[10px] opacity-75 font-normal">Queue & Traffic</div>
            </div>
          </button>

          <button
            id="subtab-carpark"
            onClick={() => setActiveSubTab('carpark')}
            className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
              activeSubTab === 'carpark'
                ? 'bg-white text-[#83439c] font-bold shadow-xs'
                : 'bg-white/10 text-purple-100 hover:bg-white/15 font-medium'
            }`}
          >
            <Car className="w-4 h-4 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs leading-tight">Carpark Lots</div>
              <div className="text-[10px] opacity-75 font-normal">Live Free Slots</div>
            </div>
          </button>
        </div>
      </div>

      {/* Optional Data.gov.sg API Inspector Accordion */}
      {showApiInspector && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 border border-slate-700 shadow-md space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Backend Government API Explorer
              </h3>
            </div>
            <button
              onClick={() => setShowApiInspector(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>

          <p className="text-[11px] text-slate-300">
            Select any of the 12 keyless live data.gov.sg endpoints served by our Express backend proxy:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
            {[
              { id: 'two-hr-forecast', label: '2-Hr Forecast (v2)' },
              { id: 'twenty-four-hr-forecast', label: '24-Hr Forecast (v2)' },
              { id: 'four-day-outlook', label: '4-Day Outlook (v2)' },
              { id: 'air-temperature', label: 'Air Temp (v2)' },
              { id: 'rainfall', label: 'Rainfall (v2)' },
              { id: 'psi', label: 'PSI Air Quality (v2)' },
              { id: 'pm25', label: 'PM2.5 (v2)' },
              { id: 'uv', label: 'UV Index (v2)' },
              { id: 'relative-humidity', label: 'Humidity (v2)' },
              { id: 'wind-speed', label: 'Wind Speed (v2)' },
              { id: 'carpark-availability', label: 'Carparks (v1)' },
              { id: 'taxi-availability', label: 'Taxi Availability (v1)' },
            ].map((ep) => (
              <button
                key={ep.id}
                onClick={() => testGovEndpoint(ep.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-left truncate transition-colors cursor-pointer ${
                  selectedInspectorEndpoint === ep.id
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {ep.label}
              </button>
            ))}
          </div>

          {selectedInspectorEndpoint && (
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-emerald-300">
                  GET /api/gov/{selectedInspectorEndpoint}
                </span>
                {inspectorLoading && (
                  <span className="text-amber-300 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Fetching live gov feed...
                  </span>
                )}
              </div>

              {inspectorData && !inspectorLoading && (
                <pre className="p-3 bg-slate-950 rounded-xl text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-48 scrollbar-thin border border-slate-800">
                  {JSON.stringify(inspectorData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. WEATHER FORECAST SECTION (1-Day, 7-Days, 1-Month)                      */}
      {/* ========================================================================= */}
      {activeSubTab === 'weather' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Weather Range Toggles */}
          <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#c4c7c8]/50 shadow-xs">
            <div className="flex gap-1 w-full">
              <button
                onClick={() => setWeatherPeriod('1day')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  weatherPeriod === '1day'
                    ? 'bg-[#83439c] text-white shadow-xs'
                    : 'text-[#444748] hover:bg-[#f3f3f6]'
                }`}
              >
                1-Day (24h Hourly)
              </button>
              <button
                onClick={() => setWeatherPeriod('7days')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  weatherPeriod === '7days'
                    ? 'bg-[#83439c] text-white shadow-xs'
                    : 'text-[#444748] hover:bg-[#f3f3f6]'
                }`}
              >
                7-Day Forecast
              </button>
              <button
                onClick={() => setWeatherPeriod('1month')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  weatherPeriod === '1month'
                    ? 'bg-[#83439c] text-white shadow-xs'
                    : 'text-[#444748] hover:bg-[#f3f3f6]'
                }`}
              >
                1-Month Climate
              </button>
            </div>
          </div>

          {/* Current Live Ambient Snapshot */}
          <div className="bg-white rounded-2xl p-4 border border-[#c4c7c8]/50 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-semibold text-[#83439c] uppercase tracking-wider">
                  Live Atmosphere Telemetry
                </div>
                <h3 className="text-xl font-extrabold text-[#1a1c1e] flex items-center gap-2 mt-0.5">
                  <span>{liveWeather.temp}°C</span>
                  <span className="text-xs font-medium text-[#747878] bg-[#f3f3f6] px-2 py-0.5 rounded-full">
                    Feels like {liveWeather.feelsLike}°C
                  </span>
                </h3>
                <p className="text-xs text-[#444748] mt-0.5">{liveWeather.condition}</p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center">
                <CloudSun className="w-8 h-8 text-amber-500" />
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-gray-100">
              <div className="p-2.5 bg-[#f9f9fc] rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-[11px] text-[#747878]">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" /> Rain Probability
                </div>
                <div className="text-sm font-bold text-[#1a1c1e] mt-1">{liveWeather.rainProb}%</div>
                <div className="text-[10px] text-gray-500">Today: {liveWeather.rainfallToday}</div>
              </div>

              <div className="p-2.5 bg-[#f9f9fc] rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-[11px] text-[#747878]">
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> UV Index
                </div>
                <div className="text-sm font-bold text-[#1a1c1e] mt-1">
                  {liveWeather.uvIndex} <span className="text-xs font-normal">({liveWeather.uvLevel})</span>
                </div>
                <div className="text-[10px] text-gray-500">
                  {liveWeather.uvIndex === 0
                    ? 'Night / Minimal solar UV'
                    : liveWeather.uvIndex <= 2
                    ? 'Low (No protection required)'
                    : liveWeather.uvIndex <= 5
                    ? 'Moderate (Hat & shade recommended)'
                    : liveWeather.uvIndex <= 7
                    ? 'High (Sunscreen & sunglasses needed)'
                    : 'Very High (Avoid direct sun 11am-3pm)'}
                </div>
              </div>

              <div className="p-2.5 bg-[#f9f9fc] rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-[11px] text-[#747878]">
                  <Wind className="w-3.5 h-3.5 text-teal-600" /> Humidity / Wind
                </div>
                <div className="text-sm font-bold text-[#1a1c1e] mt-1">{liveWeather.humidity}%</div>
                <div className="text-[10px] text-gray-500">{liveWeather.windSpeed}</div>
              </div>

              <div className="p-2.5 bg-[#f9f9fc] rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-[11px] text-[#747878]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PSI Air Quality
                </div>
                <div className="text-sm font-bold text-emerald-700 mt-1">{liveWeather.psi}</div>
                <div className="text-[10px] text-emerald-600 font-medium">{liveWeather.psiStatus}</div>
              </div>
            </div>

            {/* Regional 2-Hour Nowcast Chips */}
            <div className="pt-2 border-t border-gray-100">
              <div className="text-[11px] font-semibold text-[#747878] mb-2 flex items-center justify-between">
                <span>NEA 2-Hour Regional Nowcast</span>
                <span className="text-[10px] text-[#83439c]">Updated real-time (v2 open API)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {liveWeather.regionalNowcast.map((region, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#f9f9fc] border border-gray-100 text-xs"
                  >
                    <span className="font-medium text-[#1a1c1e] truncate mr-2">{region.region}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-[11px] font-bold text-[#83439c]">{region.temp}°C</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          region.rainChance > 50
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {region.condition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 1-DAY HOURLY TIMELINE */}
          {weatherPeriod === '1day' && (
            <div className="bg-white rounded-2xl p-4 border border-[#c4c7c8]/50 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#83439c]" /> 24-Hour Hourly Progression
                </h4>
                <span className="text-[11px] text-[#747878]">Swipe horizontally &rarr;</span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {HOURLY_WEATHER_24H.map((hour, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-24 p-3 rounded-xl bg-[#f9f9fc] border border-gray-200/70 flex flex-col items-center text-center space-y-1.5 hover:border-[#83439c]/40 transition-colors"
                  >
                    <span className="text-xs font-bold text-[#444748]">{hour.time}</span>
                    <div className="my-1">{getWeatherIcon(hour.icon, 'w-6 h-6')}</div>
                    <span className="text-sm font-extrabold text-[#1a1c1e]">{hour.temp}°C</span>
                    <div className="text-[10px] text-blue-600 font-semibold flex items-center gap-0.5">
                      <Droplets className="w-2.5 h-2.5" /> {hour.rainProb}%
                    </div>
                    <span className="text-[9px] text-[#747878] line-clamp-1">{hour.weather}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Local Traveler Tip:</strong> Singapore afternoon rain is typically brief (20–40 mins) and highly localized. MRT stations, underground linkways, and covered walkways (Sheltered Walkway Network) ensure you stay dry across the city!
                </p>
              </div>
            </div>
          )}

          {/* 7-DAY FORECAST */}
          {weatherPeriod === '7days' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#83439c]" /> 7-Day Singapore Outlook
                </h4>
                <span className="text-[11px] text-[#747878]">Updated via Meteorological Service SG</span>
              </div>

              <div className="space-y-2">
                {liveForecastDays.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-[#c4c7c8]/50 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#83439c]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f9f9fc] flex items-center justify-center border border-gray-100 flex-shrink-0">
                        {getWeatherIcon(day.icon, 'w-6 h-6')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1a1c1e]">{day.day}</span>
                          <span className="text-xs text-[#747878]">{day.date}</span>
                        </div>
                        <div className="text-xs text-[#444748] font-medium">{day.weather}</div>
                        <p className="text-[11px] text-[#747878] mt-0.5 line-clamp-1">{day.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md">
                        <Droplets className="w-3.5 h-3.5" />
                        <span>{day.rainProb}% Rain</span>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-[#1a1c1e]">
                          {day.highTemp}° <span className="text-xs font-normal text-gray-400">/ {day.lowTemp}°C</span>
                        </div>
                        <div className="text-[10px] text-amber-700 font-medium">UV {day.uvIndex}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1-MONTH CLIMATE TRENDS */}
          {weatherPeriod === '1month' && (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/70 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
                  <Compass className="w-4 h-4 text-[#83439c]" /> 30-Day Monthly Climate Analysis (Southwest Monsoon)
                </div>
                <p className="text-xs text-purple-950 leading-relaxed">
                  Singapore experiences steady temperatures year-round between 25°C to 33°C. The current month features short convective bursts of afternoon thunder squalls with brilliant sunny mornings and breezy twilights.
                </p>
              </div>

              <div className="space-y-3">
                {MONTH_TREND_DATA.map((week, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-xl border border-[#c4c7c8]/50 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#83439c] uppercase tracking-wider">
                          {week.week}
                        </span>
                        <h4 className="text-sm font-bold text-[#1a1c1e]">{week.dateRange}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[#1a1c1e]">
                          Avg {week.avgHigh}° / {week.avgLow}°C
                        </span>
                        <div className="text-[10px] text-blue-600 font-semibold">
                          ~{week.expectedRainDays} Rain Days Expected
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#f9f9fc] border border-gray-100 text-xs text-[#444748] space-y-1">
                      <p>
                        <strong>Pattern:</strong> {week.summary}
                      </p>
                      <p className="text-[#83439c]">
                        <strong>Packing & Sightseeing:</strong> {week.advisory}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LIVE CURRENCY EXCHANGE TO SGD SECTION                                  */}
      {/* ========================================================================= */}
      {activeSubTab === 'currency' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Live ExchangeRate-API Feed Status Banner */}
          <div className="bg-gradient-to-r from-[#83439c]/10 via-purple-50 to-indigo-50 border border-[#83439c]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#83439c] text-white flex items-center justify-center shadow-xs">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#1a1c1e]">ExchangeRate-API Live Stream</h3>
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 fill-current" /> Live SGD Base
                  </span>
                </div>
                <p className="text-xs text-[#747878]">
                  Updated: {currencyLastUpdated.replace(' +0000', ' UTC')} • 160+ Currencies Active
                </p>
              </div>
            </div>
            <button
              onClick={refreshLiveCurrency}
              disabled={isCurrencyLoading}
              className="px-3 py-1.5 bg-[#83439c] hover:bg-[#6c2c85] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50 self-end sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCurrencyLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Rates</span>
            </button>
          </div>

          {/* Live Currency Calculator Card */}
          <div className="bg-white rounded-2xl p-4 border border-[#c4c7c8]/50 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#83439c]" /> Live SGD Currency Calculator
                </h3>
                <p className="text-[11px] text-[#747878]">Instant conversion at live interbank rates (SGD base)</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                Live Mid-Market
              </span>
            </div>

            {/* Conversion Direction Box */}
            <div className="bg-[#f9f9fc] p-3.5 rounded-xl border border-gray-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Input 1 */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#747878]">
                    {convertDirection === 'foreignToSgd' ? `${selectedCurrency.code} Amount` : 'SGD (S$) Amount'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(e.target.value)}
                      min="0"
                      step="any"
                      className="w-full pl-3 pr-20 py-2.5 rounded-xl bg-white border border-gray-300 text-[#1a1c1e] font-bold text-lg focus:outline-none focus:border-[#83439c]"
                      placeholder="0.00"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                      {convertDirection === 'foreignToSgd' ? selectedCurrency.code : 'SGD'}
                    </div>
                  </div>
                </div>

                {/* Target Currency Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#747878]">Target Currency ({liveCurrencyRates.length} available)</label>
                  <select
                    value={selectedCurrencyCode}
                    onChange={(e) => setSelectedCurrencyCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-300 text-[#1a1c1e] font-bold text-sm focus:outline-none focus:border-[#83439c] cursor-pointer"
                  >
                    {liveCurrencyRates.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.flag} {curr.code} - {curr.name} (1 SGD = {curr.ratePerSgd})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reverse Button & Result Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <button
                  onClick={() =>
                    setConvertDirection((prev) => (prev === 'foreignToSgd' ? 'sgdToForeign' : 'foreignToSgd'))
                  }
                  className="flex items-center gap-1 text-xs font-semibold text-[#83439c] hover:text-[#6c2c85] transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-purple-50"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Switch Direction</span>
                </button>

                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block">Calculated Result</span>
                  <span className="text-lg font-black text-[#83439c]">
                    {convertDirection === 'foreignToSgd'
                      ? `S$ ${calculatedValue} SGD`
                      : `${calculatedValue} ${selectedCurrency.code}`}
                  </span>
                </div>
              </div>

              {/* Rate Benchmark Banner */}
              <div className="text-[11px] text-[#444748] bg-white p-2 rounded-lg border border-gray-100 flex items-center justify-between">
                <span>
                  1 SGD = <strong>{selectedCurrency.formattedRatePerSgd || selectedCurrency.ratePerSgd} {selectedCurrency.code}</strong> (1 {selectedCurrency.code} = S${selectedCurrency.formattedSgdPerUnit || selectedCurrency.sgdPerUnit})
                </span>
                <span className="text-[10px] text-gray-400">ExchangeRate-API Live</span>
              </div>
            </div>
          </div>

          {/* Search & Rates Grid */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#83439c]" /> Live Foreign Currency Rates vs SGD
              </h4>

              {/* Search Currency */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={currencySearch}
                  onChange={(e) => setCurrencySearch(e.target.value)}
                  placeholder="Search USD, MYR, EUR..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-[#83439c] w-full sm:w-48"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredCurrencies.map((rate) => (
                <div
                  key={rate.code}
                  onClick={() => setSelectedCurrencyCode(rate.code)}
                  className={`p-3.5 bg-white rounded-xl border transition-all cursor-pointer ${
                    selectedCurrencyCode === rate.code
                      ? 'border-[#83439c] ring-1 ring-[#83439c] shadow-xs'
                      : 'border-[#c4c7c8]/50 hover:border-gray-400 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{rate.flag}</span>
                      <div>
                        <div className="font-bold text-xs text-[#1a1c1e] flex items-center gap-1.5">
                          <span>{rate.code}</span>
                          <span className="text-[10px] font-normal text-gray-500">({rate.name})</span>
                        </div>
                        <div className="text-[11px] text-[#747878]">
                          1 {rate.code} = <strong className="text-[#1a1c1e]">S$ {rate.sgdPerUnit}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-[#83439c]">
                        S$1 = {rate.ratePerSgd}
                      </div>
                      <div
                        className={`text-[10px] font-semibold flex items-center justify-end gap-0.5 ${
                          rate.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {rate.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{rate.change24h >= 0 ? `+${rate.change24h}%` : `${rate.change24h}%`} 24h</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-500 bg-[#f9f9fc] p-1.5 rounded flex items-center justify-between">
                    <span className="truncate">{rate.moneyChangerSpread}</span>
                    <span className="text-[#83439c] font-medium flex-shrink-0 ml-2">Click to calculate</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Singapore Price Cheat Sheet */}
            <div className="bg-[#f9f9fc] rounded-2xl p-4 border border-gray-200 text-xs space-y-2.5">
              <h5 className="font-bold text-[#1a1c1e] flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#1b6d24]" /> Singapore Everyday Price Guide (SGD)
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-gray-100">
                  <div className="text-gray-500">Hawker Chicken Rice</div>
                  <div className="font-bold text-gray-900">S$ 4.50 – 6.00</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-100">
                  <div className="text-gray-500">Kopi-O (Local Coffee)</div>
                  <div className="font-bold text-gray-900">S$ 1.30 – 1.60</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-100">
                  <div className="text-gray-500">MRT Trip (Single Fare)</div>
                  <div className="font-bold text-gray-900">S$ 1.15 – 2.40</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-100">
                  <div className="text-gray-500">Kaya Toast Set</div>
                  <div className="font-bold text-gray-900">S$ 5.50 – 6.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LIVE CROWD STATUS SECTION (OneMap + Attraction Radar + Spatial Tools)  */}
      {/* ========================================================================= */}
      {activeSubTab === 'crowd' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Sub-view switcher for Crowds */}
          <div className="flex items-center justify-between gap-2 p-1.5 bg-[#eceef0] rounded-xl">
            <button
              onClick={() => setCrowdViewMode('planning-areas')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                crowdViewMode === 'planning-areas'
                  ? 'bg-white text-[#83439c] shadow-xs'
                  : 'text-[#444748] hover:text-[#1a1c1e]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>OneMap Population Density</span>
            </button>
            <button
              onClick={() => setCrowdViewMode('attractions')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                crowdViewMode === 'attractions'
                  ? 'bg-white text-[#83439c] shadow-xs'
                  : 'text-[#444748] hover:text-[#1a1c1e]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Attraction Crowd Radar</span>
            </button>
            <button
              onClick={() => setCrowdViewMode('onemap-tools')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                crowdViewMode === 'onemap-tools'
                  ? 'bg-white text-[#83439c] shadow-xs'
                  : 'text-[#444748] hover:text-[#1a1c1e]'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>OneMap Live Geospatial Suite</span>
            </button>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SUB-VIEW 1: ONEMAP POPULATION & PLANNING AREA DENSITY                   */}
          {/* ----------------------------------------------------------------------- */}
          {crowdViewMode === 'planning-areas' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Island-wide Demographic Summary Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#83439c]/10 via-[#eceef0] to-indigo-50 border border-[#83439c]/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#83439c] text-white">
                        OneMap / SingStat Telemetry
                      </span>
                      <span className="text-xs text-gray-500 font-medium">Singapore Department of Statistics Integration</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1a1c1e]">
                      Singapore Planning Area Population & Daytime Transient Surge
                    </h4>
                    <p className="text-xs text-[#444748]">
                      Comparison of permanent resident density vs. daytime worker & tourist footfall surge across key commercial hubs.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center flex-shrink-0">
                    <div className="p-2 bg-white rounded-xl border border-gray-200/70 shadow-xs">
                      <div className="text-[10px] text-gray-500 font-medium">Total Population</div>
                      <div className="text-xs font-bold text-gray-900">{islandDensitySummary.totalResidentPop?.split(' ')[0] || '5.92M'}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-200/70 shadow-xs">
                      <div className="text-[10px] text-gray-500 font-medium">Avg Density</div>
                      <div className="text-xs font-bold text-emerald-700">8,058 / km²</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-gray-200/70 shadow-xs col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-gray-500 font-medium">Top Daytime Surge</div>
                      <div className="text-xs font-bold text-[#83439c]">Downtown Core</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls Bar for Planning Areas */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#83439c]" /> Planning Areas & Subzone Density
                    </h3>
                    <p className="text-[11px] text-[#747878]">Live resident count, km² density index, subzones & transit capacity</p>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={planningSearch}
                      onChange={(e) => setPlanningSearch(e.target.value)}
                      placeholder="Search Orchard, Chinatown, Sentosa..."
                      className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-[#83439c] w-full sm:w-60"
                    />
                  </div>
                </div>

                {/* Region Filter Chips */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                  {['All', 'Central', 'South', 'East'].map((region) => (
                    <button
                      key={region}
                      onClick={() => setPlanningRegion(region)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                        planningRegion === region
                          ? 'bg-[#83439c] text-white shadow-xs'
                          : 'bg-white text-[#444748] border border-[#c4c7c8]/50 hover:bg-[#f3f3f6]'
                      }`}
                    >
                      {region === 'All' ? 'All Planning Areas' : `${region} Region`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Planning Areas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredPlanningAreas.map((area) => (
                  <div
                    key={area.id}
                    className="p-4 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs space-y-3 hover:border-[#83439c]/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#1a1c1e]">{area.planningArea}</h4>
                            <span className="text-[10px] text-[#747878] font-medium bg-[#f3f3f6] px-2 py-0.5 rounded-full">
                              {area.region} Region
                            </span>
                          </div>
                          <p className="text-[11px] text-[#747878] mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#83439c]" />
                            {area.coordinates.lat.toFixed(4)}° N, {area.coordinates.lng.toFixed(4)}° E &bull; {area.landAreaKm2} km²
                          </p>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0">
                          {getDensityLevelBadge(area.densityLevel)}
                          <span className="text-[10px] text-gray-400 mt-1">Crowd Index: {area.crowdIndex}/100</span>
                        </div>
                      </div>

                      {/* Density Comparison Metrics */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2.5 rounded-xl bg-[#f9f9fc] border border-gray-100 space-y-0.5">
                          <div className="text-[10px] text-gray-500 font-medium">Resident Population</div>
                          <div className="text-sm font-extrabold text-gray-900">
                            {area.residentPopulation.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {area.residentDensityPerKm2.toLocaleString()} / km²
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#83439c]/5 border border-[#83439c]/15 space-y-0.5">
                          <div className="text-[10px] text-[#83439c] font-bold flex items-center gap-1">
                            <Zap className="w-3 h-3 text-[#83439c]" /> Daytime Influx
                          </div>
                          <div className="text-sm font-extrabold text-[#83439c]">
                            ~{area.daytimeFootTraffic.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {area.demographics.touristFootfallRank}
                          </div>
                        </div>
                      </div>

                      {/* Density Level Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-medium text-gray-500">
                          <span>Foot Traffic Load</span>
                          <span className="text-gray-900 font-bold">{area.crowdIndex}% Capacity</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 rounded-full ${
                              area.crowdIndex > 75
                                ? 'bg-rose-500'
                                : area.crowdIndex > 50
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${area.crowdIndex}%` }}
                          />
                        </div>
                      </div>

                      {/* Subzones & Landmarks */}
                      <div className="space-y-1.5 pt-1 text-xs">
                        <div className="text-[11px] text-gray-500">
                          <strong>Key Landmarks:</strong> {area.landmarks.join(', ')}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {area.subzones.map((sz) => (
                            <span
                              key={sz}
                              className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium"
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Visiting Advice Footer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-100 text-[#444748] mt-2">
                      <div className="flex items-center gap-1.5 bg-[#f9f9fc] p-2 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span className="truncate">
                          <strong>Peak:</strong> {area.peakHours}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#f9f9fc] p-2 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">
                          <strong>Best Window:</strong> {area.bestTimeToVisit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPlanningAreas.length === 0 && (
                <div className="text-center py-10 text-xs text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                  No matching Singapore planning areas found for &ldquo;{planningSearch}&rdquo;.
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* SUB-VIEW 2: ATTRACTION CROWD RADAR                                      */}
          {/* ----------------------------------------------------------------------- */}
          {crowdViewMode === 'attractions' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Controls Bar */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#83439c]" /> Live Attraction & Venue Crowd Radar
                    </h3>
                    <p className="text-[11px] text-[#747878]">Real-time queue estimates, foot traffic index & optimal windows</p>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={crowdSearch}
                      onChange={(e) => setCrowdSearch(e.target.value)}
                      placeholder="Search Gardens, Maxwell, USS..."
                      className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-[#83439c] w-full sm:w-56"
                    />
                  </div>
                </div>

                {/* Category Filter Chips */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                  {['All', 'Attractions', 'Hawker & Food', 'MRT & Hubs', 'Shopping Belts'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCrowdCategory(cat)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                        crowdCategory === cat
                          ? 'bg-[#83439c] text-white shadow-xs'
                          : 'bg-white text-[#444748] border border-[#c4c7c8]/50 hover:bg-[#f3f3f6]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crowd List */}
              <div className="space-y-3">
                {filteredCrowds.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs space-y-3 hover:border-[#83439c]/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#1a1c1e]">{item.name}</h4>
                          <span className="text-[10px] text-[#747878] font-medium bg-[#f3f3f6] px-2 py-0.5 rounded-full">
                            {item.area}
                          </span>
                        </div>
                        <p className="text-xs text-[#444748] mt-0.5 leading-snug">{item.statusText}</p>
                      </div>

                      <div className="flex flex-col items-end flex-shrink-0">
                        {getCrowdLevelBadge(item.crowdLevel)}
                        <span className="text-[10px] text-gray-400 mt-1">{item.updateMinsAgo}m ago</span>
                      </div>
                    </div>

                    {/* Progress Bar & Wait Time */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#747878] text-[11px]">Crowd Density Meter</span>
                        <span className="font-bold text-[#1a1c1e]">
                          {item.waitTimeMinutes > 0 ? `~${item.waitTimeMinutes} mins wait` : 'Direct Entry / No Queue'}
                        </span>
                      </div>

                      {/* Meter Bar */}
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            item.crowdIndex > 75
                              ? 'bg-rose-500'
                              : item.crowdIndex > 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${item.crowdIndex}%` }}
                        />
                      </div>
                    </div>

                    {/* Visiting Advice Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-gray-100 text-[#444748]">
                      <div className="flex items-center gap-1.5 bg-[#f9f9fc] p-2 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span>
                          <strong>Peak Hours:</strong> {item.peakHours}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#f9f9fc] p-2 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>
                          <strong>Best Window:</strong> {item.bestTimeToVisit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredCrowds.length === 0 && (
                  <div className="text-center py-10 text-xs text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                    No matching Singapore locations found for &ldquo;{crowdSearch}&rdquo;.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* SUB-VIEW 3: ONEMAP GEOSPATIAL & ROUTING SUITE                           */}
          {/* ----------------------------------------------------------------------- */}
          {crowdViewMode === 'onemap-tools' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Tool 1: Geocoding & Search */}
              <div className="p-4 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#83439c]" />
                    1. OneMap Elastic Geocoding & Address Search
                  </h4>
                  <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    /api/common/elastic/search
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Query Singapore buildings, landmarks, or addresses to extract official postal codes, X/Y coordinate pairs, and coordinates.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={oneMapSearchVal}
                    onChange={(e) => setOneMapSearchVal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRunOneMapSearch()}
                    placeholder="Enter landmark e.g. Raffles Place, Marina Bay Sands, Maxwell..."
                    className="flex-1 px-3 py-2 text-xs bg-[#f9f9fc] rounded-xl border border-gray-300 focus:outline-none focus:border-[#83439c]"
                  />
                  <button
                    onClick={() => handleRunOneMapSearch()}
                    disabled={oneMapSearchLoading}
                    className="px-4 py-2 bg-[#83439c] text-white rounded-xl text-xs font-bold hover:bg-[#723887] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {oneMapSearchLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    Search
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-gray-400">Quick presets:</span>
                  {['Raffles Place', 'Marina Bay Sands', 'ION Orchard', 'Maxwell Food Centre', 'Changi Airport T3'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setOneMapSearchVal(preset);
                        handleRunOneMapSearch(preset);
                      }}
                      className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Search Results Display */}
                {oneMapSearchResults.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="text-[11px] font-bold text-gray-700">Results ({oneMapSearchResults.length}):</div>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                      {oneMapSearchResults.map((r, i) => (
                        <div key={i} className="p-2.5 bg-[#f9f9fc] rounded-xl border border-gray-200/70 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900">{r.BUILDING || r.SEARCHVAL}</span>
                            <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">
                              Postal {r.POSTAL || 'N/A'}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-500">{r.ADDRESS}</div>
                          <div className="text-[10px] text-gray-400 font-mono flex items-center gap-3">
                            <span>Lat: {r.LATITUDE || 'N/A'}</span>
                            <span>Lng: {r.LONGITUDE || 'N/A'}</span>
                            {r.ROAD_NAME && <span>Road: {r.ROAD_NAME}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tool 2: Reverse Geocoding */}
              <div className="p-4 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                    <LocateFixed className="w-4 h-4 text-[#83439c]" />
                    2. OneMap Reverse Geocoding Scanner
                  </h4>
                  <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    /api/public/revgeocode
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Resolve coordinates into exact Singapore building blocks, road names, and postal address.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-gray-500 font-medium block mb-1">Coordinates (lat,lng)</label>
                    <input
                      type="text"
                      value={oneMapRevLocation}
                      onChange={(e) => setOneMapRevLocation(e.target.value)}
                      placeholder="e.g. 1.2839,103.8515"
                      className="w-full px-3 py-2 text-xs bg-[#f9f9fc] rounded-xl border border-gray-300 focus:outline-none focus:border-[#83439c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-medium block mb-1">Buffer Radius (m)</label>
                    <input
                      type="text"
                      value={oneMapRevBuffer}
                      onChange={(e) => setOneMapRevBuffer(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#f9f9fc] rounded-xl border border-gray-300 focus:outline-none focus:border-[#83439c]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[
                      { name: 'Merlion Park', loc: '1.2868,103.8545' },
                      { name: 'Chinatown', loc: '1.2825,103.8431' },
                      { name: 'Orchard Turn', loc: '1.3040,103.8318' },
                    ].map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          setOneMapRevLocation(p.loc);
                          handleRunOneMapRevGeocode(p.loc);
                        }}
                        className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[10px] font-medium transition-colors cursor-pointer"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRunOneMapRevGeocode()}
                    disabled={oneMapRevLoading}
                    className="px-4 py-1.5 bg-[#83439c] text-white rounded-xl text-xs font-bold hover:bg-[#723887] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {oneMapRevLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3 h-3" />}
                    Scan Location
                  </button>
                </div>

                {oneMapRevData && (
                  <div className="p-3 bg-[#f9f9fc] rounded-xl border border-gray-200/70 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{oneMapRevData.BUILDINGNAME || oneMapRevData.BUILDING || 'Resolved Building'}</span>
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        Postal {oneMapRevData.POSTALCODE || oneMapRevData.POSTAL || '048618'}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Block {oneMapRevData.BLOCK || '-'}, {oneMapRevData.ROAD || oneMapRevData.ROADNAME || 'Road'}
                    </div>
                  </div>
                )}
              </div>

              {/* Tool 3: Routing & Crowd Exposure */}
              <div className="p-4 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                    <Route className="w-4 h-4 text-[#83439c]" />
                    3. OneMap Route Walking & Transit Density Estimator
                  </h4>
                  <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    /api/public/routingsvc/route
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Compute point-to-point walking, public transit, or driving corridors between Singapore landmarks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-500 font-medium block mb-1">Start Point (lat,lng)</label>
                    <input
                      type="text"
                      value={oneMapRouteStart}
                      onChange={(e) => setOneMapRouteStart(e.target.value)}
                      placeholder="1.2834,103.8607"
                      className="w-full px-3 py-2 text-xs bg-[#f9f9fc] rounded-xl border border-gray-300 focus:outline-none focus:border-[#83439c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-medium block mb-1">End Point (lat,lng)</label>
                    <input
                      type="text"
                      value={oneMapRouteEnd}
                      onChange={(e) => setOneMapRouteEnd(e.target.value)}
                      placeholder="1.2815,103.8636"
                      className="w-full px-3 py-2 text-xs bg-[#f9f9fc] rounded-xl border border-gray-300 focus:outline-none focus:border-[#83439c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-medium block mb-1">Route Mode</label>
                    <select
                      value={oneMapRouteType}
                      onChange={(e) => setOneMapRouteType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-[#f9f9fc] rounded-xl border border-gray-300 focus:outline-none focus:border-[#83439c]"
                    >
                      <option value="walk">Walk (Pedestrian)</option>
                      <option value="pt">Public Transit (MRT/Bus)</option>
                      <option value="drive">Drive</option>
                      <option value="cycle">Cycle</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[
                      { name: 'MBS to Gardens by Bay', start: '1.2834,103.8607', end: '1.2815,103.8636' },
                      { name: 'Raffles to Merlion', start: '1.2839,103.8515', end: '1.2868,103.8545' },
                    ].map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          setOneMapRouteStart(p.start);
                          setOneMapRouteEnd(p.end);
                          handleRunOneMapRoute(p.start, p.end);
                        }}
                        className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[10px] font-medium transition-colors cursor-pointer"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRunOneMapRoute()}
                    disabled={oneMapRouteLoading}
                    className="px-4 py-1.5 bg-[#83439c] text-white rounded-xl text-xs font-bold hover:bg-[#723887] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {oneMapRouteLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Route className="w-3 h-3" />}
                    Calculate Route
                  </button>
                </div>

                {oneMapRouteData && (
                  <div className="p-3 bg-[#f9f9fc] rounded-xl border border-gray-200/70 text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                      <div className="flex items-center gap-2">
                        <Footprints className="w-4 h-4 text-[#83439c]" />
                        <span className="font-bold text-gray-900">
                          {Math.round((oneMapRouteData.route_summary?.total_time || 360) / 60)} mins &bull; {oneMapRouteData.route_summary?.total_distance || 500}m
                        </span>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Low Obstruction Corridor
                      </span>
                    </div>

                    {oneMapRouteData.route_instructions && Array.isArray(oneMapRouteData.route_instructions) && (
                      <div className="space-y-1.5 pt-1">
                        {oneMapRouteData.route_instructions.map((step: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-600">
                            <span className="w-4 h-4 rounded-full bg-[#83439c]/10 text-[#83439c] flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{Array.isArray(step) ? step[0] : typeof step === 'string' ? step : JSON.stringify(step)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LIVE CARPARK LOT AVAILABILITY SECTION                                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'carpark' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Carpark Controls */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#83439c]" /> Live Singapore Carpark Lot Tracker
                </h3>
                <p className="text-[11px] text-[#747878]">
                  Real-time LTA DataMall v2 + HDB parking availability, hourly rates & MRT transit links
                </p>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={carparkSearch}
                  onChange={(e) => setCarparkSearch(e.target.value)}
                  placeholder="Search MBS, ION, VivoCity, Jewel..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-[#83439c] w-full sm:w-56"
                />
              </div>
            </div>

            {/* Live Telemetry Source Badge */}
            <div className="flex items-center gap-2 text-[11px] bg-purple-50 text-purple-900 border border-purple-200/60 p-2 rounded-xl">
              <Radio className="w-3.5 h-3.5 text-[#83439c] animate-pulse flex-shrink-0" />
              <span>
                <strong>LTA DataMall & HDB Feed:</strong> Live parking lot availability with 1-min automatic refresh across Singapore commercial hubs & shopping belts.
              </span>
            </div>

            {/* Zone Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
              {['All', 'Marina Bay & CBD', 'Orchard Road', 'Sentosa & HarbourFront', 'Civic & Bugis', 'East & Changi'].map(
                (zone) => (
                  <button
                    key={zone}
                    onClick={() => setCarparkZone(zone)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                      carparkZone === zone
                        ? 'bg-[#83439c] text-white shadow-xs'
                        : 'bg-white text-[#444748] border border-[#c4c7c8]/50 hover:bg-[#f3f3f6]'
                    }`}
                  >
                    {zone}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Carpark Cards */}
          <div className="space-y-3">
            {filteredCarparks.map((cp) => (
              <div
                key={cp.id}
                className="p-4 bg-white rounded-2xl border border-[#c4c7c8]/50 shadow-xs space-y-3 hover:border-[#83439c]/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1a1c1e]">{cp.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#747878] mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#83439c]" /> {cp.area}
                      </span>
                      <span>•</span>
                      <span>Updated {cp.lastUpdated}</span>
                    </div>
                  </div>

                  <div>{getCarparkStatusBadge(cp.status, cp.availableLots, cp.totalLots)}</div>
                </div>

                {/* Available Lots Counter & Gauge */}
                <div className="bg-[#f9f9fc] p-3 rounded-xl border border-gray-200/70 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                      Available Parking Lots
                    </div>
                    <div className="text-xl font-black text-[#1a1c1e] flex items-baseline gap-1.5 mt-0.5">
                      <span className={cp.availableLots < 20 ? 'text-rose-600' : 'text-emerald-700'}>
                        {cp.availableLots}
                      </span>
                      <span className="text-xs font-normal text-gray-500">/ {cp.totalLots} total lots</span>
                    </div>
                  </div>

                  <div className="w-36 space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                      <span>Occupancy</span>
                      <span>{Math.round(((cp.totalLots - cp.availableLots) / cp.totalLots) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          cp.availableLots < 30 ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{
                          width: `${Math.round(((cp.totalLots - cp.availableLots) / cp.totalLots) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Rates & Transit Link */}
                <div className="space-y-1.5 text-[11px] text-[#444748]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-white p-2 rounded-lg border border-gray-100">
                    <div>
                      <strong className="text-gray-900">Weekday:</strong> {cp.rates.weekday}
                    </div>
                    <div>
                      <strong className="text-gray-900">Weekend:</strong> {cp.rates.weekend}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-indigo-900 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 font-medium">
                    <Train className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span className="truncate">
                      <strong>Public Transit Alternative:</strong> {cp.mrtAlternative}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredCarparks.length === 0 && (
              <div className="text-center py-10 text-xs text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                No carparks found matching &ldquo;{carparkSearch}&rdquo;.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
