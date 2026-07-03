import { memo, useState, useEffect } from "react";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import useStore from "../store/useStore";
import LoadingSpinner from "./LoadingSpinner";
import MobileTabNav from "./MobileBottomNav";

const Header = memo(function Header() {
  const user = useStore((s) => s.user);
  const userLoading = useStore((s) => s.userLoading);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const logout = useStore((s) => s.logout);
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
      {/* ===== MOBILE HEADER + XP (< md) ===== */}
      <div className="md:hidden flex flex-col shrink-0 relative">
        {/* Blue curved header */}
        <div
          className="header-curve px-6 pt-24 shrink-0 relative"
          style={{ clipPath: "url(#deep-header-curve)" }}
        >
          <div className="flex items-center mb-28 pb-4">
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 bg-[#33A3DB] rounded-full flex items-center justify-center border-none cursor-pointer shrink-0"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M10.5184 6.9063C11.554 6.90961 12.3937 7.7917 12.4 8.88299V10.8172C12.3937 11.9095 11.555 12.7934 10.5184 12.8H8.68288C7.64727 12.7934 6.81019 11.9086 6.80705 10.8172V8.88299C6.80705 7.7913 7.64689 6.9063 8.68288 6.9063H10.5184ZM2.63536 6.90631C2.82809 6.88457 3.01568 6.98067 3.1185 7.15382C3.22132 7.32696 3.22132 7.54677 3.1185 7.71991C3.01568 7.89306 2.82809 7.98916 2.63536 7.96742H1.88158C1.40078 7.96741 1.01012 8.37636 1.00696 8.883V10.793C1.01919 11.2956 1.40458 11.699 1.88158 11.7086H3.72863C3.96006 11.7102 4.18254 11.6144 4.34673 11.4426C4.51092 11.2707 4.60325 11.0369 4.60325 10.793V7.92497L4.5954 7.85363C4.58671 7.66387 4.67488 7.48112 4.83004 7.37745C5.00459 7.26082 5.22889 7.26769 5.39672 7.39481C5.56455 7.52193 5.64222 7.74377 5.59295 7.95529V10.8112C5.59295 11.9062 4.75054 12.7939 3.71137 12.7939H1.88158C0.851394 12.7714 0.0213736 11.8968 0 10.8112V8.883C0 8.3577 0.198418 7.854 0.551449 7.48312C0.90448 7.11225 1.38308 6.9047 1.88158 6.90631H2.63536ZM10.5184 7.96741H8.68288C8.20302 7.96741 7.81399 8.37733 7.81399 8.88299V10.8172C7.81247 11.0606 7.90351 11.2944 8.06679 11.4665C8.23007 11.6385 8.45197 11.7345 8.68288 11.7328H10.5184C10.7493 11.7345 10.9712 11.6385 11.1345 11.4665C11.2978 11.2944 11.3888 11.0606 11.3873 10.8172V8.88299C11.3873 8.64017 11.2957 8.40728 11.1328 8.23558C10.9699 8.06387 10.7489 7.96741 10.5184 7.96741ZM10.5184 0C11.5464 0.0257209 12.373 0.899471 12.3942 1.98276V3.91094C12.4004 4.43521 12.2086 4.94056 11.8611 5.31582C11.5137 5.69108 11.0389 5.9055 10.5414 5.91189H9.7819C9.52458 5.88286 9.32945 5.65404 9.32945 5.38134C9.32945 5.10863 9.52458 4.87981 9.7819 4.85078H10.5184C10.7514 4.84919 10.9741 4.74971 11.1372 4.57442C11.3004 4.39912 11.3904 4.16249 11.3873 3.91701V1.98276C11.3811 1.47982 10.9957 1.0737 10.5184 1.06717H8.68288C8.20302 1.06717 7.81401 1.47709 7.81401 1.98276V4.87504L7.80717 4.94697C7.76597 5.20529 7.5514 5.39967 7.29615 5.39649C7.16234 5.39334 7.03531 5.33385 6.94341 5.23131C6.85151 5.12878 6.8024 4.99173 6.80705 4.85078V1.98276C6.80552 1.45746 7.00248 0.953117 7.35443 0.581102C7.70638 0.209088 8.18438 0 8.68288 0H10.5184ZM3.71712 0C4.75498 0.00332929 5.59554 0.889093 5.5987 1.98276V3.91701C5.5987 4.44231 5.40028 4.94601 5.04725 5.31689C4.69422 5.68776 4.21562 5.89531 3.71712 5.89371H1.88158C0.845956 5.89039 0.00631007 5.0083 3.16473e-08 3.91701V1.98276C0.00628235 0.890464 0.845024 0.00662014 1.88158 0H3.71712ZM3.71712 1.06717H1.88158C1.64816 1.06228 1.42271 1.15659 1.25601 1.32882C1.08931 1.50106 0.995406 1.73674 0.995452 1.98276V3.91701C0.990706 4.16616 1.08254 4.40658 1.24976 4.5828C1.41698 4.75901 1.64514 4.85578 1.88158 4.85078H3.71712C3.95009 4.84919 4.17283 4.74971 4.33595 4.57442C4.49906 4.39912 4.58906 4.16249 4.58599 3.91701V1.98276C4.58285 1.47847 4.19568 1.07048 3.71712 1.06717Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className="flex items-center justify-between w-full">
              {userLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <h1 className="text-white pl-10 text-lg font-[700] tracking-tight">
                  Ciao,{" "}
                  {user?.name
                    ? `dr. ${user.name.replace("Dr. ", "")}`
                    : "dr. Luca"}
                  !
                </h1>
              )}
              <div className="bg-[#FBBF24] px-6 rounded-full text-black font-[900] text-sm shadow-lg">
                {user?.points ?? 345}
              </div>
            </div>
          </div>

          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath
                id="deep-header-curve"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M0,0 Q0.5,0.55 1,0 V1 H0 Z" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Light blue XP box — pulled up into the blue curve with negative margin */}
        <div className="-mt-24 relative z-[1000] px-0">
          <div className="pt-6 pb-4 px-6 w-full bg-[radial-gradient(circle,_white,_#dcf0fe,_#b9e2fc)] rounded-b-[30px] rounded-t-[20px]">
            <div className="w-full shadow-xl h-10 bg-white/30 rounded-full p-1 relative flex items-center">
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

            {/* Tabs — inside the light blue box */}
            <MobileTabNav />
          </div>
        </div>
      </div>

      {/* ===== DESKTOP/TABLET HEADER (md+) ===== */}
      <div className="hidden md:flex w-full items-center px-4 md:pt-2 md:pb-2 lg:py-2 bg-white shrink-0">
        <img
          src="https://bachecaa.vercel.app/image/logo.png"
          className="w-28 md:w-40 lg:w-36 h-10 md:h-14 lg:h-[60px] object-contain shrink-0"
          alt="Logo"
        />
        <header className="flex flex-1 items-center gap-4 md:gap-6 md:pl-[60px] px-4">
          <div>
            {userLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <h1 className="text-[16px] md:text-[20px] font-bold text-[#2D3154] leading-tight">
                  Ciao, {user?.name ?? "User"}!
                </h1>
                <p className="text-[#A0AEC0] font-normal text-[9px] md:text-[12px]">
                  Inizia la giornata con un nuovo corso!
                </p>
              </>
            )}
          </div>
          <div className="relative hidden lg:flex items-center justify-end h-10 w-48">
            <div className="absolute right-0 shadow-xl w-[140px] h-9 bg-[#1C58F2] rounded-full" />
            <div className="absolute left-8 w-[140px] h-8 bg-[#FBBF24] rounded-full gold-glow flex items-center justify-center z-10">
              <span className="text-[20px] pl-12 font-[900] text-[#1A202C]">
                {user?.points ?? "—"}
              </span>
              <img
                src="https://bachecaa.vercel.app/image/headlogo.png"
                className="pl-4 w-12"
                alt=""
              />
            </div>
          </div>
        </header>
        <img
          src={user?.avatar ?? "https://bachecaa.vercel.app/image/download.jpg"}
          alt={user?.name ?? "Profile"}
          className="w-10 lg:w-12 h-10 lg:h-12 rounded-full mr-3 object-cover shrink-0"
        />
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors mr-3"
          title="Logout"
        >
          <FaSignOutAlt />
          <span className="hidden lg:inline text-sm font-semibold">Esci</span>
        </button>
      </div>
    </>
  );
});

export default Header;
