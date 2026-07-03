import { memo } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import useStore from "../store/useStore";

const NAV_ITEMS = [
  {
    label: "Bacheca annunci",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 0C2.93913 0 1.92172 0.421427 1.17157 1.17157C0.421427 1.92172 0 2.93913 0 4V16C0 17.0609 0.421427 18.0783 1.17157 18.8284C1.92172 19.5786 2.93913 20 4 20H18V0H4ZM8 3H15V5H8V3ZM2 16C2 15.4696 2.21071 14.9609 2.58579 14.5858C2.96086 14.2107 3.46957 14 4 14H16V18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Simulatore",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 1.17188C11.4565 1.17188 10.9219 1.77187 10.9219 2.625C10.9219 3.47813 11.4565 4.07812 12 4.07812C12.5435 4.07812 13.0781 3.47813 13.0781 2.625C13.0781 1.77187 12.5435 1.17188 12 1.17188ZM7.1273 1.31133L6.3727 1.68867C7.08014 3.10359 8.78067 4.35164 10.2253 5.17814L10.8907 13.8281H11.5781V9H12.4219V13.8281H13.1093L13.7747 5.17814C15.2193 4.35164 16.9199 3.10359 17.6273 1.68867L16.8727 1.31133C15.9394 2.71289 14.7684 3.61514 13.5289 4.0193C13.1865 4.56 12.6445 4.92188 12 4.92188C11.3555 4.92188 10.8136 4.56 10.4711 4.01925C9.23156 3.61519 8.06058 2.71289 7.1273 1.31133ZM7.92188 14.6719V19.1719H1.17188V22.8281H22.8281V21.4219H16.0781V14.6719H7.92188Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Simulazioni archiviate",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 18L16 14L14.6 12.6L13 14.2V10H11V14.2L9.4 12.6L8 14L12 18ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V6.52501C3 6.29167 3.03767 6.06667 3.113 5.85001C3.18833 5.63334 3.30067 5.43334 3.45 5.25001L4.7 3.72501C4.88333 3.49167 5.11233 3.31234 5.387 3.18701C5.66167 3.06167 5.94933 2.99934 6.25 3.00001H17.75C18.05 3.00001 18.3377 3.06267 18.613 3.18801C18.8883 3.31334 19.1173 3.49234 19.3 3.72501L20.55 5.25001C20.7 5.43334 20.8127 5.63334 20.888 5.85001C20.9633 6.06667 21.0007 6.29167 21 6.52501V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5.4 6.00001H18.6L17.75 5.00001H6.25L5.4 6.00001Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Quadernino degli errori",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Simulazione ufficiale",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Le mie statistiche",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor" />
      </svg>
    ),
  },
];

function SidebarContent({ mobile = false, onClose }) {
  const activeMenu = useStore((s) => s.activeMenu);
  const setActiveMenu = useStore((s) => s.setActiveMenu);

  return (
    <>
      {/* Decorative blur circles */}
      <div className="absolute -left-10 top-48 w-24 h-24 bg-black/40 rounded-full blur-[40px] pointer-events-none" />
      <div className="absolute left-40 top-1/2 w-28 h-28 bg-black/30 rounded-full blur-[50px] pointer-events-none" />
      <div className="absolute -left-10 bottom-20 w-32 h-32 bg-black/20 rounded-full blur-[40px] pointer-events-none" />

      {/* Close button — mobile only */}
      {mobile && (
        <div className="flex justify-between items-center mb-10 mt-8 px-4 shrink-0">
          <button
            onClick={onClose}
            className="text-2xl text-white hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <div className={`flex flex-col ${mobile ? "pt-2 px-4 space-y-[35px]" : "pt-16 px-2 space-y-[40px]"}`}>
          {/* Dashboard button */}
          <a
            href="#"
            onClick={() => setActiveMenu("Dashboard")}
            className={`flex items-center gap-4 pl-1 font-semibold rounded-lg px-3 py-2 transition-all ${
              mobile ? "text-[12px]" : "text-[16px]"
            } no-underline ${
              activeMenu === "Dashboard"
                ? "bg-[#15242B] text-white opacity-100"
                : "text-[#FFFBFB] opacity-90 hover:opacity-100 hover:bg-[#15242B]/50"
            }`}
          >
            <span className="w-6 h-6 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 7V18H7V13H13V18H18V7L10 2Z" fill="currentColor" />
              </svg>
            </span>
            <span>Dashboard</span>
          </a>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              onClick={() => setActiveMenu(item.label)}
              className={`flex items-center gap-4 pl-1 font-semibold rounded-lg px-3 py-2 transition-all ${
                mobile ? "text-[12px]" : "text-[16px]"
              } no-underline ${
                activeMenu === item.label
                  ? "bg-[#15242B] text-white opacity-100"
                  : "text-[#FFFBFB] opacity-90 hover:opacity-100 hover:bg-[#15242B]/50"
              }`}
            >
              <span className="w-6 h-6 flex items-center justify-center shrink-0">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Logout button */}
      <div className="mt-auto pt-6 pb-2 mb-6 px-4">
        <button className="w-full text-[15px] font-semibold bg-white text-[#FF4D4D] px-6 py-3 rounded-full shadow-lg flex items-center justify-start hover:bg-gray-50 transition-all active:scale-95 group border-none cursor-pointer">
          <FaSignOutAlt className="rotate-180 text-sm mr-3 group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

const Sidebar = memo(function Sidebar({ mobile = false, onClose }) {
  if (mobile) {
    return (
      <aside className="h-full w-full bg-[#0056D2] text-white flex flex-col p-4 shadow-2xl relative overflow-hidden">
        <SidebarContent mobile onClose={onClose} />
      </aside>
    );
  }

  return (
    <aside className="w-[260px] bg-[#0056D2] text-white flex flex-col px-4 sidebar-radius shrink-0 shadow-2xl relative overflow-hidden h-full">
      <SidebarContent />
    </aside>
  );
});

export default Sidebar;
