import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Modal state
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  
  // Navigation state
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  
  // Coin viewing state
  viewingCoinId: string;
  setViewingCoinId: (id: string) => void;
  canVisit: boolean;
  setCanVisit: (canVisit: boolean) => void;
  
  // Search state
  query: string;
  setQuery: (query: string) => void;
  
  // Portfolio selection
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
  
  // Helper function for viewing coins
  viewCoin: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }, false, 'setIsOpen'),
      
      selectedOption: "Charts",
      setSelectedOption: (option) => 
        set({ selectedOption: option }, false, 'setSelectedOption'),
      
      viewingCoinId: "",
      setViewingCoinId: (id) => 
        set({ viewingCoinId: id }, false, 'setViewingCoinId'),
      
      canVisit: false,
      setCanVisit: (canVisit) => 
        set({ canVisit }, false, 'setCanVisit'),
      
      query: "",
      setQuery: (query) => set({ query }, false, 'setQuery'),
      
      selectedCoinId: "",
      setSelectedCoinId: (id) => 
        set({ selectedCoinId: id }, false, 'setSelectedCoinId'),
      
      viewCoin: (id: string) => {
        set({ 
          viewingCoinId: id, 
          isOpen: true 
        }, false, 'viewCoin');
      },
    }),
    {
      name: 'ui-store',
    }
  )
);
