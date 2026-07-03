import { memo } from "react";
import { FaTrophy, FaClock, FaFire, FaChartBar, FaStar } from "react-icons/fa";
import useStore from "../store/useStore";

const MyStats = memo(function MyStats() {
  const user = useStore((s) => s.user);
  const statistics = useStore((s) => s.statistics);
  const leaderboard = useStore((s) => s.leaderboard);

  const currentUserRank = leaderboard.findIndex((l) => l.id === user?.id) + 1 || 8;

  const statCards = [
    { label: "Punti Totali", value: statistics.totalPoints.toLocaleString(), icon: FaTrophy, color: "#fbbf24" },
    { label: "Corsi Completati", value: statistics.coursesCompleted, icon: FaStar, color: "#3B82F6" },
    { label: "Ore di Studio", value: `${statistics.hoursLearned}h`, icon: FaClock, color: "#10B981" },
    { label: "Streak Attuale", value: `${statistics.currentStreak} giorni`, icon: FaFire, color: "#EF4444" },
  ];

  return (
    <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out] overflow-y-auto custom-scrollbar pr-1">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
        <h2 className="text-xl font-bold text-[#2D3154] mb-1">Le Mie Statistiche</h2>
        <p className="text-sm text-gray-400">Riepilogo della tua attività</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] animate-[slideInUp_0.4s_ease-out_both]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}20` }}>
                <Icon size={18} color={stat.color} />
              </div>
              <div className="text-2xl font-black text-[#2D3154]">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4 animate-[slideInUp_0.4s_ease-out_both]" style={{ animationDelay: "240ms" }}>
        <h3 className="text-sm font-bold text-[#2D3154] mb-4 flex items-center gap-2">
          <FaChartBar size={14} color="#0056D2" /> Progresso Settimanale
        </h3>
        <div className="flex items-end justify-between gap-2 h-24">
          {statistics.weeklyProgress.map((day, index) => {
            const maxPoints = Math.max(...statistics.weeklyProgress.map((d) => d.points));
            const height = (day.points / maxPoints) * 100;
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[#0056D2]/20 rounded-t-lg transition-all duration-500 relative"
                  style={{ height: `${height}%`, minHeight: "8px" }}
                >
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#0056D2] to-[#3B82F6] rounded-t-lg"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{day.day}</span>
                <span className="text-[9px] text-[#0056D2] font-bold">{day.points}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4 animate-[slideInUp_0.4s_ease-out_both]" style={{ animationDelay: "300ms" }}>
        <h3 className="text-sm font-bold text-[#2D3154] mb-4">Distribuzione per Materia</h3>
        <div className="space-y-3">
          {statistics.categoryBreakdown.map((cat, index) => (
            <div key={cat.name} className="flex items-center gap-3">
              <div className="w-20 text-xs font-medium text-gray-600">{cat.name}</div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                />
              </div>
              <div className="w-10 text-xs font-bold text-gray-500 text-right">{cat.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-white rounded-xl p-4 shadow-[0 2px 8px rgba(0,0,0,0.06)] mb-4 animate-[slideInUp_0.4s_ease-out_both]" style={{ animationDelay: "360ms" }}>
        <h3 className="text-sm font-bold text-[#2D3154] mb-4">Altre Statistiche</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Streak più lungo</span>
            <span className="text-sm font-bold text-[#2D3154]">{statistics.longestStreak} giorni 🔥</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Punteggio medio</span>
            <span className="text-sm font-bold text-[#2D3154]">{statistics.averageScore}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Simulazioni totali</span>
            <span className="text-sm font-bold text-[#2D3154]">{statistics.totalSimulations}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Rank attuale</span>
            <span className="text-sm font-bold text-[#0056D2]">#{statistics.rank}</span>
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="bg-gradient-to-r from-[#D1E9FF] to-[#8BBDF9] rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] animate-[slideInUp_0.4s_ease-out_both]" style={{ animationDelay: "420ms" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#0056D2]">Livello {user?.level}</span>
          <span className="text-xs text-[#0056D2]">{user?.currentXP}/{user?.maxXP} XP</span>
        </div>
        <div className="w-full h-4 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0056D2] to-[#3B82F6] rounded-full transition-all duration-700"
            style={{ width: `${((user?.currentXP - user?.minXP) / (user?.maxXP - user?.minXP)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
});

export default MyStats;
