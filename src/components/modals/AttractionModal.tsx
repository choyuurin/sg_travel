import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Ticket,
  Navigation,
  Heart,
  Share2,
  Check,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Sun,
  CloudRain,
  Camera,
  ChevronDown,
  ChevronUp,
  Flame,
  Zap,
  Info,
  QrCode,
  ArrowRight,
  RefreshCw,
  Gift,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Attraction, TicketTier, BundleOffer } from '../../types';

interface AttractionModalProps {
  attraction: Attraction | null;
  onClose: () => void;
  onPlanRouteTo: (attractionName: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const AttractionModal: React.FC<AttractionModalProps> = ({
  attraction,
  onClose,
  onPlanRouteTo,
  savedIds,
  onToggleSave,
}) => {
  const [copied, setCopied] = useState(false);
  const [weatherMode, setWeatherMode] = useState<'sunny' | 'rainy' | 'authentic'>('sunny');
  const [selectedTierId, setSelectedTierId] = useState<string | null>(() => {
    return attraction?.ticketTiers?.[0]?.id || null;
  });
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [openTermsSection, setOpenTermsSection] = useState<string | null>('cancellation');
  const [inlineErrorMessage, setInlineErrorMessage] = useState<string | null>(null);
  const [bookingCompleted, setBookingCompleted] = useState<boolean>(false);
  const [showDataSourceInfo, setShowDataSourceInfo] = useState<boolean>(false);

  if (!attraction) return null;

  const isSaved = savedIds.includes(attraction.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTier = attraction.ticketTiers?.find((t) => t.id === selectedTierId);
  const selectedBundle = attraction.bundleOffers?.find((b) => b.id === selectedBundleId);

  // Compute active price
  const currentPrice = selectedBundle
    ? selectedBundle.priceSgd * ticketQuantity
    : selectedTier
    ? selectedTier.priceSgd * ticketQuantity
    : 0;

  const handleSelectTier = (tier: TicketTier) => {
    if (tier.availabilityLevel === 'sold-out') {
      setInlineErrorMessage(`"${tier.name}" is currently sold out for today. Please select another pass.`);
      return;
    }
    setInlineErrorMessage(null);
    setSelectedBundleId(null);
    setSelectedTierId(tier.id);
    if (ticketQuantity > tier.remainingCount) {
      setTicketQuantity(Math.max(1, tier.remainingCount));
    }
  };

  const handleSelectBundle = (bundle: BundleOffer) => {
    setInlineErrorMessage(null);
    setSelectedTierId(null);
    setSelectedBundleId(bundle.id);
    if (ticketQuantity > bundle.remainingCount) {
      setTicketQuantity(Math.max(1, bundle.remainingCount));
    }
  };

  const handleIncrement = () => {
    const maxQuota = selectedBundle
      ? selectedBundle.remainingCount
      : selectedTier
      ? selectedTier.remainingCount
      : 10;
    if (ticketQuantity >= maxQuota) {
      setInlineErrorMessage(`Maximum available quota reached (${maxQuota} tickets remaining).`);
      return;
    }
    setInlineErrorMessage(null);
    setTicketQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    setInlineErrorMessage(null);
    setTicketQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleConfirmPass = () => {
    if (!selectedTier && !selectedBundle) {
      setInlineErrorMessage('Please tap a pass or bundle offer before proceeding.');
      return;
    }
    setInlineErrorMessage(null);
    setBookingCompleted(true);
  };

  // Determine current display image based on weather view mode
  const currentPhoto =
    weatherMode === 'rainy' && attraction.weatherPhotos?.rainy
      ? attraction.weatherPhotos.rainy
      : weatherMode === 'authentic' && attraction.weatherPhotos?.authenticReviewer
      ? attraction.weatherPhotos.authenticReviewer
      : attraction.weatherPhotos?.sunny || attraction.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="attraction-modal-content"
        className="bg-white w-full max-w-2xl md:rounded-3xl max-h-[96vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-150"
      >
        {/* Header Image & Controls */}
        <div className="relative h-60 md:h-72 w-full bg-gray-900 flex-shrink-0">
          <img
            src={currentPhoto}
            alt={attraction.name}
            className="w-full h-full object-cover brightness-90 transition-all duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Floating Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
              aria-label="Close attraction view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(attraction.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md cursor-pointer ${
                  isSaved
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-black/50 text-white hover:bg-black/80'
                }`}
                aria-label="Bookmark attraction"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
                aria-label="Share attraction link"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Weather & Authentic Photos View Switcher */}
          {attraction.weatherPhotos && (
            <div className="absolute top-16 left-4 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
              <button
                onClick={() => setWeatherMode('sunny')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  weatherMode === 'sunny'
                    ? 'bg-[#83439c] text-white shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Sunny
              </button>
              <button
                onClick={() => setWeatherMode('rainy')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  weatherMode === 'rainy'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" /> Rainy Cozy
              </button>
              <button
                onClick={() => setWeatherMode('authentic')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  weatherMode === 'authentic'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" /> Real Review
              </button>
            </div>
          )}

          {/* Title & Live Availability Badge on Hero */}
          <div className="absolute bottom-3 left-4 right-4 text-white z-10 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#83439c] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {attraction.category}
              </span>

              {/* Instant Live Availability Status Badge (Cluster 1 Requirement) */}
              {attraction.availabilityStatus === 'available' && (
                <span className="bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  <Zap className="w-3 h-3 fill-current" /> Live Availability: {attraction.remainingQuota} passes left
                </span>
              )}
              {attraction.availabilityStatus === 'limited' && (
                <span className="bg-amber-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  <Flame className="w-3 h-3 fill-current" /> Low Quota ({attraction.remainingQuota} remaining)
                </span>
              )}
              {attraction.availabilityStatus === 'free-entry' && (
                <span className="bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  <ShieldCheck className="w-3 h-3" /> Free Open Admission
                </span>
              )}

              <span className="text-[12px] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {attraction.rating} ({attraction.reviewsCount})
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-sm">{attraction.name}</h2>
          </div>
        </div>

        {/* Authentic Reviewer Context Banner */}
        {weatherMode === 'authentic' && attraction.weatherPhotos && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2.5 text-xs text-amber-900 animate-in fade-in">
            <Camera className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold">{attraction.weatherPhotos.reviewerName}:</span> "{attraction.weatherPhotos.reviewSnippet}"
            </div>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Booking Confirmation Receipt State if User Confirmed */}
          {bookingCompleted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-4 text-center animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900">Digital Pass Confirmed!</h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Your instant entry barcode has been generated. Simply tap or scan at turnstile entrance.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-emerald-100 flex flex-col items-center justify-center space-y-2">
                <div className="p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <QrCode className="w-28 h-28 text-gray-800" />
                </div>
                <div className="text-xs font-mono font-bold text-gray-700">SG-PASS-{attraction.id.toUpperCase().slice(0, 8)}-{Date.now().toString().slice(-4)}</div>
                <div className="text-[11px] text-gray-500">
                  {ticketQuantity}x {selectedBundle ? selectedBundle.title : selectedTier?.name} • Total ${currentPrice} SGD
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setBookingCompleted(false)}
                  className="flex-1 py-2.5 px-3 bg-white border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  Modify Pass
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onPlanRouteTo(attraction.nearestMrt.stationName);
                  }}
                  className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" /> Navigate via MRT
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Inline In-Place Error Notice (Cluster 1 Requirement) */}
              {inlineErrorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-900 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 font-medium">{inlineErrorMessage}</div>
                  <button
                    onClick={() => setInlineErrorMessage(null)}
                    className="text-rose-500 hover:text-rose-700 font-bold px-1"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#f9f9fc] p-3 rounded-2xl border border-gray-100 text-xs">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">MRT Station</div>
                  <div className="font-semibold text-gray-800 truncate">{attraction.nearestMrt.stationName}</div>
                  <div className="text-[10px] text-[#1b6d24] font-medium">{attraction.nearestMrt.walkMinutes} min walk</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Hours</div>
                  <div className="font-semibold text-gray-800 truncate">{attraction.openingHours.split('|')[0]}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Entry Window</div>
                  <div className="font-semibold text-emerald-700 truncate">{attraction.nextEntrySlot || 'Immediate'}</div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Weather Shield</div>
                  <div className="font-semibold text-gray-800">
                    {attraction.isIndoorWeatherProof ? '🌧️ 100% Indoor Biome' : '☀️ Open Skies'}
                  </div>
                </div>
              </div>

              {/* Section 1: Ticket-Type Chooser (Cluster 2 Requirement) */}
              {attraction.ticketTiers && attraction.ticketTiers.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-[#83439c]" /> Select Ticket Type
                    </h3>
                    <span className="text-[11px] text-gray-500 font-medium">All prices in SGD • No booking fee</span>
                  </div>

                  <div className="space-y-2.5">
                    {attraction.ticketTiers.map((tier) => {
                      const isSelected = selectedTierId === tier.id && !selectedBundleId;
                      const isSoldOut = tier.availabilityLevel === 'sold-out';

                      return (
                        <div
                          key={tier.id}
                          onClick={() => handleSelectTier(tier)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                            isSoldOut
                              ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#fcf5ff] border-[#83439c] shadow-xs ring-1 ring-[#83439c]'
                              : 'bg-white border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-gray-900">{tier.name}</span>
                                {tier.priceSgd === 0 ? (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                                    FREE
                                  </span>
                                ) : tier.remainingCount <= 10 ? (
                                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold flex items-center gap-1">
                                    <Flame className="w-3 h-3 text-amber-600" /> Only {tier.remainingCount} left
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> Instant QR
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-gray-600 leading-relaxed">{tier.description}</p>

                              {/* Plain Language Inclusions Checklist */}
                              <div className="pt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-700">
                                {tier.inclusions.map((inc, i) => (
                                  <div key={i} className="flex items-center gap-1">
                                    <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                                    <span>{inc}</span>
                                  </div>
                                ))}
                              </div>

                              {tier.qualificationNote && (
                                <div className="text-[10px] text-gray-500 italic pt-0.5">
                                  {tier.qualificationNote}
                                </div>
                              )}
                            </div>

                            {/* Price Block */}
                            <div className="text-right flex-shrink-0">
                              <div className="text-lg font-bold text-gray-900">
                                {tier.priceSgd === 0 ? 'Free' : `$${tier.priceSgd} SGD`}
                              </div>
                              {tier.originalPriceSgd && tier.originalPriceSgd > tier.priceSgd && (
                                <div className="text-xs text-gray-400 line-through">
                                  ${tier.originalPriceSgd} SGD
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Section 2: Offer & Bundle Deals Panel (Cluster 3 Requirement) */}
              {attraction.bundleOffers && attraction.bundleOffers.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-emerald-700" /> Curated Combo & Spontaneous Passes
                    </h3>
                    <span className="text-[11px] font-bold text-emerald-700">Save up to 25%</span>
                  </div>

                  <div className="space-y-3">
                    {attraction.bundleOffers.map((bundle) => {
                      const isSelected = selectedBundleId === bundle.id;

                      return (
                        <div
                          key={bundle.id}
                          onClick={() => handleSelectBundle(bundle)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50/50 border-emerald-600 ring-1 ring-emerald-600 shadow-xs'
                              : 'bg-white border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  {bundle.badge}
                                </span>
                                <span className="text-xs font-bold text-emerald-800">
                                  Save {bundle.discountPercent}% SGD
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-gray-900">{bundle.title}</h4>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-bold text-emerald-900">${bundle.priceSgd} SGD</div>
                              <div className="text-xs text-gray-400 line-through">${bundle.originalPriceSgd} SGD</div>
                            </div>
                          </div>

                          <p className="text-xs text-gray-600 mb-2.5 leading-relaxed">
                            {bundle.plainLanguageSummary}
                          </p>

                          {/* Plain Words Qualifying Conditions (Cluster 3 Core Mandate) */}
                          <div className="bg-white/80 p-2.5 rounded-xl border border-gray-100 space-y-1 text-[11px] text-gray-700">
                            <div className="font-semibold text-gray-800 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Qualifying Conditions & Guarantees:
                            </div>
                            <ul className="space-y-1 pl-4 list-disc marker:text-emerald-600 text-gray-600">
                              {bundle.qualifyingConditions.map((cond, ci) => (
                                <li key={ci}>{cond}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper if Pass is Paid */}
              {(selectedTier?.priceSgd ?? 0) > 0 || selectedBundle ? (
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-gray-900">Number of Travelers</div>
                    <div className="text-[11px] text-gray-500">Instant digital barcode delivered for each person</div>
                  </div>

                  <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-300">
                    <button
                      onClick={handleDecrement}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-gray-900 w-4 text-center">{ticketQuantity}</span>
                    <button
                      onClick={handleIncrement}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Section 3: Inline Terms & Policies Accordion (Cluster 1 Mandate: NO MODALS) */}
              {attraction.inlineTerms && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Inline Terms & Guarantees (No Pop-ups)
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    {/* Cancellation & Refund */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                      <button
                        onClick={() =>
                          setOpenTermsSection((prev) => (prev === 'cancellation' ? null : 'cancellation'))
                        }
                        className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 text-left font-semibold text-gray-800 flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cancellation & Refund Policy
                        </span>
                        {openTermsSection === 'cancellation' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {openTermsSection === 'cancellation' && (
                        <div className="p-3 bg-white text-gray-600 leading-relaxed border-t border-gray-200">
                          {attraction.inlineTerms.cancellation}
                        </div>
                      )}
                    </div>

                    {/* Rainy Day Guarantee */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                      <button
                        onClick={() =>
                          setOpenTermsSection((prev) => (prev === 'rain' ? null : 'rain'))
                        }
                        className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 text-left font-semibold text-gray-800 flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <CloudRain className="w-3.5 h-3.5 text-blue-600" /> Weather & Rainy Day Swap Guarantee
                        </span>
                        {openTermsSection === 'rain' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {openTermsSection === 'rain' && (
                        <div className="p-3 bg-white text-gray-600 leading-relaxed border-t border-gray-200">
                          {attraction.inlineTerms.rainyDayPolicy}
                        </div>
                      )}
                    </div>

                    {/* Entry & ID Requirements */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                      <button
                        onClick={() =>
                          setOpenTermsSection((prev) => (prev === 'entry' ? null : 'entry'))
                        }
                        className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 text-left font-semibold text-gray-800 flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <QrCode className="w-3.5 h-3.5 text-[#83439c]" /> Validity & Turnstile Entry Rules
                        </span>
                        {openTermsSection === 'entry' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {openTermsSection === 'entry' && (
                        <div className="p-3 bg-white text-gray-600 leading-relaxed border-t border-gray-200 space-y-1">
                          <p><strong>Validity:</strong> {attraction.inlineTerms.validity}</p>
                          <p><strong>Entry:</strong> {attraction.inlineTerms.entryRequirements}</p>
                          <p><strong>Age Policy:</strong> {attraction.inlineTerms.childSeniorPolicy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Overview & Highlights */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-gray-900">About this Experience</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{attraction.fullDescription}</p>

                <div className="flex flex-wrap gap-1.5">
                  {attraction.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="bg-[#f9d8ff]/50 text-[#6c2c85] text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#f9d8ff]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Feed & Model Transparency (Cluster 2 Requirement) */}
              {attraction.dataSources && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1.5">
                  <button
                    onClick={() => setShowDataSourceInfo((v) => !v)}
                    className="w-full flex items-center justify-between text-gray-700 font-bold cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#83439c]" /> Live API Feeds & Data Transparency
                    </span>
                    <span className="text-[10px] text-[#83439c] underline">
                      {showDataSourceInfo ? 'Hide breakdown' : 'View API vs Estimated'}
                    </span>
                  </button>

                  {showDataSourceInfo && (
                    <div className="space-y-1.5 pt-1.5 border-t border-gray-200 text-[11px] text-gray-600 animate-in fade-in">
                      <div>
                        <strong className="text-emerald-800">🟢 Live Official API Feeds:</strong>
                        <ul className="list-disc pl-4 space-y-0.5 text-gray-700 mt-0.5">
                          {attraction.dataSources.liveFeeds.map((feed, idx) => (
                            <li key={idx}>{feed}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-purple-800">🟣 Computed / Algorithmic Models:</strong>
                        <ul className="list-disc pl-4 space-y-0.5 text-gray-700 mt-0.5">
                          {attraction.dataSources.estimatedFeeds.map((feed, idx) => (
                            <li key={idx}>{feed}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Unmistakable Primary Action Footer (Cluster 1 Mandate) */}
        {!bookingCompleted && (
          <div className="p-3.5 md:p-4 bg-[#f9f9fc] border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div>
                <div className="text-[10px] text-gray-400 font-semibold uppercase">Total for {ticketQuantity} traveler{ticketQuantity > 1 ? 's' : ''}</div>
                <div className="text-xl font-bold text-gray-900">
                  {currentPrice === 0 ? 'Free Entry' : `$${currentPrice} SGD`}
                </div>
              </div>

              {/* MRT Route Preset Shortcut */}
              <button
                onClick={() => {
                  onClose();
                  onPlanRouteTo(attraction.nearestMrt.stationName);
                }}
                className="text-xs font-semibold text-[#83439c] hover:text-[#6c2c85] flex items-center gap-1 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" /> Directions
              </button>
            </div>

            <button
              onClick={handleConfirmPass}
              className="w-full sm:w-auto flex-1 bg-[#83439c] hover:bg-[#6c2c85] text-white font-bold py-3 px-6 rounded-2xl text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98]"
            >
              {currentPrice === 0 ? (
                <>
                  <Check className="w-4 h-4" /> Save Self-Guided Pass
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" /> Get Instant Digital QR Pass
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
