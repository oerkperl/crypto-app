import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UtilsState {
  errorMessage: string;
  setErrorMessage: (message: string, duration?: number) => void;
  clearErrorMessage: () => void;
}

export const useUtilsStore = create<UtilsState>()(
  devtools(
    (set) => ({
      errorMessage: "",
      
      setErrorMessage: (message: string, duration: number = 5000) => {
        set({ errorMessage: message }, false, 'setErrorMessage');
        if (duration > 0) {
          setTimeout(() => {
            set({ errorMessage: "" }, false, 'clearErrorMessage');
          }, duration);
        }
      },
      
      clearErrorMessage: () => set({ errorMessage: "" }, false, 'clearErrorMessage'),
    }),
    {
      name: 'utils-store',
    }
  )
);
