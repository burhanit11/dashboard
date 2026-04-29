import { memo } from "react";
import useStore from "../store/useStore";

const TABS = [
  { id: "corsi", label: "CORSI" },
  { id: "storico", label: "STORICO" },
  { id: "leaderboard", label: "LEADERBOARD" },
];

const MobileTabNav = memo(function MobileTabNav() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);

  return (
    <div className="md:hidden flex items-center justify-between bg-white z-[100000] shadow-lg mt-8 rounded-full p-1 shrink-0 -mb-6 mx-auto w-[90%] relative">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-full border-none cursor-pointer transition-all whitespace-nowrap text-center ${
              isActive
                ? "bg-[#2BA5DA] text-white shadow-md py-3 px-1 text-[12px] font-[800]"
                : "bg-transparent text-[#B0B0B0] py-3 text-[12px] font-[700]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
});

export default MobileTabNav;
