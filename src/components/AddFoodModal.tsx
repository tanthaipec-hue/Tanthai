import React, { useState } from 'react';
import { X, Search, Plus, Sparkles, Utensils, Check } from 'lucide-react';
import { FoodItem, MealType, PresetFood } from '../types';
import { PRESET_FOODS } from '../data/presetData';

interface AddFoodModalProps {
  isOpen: boolean;
  defaultMealType: MealType;
  onClose: () => void;
  onAddFood: (food: Omit<FoodItem, 'id' | 'timestamp'>) => void;
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  defaultMealType,
  onClose,
  onAddFood,
}) => {
  const [mealType, setMealType] = useState<MealType>(defaultMealType);
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPreset, setSelectedPreset] = useState<PresetFood | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Custom food inputs
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState<number | ''>('');
  const [customProtein, setCustomProtein] = useState<number | ''>('');
  const [customCarbs, setCustomCarbs] = useState<number | ''>('');
  const [customFat, setCustomFat] = useState<number | ''>('');
  const [customServingUnit, setCustomServingUnit] = useState('จาน/ที่');

  if (!isOpen) return null;

  // Filter preset foods
  const filteredPresets = PRESET_FOODS.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (food.nameEn && food.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddPreset = () => {
    if (!selectedPreset) return;
    const factor = Number(quantity) || 1;
    onAddFood({
      name: selectedPreset.name,
      nameEn: selectedPreset.nameEn,
      calories: Math.round(selectedPreset.calories * factor),
      protein: Math.round(selectedPreset.protein * factor * 10) / 10,
      carbs: Math.round(selectedPreset.carbs * factor * 10) / 10,
      fat: Math.round(selectedPreset.fat * factor * 10) / 10,
      servingUnit: selectedPreset.servingUnit,
      quantity: factor,
      mealType,
    });
    handleClose();
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customCalories === '') return;

    onAddFood({
      name: customName.trim(),
      calories: Number(customCalories) || 0,
      protein: Number(customProtein) || 0,
      carbs: Number(customCarbs) || 0,
      fat: Number(customFat) || 0,
      servingUnit: customServingUnit.trim() || 'ที่',
      quantity: 1,
      mealType,
    });
    handleClose();
  };

  const handleClose = () => {
    setSelectedPreset(null);
    setQuantity(1);
    setSearchQuery('');
    setCustomName('');
    setCustomCalories('');
    setCustomProtein('');
    setCustomCarbs('');
    setCustomFat('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-600" />
              เพิ่มรายการอาหาร
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">เลือกจากเมนูยอดนิยมหรือกรอกข้อมูลเอง</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meal Type Selector */}
        <div className="px-5 pt-3.5 pb-2 bg-white">
          <label className="text-xs font-semibold text-stone-700 block mb-1.5">เลือกมื้ออาหาร:</label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-stone-100 rounded-xl">
            {(
              [
                { type: 'breakfast', label: 'เช้า' },
                { type: 'lunch', label: 'กลางวัน' },
                { type: 'dinner', label: 'เย็น' },
                { type: 'snack', label: 'ของว่าง' },
              ] as const
            ).map((m) => (
              <button
                key={m.type}
                type="button"
                onClick={() => setMealType(m.type)}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  mealType === m.type
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Preset vs Custom */}
        <div className="px-5 flex border-b border-stone-200 gap-6 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('preset')}
            className={`py-2.5 border-b-2 transition-colors ${
              activeTab === 'preset'
                ? 'border-emerald-600 text-emerald-700 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            เมนูอาหารสำเร็จรูป (Presets)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`py-2.5 border-b-2 transition-colors ${
              activeTab === 'custom'
                ? 'border-emerald-600 text-emerald-700 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            กำหนดเอง (Custom Entry)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'preset' ? (
            <div>
              {/* Search & Category filter */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาชื่ออาหาร เช่น ข้าวกะเพรา, ไก่ย่าง, ชานม..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 text-xs">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'meal', label: 'อาหารจานเดียว' },
                  { id: 'clean', label: 'คลีน / โปรตีน' },
                  { id: 'drink', label: 'เครื่องดื่ม' },
                  { id: 'fruit', label: 'ผลไม้' },
                  { id: 'snack', label: 'ของว่าง' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-stone-800 text-white font-medium'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Food List */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {filteredPresets.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    ไม่พบรายการอาหารที่ค้นหา ลองพิมพ์คำค้นอื่น หรือใช้แท็บ &quot;กำหนดเอง&quot;
                  </div>
                ) : (
                  filteredPresets.map((food) => {
                    const isSelected = selectedPreset?.id === food.id;
                    return (
                      <button
                        key={food.id}
                        type="button"
                        onClick={() => setSelectedPreset(food)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-400 ring-1 ring-emerald-400'
                            : 'bg-white border-stone-200 hover:bg-stone-50/70'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                            {food.name}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                            <span>1 {food.servingUnit}</span>
                            <span className="text-stone-300">·</span>
                            <span>P: {food.protein}g</span>
                            <span className="text-stone-300">·</span>
                            <span>C: {food.carbs}g</span>
                            <span className="text-stone-300">·</span>
                            <span>F: {food.fat}g</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex items-center gap-2">
                          <span className="font-bold text-amber-800 text-sm">{food.calories} kcal</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Portion Selector for selected preset */}
              {selectedPreset && (
                <div className="mt-4 p-3.5 bg-emerald-50/50 border border-emerald-200/80 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-950">จำนวน / ปริมาณส่วน (Serving size):</span>
                    <span className="text-xs font-bold text-emerald-800">
                      {Math.round(selectedPreset.calories * quantity)} kcal (รวม)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {[0.5, 1, 1.5, 2].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                          quantity === q
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-semibold'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {q}x {selectedPreset.servingUnit}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Custom Food Form */
            <form onSubmit={handleAddCustom} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  ชื่ออาหาร / เมนู <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="เช่น สเต๊กหมูพริกไทยดำ, แซนด์วิชทูน่า"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    พลังงานแคลอรี่ (kcal) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="เช่น 350"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    หน่วยบริโภค
                  </label>
                  <input
                    type="text"
                    value={customServingUnit}
                    onChange={(e) => setCustomServingUnit(e.target.value)}
                    placeholder="เช่น จาน, ชาม, ชิ้น, ถ้วย"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-1.5">
                  สารอาหารหลัก (ไม่บังคับ - กรัม):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">โปรตีน (P)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="กรัม"
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">คาร์บ (C)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="กรัม"
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">ไขมัน (F)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={customFat}
                      onChange={(e) => setCustomFat(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="กรัม"
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                >
                  บันทึกอาหารลงในมื้อ
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer (for preset mode) */}
        {activeTab === 'preset' && (
          <div className="p-4 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-600 hover:bg-stone-200/70 rounded-xl transition-colors"
            >
              ยกเลิก
            </button>

            <button
              type="button"
              disabled={!selectedPreset}
              onClick={handleAddPreset}
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              เพิ่มรายการ ({selectedPreset ? `${Math.round(selectedPreset.calories * quantity)} kcal` : 'เลือกอาหารก่อน'})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
