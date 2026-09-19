import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { EnergySummaryCard } from './components/EnergySummaryCard';
import { FoodTracker } from './components/FoodTracker';
import { ActivityTracker } from './components/ActivityTracker';
import { WaterTracker } from './components/WaterTracker';
import { AddFoodModal } from './components/AddFoodModal';
import { AddActivityModal } from './components/AddActivityModal';
import { UserProfileModal } from './components/UserProfileModal';
import { WeeklyStatsModal } from './components/WeeklyStatsModal';
import { ActivityItem, DayData, FoodItem, MealType, UserProfile } from './types';
import { getTodayDateString } from './utils/calculations';
import {
  getDayData,
  loadAllDaysData,
  loadUserProfile,
  saveAllDaysData,
  saveUserProfile,
} from './utils/storage';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadUserProfile());
  const [allDaysData, setAllDaysData] = useState<Record<string, DayData>>(() => loadAllDaysData());

  // Modal States
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [addFoodMealType, setAddFoodMealType] = useState<MealType>('breakfast');
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    saveUserProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    saveAllDaysData(allDaysData);
  }, [allDaysData]);

  // Current day data
  const currentDayData: DayData = getDayData(allDaysData, selectedDate);

  // Aggregated totals
  const totalFoodCalories = currentDayData.foods.reduce((sum, f) => sum + f.calories, 0);
  const totalBurnedCalories = currentDayData.activities.reduce((sum, a) => sum + a.caloriesBurned, 0);
  const totalProtein = currentDayData.foods.reduce((sum, f) => sum + f.protein, 0);
  const totalCarbs = currentDayData.foods.reduce((sum, f) => sum + f.carbs, 0);
  const totalFat = currentDayData.foods.reduce((sum, f) => sum + f.fat, 0);

  // Handlers
  const handleOpenAddFood = (mealType: MealType) => {
    setAddFoodMealType(mealType);
    setIsAddFoodOpen(true);
  };

  const handleAddFood = (newFood: Omit<FoodItem, 'id' | 'timestamp'>) => {
    const item: FoodItem = {
      ...newFood,
      id: `food-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: Date.now(),
    };

    setAllDaysData((prev) => {
      const existing = getDayData(prev, selectedDate);
      return {
        ...prev,
        [selectedDate]: {
          ...existing,
          foods: [...existing.foods, item],
        },
      };
    });
  };

  const handleDeleteFood = (id: string) => {
    setAllDaysData((prev) => {
      const existing = getDayData(prev, selectedDate);
      return {
        ...prev,
        [selectedDate]: {
          ...existing,
          foods: existing.foods.filter((f) => f.id !== id),
        },
      };
    });
  };

  const handleAddActivity = (newActivity: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    const item: ActivityItem = {
      ...newActivity,
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: Date.now(),
    };

    setAllDaysData((prev) => {
      const existing = getDayData(prev, selectedDate);
      return {
        ...prev,
        [selectedDate]: {
          ...existing,
          activities: [...existing.activities, item],
        },
      };
    });
  };

  const handleDeleteActivity = (id: string) => {
    setAllDaysData((prev) => {
      const existing = getDayData(prev, selectedDate);
      return {
        ...prev,
        [selectedDate]: {
          ...existing,
          activities: existing.activities.filter((a) => a.id !== id),
        },
      };
    });
  };

  const handleUpdateWater = (newAmount: number) => {
    setAllDaysData((prev) => {
      const existing = getDayData(prev, selectedDate);
      return {
        ...prev,
        [selectedDate]: {
          ...existing,
          waterMl: newAmount,
        },
      };
    });
  };

  const handleResetDay = () => {
    if (window.confirm('คุณต้องการล้างรายการอาหารและการออกกำลังกายของวันที่เลือกใช่หรือไม่?')) {
      setAllDaysData((prev) => ({
        ...prev,
        [selectedDate]: {
          date: selectedDate,
          foods: [],
          activities: [],
          waterMl: 0,
        },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 pb-16">
      {/* Navbar & Navigation */}
      <Navbar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        onResetDay={handleResetDay}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* Daily Energy Summary (Calories in vs Calories out) */}
        <EnergySummaryCard
          foodCalories={totalFoodCalories}
          burnedCalories={totalBurnedCalories}
          userProfile={userProfile}
          proteinTotal={totalProtein}
          carbsTotal={totalCarbs}
          fatTotal={totalFat}
        />

        {/* Water Intake Quick Tracker */}
        <WaterTracker
          waterMl={currentDayData.waterMl}
          targetMl={userProfile.waterTargetMl}
          onUpdateWater={handleUpdateWater}
        />

        {/* Grid for Food Tracking & Activity Tracking */}
        <div className="space-y-6">
          {/* Food Intake (แคลอรี่ที่ได้รับ) */}
          <FoodTracker
            foods={currentDayData.foods}
            onOpenAddModal={handleOpenAddFood}
            onDeleteFood={handleDeleteFood}
          />

          {/* Activity / Exercise (พลังงานที่เผาผลาญ) */}
          <ActivityTracker
            activities={currentDayData.activities}
            userProfile={userProfile}
            onOpenAddModal={() => setIsAddActivityOpen(true)}
            onDeleteActivity={handleDeleteActivity}
          />
        </div>
      </main>

      {/* Modals */}
      <AddFoodModal
        isOpen={isAddFoodOpen}
        defaultMealType={addFoodMealType}
        onClose={() => setIsAddFoodOpen(false)}
        onAddFood={handleAddFood}
      />

      <AddActivityModal
        isOpen={isAddActivityOpen}
        userProfile={userProfile}
        onClose={() => setIsAddActivityOpen(false)}
        onAddActivity={handleAddActivity}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        userProfile={userProfile}
        onClose={() => setIsProfileOpen(false)}
        onSaveProfile={setUserProfile}
      />

      <WeeklyStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        allDaysData={allDaysData}
        userProfile={userProfile}
      />
    </div>
  );
}
