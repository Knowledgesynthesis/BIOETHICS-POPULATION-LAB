import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProgress {
  completedModules: string[];
  assessmentScores: Record<string, number>;
  currentStreak: number;
  lastVisit: string;
}

export interface AppSettings {
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

interface AppState {
  // User progress
  userProgress: UserProgress;
  updateProgress: (moduleId: string, score?: number) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Current module
  currentModule: string;
  setCurrentModule: (module: string) => void;

  // Offline status
  isOffline: boolean;
  setOfflineStatus: (status: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userProgress: {
        completedModules: [],
        assessmentScores: {},
        currentStreak: 0,
        lastVisit: new Date().toISOString(),
      },
      settings: {
        darkMode: true,
        fontSize: 'medium',
        soundEnabled: false,
        notificationsEnabled: false,
      },
      currentModule: 'home',
      isOffline: false,

      updateProgress: (moduleId: string, score?: number) =>
        set((state) => {
          const completedModules = state.userProgress.completedModules.includes(moduleId)
            ? state.userProgress.completedModules
            : [...state.userProgress.completedModules, moduleId];

          const assessmentScores = score !== undefined
            ? { ...state.userProgress.assessmentScores, [moduleId]: score }
            : state.userProgress.assessmentScores;

          return {
            userProgress: {
              ...state.userProgress,
              completedModules,
              assessmentScores,
              lastVisit: new Date().toISOString(),
            },
          };
        }),

      updateSettings: (newSettings: Partial<AppSettings>) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      setCurrentModule: (module: string) =>
        set({ currentModule: module }),

      setOfflineStatus: (status: boolean) =>
        set({ isOffline: status }),
    }),
    {
      name: 'bioethics-lab-storage',
    }
  )
);
