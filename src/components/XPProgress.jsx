import { memo, useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import useStore from "../store/useStore";

const XPProgress = memo(function XPProgress() {
  const user = useStore((s) => s.user);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const currentXP = user?.currentXP ?? 650;
  const minXP = user?.minXP ?? 500;
  const maxXP = user?.maxXP ?? 800;
  const progress = ((currentXP - minXP) / (maxXP - minXP)) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progress), 200);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <>
      {/* ===== MOBILE XP (< md) ===== */}
      <div className="md:hidden pt-14 pb-16 px-6 w-full bg-[radial-gradient(circle,_white,_#dcf0fe,_#b9e2fc)] rounded-b-[30px] rounded-t-[20px]">
        <div className="w-full shadow-xl h-8 bg-white/30 rounded-full p-1 relative flex items-center">
          <div
            className="h-full bg-[#FCC063]/90 progress-striped rounded-full relative transition-[width] duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
          >
            <span className="absolute left-2 top-1 pt-1 pb-0.5 text-[#008DD2] bg-white px-3 rounded-lg text-[8px] font-black uppercase">
              {minXP} XP
            </span>

            <div className="absolute -top-7 -right-12 flex flex-col items-center">
              <div className="bg-white text-[#3B82F6] px-4 py-1 rounded-full text-[8px] font-medium font-[500] shadow-xl">
                {currentXP} XP
              </div>
              <div className="bg-blue-500 w-5 h-5 absolute top-4 rounded-full border-[3px] border-white flex items-center justify-center">
                <FaChevronDown className="text-[8px] font-bold text-white" />
              </div>
            </div>
          </div>
          <span className="absolute right-4 text-gray-400 font-black text-[10px] opacity-70">
            {maxXP} XP
          </span>
        </div>
      </div>

      {/* ===== DESKTOP/TABLET XP (md+) ===== */}
      <div className="hidden md:flex w-full h-28 md:h-32 bg-gradient-to-r from-[#D1E9FF] via-[#8BBDF9] to-[#0E69D0] rounded-[10px] items-center justify-between px-3 sm:px-6 shrink-0">
        <img
          src="https://bachecaa.vercel.app/image/doc.png"
          className="w-20 md:w-[140px] h-auto object-contain"
          alt="Doctor"
        />

        <div className="flex-1 mx-2 sm:mx-4 h-7 bg-white/40 rounded-full relative flex items-center px-1">
          <div
            className="h-4 md:h-5 progress-striped rounded-full flex py-3 items-center pl-2 relative transition-[width] duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
          >
            <span className="text-[#0056D2] px-2 sm:px-4 py-0.5 rounded-full bg-white text-[10px] font-bold shadow-sm whitespace-nowrap">
              {minXP} XP
            </span>

            <div className="absolute -top-10 -right-6 flex flex-col items-center">
              <div className="bg-white text-[#0056D2] px-3 py-1 rounded-lg text-[10px] font-black shadow-lg">
                {currentXP} XP
              </div>
              <div className="bg-[#0056D2] w-5 h-5 rounded-full border-2 border-white flex items-center justify-center -mt-1 shadow-md">
                <FaChevronDown className="text-[8px] text-white" />
              </div>
            </div>
          </div>

          <span className="absolute right-4 sm:right-6 text-gray-600 font-black text-sm opacity-60">
            {maxXP} XP
          </span>
        </div>

        <img
          src="https://bachecaa.vercel.app/image/appendicamice%203.png"
          className="w-20 md:w-[140px] h-auto object-contain opacity-90"
          alt="Doctor Lock"
        />
      </div>
    </>
  );
});

export default XPProgress;
