import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChartData {
  [key: string]: any;
}

interface ChartsState {
  // Data
  data: ChartData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  
  // Actions
  setData: (data: ChartData) => void;
  setStatus: (status: "idle" | "loading" | "succeeded" | "failed") => void;
  setError: (error: string | null) => void;
  
  // Async actions
  fetchChartData: (apiUrl: string) => Promise<void>;
  
  // Getters
  getData: () => ChartData;
  getStatus: () => "idle" | "loading" | "succeeded" | "failed";
}

export const useChartsStore = create<ChartsState>()(
  devtools(
    (set, get) => ({
      // Initial state
      data: {},
      status: "idle",
      error: null,
      
      // Actions
      setData: (data) => set({ data }, false, 'setData'),
      setStatus: (status) => set({ status }, false, 'setStatus'),
      setError: (error) => set({ error }, false, 'setError'),
      
      // Async action to fetch chart data
      fetchChartData: async (apiUrl: string) => {
        const { setStatus, setError, setData } = get();
        
        setStatus("loading");
        setError(null);
        
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch chart data");
          }
          const data = await response.json();
          
          setData(data);
          setStatus("succeeded");
        } catch (error: any) {
          setError(error.message);
          setStatus("failed");
        }
      },
      
      // Getters (for backward compatibility)
      getData: () => get().data,
      getStatus: () => get().status,
    }),
    {
      name: 'charts-store',
    }
  )
);
