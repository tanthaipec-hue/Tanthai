import React from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';

interface WaterTrackerProps {
  waterMl: number;
  targetMl: number;
  onUpdateWater: (newAmount: number) => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  waterMl,
  targetMl,
  onUpdateWater,
}) => {
  const percent = Math.min(100, Math.round((waterMl / targetMl) * 100));

  const addWater = (amount: number) => {
    onUpdateWater(Math.max(0, waterMl + amount));
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 sm:p-5 mb-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
            <Droplet className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900">การดื่มน้ำประจำวัน (Hydration)</h3>
            <span className="text-[11px] text-stone-500">ช่วยในการเผาผลาญและระบบย่อยอาหาร</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm font-bold text-sky-900">{waterMl.toLocaleString()}</span>
          <span className="text-xs text-stone-400"> / {targetMl.toLocaleString()} ml</span>
          <span className="ml-1.5 text-xs font-semibold text-sky-600">({percent}%)</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden mb-3 border border-stone-200/50">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => addWater(-250)}
            disabled={waterMl <= 0}
            className="px-2.5 py-1 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg disabled:opacity-40 transition-colors flex items-center gap-1"
            title="ลด 250 มล."
          >
            <Minus className="w-3 h-3" />
            250 ml
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => addWater(250)}
            className="px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            +250 ml (1 แก้ว)
          </button>
          <button
            type="button"
            onClick={() => addWater(500)}
            className="px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            +500 ml (1 ขวด)
          </button>
        </div>
      </div>
    </div>
  );
};
