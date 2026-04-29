import { memo, useEffect } from "react";
import { FaCrown, FaStar } from "react-icons/fa";
import useStore from "../store/useStore";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const RANK_BORDER_COLORS = ["border-yellow-500", "border-gray-400", "border-orange-400", "border-orange-400"];
const RANK_TEXT_COLORS = ["text-yellow-600", "text-gray-500", "text-orange-500", "text-orange-500"];
const AVATAR_BORDER_COLORS = ["#fbbf24", "#334155", "#F19C69", "#F19C69"];

const Leaderboard = memo(function Leaderboard() {
  const leaderboard = useStore((s) => s.leaderboard);
  const leaderboardLoading = useStore((s) => s.leaderboardLoading);
  const leaderboardError = useStore((s) => s.leaderboardError);
  const fetchLeaderboard = useStore((s) => s.fetchLeaderboard);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="flex-1 flex flex-col leaderboard-bg rounded-t-[40px] p-5 md:p-7 items-center shrink-0 min-h-[500px] md:min-h-0 max-w-full overflow-hidden">
      {/* Title */}
      <div className="border border-[#F3A222] rounded-xl px-8 xl:px-28 py-2 mb-6 text-center shrink-0">
        <h2 className="text-md md:text-3xl font-bold font-[500] text-white tracking-[0.1em] uppercase">
          LEADERBOARD
        </h2>
      </div>

      {leaderboardLoading && <LoadingSpinner className="text-white" />}

      {leaderboardError && (
        <ErrorMessage message={leaderboardError} onRetry={fetchLeaderboard} />
      )}

      {!leaderboardLoading && !leaderboardError && (
        <div className="w-full flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1 pb-0">
          {leaderboard.map((leader, index) => (
            <div
              key={leader.id}
              className="bg-white rounded-[18px] py-3 px-6 flex items-center justify-between shadow-md shrink-0 animate-[slideInRight_0.5s_ease-out_both]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex items-center gap-2">
                {/* Rank number */}
                <div
                  className={`w-5 h-5 flex mr-2 items-center justify-center rounded-full border ${
                    RANK_BORDER_COLORS[index] ?? "border-gray-400"
                  } text-[10px] font-bold ${
                    RANK_TEXT_COLORS[index] ?? "text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-3">
                  {index === 0 ? (
                    <div className="relative w-8 h-8 shrink-0">
                      <div className="w-full h-full bg-[#3B82F6]/20 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <FaCrown className="text-white text-[8px]" />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -left-1 -right-1 bg-red-500 text-white text-[5px] font-black py-0.5 rounded text-center uppercase">
                        Winner
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full border-[3px] flex items-center justify-center shrink-0 bg-[#96A7FF]"
                      style={{ borderColor: AVATAR_BORDER_COLORS[index] }}
                    />
                  )}

                  {/* Name + stars */}
                  <div>
                    <p className="text-[14px] font-black text-gray-800">
                      {leader.name}
                    </p>
                    <div className="flex text-[7px] text-yellow-500 mt-0.5 gap-0.5">
                      {Array.from({ length: leader.stars }, (_, i) => (
                        <FaStar key={i} size={7} color="#fbbf24" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Score */}
              <span className="text-[12px] font-medium font-[500] text-[#D0BD46]">
                {leader.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Leaderboard;
