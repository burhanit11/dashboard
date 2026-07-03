import { memo } from "react";
import { FaExclamationTriangle, FaCheckCircle, FaBook } from "react-icons/fa";
import useStore from "../store/useStore";

const ErrorNotebook = memo(function ErrorNotebook() {
  const errors = useStore((s) => s.errors);
  const resolveError = useStore((s) => s.resolveError);

  const unresolved = errors.filter((e) => !e.resolved);
  const resolved = errors.filter((e) => e.resolved);

  return (
    <div className="flex-1 flex flex-col animate-[fadeIn_0.4s_ease-out]">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2D3154] mb-1">Quadernino degli Errori</h2>
            <p className="text-sm text-gray-400">Gli errori più frequenti da ripassare</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-red-500">{unresolved.length}</div>
              <div className="text-xs text-gray-400">Da risolvere</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-green-500">{resolved.length}</div>
              <div className="text-xs text-gray-400">Risolti</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
        {unresolved.length > 0 && (
          <>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">⚠️ Da Ripassare</h3>
            {unresolved.map((error, index) => (
              <div
                key={error.id}
                className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-l-4 border-red-400 animate-[slideInUp_0.4s_ease-out_both]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                      <FaExclamationTriangle size={14} color="#EF4444" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#2D3154]">{error.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{error.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-medium text-[#0056D2] bg-[#0056D2]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <FaBook size={8} /> {error.course}
                        </span>
                        <span className="text-[10px] text-gray-400">Sbagliato {error.timesWrong}x</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => resolveError(error.id)}
                    className="text-xs font-bold text-green-500 hover:text-green-600 flex items-center gap-1 shrink-0"
                  >
                    <FaCheckCircle size={12} /> Segna risolto
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {resolved.length > 0 && (
          <>
            <h3 className="text-sm font-bold text-green-400 uppercase tracking-wide mb-2 mt-4">✅ Risolti</h3>
            {resolved.map((error, index) => (
              <div
                key={error.id}
                className="bg-green-50/50 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-l-4 border-green-400 animate-[slideInUp_0.4s_ease-out_both] opacity-70"
                style={{ animationDelay: `${(unresolved.length + index) * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <FaCheckCircle size={14} color="#10B981" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2D3154] line-through">{error.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{error.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FaCheckCircle size={8} /> Risolto
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {errors.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle size={32} color="#10B981" />
              </div>
              <h3 className="text-lg font-bold text-gray-400">Nessun errore registrato!</h3>
              <p className="text-sm text-gray-400">Continua così.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ErrorNotebook;
