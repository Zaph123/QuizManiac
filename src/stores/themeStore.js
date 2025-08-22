// stores/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleTheme: () => set((state) => {
        const newMode = !state.darkMode;
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle('dark', newMode);
        }
        return { darkMode: newMode };
      }),
    }),
    {
      name: 'theme-preference', // LocalStorage key
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.darkMode);
        }
      },
    }
  )
);