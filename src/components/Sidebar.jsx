import { memo } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import useStore from "../store/useStore";

const NAV_ITEMS = [
  {
    label: "Bacheca annunci",
    icon: (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M4 0C2.93913 0 1.92172 0.421427 1.17157 1.17157C0.421427 1.92172 0 2.93913 0 4V16C0 17.0609 0.421427 18.0783 1.17157 18.8284C1.92172 19.5786 2.93913 20 4 20H18V0H4ZM8 3H15V5H8V3ZM2 16C2 15.4696 2.21071 14.9609 2.58579 14.5858C2.96086 14.2107 3.46957 14 4 14H16V18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16Z" fill="white" />
      </svg>
    ),
  },
  {
    label: "Simulatore",
    icon: (
      <img src="https://bachecaa.vercel.app/image/icon.png" alt="" className="w-5 h-5 object-contain" />
    ),
  },
  {
    label: "Simulazioni archiviate",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 18L16 14L14.6 12.6L13 14.2V10H11V14.2L9.4 12.6L8 14L12 18ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V6.52501C3 6.29167 3.03767 6.06667 3.113 5.85001C3.18833 5.63334 3.30067 5.43334 3.45 5.25001L4.7 3.72501C4.88333 3.49167 5.11233 3.31234 5.387 3.18701C5.66167 3.06167 5.94933 2.99934 6.25 3.00001H17.75C18.05 3.00001 18.3377 3.06267 18.613 3.18801C18.8883 3.31334 19.1173 3.49234 19.3 3.72501L20.55 5.25001C20.7 5.43334 20.8127 5.63334 20.888 5.85001C20.9633 6.06667 21.0007 6.29167 21 6.52501V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5.4 6.00001H18.6L17.75 5.00001H6.25L5.4 6.00001Z" fill="white" />
      </svg>
    ),
  },
  {
    label: "Quadernino degli errori",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 15C14.2833 15 14.5293 14.896 14.738 14.688C14.9467 14.48 15.0507 14.234 15.05 13.95C15.0493 13.666 14.9453 13.4203 14.738 13.213C14.5307 13.0057 14.2847 12.9013 14 12.9C13.7153 12.8987 13.4697 13.003 13.263 13.213C13.0563 13.423 12.952 13.6687 12.95 13.95C12.948 14.2313 13.0523 14.4773 13.263 14.688C13.4737 14.8987 13.7193 15.0027 14 15ZM14 11.8C14.1833 11.8 14.3543 11.7333 14.513 11.6C14.6717 11.4667 14.7673 11.2917 14.8 11.075C14.8333 10.875 14.904 10.6917 15.012 10.525C15.12 10.3583 15.316 10.1333 15.6 9.85C16.1 9.35 16.4333 8.94567 16.6 8.637C16.7667 8.32833 16.85 7.966 16.85 7.55C16.85 6.8 16.5873 6.18733 16.062 5.712C15.5367 5.23667 14.8493 4.99933 14 5C13.45 5 12.95 5.125 12.5 5.375C12.05 5.625 11.6917 5.98333 11.425 6.45C11.325 6.61667 11.3167 6.79167 11.4 6.975C11.4833 7.15833 11.625 7.29167 11.825 7.375C12.0083 7.45833 12.1877 7.46667 12.363 7.4C12.5383 7.33333 12.684 7.21667 12.8 7.05C12.95 6.83333 13.125 6.671 13.325 6.563C13.525 6.455 13.75 6.40067 14 6.4C14.4 6.4 14.725 6.51267 14.975 6.738C15.225 6.96333 15.35 7.26733 15.35 7.65C15.35 7.88333 15.2833 8.10433 15.15 8.313C15.0167 8.52167 14.7833 8.784 14.45 9.1C13.9667 9.51667 13.6583 9.83767 13.525 10.063C13.3917 10.2883 13.3083 10.6173 13.275 11.05C13.2583 11.25 13.321 11.425 13.463 11.575C13.605 11.725 13.784 11.8 14 11.8ZM8 18C7.45 18 6.97933 17.8043 6.588 17.413C6.19667 17.0217 6.00067 16.5507 6 16V4C6 3.45 6.196 2.97933 6.588 2.588C6.98 2.19667 7.45067 2.00067 8 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V16C22 16.55 21.8043 17.021 21.413 17.413C21.0217 17.805 20.5507 18.0007 20 18H8ZM4 22C3.45 22 2.97933 21.8043 2.588 21.413C2.19667 21.0217 2.00067 20.5507 2 20V7C2 6.71667 2.096 6.47933 2.288 6.288C2.48 6.09667 2.71733 6.00067 3 6C3.28267 5.99933 3.52033 6.09533 3.713 6.288C3.90567 6.48067 4.00133 6.718 4 7V20H17C17.2833 20 17.521 20.096 17.713 20.288C17.905 20.48 18.0007 20.7173 18 21C17.9993 21.2827 17.9033 21.5203 17.712 21.713C17.5207 21.9057 17.2833 22.0013 17 22H4Z" fill="white" />
      </svg>
    ),
  },
  {
    label: "Simulazione ufficiale",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 1.17188C11.4565 1.17188 10.9219 1.77187 10.9219 2.625C10.9219 3.47813 11.4565 4.07812 12 4.07812C12.5435 4.07812 13.0781 3.47813 13.0781 2.625C13.0781 1.77187 12.5435 1.17188 12 1.17188ZM7.1273 1.31133L6.3727 1.68867C7.08014 3.10359 8.78067 4.35164 10.2253 5.17814L10.8907 13.8281H11.5781V9H12.4219V13.8281H13.1093L13.7747 5.17814C15.2193 4.35164 16.9199 3.10359 17.6273 1.68867L16.8727 1.31133C15.9394 2.71289 14.7684 3.61514 13.5289 4.0193C13.1865 4.56 12.6445 4.92188 12 4.92188C11.3555 4.92188 10.8136 4.56 10.4711 4.01925C9.23156 3.61519 8.06058 2.71289 7.1273 1.31133ZM7.92188 14.6719V19.1719H1.17188V22.8281H22.8281V21.4219H16.0781V14.6719H7.92188Z" fill="white" />
      </svg>
    ),
  },
  {
    label: "Le mie statistiche",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20ZM16 10C16.0001 11.1868 15.6483 12.347 14.989 13.3338C14.3298 14.3206 13.3926 15.0898 12.2962 15.544C11.1998 15.9981 9.99324 16.117 8.82926 15.8854C7.66528 15.6538 6.59612 15.0823 5.757 14.243L10 10V4C11.5913 4 13.1174 4.63214 14.2426 5.75736C15.3679 6.88258 16 8.4087 16 10Z" fill="white" />
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

      {/* Dashboard button */}
      <div className={`mb-10 ${mobile ? "mt-0 px-4" : "mt-14"}`}>
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
              <path d="M10 2L2 7V18H7V13H13V18H18V7L10 2Z" fill="white" />
            </svg>
          </span>
          <span>Dashboard</span>
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <div className={`flex flex-col ${mobile ? "space-y-[35px] px-4" : "space-y-[40px] px-2"}`}>
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
        <button className="w-full text-[15px] font-semibold bg-white text-[#FF4D4D] px-6 py-3 rounded-full font-black shadow-lg flex items-center justify-start hover:bg-gray-50 transition-all active:scale-95 group border-none cursor-pointer">
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
