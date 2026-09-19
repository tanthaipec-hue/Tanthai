import React from 'react';
import { Plus, Trash2, Flame, Clock, Activity, Dumbbell, Trophy, HeartPulse } from 'lucide-react';
import { ActivityItem, ExerciseCategory, UserProfile } from '../types';

interface ActivityTrackerProps {
  activities: ActivityItem[];
  userProfile: UserProfile;
  onOpenAddModal: () => void;
  onDeleteActivity: (id: string) => void;
}

export const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  activities,
  userProfile,
  onOpenAddModal,
  onDeleteActivity,
}) => {
  const totalBurned = activities.reduce((sum, a) => sum + a.caloriesBurned, 0);
  const totalMinutes = activities.reduce((sum, a) => sum + a.durationMinutes, 0);

  const getCategoryBadge = (cat: ExerciseCategory) => {
    switch (cat) {
      case 'cardio':
        return { label: 'คาร์ดิโอ', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'strength':
        return { label: 'เวท/กล้ามเนื้อ', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'sports':
        return { label: 'กีฬา', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'daily':
        return { label: 'ชีวิตประจำวัน', color: 'bg-teal-50 text-teal-700 border-teal-200' };
      default:
        return { label: 'กิจกรรม', color: 'bg-stone-50 text-stone-700 border-stone-200' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <h2 className="text-lg font-bold text-stone-900">พลังงานที่ใช้ / ออกกำลังกาย (Energy Expended)</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            คำนวณการเผาผลาญตามค่า MET และน้ำหนักตัว ({userProfile.weightKg} กก.)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-stone-500">เวลารวม:</span>
            <span className="ml-1 text-sm font-bold text-stone-800">{totalMinutes} นาที</span>
          </div>
          <div className="text-right pl-3 border-l border-stone-200">
            <span className="text-xs text-stone-500">เผาผลาญรวม:</span>
            <span className="ml-1.5 text-base sm:text-lg font-bold text-teal-700">
              {totalBurned.toLocaleString()} <span className="text-xs font-normal text-stone-500">kcal</span>
            </span>
          </div>
        </div>
      </div>

      {/* Activity List */}
      {activities.length === 0 ? (
        <div className="py-8 px-4 text-center rounded-xl border border-dashed border-stone-200 bg-stone-50/40 mb-4">
          <Activity className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-stone-600">ยังไม่มีบันทึกการออกกำลังกายของวันนี้</p>
          <p className="text-xs text-stone-400 mt-0.5">
            เพิ่มการวิ่ง เดิน เวทเทรนนิ่ง หรือกิจกรรมประจำวันเพื่อคำนวณพลังงานที่เผาผลาญ
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 mb-4">
          {activities.map((act) => {
            const badge = getCategoryBadge(act.category);
            return (
              <div
                key={act.id}
                className="bg-stone-50/60 p-3 sm:p-3.5 rounded-xl border border-stone-200/80 hover:bg-white hover:border-stone-300 transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-stone-800 truncate">
                        {act.name}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {act.durationMinutes} นาที
                      </span>
                      <span className="text-stone-300">·</span>
                      <span className="text-stone-400">MET: {act.met}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-bold text-teal-700">
                      +{act.caloriesBurned} <span className="text-xs font-normal text-stone-400">kcal</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteActivity(act.id)}
                    className="p-1.5 text-stone-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="ลบรายการ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Button */}
      <button
        id="open-add-activity-modal-button"
        type="button"
        onClick={onOpenAddModal}
        className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100/90 border border-teal-200/80 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
      >
        <Plus className="w-4 h-4 text-teal-700" />
        บันทึกการออกกำลังกาย / เผาผลาญพลังงาน
      </button>
    </div>
  );
};
