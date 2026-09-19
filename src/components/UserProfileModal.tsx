import React, { useState } from 'react';
import { X, User, Calculator, Check, Flame, Activity, Droplet } from 'lucide-react';
import { ActivityLevel, FitnessGoal, UserProfile } from '../types';
import { calculateBMR, calculateRecommendedCalories, calculateTDEE } from '../utils/calculations';

interface UserProfileModalProps {
  isOpen: boolean;
  userProfile: UserProfile;
  onClose: () => void;
  onSaveProfile: (newProfile: UserProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  userProfile,
  onClose,
  onSaveProfile,
}) => {
  const [gender, setGender] = useState<'male' | 'female'>(userProfile.gender);
  const [age, setAge] = useState<number>(userProfile.age);
  const [weightKg, setWeightKg] = useState<number>(userProfile.weightKg);
  const [heightCm, setHeightCm] = useState<number>(userProfile.heightCm);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(userProfile.activityLevel);
  const [goal, setGoal] = useState<FitnessGoal>(userProfile.goal);
  const [useCustomTarget, setUseCustomTarget] = useState<boolean>(!!userProfile.customTargetCalories);
  const [customTarget, setCustomTarget] = useState<number>(
    userProfile.customTargetCalories || calculateRecommendedCalories(
      calculateTDEE(calculateBMR(userProfile), userProfile.activityLevel),
      userProfile.goal
    )
  );

  if (!isOpen) return null;

  // Real-time BMR, TDEE, BMI calculation preview
  const bmr = calculateBMR({ gender, age, weightKg, heightCm });
  const tdee = calculateTDEE(bmr, activityLevel);
  const recommendedCalories = calculateRecommendedCalories(tdee, goal);

  // BMI
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? Math.round((weightKg / (heightM * heightM)) * 10) / 10 : 0;
  let bmiCategory = 'สมส่วน';
  let bmiColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (bmi < 18.5) {
    bmiCategory = 'น้ำหนักต่ำกว่าเกณฑ์';
    bmiColor = 'text-amber-700 bg-amber-50 border-amber-200';
  } else if (bmi >= 23 && bmi < 25) {
    bmiCategory = 'น้ำหนักเกินเกณฑ์ (ท้วม)';
    bmiColor = 'text-amber-700 bg-amber-50 border-amber-200';
  } else if (bmi >= 25) {
    bmiCategory = 'เข้าเกณฑ์อ้วน';
    bmiColor = 'text-rose-700 bg-rose-50 border-rose-200';
  }

  // Recommended water (approx 35 ml per kg)
  const recommendedWater = Math.round((weightKg * 35) / 100) * 100;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      gender,
      age: Number(age) || 25,
      weightKg: Number(weightKg) || 60,
      heightCm: Number(heightCm) || 165,
      activityLevel,
      goal,
      customTargetCalories: useCustomTarget ? Number(customTarget) : undefined,
      waterTargetMl: recommendedWater,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-700" />
              ข้อมูลส่วนตัวและคำนวณ BMR / TDEE
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              คำนวณพลังงานที่ร่างกายต้องการอย่างแม่นยำตามสูตร Mifflin-St Jeor
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
        <form onSubmit={handleSave} className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Gender */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">เพศกำเนิด (สำหรับคำนวณ BMR):</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                  gender === 'male'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400 ring-1 ring-emerald-400'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                เพศชาย (Male)
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                  gender === 'female'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400 ring-1 ring-emerald-400'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                เพศหญิง (Female)
              </button>
            </div>
          </div>

          {/* Age, Weight, Height */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">อายุ (ปี)</label>
              <input
                type="number"
                required
                min="10"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">น้ำหนัก (กก.)</label>
              <input
                type="number"
                required
                min="25"
                max="300"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">ส่วนสูง (ซม.)</label>
              <input
                type="number"
                required
                min="80"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">
              ระดับกิจกรรมทางกายภาพในแต่ละสัปดาห์:
            </label>
            <div className="space-y-1.5">
              {[
                {
                  id: 'sedentary',
                  title: 'นั่งทำงานเป็นหลัก / แทบไม่ออกกำลังกาย',
                  desc: 'ทำงานออฟฟิศ หรืออยู่บ้าน (x1.2)',
                },
                {
                  id: 'light',
                  title: 'ออกกำลังกายเบาๆ',
                  desc: '1-3 วัน/สัปดาห์ เช่น เดินเร็ว ยืดเหยียด (x1.375)',
                },
                {
                  id: 'moderate',
                  title: 'ออกกำลังกายปานกลาง',
                  desc: '3-5 วัน/สัปดาห์ เช่น วิ่ง ปั่นจักรยาน เวทเทรนนิ่ง (x1.55)',
                },
                {
                  id: 'active',
                  title: 'ออกกำลังกายหนัก',
                  desc: '6-7 วัน/สัปดาห์ หรือนักกีฬา (x1.725)',
                },
                {
                  id: 'very_active',
                  title: 'ออกกำลังกายหนักมาก / ใช้แรงงานหนัก',
                  desc: 'ซ้อมวันละ 2 เวลา หรือทำงานก่อสร้าง/เกษตรกรรม (x1.9)',
                },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setActivityLevel(lvl.id as ActivityLevel)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    activityLevel === lvl.id
                      ? 'bg-emerald-50/80 border-emerald-400 ring-1 ring-emerald-400'
                      : 'bg-stone-50/60 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs sm:text-sm text-stone-900">{lvl.title}</div>
                    <div className="text-[11px] text-stone-500">{lvl.desc}</div>
                  </div>
                  {activityLevel === lvl.id && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">เป้าหมายด้านรูปร่างและสุขภาพ:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'lose', title: 'ลดน้ำหนัก', desc: '-450 kcal/วัน' },
                { id: 'maintain', title: 'รักษาน้ำหนัก', desc: 'สมดุล TDEE' },
                { id: 'gain', title: 'เพิ่มกล้ามเนื้อ', desc: '+350 kcal/วัน' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as FitnessGoal)}
                  className={`p-2.5 text-center rounded-xl border transition-all ${
                    goal === g.id
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-400 ring-1 ring-emerald-400'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">{g.title}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Output Card */}
          <div className="p-4 bg-stone-900 text-white rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <Calculator className="w-4 h-4" />
                ผลการคำนวณอัตโนมัติ
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${bmiColor}`}>
                BMI {bmi} ({bmiCategory})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[11px] text-stone-400 block">BMR (เผาผลาญพื้นฐาน):</span>
                <span className="text-xl font-bold text-white">{bmr.toLocaleString()}</span>
                <span className="text-xs text-stone-400 ml-1">kcal/วัน</span>
                <p className="text-[10px] text-stone-400 mt-0.5">พลังงานเพื่อการหายใจและอวัยวะทำงาน</p>
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block">TDEE (เผาผลาญรวมต่อวัน):</span>
                <span className="text-xl font-bold text-emerald-400">{tdee.toLocaleString()}</span>
                <span className="text-xs text-stone-400 ml-1">kcal/วัน</span>
                <p className="text-[10px] text-stone-400 mt-0.5">รวมกิจกรรมทางกายภาพในชีวิตประจำวัน</p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-300">เป้าหมายแคลอรี่แนะนำต่อวัน:</span>
              <span className="text-lg font-bold text-amber-400">{recommendedCalories.toLocaleString()} kcal</span>
            </div>
          </div>

          {/* Custom Calorie Target Toggle */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCustomTarget}
                  onChange={(e) => setUseCustomTarget(e.target.checked)}
                  className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                />
                กำหนดเป้าหมายแคลอรี่เอง (Custom Target)
              </label>
            </div>

            {useCustomTarget && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2">
                <input
                  type="number"
                  min="800"
                  max="5000"
                  value={customTarget}
                  onChange={(e) => setCustomTarget(Number(e.target.value))}
                  className="w-32 px-3 py-1.5 text-sm bg-white border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-xs text-stone-600">kcal ต่อวัน (แทนที่ค่าแนะนำอัตโนมัติ)</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
            >
              บันทึกข้อมูลส่วนตัว & อัปเดตเป้าหมาย
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
