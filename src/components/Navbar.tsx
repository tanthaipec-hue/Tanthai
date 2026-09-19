import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, User, BarChart2, RotateCcw, Flame } from 'lucide-react';
import { formatThaiDate, shiftDate, getTodayDateString } from '../utils/calculations';

interface NavbarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onOpenProfile: () => void;
  onOpenStats: () => void;
  onResetDay: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedDate,
  onDateChange,
  onOpenProfile,
  onOpenStats,
  onResetDay,
}) => {
  const isToday = selectedDate === getTodayDateString();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
            <Flame className="w-6 h-6 fill-current text-white" />
          </div>
          <div>
            <h1 className="font-bold text-stone-900 text-lg leading-tight tracking-tight flex items-center gap-1.5">
              Calorie & Energy
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded">
                นับแคล & เผาผลาญ
              </span>
            </h1>
            <p className="text-xs text-stone-500 hidden sm:block">บันทึกอาหารและพลังงานที่ใช้ประจำวัน</p>
          </div>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200/80">
          <button
            id="prev-day-button"
            type="button"
            onClick={() => onDateChange(shiftDate(selectedDate, -1))}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
            title="วันก่อนหน้า"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="px-3 py-1 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-800">
            <Calendar className="w-3.5 h-3.5 text-stone-500" />
            <span className="font-semibold">{formatThaiDate(selectedDate, 'short')}</span>
          </div>

          <button
            id="next-day-button"
            type="button"
            onClick={() => onDateChange(shiftDate(selectedDate, 1))}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-colors"
            title="วันถัดไป"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {!isToday && (
            <button
              id="today-shortcut-button"
              type="button"
              onClick={() => onDateChange(getTodayDateString())}
              className="ml-1 text-[11px] font-medium bg-white text-emerald-700 px-2 py-1 rounded-md border border-stone-200 hover:bg-emerald-50 transition-colors shadow-2xs"
            >
              กลับวันนี้
            </button>
          )}
        </div>

        {/* Utility Actions */}
        <div className="flex items-center gap-1.5">
          <button
            id="stats-modal-button"
            type="button"
            onClick={onOpenStats}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
            title="สถิติและภาพรวมรายสัปดาห์"
          >
            <BarChart2 className="w-5 h-5" />
          </button>

          <button
            id="profile-modal-button"
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60 rounded-xl text-xs sm:text-sm font-medium transition-colors"
            title="ตั้งค่าข้อมูลส่วนตัว BMR/TDEE"
          >
            <User className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">โปรไฟล์ / BMR</span>
          </button>

          <button
            id="reset-day-button"
            type="button"
            onClick={onResetDay}
            className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="ล้างข้อมูลของวันนี้"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
