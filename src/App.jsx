import { useEffect, lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import XPProgress from "./components/XPProgress";
import LoadingSpinner from "./components/LoadingSpinner";
import useStore from "./store/useStore";

const ProjectList = lazy(() => import("./components/ProjectList"));
const Leaderboard = lazy(() => import("./components/Leaderboard"));

function App() {
  const fetchUser = useStore((s) => s.fetchUser);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const activeTab = useStore((s) => s.activeTab);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <section className="flex flex-col h-screen w-full overflow-hidden bg-white">
      {/* Mobile sidebar overlay — full screen on top */}
      <div
        className={`md:hidden fixed inset-0 z-[9999] transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Sidebar mobile onClose={toggleSidebar} />
      </div>

      {/* Header (includes mobile XP overlay) */}
      <Header />

      {/* Content row: sidebar + main */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-w-0">
        {/* Desktop/tablet sidebar */}
        <div className="hidden md:flex shrink-0">
          <Sidebar />
        </div>

        {/* Main scrollable content */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col px-0 md:px-6 lg:px-10 mt-10 z-10 shadow-sm">
          {/* Desktop/tablet XP Progress */}
          <div className="hidden md:block shrink-0 mb-4">
            <XPProgress />
          </div>

          {/* Content area */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-10 w-full lg:overflow-hidden pb-0 px-4 md:px-0">
            <Suspense fallback={<LoadingSpinner />}>
              <div className={`flex-[1.5] flex-col min-w-0 ${activeTab === "corsi" ? "flex" : "hidden"} md:!flex`}>
                <div className="flex-1 lg:overflow-y-auto lg:pr-10 custom-scrollbar space-y-3">
                  <ProjectList />
                </div>
              </div>
              <div className={`flex-col ${activeTab === "leaderboard" ? "flex" : "hidden"} md:!flex`}>
                <Leaderboard />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
