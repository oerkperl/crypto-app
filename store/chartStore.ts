import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getNumberOfDays } from '@/lib/utils/formatters';

interface ChartData {
  prices: any[];
  total_volumes: any[];
  market_caps?: any[];
}

interface ChartState {
  // Configuration
  currentChart: any;
  selectedPeriod: string;
  
  // Data & Status
  chartData: Record<string, ChartData>; // Cache data by chartUrl
  loadingStates: Record<string, boolean>; // Track loading per URL
  errors: Record<string, string>; // Track errors per URL
  
  // Actions
  setCurrentChart: (chart: any) => void;
  setSelectedPeriod: (period: string) => void;
  setChartData: (url: string, data: ChartData) => void;
  setLoading: (url: string, loading: boolean) => void;
  setError: (url: string, error: string) => void;
  clearError: (url: string) => void;
  
  // Async Actions
  fetchChartData: (url: string) => Promise<void>;
  
  // Computed values as getters
  getDays: () => string;
  getChartUrl: (currencyName: string) => string;
  getCurrentChartData: (url: string) => ChartData | null;
  getCurrentStatus: (url: string) => 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const useChartStore = create<ChartState>()(
  devtools(
    persist(
      (set, get) => ({
        // Configuration
        currentChart: {},
        selectedPeriod: "1M",
        
        // Data & Status
        chartData: {},
        loadingStates: {},
        errors: {},
        
        // Configuration Actions
        setCurrentChart: (chart) =>
          set({ currentChart: chart }, false, 'setCurrentChart'),
        setSelectedPeriod: (period) =>
          set({ selectedPeriod: period }, false, 'setSelectedPeriod'),
        
        // Data Actions
        setChartData: (url, data) =>
          set((state) => ({
            chartData: { ...state.chartData, [url]: data }
          }), false, 'setChartData'),
        
        setLoading: (url, loading) =>
          set((state) => ({
            loadingStates: { ...state.loadingStates, [url]: loading }
          }), false, 'setLoading'),
        
        setError: (url, error) =>
          set((state) => ({
            errors: { ...state.errors, [url]: error }
          }), false, 'setError'),
        
        clearError: (url) =>
          set((state) => {
            const newErrors = { ...state.errors };
            delete newErrors[url];
            return { errors: newErrors };
          }, false, 'clearError'),
        
        // Async fetch action
        fetchChartData: async (url: string) => {
          const { setLoading, setChartData, setError, clearError } = get();
          
          try {
            setLoading(url, true);
            clearError(url);
            
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch chart data: ${response.status}`);
            }
            
            const data = await response.json();
            setChartData(url, {
              prices: data.prices || [],
              total_volumes: data.total_volumes || [],
              market_caps: data.market_caps || []
            });
            
          } catch (error: any) {
            setError(url, error.message);
          } finally {
            setLoading(url, false);
          }
        },
        
        // Computed values as functions to avoid re-renders
        getDays: () => {
          const { selectedPeriod } = get();
          return getNumberOfDays(selectedPeriod).toString();
        },
        
        getChartUrl: (currencyName: string) => {
          const { currentChart } = get();
          const { getDays } = get();
          const baseUrl = `https://api.coingecko.com/api/v3/coins/${
            currentChart?.id || "bitcoin"
          }/market_chart?`;
          const params = new URLSearchParams({
            vs_currency: currencyName,
            days: getDays(),
            interval: "daily",
          });
          return `${baseUrl}${params}`;
        },
        
        getCurrentChartData: (url: string) => {
          const { chartData } = get();
          return chartData[url] || null;
        },
        
        getCurrentStatus: (url: string) => {
          const { chartData, loadingStates, errors } = get();
          
          if (loadingStates[url]) return 'loading';
          if (errors[url]) return 'failed';
          if (chartData[url]) return 'succeeded';
          return 'idle';
        },
      }),
      {
        name: 'chart-store',
        // Only persist configuration, not the large chart data
        partialize: (state) => ({
          currentChart: state.currentChart,
          selectedPeriod: state.selectedPeriod,
        }),
      }
    ),
    {
      name: 'chart-store',
    }
  )
);
