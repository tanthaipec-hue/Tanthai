export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  name: string;
  nameEn?: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  servingUnit: string;
  quantity: number; // multiplier, e.g. 1, 1.5
  mealType: MealType;
  timestamp: number;
}

export interface PresetFood {
  id: string;
  name: string;
  nameEn?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingUnit: string;
  category: 'meal' | 'clean' | 'drink' | 'snack' | 'fruit';
}

export type ExerciseCategory = 'cardio' | 'strength' | 'sports' | 'daily';

export interface ActivityItem {
  id: string;
  name: string;
  nameEn?: string;
  durationMinutes: number;
  caloriesBurned: number;
  met: number;
  category: ExerciseCategory;
  timestamp: number;
}

export interface PresetActivity {
  id: string;
  name: string;
  nameEn?: string;
  met: number;
  category: ExerciseCategory;
  defaultMinutes: number;
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type FitnessGoal = 'lose' | 'maintain' | 'gain';

export interface UserProfile {
  gender: 'male' | 'female';
  age: number;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  customTargetCalories?: number;
  waterTargetMl: number;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  foods: FoodItem[];
  activities: ActivityItem[];
  waterMl: number;
}
