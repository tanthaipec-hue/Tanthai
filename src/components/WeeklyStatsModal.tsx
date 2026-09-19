import React from 'react';
import { X, BarChart2, TrendingDown, Flame, Utensils, Download, Award, CheckCircle } from 'lucide-react';
import { DayData, UserProfile } from '../types';
import { formatThaiDate, shiftDate, getTodayDateString, calculateBMR, calculateTDEE } from '../utils/calculations';

interface WeeklyStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allDaysData: Record<string, DayData>;
  userProfile: UserProfile;
}

export const WeeklyStatsModal: React.FC<WeeklyStatsModalProps> = ({
  isOpen,
  onClose,
  allDaysData,
  userProfile,
}) => {
  if (!isOpen) return null;

  const todayStr = getTodayDateString();
  const bmr = calculateBMR(userProfile);
  const tdee = calculateTDEE(bmr, userProfile.activityLevel);
  const targetCalories = userProfile.customTargetCalories || tdee;

  // Generate last 7 days
  const last7Days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    last7Days.push(shiftDate(todayStr, -i));
  }

  const daysSummary = last7Days.map((d) => {
    const dayData = allDaysData[d];
    const foodKcal = dayData ? dayData.foods.reduce((sum, f) => sum + f.calories, 0) : 0;
    const burnedKcal = dayData ? dayData.activities.reduce((sum, a) => sum + a.caloriesBurned, 0) : 0;
    const netKcal = foodKcal - burnedKcal;
    return {
      date: d,
      foodKcal,
      burnedKcal,
      netKcal,
    };
  });

  const totalFood = daysSummary.reduce((sum, d) => sum + d.foodKcal, 0);
  const totalBurned = daysSummary.reduce((sum, d) => sum + d.burnedKcal, 0);
  const activeDaysCount = daysSummary.filter((d) => d.foodKcal > 0 || d.burnedKcal > 0).length || 1;
  const avgFood = Math.round(totalFood / activeDaysCount);
  const avgBurned = Math.round(totalBurned / activeDaysCount);

  // Max value for bar scaling (minimum 2500 for good aspect)
  const maxVal = Math.max(
    ...daysSummary.map((d) => Math.max(d.foodKcal, d.burnedKcal, targetCalories)),
    2600
  );

  const handleExportData = () => {
    const payload = {
      userProfile,
      history: allDaysData,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calorie-energy-data-${todayStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-700" />
              ภาพรวมและสถิติ 7 วันย้อนหลัง
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              เปรียบเทียบแคลอรี่ที่ได้รับ vs พลังงานที่เผาผลาญ
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Summary Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl">
              <div className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                เฉลี่ยอาหาร/วัน
              </div>
              <div className="text-xl font-bold text-amber-900 mt-1">
                {avgFood.toLocaleString()} <span className="text-xs font-normal text-stone-500">kcal</span>
              </div>
            </div>

            <div className="p-3 bg-teal-50/60 border border-teal-200/70 rounded-xl">
              <div className="text-[11px] font-semibold text-teal-800 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-teal-600 fill-current" />
                เฉลี่ยเผาผลาญ/วัน
              </div>
              <div className="text-xl font-bold text-teal-900 mt-1">
                {avgBurned.toLocaleString()} <span className="text-xs font-normal text-stone-500">kcal</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-stone-700 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                เผาผลาญสะสม 7 วัน
              </div>
              <div className="text-xl font-bold text-stone-900 mt-1">
                {totalBurned.toLocaleString()} <span className="text-xs font-normal text-stone-500">kcal</span>
              </div>
            </div>
          </div>

          {/* 7-Day Visual Chart */}
          <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200/80">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-stone-800">กราฟเปรียบเทียบรายวัน (Daily Breakdown)</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-amber-800">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" /> อาหาร (In)
                </span>
                <span className="flex items-center gap-1 text-[11px] text-teal-800">
                  <span className="w-2.5 h-2.5 rounded-xs bg-teal-500 inline-block" /> เผาผลาญ (Burn)
                </span>
              </div>
            </div>

            {/* Bars Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 items-end h-48 pt-4 pb-1 border-b border-stone-200">
              {daysSummary.map((item) => {
                const foodHeight = Math.min(100, Math.round((item.foodKcal / maxVal) * 100));
                const burnHeight = Math.min(100, Math.round((item.burnedKcal / maxVal) * 100));
                const isItemToday = item.date === todayStr;

                return (
                  <div key={item.date} className="flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-md">
                      <div>กิน: {item.foodKcal} kcal</div>
                      <div>เผาผลาญ: {item.burnedKcal} kcal</div>
                      <div>สุทธิ: {item.netKcal} kcal</div>
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 h-full px-0.5">
                      {/* Food Bar */}
                      <div
                        className="w-full max-w-[14px] bg-amber-400 rounded-t-xs transition-all duration-300 group-hover:bg-amber-500"
                        style={{ height: `${Math.max(4, foodHeight)}%` }}
                        title={`กิน: ${item.foodKcal} kcal`}
                      />
                      {/* Burned Bar */}
                      <div
                        className="w-full max-w-[14px] bg-teal-400 rounded-t-xs transition-all duration-300 group-hover:bg-teal-500"
                        style={{ height: `${Math.max(4, burnHeight)}%` }}
                        title={`เผาผลาญ: ${item.burnedKcal} kcal`}
                      />
                    </div>

                    {/* Date label */}
                    <span className={`text-[10px] mt-2 block font-medium truncate ${
                      isItemToday ? 'text-emerald-700 font-bold' : 'text-stone-500'
                    }`}>
                      {formatThaiDate(item.date, 'short').split(',')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex justify-between text-[11px] text-stone-500">
              <span>เส้นเป้าหมายคงที่: {targetCalories} kcal/วัน</span>
              <span>สูตรสุทธิ: อาหารที่กิน - ออกกำลังกาย</span>
            </div>
          </div>

          {/* Daily Table Details */}
          <div>
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              ประวัติย้อนหลังรายวัน
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {daysSummary.map((item) => (
                <div
                  key={item.date}
                  className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200/70 text-xs"
                >
                  <span className="font-medium text-stone-800">
                    {formatThaiDate(item.date, 'short')}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-800 font-semibold">+{item.foodKcal} kcal</span>
                    <span className="text-teal-700 font-semibold">-{item.burnedKcal} kcal</span>
                    <span className="text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                      สุทธิ {item.netKcal} kcal
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleExportData}
            className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            ส่งออกข้อมูลสำรอง (Backup JSON)
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-800 hover:bg-stone-900 rounded-xl transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
