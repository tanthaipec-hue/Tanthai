import { DayData, UserProfile } from '../types';
import { calculateBMR, calculateCaloriesBurned, calculateRecommendedCalories, calculateTDEE, getTodayDateString } from './calculations';

export const DEFAULT_USER_PROFILE: UserProfile = {
  gender: 'male',
  age: 26,
  weightKg: 65,
  heightCm: 172,
  activityLevel: 'moderate',
  goal: 'maintain',
  waterTargetMl: 2200,
};

const STORAGE_KEYS = {
  PROFILE: 'calorie_tracker_profile_v1',
  DAYS_DATA: 'calorie_tracker_days_v1',
};

export function loadUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      return { ...DEFAULT_USER_PROFILE, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load user profile from storage', e);
  }
  return DEFAULT_USER_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
}

export function loadAllDaysData(): Record<string, DayData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAYS_DATA);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load days data', e);
  }

  // Generate friendly initial sample data for today if empty
  const today = getTodayDateString();
  const sampleData: Record<string, DayData> = {
    [today]: {
      date: today,
      foods: [
        {
          id: 'init-f1',
          name: 'ข้าวกะเพราอกไก่ (ไม่ใส่ไข่ดาว)',
          nameEn: 'Basil Chicken Breast Rice',
          calories: 420,
          protein: 32,
          carbs: 58,
          fat: 6,
          servingUnit: 'จาน',
          quantity: 1,
          mealType: 'breakfast',
          timestamp: Date.now() - 3600 * 1000 * 4,
        },
        {
          id: 'init-f2',
          name: 'กาแฟดำ / อเมริกาโน่ไม่หวาน (0 Cal)',
          nameEn: 'Iced Americano',
          calories: 10,
          protein: 0.5,
          carbs: 1.5,
          fat: 0,
          servingUnit: 'แก้ว',
          quantity: 1,
          mealType: 'breakfast',
          timestamp: Date.now() - 3600 * 1000 * 3.5,
        },
        {
          id: 'init-f3',
          name: 'ก๋วยเตี๋ยวน้ำใสเส้นหมี่ไก่ฉีก',
          nameEn: 'Rice Vermicelli Clear Soup with Chicken',
          calories: 310,
          protein: 24,
          carbs: 48,
          fat: 4,
          servingUnit: 'ชาม',
          quantity: 1,
          mealType: 'lunch',
          timestamp: Date.now() - 3600 * 1000 * 1.5,
        },
      ],
      activities: [
        {
          id: 'init-a1',
          name: 'วิ่งจ็อกกิ้งความเร็วปานกลาง (8 กม./ชม.)',
          nameEn: 'Jogging (8 km/h)',
          durationMinutes: 30,
          caloriesBurned: calculateCaloriesBurned(8.0, 65, 30),
          met: 8.0,
          category: 'cardio',
          timestamp: Date.now() - 3600 * 1000 * 5,
        },
      ],
      waterMl: 1250,
    },
  };

  saveAllDaysData(sampleData);
  return sampleData;
}

export function saveAllDaysData(data: Record<string, DayData>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DAYS_DATA, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save days data', e);
  }
}

export function getDayData(allData: Record<string, DayData>, date: string): DayData {
  if (allData[date]) {
    return allData[date];
  }
  return {
    date,
    foods: [],
    activities: [],
    waterMl: 0,
  };
}
