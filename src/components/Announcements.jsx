import { memo } from "react";
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import useStore from "../store/useStore";

const TYPE_CONFIG = {
  info: { icon: FaBell, color: "#3B82F6", bg: "bg-blue-50", border: "border-blue-200" },
  warning: { icon: FaExclamationTriangle, color: "#F59E0B", bg: "bg-yellow-50", border: "border-yellow-200" },
  success: { icon: FaCheckCircle, color: "#10B981", bg: "bg-green-50", border: "border-green-200" },
  danger: { icon: FaExclamationCircle, color: "#EF4444", bg: "bg-red-50", border: "border-red-200" },
};

const Announcements = memo(function Announcements() {
  const announcements = useStore((s) => s.announcements);

  return (
    <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
        <h2 className="text-xl font-bold text-[#2D3154] mb-1">Bacheca Annunci</h2>
        <p className="text-sm text-gray-400">Notizie e aggiornamenti dalla piattaforma</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {announcements.map((item, index) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.info;
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className={`${config.bg} border ${config.border} rounded-xl p-4 animate-[slideInUp_0.4s_ease-out_both]`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon size={16} color={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-[#2D3154]">{item.title}</h3>
                    <span className="text-[10px] text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] font-medium text-gray-400">di {item.author}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.bg} border ${config.border}`} style={{ color: config.color }}>
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Announcements;
