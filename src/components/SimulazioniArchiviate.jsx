import { memo } from "react";
import { FaTrophy, FaMedal, FaChartLine } from "react-icons/fa";
import useStore from "../store/useStore";

const SimulazioniArchiviate = memo(function SimulazioniArchiviate() {
  const simulazioni = useStore((s) => s.simulazioniArchiviate);

  return (
    <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
        <h2 className="text-xl font-bold text-[#2D3154] mb-1">Simulazioni Archiviate</h2>
        <p className="text-sm text-gray-400">Tutte le simulazioni completate</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {simulazioni.map((sim, index) => {
          const percentage = Math.round((sim.score / sim.maxScore) * 100);
          return (
            <div
              key={sim.id}
              className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] animate-[slideInUp_0.4s_ease-out_both]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0056D2]/10 rounded-full flex items-center justify-center">
                    {sim.rank <= 3 ? (
                      <FaTrophy size={18} color="#fbbf24" />
                    ) : (
                      <FaMedal size={18} color="#0056D2" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2D3154]">{sim.title}</h3>
                    <p className="text-xs text-gray-400">{sim.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-[#0056D2]">
                    {sim.score}
                    <span className="text-xs text-gray-400">/{sim.maxScore}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-400">Rank #{sim.rank}</div>
                </div>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-[#0056D2] to-[#3B82F6] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FaChartLine size={10} /> {percentage}% completato
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${percentage >= 70 ? "bg-green-100 text-green-600" : percentage >= 50 ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>
                  {percentage >= 70 ? "Eccellente" : percentage >= 50 ? "Buono" : "Da migliorare"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default SimulazioniArchiviate;
