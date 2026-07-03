import { useEffect, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import XPProgress from "./components/XPProgress";
import LoadingSpinner from "./components/LoadingSpinner";
import useStore from "./store/useStore";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Announcements from "./components/Announcements";
import Simulatore from "./components/Simulatore";
import SimulazioniArchiviate from "./components/SimulazioniArchiviate";
import ErrorNotebook from "./components/ErrorNotebook";
import SimulazioneUfficiale from "./components/SimulazioneUfficiale";
import MyStats from "./components/MyStats";

// Map sidebar menus to components
const MENU_COMPONENTS = {
  "Dashboard": Dashboard,
  "Bacheca annunci": Announcements,
  "Simulatore": Simulatore,
  "Simulazioni archiviate": SimulazioniArchiviate,
  "Quadernino degli errori": ErrorNotebook,
  "Simulazione ufficiale": SimulazioneUfficiale,
  "Le mie statistiche": MyStats,
};

function App() {
  const fetchUser = useStore((s) => s.fetchUser);
  const fetchProjects = useStore((s) => s.fetchProjects);
  const fetchLeaderboard = useStore((s) => s.fetchLeaderboard);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const activeMenu = useStore((s) => s.activeMenu);
  const isAuthenticated = useStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
      fetchProjects();
      fetchLeaderboard();
    }
  }, [isAuthenticated, fetchUser, fetchProjects, fetchLeaderboard]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login />;
  }

  // Get the current panel component based on active menu
  const CurrentPanel = MENU_COMPONENTS[activeMenu];

  return (
    <section className="flex flex-col h-screen w-full overflow-hidden bg-white">
      {/* Mobile sidebar overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[9999] transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Sidebar mobile onClose={toggleSidebar} />
      </div>

      {/* Header */}
      <Header />

      {/* Content row: sidebar + main */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-w-0">
        {/* Desktop sidebar */}
        <div className="hidden md:flex shrink-0">
          <Sidebar />
        </div>

        {/* Main scrollable content */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col px-0 md:px-6 lg:px-10 mt-10 z-10 shadow-sm">
          {/* Desktop XP Progress */}
          <div className="hidden md:block shrink-0 mb-4">
            <XPProgress />
          </div>

          {/* Content area */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-10 w-full lg:overflow-hidden pb-0 px-4 md:px-0">
            <Suspense fallback={<LoadingSpinner />}>
              {CurrentPanel && <CurrentPanel />}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
