import React, { useState } from 'react';
import { X, Search, Plus, Flame, Clock, Check, Info } from 'lucide-react';
import { ActivityItem, ExerciseCategory, PresetActivity, UserProfile } from '../types';
import { PRESET_ACTIVITIES } from '../data/presetData';
import { calculateCaloriesBurned } from '../utils/calculations';

interface AddActivityModalProps {
  isOpen: boolean;
  userProfile: UserProfile;
  onClose: () => void;
  onAddActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
}

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  userProfile,
  onClose,
  onAddActivity,
}) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPreset, setSelectedPreset] = useState<PresetActivity | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);

  // Custom activity inputs
  const [customName, setCustomName] = useState('');
  const [customMinutes, setCustomMinutes] = useState<number | ''>(30);
  const [customCalories, setCustomCalories] = useState<number | ''>('');
  const [customCategory, setCustomCategory] = useState<ExerciseCategory>('cardio');

  if (!isOpen) return null;

  // Filter preset activities
  const filteredPresets = PRESET_ACTIVITIES.filter((act) => {
    const matchesSearch =
      act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (act.nameEn && act.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || act.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculatedCalories = selectedPreset
    ? calculateCaloriesBurned(selectedPreset.met, userProfile.weightKg, durationMinutes)
    : 0;

  const handleSelectPreset = (preset: PresetActivity) => {
    setSelectedPreset(preset);
    setDurationMinutes(preset.defaultMinutes || 30);
  };

  const handleAddPreset = () => {
    if (!selectedPreset) return;
    onAddActivity({
      name: selectedPreset.name,
      nameEn: selectedPreset.nameEn,
      durationMinutes,
      caloriesBurned: calculatedCalories,
      met: selectedPreset.met,
      category: selectedPreset.category,
    });
    handleClose();
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customCalories === '' || customMinutes === '') return;

    onAddActivity({
      name: customName.trim(),
      durationMinutes: Number(customMinutes) || 0,
      caloriesBurned: Number(customCalories) || 0,
      met: 4.5, // average MET for custom
      category: customCategory,
    });
    handleClose();
  };

  const handleClose = () => {
    setSelectedPreset(null);
    setDurationMinutes(30);
    setSearchQuery('');
    setCustomName('');
    setCustomCalories('');
    setCustomMinutes(30);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              <Flame className="w-5 h-5 text-teal-600 fill-current" />
              บันทึกการออกกำลังกาย / เผาผลาญพลังงาน
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              คำนวณตามน้ำหนักตัว ({userProfile.weightKg} กก.) และค่า MET
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 flex border-b border-stone-200 gap-6 text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('preset')}
            className={`py-2.5 border-b-2 transition-colors ${
              activeTab === 'preset'
                ? 'border-teal-600 text-teal-700 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            กิจกรรมยอดนิยม (Presets)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`py-2.5 border-b-2 transition-colors ${
              activeTab === 'custom'
                ? 'border-teal-600 text-teal-700 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            ระบุเอง (Custom Activity)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'preset' ? (
            <div>
              {/* Search */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหากิจกรรม เช่น วิ่ง, ปั่นจักรยาน, แบดมินตัน, เวท..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 text-xs">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'cardio', label: 'คาร์ดิโอ (Cardio)' },
                  { id: 'strength', label: 'เวท/กล้ามเนื้อ (Strength)' },
                  { id: 'sports', label: 'กีฬา (Sports)' },
                  { id: 'daily', label: 'กิจวัตร/งานบ้าน (Daily)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-teal-800 text-white font-medium'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Activity List */}
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {filteredPresets.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    ไม่พบกิจกรรมที่ค้นหา ลองใช้คำค้นอื่น หรือใช้แท็บ &quot;ระบุเอง&quot;
                  </div>
                ) : (
                  filteredPresets.map((act) => {
                    const isSelected = selectedPreset?.id === act.id;
                    const previewBurn = calculateCaloriesBurned(act.met, userProfile.weightKg, 30);
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => handleSelectPreset(act)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-teal-50/70 border-teal-500 ring-1 ring-teal-500'
                            : 'bg-white border-stone-200 hover:bg-stone-50/70'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-xs sm:text-sm text-stone-900 truncate">
                            {act.name}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                            <span>MET: {act.met}</span>
                            <span className="text-stone-300">·</span>
                            <span>~{previewBurn} kcal ต่อ 30 นาที</span>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          {isSelected && <Check className="w-4 h-4 text-teal-600" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Duration and Live Burned Calculation */}
              {selectedPreset && (
                <div className="mt-4 p-4 bg-teal-50/60 border border-teal-200/80 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-950 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-700" />
                      ระยะเวลาที่ทำกิจกรรม:
                    </span>
                    <span className="text-xs font-bold text-teal-800">
                      {durationMinutes} นาที
                    </span>
                  </div>

                  {/* Quick Minutes Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setDurationMinutes(mins)}
                        className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                          durationMinutes === mins
                            ? 'bg-teal-600 text-white border-teal-600 font-semibold'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {mins} นาที
                      </button>
                    ))}
                  </div>

                  {/* Custom Minutes Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-stone-600 shrink-0">หรือระบุนาทีเอง:</span>
                    <input
                      type="number"
                      min="1"
                      max="600"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Math.max(1, Number(e.target.value) || 0))}
                      className="w-24 px-2.5 py-1 text-xs bg-white border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-xs text-stone-500">นาที</span>
                  </div>

                  {/* Calculated Output Box */}
                  <div className="pt-2 border-t border-teal-200/60 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-teal-800">พลังงานที่เผาผลาญโดยประมาณ:</div>
                      <div className="text-xl font-bold text-teal-900">
                        {calculatedCalories} <span className="text-xs font-normal text-stone-600">kcal</span>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-stone-500">
                      MET {selectedPreset.met} × {userProfile.weightKg} กก.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Custom Activity Form */
            <form onSubmit={handleAddCustom} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  ชื่อกิจกรรม / ชนิดการออกกำลังกาย <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="เช่น ตีสควอช, ปืนผาจำลอง, ซ้อมมวย..."
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    ระยะเวลา (นาที) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="เช่น 45"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    พลังงานที่เผาผลาญ (kcal) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="เช่น 320"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">หมวดหมู่</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as ExerciseCategory)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                >
                  <option value="cardio">คาร์ดิโอ (Cardio)</option>
                  <option value="strength">เวทเทรนนิ่ง / กล้ามเนื้อ (Strength)</option>
                  <option value="sports">กีฬา (Sports)</option>
                  <option value="daily">ชีวิตประจำวัน (Daily Activity)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs"
                >
                  บันทึกกิจกรรมการเผาผลาญ
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
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
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              บันทึก ({selectedPreset ? `+${calculatedCalories} kcal` : 'เลือกกิจกรรมก่อน'})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
