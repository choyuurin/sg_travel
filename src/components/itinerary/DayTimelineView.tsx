import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  TrainFront,
  DollarSign,
  CheckCircle2,
  Circle,
  MoreVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit3,
  ExternalLink,
  Footprints,
  Train,
  Car,
  Plus,
  StickyNote,
} from 'lucide-react';
import { ItineraryDay, ItineraryStop } from '../../types';

interface DayTimelineViewProps {
  day: ItineraryDay;
  totalDays: number;
  onToggleComplete: (stopId: string) => void;
  onMoveStop: (stopIndex: number, direction: 'up' | 'down') => void;
  onDeleteStop: (stopId: string) => void;
  onMoveStopToDay: (stopId: string, targetDayNumber: number) => void;
  onUpdateStopNotes: (stopId: string, notes: string) => void;
  onOpenAddModal: () => void;
  onSelectAttraction?: (attractionId: string) => void;
  onOpenRoutePlanner?: (destinationStation: string) => void;
}

export const DayTimelineView: React.FC<DayTimelineViewProps> = ({
  day,
  totalDays,
  onToggleComplete,
  onMoveStop,
  onDeleteStop,
  onMoveStopToDay,
  onUpdateStopNotes,
  onOpenAddModal,
  onSelectAttraction,
  onOpenRoutePlanner,
}) => {
  const [editingNoteStopId, setEditingNoteStopId] = useState<string | null>(null);
  const [noteInputValue, setNoteInputValue] = useState('');
  const [activeMenuStopId, setActiveMenuStopId] = useState<string | null>(null);

  const startEditNote = (stop: ItineraryStop) => {
    setEditingNoteStopId(stop.id);
    setNoteInputValue(stop.notes || '');
    setActiveMenuStopId(null);
  };

  const saveEditNote = (stopId: string) => {
    onUpdateStopNotes(stopId, noteInputValue);
    setEditingNoteStopId(null);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Food & Drinks':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Sightseeing':
        return 'bg-purple-100 text-[#83439c] border-purple-200';
      case 'Culture & Heritage':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Nature & Parks':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Entertainment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shopping':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Day Overview Banner */}
      <div className="p-3.5 bg-gradient-to-r from-[#f7effa] to-[#ede3f5] border border-[#e4d0f0] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#83439c] text-white">
              Day {day.dayNumber}
            </span>
            <h3 className="text-sm font-bold text-gray-900">{day.title}</h3>
          </div>
          {day.weatherAdvice && (
            <p className="text-[11px] text-gray-600 mt-1 flex items-center gap-1">
              <span>🌤️</span>
              <span>{day.weatherAdvice}</span>
            </p>
          )}
        </div>

        <button
          onClick={onOpenAddModal}
          className="self-start sm:self-auto flex items-center gap-1.5 bg-[#83439c] hover:bg-[#6c2c85] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Stop</span>
        </button>
      </div>

      {/* Stops Timeline */}
      {day.stops.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#faf5fc] text-[#83439c] flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">No stops added yet for Day {day.dayNumber}</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Start planning your day by adding places from the catalog or creating a custom activity.
            </p>
          </div>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 bg-[#83439c] hover:bg-[#6c2c85] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Your First Stop</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:top-4 before:bottom-4 before:left-[17px] before:w-0.5 before:bg-gray-200">
          {day.stops.map((stop, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === day.stops.length - 1;

            return (
              <div key={stop.id} className="relative pl-10 group">
                {/* Timeline node icon */}
                <button
                  onClick={() => onToggleComplete(stop.id)}
                  title={stop.isCompleted ? 'Mark unvisited' : 'Mark as visited'}
                  className={`absolute left-0 top-3 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 cursor-pointer shadow-xs ${
                    stop.isCompleted
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-white text-gray-400 border-2 border-gray-300 hover:border-[#83439c] hover:text-[#83439c]'
                  }`}
                >
                  {stop.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="text-[11px] font-bold text-gray-700">{idx + 1}</span>
                  )}
                </button>

                {/* Stop Card */}
                <div
                  className={`bg-white border rounded-2xl p-3.5 shadow-2xs transition-all hover:shadow-xs ${
                    stop.isCompleted
                      ? 'border-emerald-200 bg-emerald-50/20 opacity-80'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(
                            stop.category
                          )}`}
                        >
                          {stop.category}
                        </span>
                        <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" /> {stop.timeSlot}
                        </span>
                        <span className="text-[11px] text-gray-500">({stop.duration})</span>
                      </div>

                      <h4
                        className={`text-sm font-bold text-gray-900 mt-1 ${
                          stop.isCompleted ? 'line-through text-gray-500' : ''
                        }`}
                      >
                        {stop.title}
                      </h4>

                      {/* Location & MRT Station tag */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-gray-600">
                        {stop.nearestMrt && (
                          <div className="flex items-center gap-1 font-medium text-[#83439c]">
                            <TrainFront className="w-3.5 h-3.5" />
                            <span>{stop.nearestMrt}</span>
                            {onOpenRoutePlanner && (
                              <button
                                onClick={() =>
                                  onOpenRoutePlanner(
                                    stop.nearestMrt?.split('(')[0].trim() || 'Bayfront'
                                  )
                                }
                                className="underline hover:text-[#6c2c85] ml-0.5 cursor-pointer text-[10px]"
                              >
                                [Route]
                              </button>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-1 font-bold text-emerald-800">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{stop.costSgd === 0 ? 'Free' : `S$ ${stop.costSgd}`}</span>
                        </div>

                        {stop.placeId && onSelectAttraction && (
                          <button
                            onClick={() => onSelectAttraction(stop.placeId!)}
                            className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 font-medium cursor-pointer"
                          >
                            <span>View Guide</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>

                      {/* Notes / Tips area */}
                      {editingNoteStopId === stop.id ? (
                        <div className="mt-2.5 space-y-1.5">
                          <textarea
                            value={noteInputValue}
                            onChange={(e) => setNoteInputValue(e.target.value)}
                            placeholder="Add your notes, confirmation numbers, food recommendations..."
                            rows={2}
                            className="w-full text-xs p-2 rounded-lg border border-[#83439c]/40 focus:outline-none focus:ring-2 focus:ring-[#83439c]/30 text-gray-800"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setEditingNoteStopId(null)}
                              className="text-[11px] text-gray-500 hover:text-gray-700 px-2 py-1 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveEditNote(stop.id)}
                              className="text-[11px] bg-[#83439c] text-white font-bold px-3 py-1 rounded-md cursor-pointer hover:bg-[#6c2c85]"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      ) : stop.notes ? (
                        <div
                          onClick={() => startEditNote(stop)}
                          className="mt-2 p-2 bg-amber-50/70 border border-amber-200/70 rounded-xl text-[11px] text-amber-950 flex items-start gap-1.5 cursor-pointer hover:bg-amber-100/70 transition-colors group/note"
                        >
                          <StickyNote className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span className="flex-1">{stop.notes}</span>
                          <Edit3 className="w-3 h-3 text-amber-500 opacity-0 group-hover/note:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditNote(stop)}
                          className="mt-1.5 text-[10px] text-gray-400 hover:text-[#83439c] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add note or reminder</span>
                        </button>
                      )}
                    </div>

                    {/* Action buttons: Reorder, Move Day, Delete */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                        <button
                          disabled={isFirst}
                          onClick={() => onMoveStop(idx, 'up')}
                          title="Move Up"
                          className="p-1 rounded text-gray-500 hover:text-gray-900 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-200 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={isLast}
                          onClick={() => onMoveStop(idx, 'down')}
                          title="Move Down"
                          className="p-1 rounded text-gray-500 hover:text-gray-900 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-200 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            setActiveMenuStopId(activeMenuStopId === stop.id ? null : stop.id)
                          }
                          className="p-1 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-200 cursor-pointer relative"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Dropdown Menu for Stop */}
                      {activeMenuStopId === stop.id && (
                        <div className="absolute right-4 top-10 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                          <button
                            onClick={() => startEditNote(stop)}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-lg text-left cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                            <span>Edit Note</span>
                          </button>

                          {totalDays > 1 && (
                            <div className="border-t border-gray-100 my-1 pt-1">
                              <span className="px-2.5 text-[10px] font-bold text-gray-400 uppercase">
                                Move to Day:
                              </span>
                              <div className="flex flex-wrap gap-1 px-2 pt-1 pb-1">
                                {Array.from({ length: totalDays }).map((_, dIdx) => {
                                  const targetDay = dIdx + 1;
                                  if (targetDay === day.dayNumber) return null;
                                  return (
                                    <button
                                      key={targetDay}
                                      onClick={() => {
                                        onMoveStopToDay(stop.id, targetDay);
                                        setActiveMenuStopId(null);
                                      }}
                                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 hover:bg-[#83439c] hover:text-white cursor-pointer transition-colors"
                                    >
                                      Day {targetDay}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          <div className="border-t border-gray-100 my-1" />
                          <button
                            onClick={() => {
                              onDeleteStop(stop.id);
                              setActiveMenuStopId(null);
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg text-left cursor-pointer font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Stop</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transit Connector to Next Stop */}
                {!isLast && (
                  <div className="my-2 ml-1 flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50/90 border border-gray-200/80 px-3 py-1.5 rounded-xl">
                    {stop.transitToNext?.type === 'walk' ? (
                      <Footprints className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    ) : stop.transitToNext?.type === 'taxi' ? (
                      <Car className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    ) : (
                      <Train className="w-3.5 h-3.5 text-[#83439c] flex-shrink-0" />
                    )}
                    <span className="font-semibold text-gray-700">
                      {stop.transitToNext?.duration || '10 mins'}:
                    </span>
                    <span className="truncate flex-1">
                      {stop.transitToNext?.instruction ||
                        'Continue to next destination via MRT / Walk'}
                    </span>
                    {stop.transitToNext?.fareSgd && stop.transitToNext.fareSgd > 0 && (
                      <span className="text-[10px] font-bold text-gray-600 bg-gray-200/70 px-1.5 py-0.5 rounded">
                        S${stop.transitToNext.fareSgd}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
