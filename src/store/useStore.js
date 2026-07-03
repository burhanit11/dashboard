import { create } from 'zustand'

// ============ DUMMY DATA ============

const DUMMY_USER = {
  id: 1,
  name: "Luca",
  surname: "Rossi",
  avatar: "https://bachecaa.vercel.app/image/download.jpg",
  points: 345,
  currentXP: 650,
  minXP: 500,
  maxXP: 800,
  level: 5,
  streak: 7,
  completedCourses: 12,
  totalHours: 48,
}

const DUMMY_PROJECTS = [
  {
    id: 1,
    title: "Logica Matematica - Base",
    description: "Fondamenti di logica proposizionale e predicati. Esercizi guidati con soluzioni passo-passo.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin1&backgroundColor=c0aede",
    category: "Logica",
    difficulty: "base",
    completed: false,
    progress: 35,
    duration: "2h 30m",
    lessons: 8,
  },
  {
    id: 2,
    title: "Logica Matematica - Avanzato",
    description: "Logica modale, teoremi di incompletezza e applicazioni avanzate.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin2&backgroundColor=c0aede",
    category: "Logica",
    difficulty: "avanzato",
    completed: true,
    progress: 100,
    duration: "3h 15m",
    lessons: 12,
  },
  {
    id: 3,
    title: "Algoritmi e Strutture Dati",
    description: "Analisi degli algoritmi, alberi, grafi, ordinamento e ricerca.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin3&backgroundColor=c0aede",
    category: "Informatica",
    difficulty: "intermedio",
    completed: false,
    progress: 60,
    duration: "4h 00m",
    lessons: 15,
  },
  {
    id: 4,
    title: "Fisica Quantistica",
    description: "Introduzione alla meccanica quantistica e ai suoi paradossi.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin4&backgroundColor=c0aede",
    category: "Fisica",
    difficulty: "avanzato",
    completed: false,
    progress: 15,
    duration: "5h 30m",
    lessons: 20,
  },
  {
    id: 5,
    title: "Statistica Bayesiana",
    description: "Inferenza bayesiana, distribuzioni prior e posterior.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin5&backgroundColor=c0aede",
    category: "Statistica",
    difficulty: "intermedio",
    completed: true,
    progress: 100,
    duration: "3h 45m",
    lessons: 10,
  },
  {
    id: 6,
    title: "Programmazione Python",
    description: "Dal basic al advanced: OOP, decorators, async/await.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin6&backgroundColor=c0aede",
    category: "Informatica",
    difficulty: "base",
    completed: false,
    progress: 80,
    duration: "6h 00m",
    lessons: 18,
  },
]

const DUMMY_LEADERBOARD = [
  { id: 1, name: "Giulia Verdini", score: 2980, stars: 5, color: "#fbbf24", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader1&backgroundColor=b6e3f4", trend: "+45" },
  { id: 2, name: "Marco Bianchi", score: 2721, stars: 4, color: "#94a3b8", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader2&backgroundColor=b6e3f4", trend: "+12" },
  { id: 3, name: "Sofia Rossi", score: 2579, stars: 4, color: "#c084fc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader3&backgroundColor=b6e3f4", trend: "+28" },
  { id: 4, name: "Alessandro Verdi", score: 2430, stars: 3, color: "#f472b6", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader4&backgroundColor=b6e3f4", trend: "-5" },
  { id: 5, name: "Emma Neri", score: 2310, stars: 3, color: "#34d399", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader5&backgroundColor=b6e3f4", trend: "+33" },
  { id: 6, name: "Luca Russo", score: 2190, stars: 2, color: "#60a5fa", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leader6&backgroundColor=b6e3f4", trend: "+8" },
]

const DUMMY_ANNOUNCEMENTS = [
  { id: 1, title: "Nuovo corso disponibile!", content: "È stato aggiunto un nuovo corso di Logica Avanzata. Iscriviti ora!", date: "2026-07-03", type: "info", author: "Admin" },
  { id: 2, title: "Simulazione Ufficiale - Luglio", content: "La simulazione ufficiale del mese di Luglio è disponibile. Hai tempo fino al 31 Luglio.", date: "2026-07-01", type: "warning", author: "Admin" },
  { id: 3, title: "Classifica resettata", content: "La classifica mensile è stata resettata. Inizia a guadagnare punti!", date: "2026-07-01", type: "success", author: "Sistema" },
  { id: 4, title: "Manutenzione piattaforma", content: "Il 5 Luglio dalle 02:00 alle 04:00 la piattaforma non sarà disponibile.", date: "2026-06-28", type: "danger", author: "Sistema" },
]

const DUMMY_STORICO = [
  { id: 1, title: "Logica Base - Simulazione 1", score: 85, maxScore: 100, date: "2026-06-28", status: "passed", time: "45m" },
  { id: 2, title: "Algoritmi - Quiz 2", score: 72, maxScore: 100, date: "2026-06-25", status: "passed", time: "38m" },
  { id: 3, title: "Fisica Quantistica - Lezione 3", score: 58, maxScore: 100, date: "2026-06-20", status: "failed", time: "52m" },
  { id: 4, title: "Statistica Bayesiana - Test Finale", score: 91, maxScore: 100, date: "2026-06-15", status: "passed", time: "1h 10m" },
  { id: 5, title: "Python - Esercizio 5", score: 78, maxScore: 100, date: "2026-06-10", status: "passed", time: "33m" },
  { id: 6, title: "Logica Avanzata - Quiz 1", score: 45, maxScore: 100, date: "2026-06-05", status: "failed", time: "1h 05m" },
]

const DUMMY_ERRORS = [
  { id: 1, title: "Paradosso di Russell", course: "Logica Matematica", description: "Confusione tra insieme di tutti gli insiemi che non appartengono a sé stessi.", resolved: false, timesWrong: 3 },
  { id: 2, title: "Teorema di Gödel", course: "Logica Avanzata", description: "Difficoltà nel comprendere l'autoreferenza nei teoremi di incompletezza.", resolved: false, timesWrong: 2 },
  { id: 3, title: "Ordinamento MergeSort", course: "Algoritmi", description: "Confusione tra fase di merge e divide nel merge sort.", resolved: true, timesWrong: 5 },
  { id: 4, title: "Principio di Indeterminazione", course: "Fisica Quantistica", description: "Errore nel calcolo di Δx·Δp ≥ ℏ/2", resolved: false, timesWrong: 4 },
]

const DUMMY_SIMULAZIONI_ARCHIVIATE = [
  { id: 1, title: "Simulazione Mensile - Giugno", score: 720, maxScore: 1000, date: "2026-06-30", status: "completed", rank: 15 },
  { id: 2, title: "Simulazione Trimestrale - Q2", score: 1850, maxScore: 2500, date: "2026-06-15", status: "completed", rank: 8 },
  { id: 3, title: "Simulazione Settimanale #24", score: 340, maxScore: 500, date: "2026-06-20", status: "completed", rank: 22 },
  { id: 4, title: "Simulazione Settimanale #23", score: 380, maxScore: 500, date: "2026-06-13", status: "completed", rank: 18 },
  { id: 5, title: "Simulazione Mensile - Maggio", score: 680, maxScore: 1000, date: "2026-05-31", status: "completed", rank: 12 },
]

const DUMMY_STATISTICS = {
  totalPoints: 3450,
  coursesCompleted: 12,
  hoursLearned: 48,
  currentStreak: 7,
  longestStreak: 14,
  averageScore: 76,
  totalSimulations: 28,
  rank: 15,
  weeklyProgress: [
    { day: "Lun", points: 120 },
    { day: "Mar", points: 85 },
    { day: "Mer", points: 200 },
    { day: "Gio", points: 150 },
    { day: "Ven", points: 90 },
    { day: "Sab", points: 180 },
    { day: "Dom", points: 110 },
  ],
  categoryBreakdown: [
    { name: "Logica", color: "#3B82F6", percentage: 35 },
    { name: "Informatica", color: "#10B981", percentage: 28 },
    { name: "Fisica", color: "#8B5CF6", percentage: 20 },
    { name: "Statistica", color: "#F59E0B", percentage: 17 },
  ],
}

// ============ LOCALSTORAGE HELPERS ============

const STORAGE_KEY = 'dashboard_app_data'

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.warn('Failed to load from localStorage:', e)
  }
  return null
}

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('Failed to save to localStorage:', e)
  }
}

const getInitialState = () => {
  const stored = loadFromStorage()
  if (stored) return stored

  return {
    user: DUMMY_USER,
    projects: DUMMY_PROJECTS,
    leaderboard: DUMMY_LEADERBOARD,
    announcements: DUMMY_ANNOUNCEMENTS,
    storico: DUMMY_STORICO,
    errors: DUMMY_ERRORS,
    simulazioniArchiviate: DUMMY_SIMULAZIONI_ARCHIVIATE,
    statistics: DUMMY_STATISTICS,
    notes: [],
    activeMenu: 'Dashboard',
    activeTab: 'corsi',
    sidebarOpen: false,
    selectedProject: null,
    userLoading: false,
    userError: null,
    isAuthenticated: false,
    projectsLoading: false,
    projectsError: null,
    leaderboardLoading: false,
    leaderboardError: null,
  }
}

// ============ STORE ============

const useStore = create((set, get) => ({
  ...getInitialState(),

  // --- User ---
  fetchUser: () => {
    set({ userLoading: true, userError: null })
    setTimeout(() => {
      set({ user: DUMMY_USER, userLoading: false })
    }, 300)
  },

  updateUser: (updates) => {
    const newUser = { ...get().user, ...updates }
    set({ user: newUser })
    saveToStorage({ ...get(), user: newUser })
  },

  login: (name) => {
    set({ user: { ...get().user, name }, isAuthenticated: true })
    saveToStorage({ ...get(), isAuthenticated: true })
  },

  logout: () => {
    set({ isAuthenticated: false })
    localStorage.removeItem(STORAGE_KEY)
  },

  // --- Projects ---
  fetchProjects: () => {
    set({ projectsLoading: true, projectsError: null })
    setTimeout(() => {
      set({ projects: DUMMY_PROJECTS, projectsLoading: false })
    }, 300)
  },

  selectProject: (project) => set({ selectedProject: project }),

  updateProjectProgress: (projectId, progress) => {
    const projects = get().projects.map(p =>
      p.id === projectId ? { ...p, progress, completed: progress >= 100 } : p
    )
    set({ projects })
    saveToStorage({ ...get(), projects })
  },

  // --- Leaderboard ---
  fetchLeaderboard: () => {
    set({ leaderboardLoading: true, leaderboardError: null })
    setTimeout(() => {
      set({ leaderboard: DUMMY_LEADERBOARD, leaderboardLoading: false })
    }, 300)
  },

  // --- Notes ---
  submitNote: (note) => {
    const newNote = {
      id: Date.now(),
      ...note,
      createdAt: new Date().toISOString(),
    }
    const notes = [newNote, ...get().notes]
    set({ notes, noteSuccess: true, noteSubmitting: false })
    saveToStorage({ ...get(), notes })
    setTimeout(() => set({ noteSuccess: false }), 3000)
  },

  deleteNote: (noteId) => {
    const notes = get().notes.filter(n => n.id !== noteId)
    set({ notes })
    saveToStorage({ ...get(), notes })
  },

  // --- UI State ---
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  // --- Add Points ---
  addPoints: (points) => {
    const user = get().user
    const newXP = user.currentXP + points
    const newMaxXP = newXP > user.maxXP ? newXP + 100 : user.maxXP
    const leveledUp = newXP >= user.maxXP
    const newUser = {
      ...user,
      currentXP: leveledUp ? newXP - user.maxXP : newXP,
      minXP: leveledUp ? user.maxXP : user.minXP,
      maxXP: leveledUp ? newMaxXP : user.maxXP,
      level: leveledUp ? user.level + 1 : user.level,
      points: user.points + points,
    }
    set({ user: newUser })
    saveToStorage({ ...get(), user: newUser })
  },

  // --- Mark Error as Resolved ---
  resolveError: (errorId) => {
    const errors = get().errors.map(e =>
      e.id === errorId ? { ...e, resolved: true } : e
    )
    set({ errors })
    saveToStorage({ ...get(), errors })
  },
}))

export default useStore
