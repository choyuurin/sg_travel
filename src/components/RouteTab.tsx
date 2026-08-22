import React, { useState, useEffect } from 'react';
import {
  TrainFront,
  MapPin,
  Bus,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Accessibility,
  Navigation,
} from 'lucide-react';
import { OneMapTransitRouter } from './OneMapTransitRouter';

interface RouteTabProps {
  initialDestinationStation?: string;
}

interface BusArrivalService {
  ServiceNo: string;
  Operator: string;
  NextBus?: {
    EstimatedArrival: string;
    Load: 'SEA' | 'SDA' | 'LSD' | string;
    Feature: string;
    Type: 'SD' | 'DD' | 'BD' | string;
  };
  NextBus2?: {
    EstimatedArrival: string;
    Load: 'SEA' | 'SDA' | 'LSD' | string;
    Feature: string;
    Type: 'SD' | 'DD' | 'BD' | string;
  };
  NextBus3?: {
    EstimatedArrival: string;
    Load: 'SEA' | 'SDA' | 'LSD' | string;
    Feature: string;
    Type: 'SD' | 'DD' | 'BD' | string;
  };
}

interface TrafficIncident {
  Type: string;
  Latitude: number;
  Longitude: number;
  Message: string;
}

export const RouteTab: React.FC<RouteTabProps> = () => {
  // Sub-Navigation within Route tab (Public Transportation vs Live Bus Arrival vs Traffic Incidents)
  const [routeMode, setRouteMode] = useState<'transit' | 'bus' | 'traffic'>('transit');

  // LTA Train Service Alert State
  const [trainAlertStatus, setTrainAlertStatus] = useState<'Normal' | 'Disrupted'>('Normal');
  const [trainAlertMsg, setTrainAlertMsg] = useState<string>(
    'All MRT & LRT lines (NSL, EWL, CCL, DTL, NEL, TEL) operating normally with regular 2–4 min headway.'
  );

  // LTA Live Bus Arrival (v3) State
  const [busStopCode, setBusStopCode] = useState<string>('83139'); // Default Changi Airport PTB2
  const [filterServiceNo, setFilterServiceNo] = useState<string>('');
  const [busStopName, setBusStopName] = useState<string>('Changi Airport PTB2 (Basement)');
  const [busStopRoad, setBusStopRoad] = useState<string>('PTB2 Basement');
  const [busServices, setBusServices] = useState<BusArrivalService[]>([]);
  const [isBusLoading, setIsBusLoading] = useState<boolean>(false);
  const [busLastSync, setBusLastSync] = useState<string>('Just now');
  const [busCountdown, setBusCountdown] = useState<number>(20);

  // LTA Traffic Incidents State
  const [trafficIncidents, setTrafficIncidents] = useState<TrafficIncident[]>([]);
  const [isTrafficLoading, setIsTrafficLoading] = useState<boolean>(false);

  // Popular Bus Stops in Singapore
  const POPULAR_BUS_STOPS = [
    { code: '83139', name: 'Changi Airport PTB2', road: 'PTB2 Basement', area: 'Changi' },
    { code: '03211', name: 'Marina Bay Sands Hotel', road: 'Bayfront Ave', area: 'Marina Bay' },
    { code: '09048', name: 'Lucky Plaza / Orchard MRT', road: 'Orchard Rd', area: 'Orchard' },
    { code: '08057', name: 'Chinatown Stn Exit E', road: 'Eu Tong Sen St', area: 'Chinatown' },
    { code: '01012', name: 'Bugis Stn / Parkview Square', road: 'Victoria St', area: 'Bugis' },
    { code: '14119', name: 'VivoCity / HarbourFront', road: 'Telok Blangah Rd', area: 'South' },
    { code: '03071', name: 'Opp Clarke Quay Station', road: 'Eu Tong Sen St', area: 'Clarke Quay' },
  ];

  // Fetch LTA Train Alerts
  const fetchTrainAlerts = async () => {
    try {
      const res = await fetch('/api/lta/train-alerts');
      const data = await res.json();
      if (data.status) {
        setTrainAlertStatus(data.status);
        if (data.message) setTrainAlertMsg(data.message);
      }
    } catch (e) {
      // keep fallback
    }
  };

  // Fetch LTA Bus Arrival v3
  const fetchBusArrivals = async (code: string, svc?: string) => {
    setIsBusLoading(true);
    try {
      const query = new URLSearchParams({ BusStopCode: code });
      if (svc && svc.trim()) {
        query.set('ServiceNo', svc.trim());
      }
      const res = await fetch(`/api/lta/bus-arrival?${query.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.services)) {
        setBusServices(data.services);
        if (data.busStopName) setBusStopName(data.busStopName);
        if (data.busStopRoad) setBusStopRoad(data.busStopRoad);
        setBusLastSync(new Date().toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setBusCountdown(20);
      }
    } catch (e) {
      console.warn('Error fetching LTA bus arrival:', e);
    } finally {
      setIsBusLoading(false);
    }
  };

  // Fetch LTA Traffic Incidents
  const fetchTrafficIncidents = async () => {
    setIsTrafficLoading(true);
    try {
      const res = await fetch('/api/lta/traffic-incidents');
      const data = await res.json();
      if (data.success && Array.isArray(data.incidents)) {
        setTrafficIncidents(data.incidents);
      }
    } catch (e) {
      console.warn('Error fetching LTA traffic incidents:', e);
    } finally {
      setIsTrafficLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainAlerts();
    fetchBusArrivals(busStopCode, filterServiceNo);
    fetchTrafficIncidents();
  }, []);

  // 20-second countdown ticker for bus arrivals
  useEffect(() => {
    const timer = setInterval(() => {
      setBusCountdown((prev) => {
        if (prev <= 1) {
          fetchBusArrivals(busStopCode, filterServiceNo);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [busStopCode, filterServiceNo]);

  // Calculate arrival minutes from ISO date
  const calculateArrivalMinutes = (isoString?: string): { text: string; isArriving: boolean; rawMinutes: number } => {
    if (!isoString) return { text: '—', isArriving: false, rawMinutes: 999 };
    const diffMs = new Date(isoString).getTime() - Date.now();
    const mins = Math.round(diffMs / 60000);
    if (mins <= 1) return { text: 'Arr', isArriving: true, rawMinutes: mins };
    return { text: `${mins} min`, isArriving: false, rawMinutes: mins };
  };

  // Helper for LTA Bus Load badge
  const getLoadBadge = (load?: string) => {
    switch (load) {
      case 'SEA':
        return (
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Seats Avail
          </span>
        );
      case 'SDA':
        return (
          <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Standing
          </span>
        );
      case 'LSD':
        return (
          <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Limited Standing
          </span>
        );
      default:
        return (
          <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
            Normal
          </span>
        );
    }
  };

  // Helper for Bus Deck type
  const getBusTypeLabel = (type?: string) => {
    switch (type) {
      case 'DD':
        return 'Double Deck (DD)';
      case 'BD':
        return 'Bendy Bus (BD)';
      default:
        return 'Single Deck (SD)';
    }
  };

  return (
    <div id="route-tab-view" className="space-y-4 px-4 pb-28 pt-2">
      {/* LTA Live Train Alerts Banner */}
      <div
        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 shadow-xs transition-all ${
          trainAlertStatus === 'Normal'
            ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-950'
            : 'bg-rose-50 border-rose-200 text-rose-950 animate-pulse'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              trainAlertStatus === 'Normal' ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-white'
            }`}
          >
            <TrainFront className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">LTA MRT Network Status:</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  trainAlertStatus === 'Normal'
                    ? 'bg-emerald-200/60 text-emerald-900'
                    : 'bg-rose-200 text-rose-900'
                }`}
              >
                {trainAlertStatus === 'Normal' ? '● Normal Operations' : '⚠️ Service Alert'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800/90 truncate mt-0.5">{trainAlertMsg}</p>
          </div>
        </div>

        <button
          onClick={fetchTrainAlerts}
          title="Refresh Train Status from LTA DataMall"
          className="p-1.5 rounded-lg bg-white/60 hover:bg-white text-emerald-800 text-xs font-medium cursor-pointer border border-emerald-200/60 flex-shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Route Sub-Navigation Pills (Public Transportation / Bus Arrival v3 / Traffic Incidents) */}
      <div className="flex bg-[#f3f3f6] p-1 rounded-xl gap-1 overflow-x-auto">
        <button
          onClick={() => setRouteMode('transit')}
          className={`flex-1 min-w-[140px] py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            routeMode === 'transit'
              ? 'bg-gradient-to-r from-[#83439c] to-[#5d2572] text-white shadow-xs'
              : 'text-[#444748] hover:text-[#1a1c1e]'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" /> Public Transportation
        </button>

        <button
          onClick={() => setRouteMode('bus')}
          className={`flex-1 min-w-[110px] py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            routeMode === 'bus'
              ? 'bg-white text-[#83439c] shadow-xs'
              : 'text-[#444748] hover:text-[#1a1c1e]'
          }`}
        >
          <Bus className="w-3.5 h-3.5" /> Next Bus (v3)
        </button>

        <button
          onClick={() => setRouteMode('traffic')}
          className={`flex-1 min-w-[80px] py-1.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            routeMode === 'traffic'
              ? 'bg-white text-[#83439c] shadow-xs'
              : 'text-[#444748] hover:text-[#1a1c1e]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" /> Traffic
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 0: PUBLIC TRANSPORTATION MULTI-MODAL ROUTER                          */}
      {/* ========================================================================= */}
      {routeMode === 'transit' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <OneMapTransitRouter />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: LTA LIVE NEXT BUS ARRIVAL (v3)                                     */}
      {/* ========================================================================= */}
      {routeMode === 'bus' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Bus Stop Selector Header */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#c4c7c8]/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                  <Bus className="w-4 h-4 text-[#83439c]" /> LTA Next Bus Arrival (v3)
                </h3>
                <p className="text-[11px] text-[#747878] mt-0.5">
                  Live arrival countdowns, vehicle crowd loads, and accessibility
                </p>
              </div>

              {/* 20-sec refresh ticker */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full font-semibold">
                  ↻ {busCountdown}s
                </span>
                <button
                  onClick={() => fetchBusArrivals(busStopCode, filterServiceNo)}
                  disabled={isBusLoading}
                  className="p-1.5 bg-[#f3f3f6] hover:bg-[#83439c] hover:text-white rounded-lg transition-colors cursor-pointer text-gray-700"
                  title="Manual refresh"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBusLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Custom Bus Stop Code Input & Service Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] font-bold text-[#747878] uppercase block mb-1">
                  5-Digit Bus Stop Code
                </label>
                <div className="flex items-center bg-[#f9f9fc] rounded-xl border border-gray-200 px-3 py-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#83439c] mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={busStopCode}
                    onChange={(e) => setBusStopCode(e.target.value)}
                    placeholder="e.g. 83139, 03211, 09048..."
                    className="w-full bg-transparent outline-none text-xs font-semibold text-[#1a1c1e]"
                  />
                  <button
                    onClick={() => fetchBusArrivals(busStopCode, filterServiceNo)}
                    className="text-[10px] bg-[#83439c] text-white px-2 py-1 rounded-md font-bold cursor-pointer ml-1"
                  >
                    Go
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#747878] uppercase block mb-1">
                  Filter Specific Service (Optional)
                </label>
                <div className="flex items-center bg-[#f9f9fc] rounded-xl border border-gray-200 px-3 py-1.5">
                  <Bus className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={filterServiceNo}
                    onChange={(e) => setFilterServiceNo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchBusArrivals(busStopCode, filterServiceNo)}
                    placeholder="e.g. 15, 36, 65..."
                    className="w-full bg-transparent outline-none text-xs font-semibold text-[#1a1c1e]"
                  />
                </div>
              </div>
            </div>

            {/* Popular Stop Presets */}
            <div>
              <span className="text-[10px] font-semibold text-[#747878] uppercase block mb-1.5">
                Popular Tourist Bus Stops:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_BUS_STOPS.map((st) => (
                  <button
                    key={st.code}
                    onClick={() => {
                      setBusStopCode(st.code);
                      setBusStopName(st.name);
                      setBusStopRoad(st.road);
                      fetchBusArrivals(st.code, filterServiceNo);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      busStopCode === st.code
                        ? 'bg-[#83439c] text-white font-bold'
                        : 'bg-gray-100 text-gray-700 hover:bg-[#f9d8ff] hover:text-[#6c2c85]'
                    }`}
                  >
                    {st.name} ({st.code})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Stop Title Card */}
          <div className="bg-[#f9f9fc] p-3.5 rounded-2xl border border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#83439c] uppercase">Selected Bus Stop</div>
              <h4 className="text-sm font-extrabold text-[#1a1c1e] mt-0.5">{busStopName}</h4>
              <p className="text-xs text-[#747878]">{busStopRoad} • Stop #{busStopCode}</p>
            </div>
            <div className="text-right text-[11px] text-gray-500">
              <span>Synced {busLastSync}</span>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                {busServices.length} Services Active
              </div>
            </div>
          </div>

          {/* Bus Services Arrival Cards */}
          <div className="space-y-2.5">
            {busServices.map((svc) => {
              const b1 = calculateArrivalMinutes(svc.NextBus?.EstimatedArrival);
              const b2 = calculateArrivalMinutes(svc.NextBus2?.EstimatedArrival);
              const b3 = calculateArrivalMinutes(svc.NextBus3?.EstimatedArrival);

              return (
                <div
                  key={svc.ServiceNo}
                  className="bg-white p-3.5 rounded-2xl border border-[#c4c7c8]/50 shadow-xs hover:border-[#83439c]/50 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-9 rounded-xl bg-gradient-to-br from-[#83439c] to-[#5d2572] text-white font-black text-base flex items-center justify-center shadow-xs">
                        {svc.ServiceNo}
                      </div>
                      <div>
                        <div className="text-[10px] text-[#747878] font-bold uppercase">
                          {svc.Operator}
                        </div>
                        <div className="text-xs font-semibold text-[#1a1c1e]">
                          {getBusTypeLabel(svc.NextBus?.Type)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {svc.NextBus?.Feature === 'WAB' && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5" title="Wheelchair Accessible Bus">
                          <Accessibility className="w-3 h-3" /> WAB
                        </span>
                      )}
                      {getLoadBadge(svc.NextBus?.Load)}
                    </div>
                  </div>

                  {/* 3 Sequential Arrivals */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100 text-center">
                    <div className="bg-[#f9f9fc] p-2 rounded-xl border border-gray-100">
                      <div className="text-[10px] text-gray-500 font-medium">Next Bus</div>
                      <div className={`text-sm font-black mt-0.5 ${b1.isArriving ? 'text-emerald-700 animate-pulse' : 'text-[#1a1c1e]'}`}>
                        {b1.text}
                      </div>
                    </div>

                    <div className="bg-[#f9f9fc] p-2 rounded-xl border border-gray-100">
                      <div className="text-[10px] text-gray-500 font-medium">2nd Bus</div>
                      <div className="text-sm font-bold text-gray-700 mt-0.5">{b2.text}</div>
                    </div>

                    <div className="bg-[#f9f9fc] p-2 rounded-xl border border-gray-100">
                      <div className="text-[10px] text-gray-500 font-medium">3rd Bus</div>
                      <div className="text-sm font-bold text-gray-700 mt-0.5">{b3.text}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {busServices.length === 0 && !isBusLoading && (
              <div className="text-center py-10 text-xs text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                No active bus arrivals found for Stop #{busStopCode}. Check the 5-digit stop code.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: LTA LIVE TRAFFIC INCIDENTS & EXPRESSWAYS                          */}
      {/* ========================================================================= */}
      {routeMode === 'traffic' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#c4c7c8]/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1a1c1e] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> LTA Live Traffic Incidents
                </h3>
                <p className="text-[11px] text-[#747878] mt-0.5">
                  Roadworks, expressway accidents & taxi congestion telemetry
                </p>
              </div>

              <button
                onClick={fetchTrafficIncidents}
                disabled={isTrafficLoading}
                className="p-1.5 bg-[#f3f3f6] hover:bg-gray-200 rounded-lg text-xs transition-colors cursor-pointer text-gray-700"
                title="Refresh traffic notices"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTrafficLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-2.5">
              {trafficIncidents.map((inc, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-amber-200/70 bg-amber-50/50 space-y-1.5 text-xs text-[#1a1c1e]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> {inc.Type}
                    </span>
                    <span className="text-[10px] text-amber-800 font-medium">LTA Expressway Sensor</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed text-[11px]">{inc.Message}</p>
                </div>
              ))}

              {trafficIncidents.length === 0 && !isTrafficLoading && (
                <div className="text-center py-8 text-xs text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  All major expressways (ECP, PIE, CTE, AYE, MCE) are running smoothly with no major incidents reported.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
