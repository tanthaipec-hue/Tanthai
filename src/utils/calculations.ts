import { ActivityLevel, FitnessGoal, UserProfile } from '../types';

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor formula.
 * Men: 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) + 5
 * Women: 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) - 161
 */
export function calculateBMR(profile: Pick<UserProfile, 'gender' | 'weightKg' | 'heightCm' | 'age'>): number {
  const { gender, weightKg, heightCm, age } = profile;
  if (!weightKg || !heightCm || !age) return 1600;

  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(gender === 'male' ? base + 5 : base - 161);
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) based on activity level.
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,       // นั่งทำงานเป็นหลัก ไม่ออกกำลังกาย
    light: 1.375,         // ออกกำลังกายเบาๆ 1-3 วัน/สัปดาห์
    moderate: 1.55,       // ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์
    active: 1.725,        // ออกกำลังกายหนัก 6-7 วัน/สัปดาห์
    very_active: 1.9,     // ออกกำลังกายหนักมากหรือใช้แรงงาน
  };

  return Math.round(bmr * (multipliers[activityLevel] || 1.375));
}

/**
 * Calculates recommended daily calorie target according to fitness goal.
 */
export function calculateRecommendedCalories(tdee: number, goal: FitnessGoal): number {
  switch (goal) {
    case 'lose':
      // Safe calorie deficit (~400-500 kcal per day for ~0.5kg loss/week)
      return Math.max(1200, Math.round(tdee - 450));
    case 'gain':
      // Lean muscle mass surplus (~300-400 kcal)
      return Math.round(tdee + 350);
    case 'maintain':
    default:
      return tdee;
  }
}

/**
 * Calculates calories burned from physical activity using the metabolic formula:
 * Calories = MET * Weight(kg) * (Duration(mins) / 60) * 1.05
 */
export function calculateCaloriesBurned(met: number, weightKg: number, durationMinutes: number): number {
  if (durationMinutes <= 0 || weightKg <= 0) return 0;
  const hours = durationMinutes / 60;
  return Math.round(met * weightKg * hours * 1.05);
}

/**
 * Get current date string in YYYY-MM-DD format based on user's timezone.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats YYYY-MM-DD into a readable Thai date, e.g. "วันศุกร์ที่ 18 กันยายน 2569" or "วันนี้, 18 ก.ย."
 */
export function formatThaiDate(dateStr: string, format: 'short' | 'full' = 'full'): string {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const date = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr));

  const thaiMonthsShort = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  const thaiMonthsFull = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const thaiDaysFull = [
    'วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const buddhistYear = date.getFullYear() + 543;
  const todayStr = getTodayDateString();

  if (format === 'short') {
    if (dateStr === todayStr) return `วันนี้, ${day} ${thaiMonthsShort[month]}`;
    return `${day} ${thaiMonthsShort[month]}`;
  }

  const dayName = thaiDaysFull[date.getDay()];
  const isToday = dateStr === todayStr ? ' (วันนี้)' : '';
  return `${dayName}ที่ ${day} ${thaiMonthsFull[month]} ${buddhistYear}${isToday}`;
}

export function shiftDate(dateStr: string, offsetDays: number): string {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const date = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr));
  date.setDate(date.getDate() + offsetDays);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
