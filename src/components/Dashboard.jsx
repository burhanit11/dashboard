import { memo, useEffect, useState } from "react";
import { FaTrophy, FaFire, FaClock, FaGraduationCap, FaArrowUp, FaStar, FaBolt } from "react-icons/fa";
import useStore from "../store/useStore";

const Dashboard = memo(function Dashboard() {
  const user = useStore((s) => s.user);
  const statistics = useStore((s) => s.statistics);
  const leaderboard = useStore((s) => s.leaderboard);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const currentUserRank = leaderboard.findIndex((l) => l.id === user?.id) + 1 || 8;
  const maxPoints = Math.max(...statistics.weeklyProgress.map((d) => d.points), 1);

  const statCards = [
    { label: "Punti Totali", value: statistics.totalPoints.toLocaleString(), icon: FaTrophy, color: "#F59E0B", gradient: "from-amber-400/20 to-orange-500/20" },
    { label: "Streak Attuale", value: `${user?.streak}`, suffix: "🔥", icon: FaFire, color: "#EF4444", gradient: "from-red-400/20 to-pink-500/20" },
    { label: "Corsi Completati", value: statistics.coursesCompleted, icon: FaGraduationCap, color: "#10B981", gradient: "from-emerald-400/20 to-teal-500/20" },
    { label: "Ore di Studio", value: statistics.hoursLearned, suffix: "h", icon: FaClock, color: "#3B82F6", gradient: "from-blue-400/20 to-indigo-500/20" },
  ];

  // Calculate donut chart paths
  const total = statistics.categoryBreakdown.reduce((sum, c) => sum + c.percentage, 0);
  let currentAngle = -90;
  const donutPaths = statistics.categoryBreakdown.map((cat) => {
    const angle = (cat.percentage / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...cat, startAngle, angle };
  });

  const describeArc = (startAngle, angle, color) => {
    const r = 40;
    const cx = 50;
    const cy = 50;
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, startAngle + angle);
    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <div className="flex-1 w-full animate-[fadeIn_0.5s_ease-out] overflow-y-auto custom-scrollbar">
      {/* Welcome Hero */}
      <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0056D2] via-[#1a7fd4] to-[#33A3DB] p-6 shadow-xl mx-4 mt-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm mb-1">Ben tornato,</p>
            <h1 className="text-3xl font-black text-white mb-1">dr. {user?.name}! 👋</h1>
            <p className="text-white/70 text-sm">Continua il tuo percorso di eccellenza</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="text-white text-xs font-bold">🔥 {user?.streak} day streak</span>
              </div>
              <div className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="text-white text-xs font-bold">⭐ Livello {user?.level}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black text-white">{user?.points}</div>
            <div className="text-white/70 text-sm">punti totali</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-[slideInUp_0.5s_ease-out_both] ${animated ? "" : "opacity-0 translate-y-4"}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-sm`}>
                <Icon size={22} color={stat.color} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#2D3154]">{stat.value}</span>
                {stat.suffix && <span className="text-lg font-bold text-gray-400">{stat.suffix}</span>}
              </div>
              <div className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 mb-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-[#2D3154]">Progresso Settimanale</h3>
              <p className="text-xs text-gray-400 mt-0.5">Punti guadagnati per giorno</p>
            </div>
            <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
              <FaArrowUp size={12} color="#10B981" />
              <span className="text-xs font-bold text-green-600">+12%</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-40 px-2">
            {statistics.weeklyProgress.map((day, index) => {
              const height = (day.points / maxPoints) * 100;
              const isHigh = day.points >= maxPoints * 0.8;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative h-32 flex items-end">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ease-out ${isHigh ? "bg-gradient-to-t from-[#0056D2] to-[#33A3DB]" : "bg-gradient-to-t from-[#0056D2]/60 to-[#3B82F6]/60"}`}
                      style={{ height: animated ? `${height}%` : "0%" }}
                    />
                    {isHigh && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                        <FaBolt size={10} color="#FBBF24" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{day.day}</span>
                  <span className={`text-xs font-bold ${isHigh ? "text-[#0056D2]" : "text-gray-400"}`}>{day.points}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl p-5 shadow-md">
          <h3 className="text-base font-bold text-[#2D3154] mb-2">Distribuzione</h3>
          <p className="text-xs text-gray-400 mb-4">Materie studiate</p>
          <div className="relative flex justify-center">
            <svg width="140" height="140" viewBox="0 0 100 100" className="transform -rotate-0">
              {donutPaths.map((cat, index) => (
                <path
                  key={cat.name}
                  d={describeArc(cat.startAngle, cat.angle - 2, cat.color)}
                  fill="none"
                  stroke={cat.color}
                  strokeWidth="18"
                  className="transition-all duration-700"
                  style={{ opacity: animated ? 1 : 0 }}
                />
              ))}
              <circle cx="50" cy="50" r="25" fill="white" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-black text-[#2D3154]">{total}%</div>
              <div className="text-[9px] text-gray-400">completato</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {statistics.categoryBreakdown.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-xs text-gray-600 flex-1">{cat.name}</span>
                <span className="text-xs font-bold text-gray-400">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 pb-6">
        {/* XP Progress */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Livello {user?.level}</h3>
              <p className="text-xs text-white/70">Vp to next level</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <FaStar size={24} color="white" />
            </div>
          </div>
          <div className="mb-2 flex justify-between text-xs text-white/80">
            <span>{user?.currentXP} XP</span>
            <span>{user?.maxXP} XP</span>
          </div>
          <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: animated ? `${((user?.currentXP - user?.minXP) / (user?.maxXP - user?.minXP)) * 100}%` : "0%" }}
            />
          </div>
          <p className="text-xs text-white/60 mt-2 text-right">{Math.round(((user?.maxXP - user?.currentXP) / (user?.maxXP - user?.minXP)) * 100)}% remaining</p>
        </div>

        {/* Quick Rank */}
        <div className="bg-white rounded-xl p-5 shadow-md">
          <h3 className="text-base font-bold text-[#2D3154] mb-3">Classifica Attuale</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center shadow-lg">
                <span className="text-2xl font-black text-white">#{currentUserRank}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                <FaArrowUp size={12} color="white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-[#2D3154]">Top {(100 - Math.round((currentUserRank / leaderboard.length) * 100)).toFixed(0)}%</p>
              <p className="text-xs text-gray-400 mt-0.5">{leaderboard.length} studenti totali</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-yellow-500 font-semibold">{statistics.totalPoints.toLocaleString()} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;