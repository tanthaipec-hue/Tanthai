import React from 'react';
import { Flame, Utensils, Zap, Award, Info, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { calculateBMR, calculateTDEE } from '../utils/calculations';

interface EnergySummaryCardProps {
  foodCalories: number;
  burnedCalories: number;
  userProfile: UserProfile;
  proteinTotal: number;
  carbsTotal: number;
  fatTotal: number;
}

export const EnergySummaryCard: React.FC<EnergySummaryCardProps> = ({
  foodCalories,
  burnedCalories,
  userProfile,
  proteinTotal,
  carbsTotal,
  fatTotal,
}) => {
  const bmr = calculateBMR(userProfile);
  const tdee = calculateTDEE(bmr, userProfile.activityLevel);
  const targetCalories = userProfile.customTargetCalories || tdee;

  // Remaining calories = Target - Food + Burned
  // If user exercises, they earn more room or increase their net deficit
  const netCalories = foodCalories - burnedCalories;
  const remainingCalories = targetCalories - foodCalories + burnedCalories;
  const isOverBudget = remainingCalories < 0;

  // Total daily expenditure = BMR + Active Burn (or TDEE with specific burn)
  const totalBurnEstimated = bmr + burnedCalories;

  // Percentage of daily calorie target used
  const intakePercent = Math.min(100, Math.round((foodCalories / targetCalories) * 100)) || 0;

  // Recommended macros targets (e.g. Protein 2g/kg or 25%, Carbs 50%, Fat 25%)
  const targetProteinGrams = Math.round(userProfile.weightKg * 1.8); // 1.8g per kg bodyweight
  const targetCarbsGrams = Math.round((targetCalories * 0.5) / 4); // 50% from carbs
  const targetFatGrams = Math.round((targetCalories * 0.25) / 9); // 25% from fat

  const proteinPercent = Math.min(100, Math.round((proteinTotal / targetProteinGrams) * 100));
  const carbsPercent = Math.min(100, Math.round((carbsTotal / targetCarbsGrams) * 100));
  const fatPercent = Math.min(100, Math.round((fatTotal / targetFatGrams) * 100));

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-6 mb-6">
      {/* Top Header info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 inline-flex items-center gap-1">
            <Zap className="w-3 h-3 text-emerald-600 fill-current" />
            สมดุลพลังงานสุทธิประจำวัน (Net Daily Energy)
          </span>
          <h2 className="text-xl font-bold text-stone-900 mt-1">สรุปแคลอรี่และพลังงาน</h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200/60">
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>
            BMR พื้นฐาน: <strong className="text-stone-800">{bmr.toLocaleString()}</strong> kcal | TDEE: <strong className="text-stone-800">{tdee.toLocaleString()}</strong> kcal
          </span>
        </div>
      </div>

      {/* Main Calories Equation Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-5">
        {/* Card 1: Target Budget */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>เป้าหมาย (Budget)</span>
            <Award className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight">
              {targetCalories.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              kcal / วัน ({userProfile.goal === 'lose' ? 'ลดน้ำหนัก' : userProfile.goal === 'gain' ? 'เพิ่มกล้ามเนื้อ' : 'รักษาน้ำหนัก'})
            </div>
          </div>
        </div>

        {/* Card 2: Food Consumed */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-800 text-xs font-medium">
            <span className="flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              แคลอรี่ที่กิน (Food)
            </span>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
              +{foodCalories}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 tracking-tight">
              {foodCalories.toLocaleString()}
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">
              kcal ได้รับจากอาหาร
            </div>
          </div>
        </div>

        {/* Card 3: Exercise Burned */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50/60 border border-teal-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between text-teal-800 text-xs font-medium">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-teal-600 fill-current" />
              พลังงานที่เผาผลาญ (Burned)
            </span>
            <span className="text-[11px] font-semibold text-teal-700 bg-teal-100/70 px-1.5 py-0.5 rounded">
              -{burnedCalories}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-bold text-teal-900 tracking-tight">
              {burnedCalories.toLocaleString()}
            </div>
            <div className="text-[11px] text-teal-700 mt-0.5">
              kcal จากการออกกำลังกาย
            </div>
          </div>
        </div>

        {/* Card 4: Net Remaining / Deficit */}
        <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between ${
          isOverBudget
            ? 'bg-rose-50/70 border-rose-200 text-rose-900'
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
        }`}>
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="font-semibold">
              {isOverBudget ? 'เกินเป้าหมาย (Exceeded)' : 'คงเหลือทานได้ (Remaining)'}
            </span>
            {isOverBudget ? (
              <TrendingUp className="w-4 h-4 text-rose-500" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
          </div>
          <div className="mt-2">
            <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isOverBudget ? 'text-rose-600' : 'text-emerald-700'
            }`}>
              {Math.abs(remainingCalories).toLocaleString()}
            </div>
            <div className="text-[11px] mt-0.5 opacity-80">
              {isOverBudget ? 'kcal เกินงบที่กำหนด' : 'kcal ทานเพิ่มได้วันนี้'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar of Food vs Budget */}
      <div className="my-4">
        <div className="flex justify-between items-center text-xs text-stone-600 mb-1.5">
          <span>ความคืบหน้าการบริโภคอาหารเทียบเป้าหมาย</span>
          <span className="font-semibold text-stone-800">{intakePercent}% ของงบ ({foodCalories} / {targetCalories} kcal)</span>
        </div>
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex border border-stone-200/50">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, (foodCalories / targetCalories) * 100)}%` }}
          />
        </div>
      </div>

      {/* Net Calorie Formula Note */}
      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <span className="font-medium text-stone-700">สูตรคำนวณสุทธิ:</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-stone-200">
            {targetCalories} (เป้าหมาย) - {foodCalories} (กิน) + {burnedCalories} (เผาผลาญ) = <strong>{remainingCalories}</strong> kcal
          </span>
        </div>
        <div className="text-stone-500">
          พลังงานสุทธิที่ร่างกายได้รับจริง (Net): <strong className="text-stone-800">{netCalories} kcal</strong>
        </div>
      </div>

      {/* Macronutrient Split */}
      <div className="mt-5 pt-4 border-t border-stone-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            สารอาหารหลัก (Macronutrients)
          </h3>
          <span className="text-xs text-stone-500">
            กินแล้ว: P {Math.round(proteinTotal)}g · C {Math.round(carbsTotal)}g · F {Math.round(fatTotal)}g
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Protein */}
          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-medium text-blue-900">โปรตีน (Protein)</span>
              <span className="font-semibold text-blue-700">{Math.round(proteinTotal)} / {targetProteinGrams} g</span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${proteinPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-blue-700/80 mt-1">
              <span>{Math.round(proteinTotal * 4)} kcal</span>
              <span>{proteinPercent}%</span>
            </div>
          </div>

          {/* Carbs */}
          <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-medium text-amber-900">คาร์โบไฮเดรต (Carbs)</span>
              <span className="font-semibold text-amber-700">{Math.round(carbsTotal)} / {targetCarbsGrams} g</span>
            </div>
            <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${carbsPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-amber-700/80 mt-1">
              <span>{Math.round(carbsTotal * 4)} kcal</span>
              <span>{carbsPercent}%</span>
            </div>
          </div>

          {/* Fat */}
          <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-medium text-rose-900">ไขมัน (Fat)</span>
              <span className="font-semibold text-rose-700">{Math.round(fatTotal)} / {targetFatGrams} g</span>
            </div>
            <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${fatPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-rose-700/80 mt-1">
              <span>{Math.round(fatTotal * 9)} kcal</span>
              <span>{fatPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
