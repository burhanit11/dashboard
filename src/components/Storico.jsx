import { memo } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import useStore from "../store/useStore";

const Storico = memo(function Storico() {
  const storico = useStore((s) => s.storico);

  const getStatusColor = (status) =>
    status === "passed" ? "text-green-500" : "text-red-500";
  const getStatusBg = (status) =>
    status === "passed" ? "bg-green-100" : "bg-red-100";

  return (
    <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
        <h2 className="text-xl font-bold text-[#2D3154] mb-1">Storico Simulazioni</h2>
        <p className="text-sm text-gray-400">Cronologia di tutti i tuoi test e quiz</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {storico.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between animate-[slideInUp_0.4s_ease-out_both]"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusBg(item.status)}`}>
                {item.status === "passed" ? (
                  <FaCheckCircle className={getStatusColor(item.status)} size={20} />
                ) : (
                  <FaTimesCircle className={getStatusColor(item.status)} size={20} />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2D3154]">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400">{item.date}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FaClock size={10} /> {item.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className={`text-lg font-black ${item.score >= 70 ? "text-green-500" : item.score >= 50 ? "text-yellow-500" : "text-red-500"}`}>
                {item.score}
                <span className="text-xs text-gray-400">/{item.maxScore}</span>
              </div>
              <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.status === "passed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {item.status === "passed" ? "Superato" : "Da ripetere"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Storico;
