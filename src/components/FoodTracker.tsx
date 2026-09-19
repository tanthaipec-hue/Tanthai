import React from 'react';
import { Plus, Trash2, Coffee, Sun, Sunset, Cookie, Utensils } from 'lucide-react';
import { FoodItem, MealType } from '../types';

interface FoodTrackerProps {
  foods: FoodItem[];
  onOpenAddModal: (mealType: MealType) => void;
  onDeleteFood: (id: string) => void;
}

interface MealSectionConfig {
  type: MealType;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
}

const MEAL_CONFIGS: MealSectionConfig[] = [
  {
    type: 'breakfast',
    title: 'อาหารเช้า',
    subtitle: 'Breakfast',
    icon: <Coffee className="w-4 h-4 text-amber-600" />,
    iconBg: 'bg-amber-100',
  },
  {
    type: 'lunch',
    title: 'อาหารกลางวัน',
    subtitle: 'Lunch',
    icon: <Sun className="w-4 h-4 text-orange-600" />,
    iconBg: 'bg-orange-100',
  },
  {
    type: 'dinner',
    title: 'อาหารเย็น',
    subtitle: 'Dinner',
    icon: <Sunset className="w-4 h-4 text-indigo-600" />,
    iconBg: 'bg-indigo-100',
  },
  {
    type: 'snack',
    title: 'ของว่าง & เครื่องดื่ม',
    subtitle: 'Snacks & Drinks',
    icon: <Cookie className="w-4 h-4 text-emerald-600" />,
    iconBg: 'bg-emerald-100',
  },
];

export const FoodTracker: React.FC<FoodTrackerProps> = ({
  foods,
  onOpenAddModal,
  onDeleteFood,
}) => {
  const totalFoodCalories = foods.reduce((sum, f) => sum + f.calories, 0);

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-stone-900">บันทึกอาหาร (Food Intake)</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">แบ่งตามมื้ออาหาร คำนวณแคลอรี่และสารอาหารอัตโนมัติ</p>
        </div>

        <div className="text-right">
          <span className="text-xs text-stone-500">แคลอรี่รวมมื้ออาหาร:</span>
          <span className="ml-1.5 text-base sm:text-lg font-bold text-amber-900">
            {totalFoodCalories.toLocaleString()} <span className="text-xs font-normal text-stone-500">kcal</span>
          </span>
        </div>
      </div>

      {/* Meal Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MEAL_CONFIGS.map((config) => {
          const mealFoods = foods.filter((f) => f.mealType === config.type);
          const mealCalories = mealFoods.reduce((sum, f) => sum + f.calories, 0);

          return (
            <div
              key={config.type}
              className="rounded-xl border border-stone-200/80 bg-stone-50/40 p-4 flex flex-col justify-between"
            >
              {/* Meal Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 text-sm">{config.title}</h3>
                      <span className="text-[10px] text-stone-400">{config.subtitle}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-stone-800">{mealCalories}</span>
                    <span className="text-[10px] text-stone-400 ml-1">kcal</span>
                  </div>
                </div>

                {/* Food Items List */}
                {mealFoods.length === 0 ? (
                  <div className="py-5 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-lg bg-white/50 mb-3">
                    ยังไม่มีรายการอาหารในมื้อนี้
                  </div>
                ) : (
                  <div className="space-y-2 mb-3">
                    {mealFoods.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-2.5 rounded-lg border border-stone-200/70 hover:border-stone-300 transition-colors flex items-center justify-between gap-2 shadow-2xs group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-xs sm:text-sm text-stone-800 truncate">
                            {item.name}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5 flex-wrap">
                            <span className="text-amber-700 font-semibold">{item.calories} kcal</span>
                            {item.quantity !== 1 && (
                              <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded text-[10px]">
                                {item.quantity} {item.servingUnit}
                              </span>
                            )}
                            <span className="text-stone-400">·</span>
                            <span className="text-stone-500 text-[10px]">
                              P: {Math.round(item.protein)}g | C: {Math.round(item.carbs)}g | F: {Math.round(item.fat)}g
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDeleteFood(item.id)}
                          className="p-1.5 text-stone-300 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="ลบรายการ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={() => onOpenAddModal(config.type)}
                className="w-full mt-2 py-2 px-3 text-xs font-medium text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/70 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-700" />
                เพิ่มใน{config.title}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
