import { create } from 'zustand'

const STATIC_USER = {
  id: 1,
  name: "Dr. Luca",
  avatar: "https://bachecaa.vercel.app/image/download.jpg",
  points: 345,
  currentXP: 650,
  minXP: 500,
  maxXP: 800,
}

const STATIC_PROJECTS = [
  {
    id: 1,
    title: "Admin logica test 1",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin1&backgroundColor=c0aede",
  },
  {
    id: 2,
    title: "Admin logica test 2",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin2&backgroundColor=c0aede",
  },
  {
    id: 3,
    title: "Admin logica test 3",
    description: "Standard dummy text ever since the 1500s.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin3&backgroundColor=c0aede",
  },
  {
    id: 4,
    title: "Admin logica test 4",
    description: "Lorem ipsum is simply dummy text.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin4&backgroundColor=c0aede",
  },
  {
    id: 5,
    title: "Admin logica test 5",
    description: "This card is now accessible by scrolling down.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin5&backgroundColor=c0aede",
  },
  {
    id: 6,
    title: "Admin logica test 6",
    description: "Keep scrolling to see more content.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin6&backgroundColor=c0aede",
  },
]

const STATIC_LEADERBOARD = [
  {
    id: 1,
    name: "Giulia Verdini",
    score: 2980,
    stars: 5,
    color: "#fbbf24",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader1&backgroundColor=b6e3f4",
  },
  {
    id: 2,
    name: "Giulia Verdini",
    score: 2721,
    stars: 4,
    color: "#94a3b8",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader2&backgroundColor=b6e3f4",
  },
  {
    id: 3,
    name: "Giulia Verdini",
    score: 2579,
    stars: 3,
    color: "#c084fc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader3&backgroundColor=b6e3f4",
  },
  {
    id: 4,
    name: "Giulia Verdini",
    score: 2579,
    stars: 3,
    color: "#f472b6",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader4&backgroundColor=b6e3f4",
  },
]

const useStore = create((set) => ({
  // --- User ---
  user: STATIC_USER,
  userLoading: false,
  userError: null,
  fetchUser: () => set({ user: STATIC_USER }),

  // --- Projects ---
  projects: STATIC_PROJECTS,
  projectsLoading: false,
  projectsError: null,
  selectedProject: null,
  fetchProjects: () => set({ projects: STATIC_PROJECTS }),
  selectProject: (project) => set({ selectedProject: project }),

  // --- Leaderboard ---
  leaderboard: STATIC_LEADERBOARD,
  leaderboardLoading: false,
  leaderboardError: null,
  fetchLeaderboard: () => set({ leaderboard: STATIC_LEADERBOARD }),

  // --- Notes ---
  noteSubmitting: false,
  noteSuccess: false,
  noteError: null,
  submitNote: (note) => {
    set({ noteSubmitting: true, noteError: null, noteSuccess: false })
    setTimeout(() => {
      set({ noteSubmitting: false, noteSuccess: true })
      setTimeout(() => set({ noteSuccess: false }), 3000)
    }, 500)
  },

  // --- UI State ---
  activeMenu: 'Dashboard',
  sidebarOpen: false,
  activeTab: 'corsi',

  setActiveMenu: (menu) => set({ activeMenu: menu }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),
}))

export default useStore
