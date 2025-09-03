import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface CoinsState {
  // Data
  coins: CoinData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  
  // Actions
  setCoins: (coins: CoinData[]) => void;
  addCoins: (newCoins: CoinData[]) => void;
  setStatus: (status: "idle" | "loading" | "succeeded" | "failed") => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  incrementPage: () => void;
  
  // Async actions
  fetchCoins: (apiUrl: string) => Promise<void>;
  
  // Getters
  getCoins: () => CoinData[];
  getStatus: () => "idle" | "loading" | "succeeded" | "failed";
  getPage: () => number;
  getBitcoin: () => CoinData | undefined;
  getEthereum: () => CoinData | undefined;
  getCoinById: (id: string) => CoinData | undefined;
}

export const useCoinsStore = create<CoinsState>()(
  devtools(
    (set, get) => ({
      // Initial state
      coins: [],
      status: "idle",
      error: null,
      page: 1,
      
      // Actions
      setCoins: (coins) => set({ coins }, false, 'setCoins'),
      
      addCoins: (newCoins) => {
        const currentCoins = get().coins;
        // Remove duplicates by id
        const existingIds = new Set(currentCoins.map(coin => coin.id));
        const filteredNewCoins = newCoins.filter(coin => !existingIds.has(coin.id));
        set({ coins: [...currentCoins, ...filteredNewCoins] }, false, 'addCoins');
      },
      
      setStatus: (status) => set({ status }, false, 'setStatus'),
      setError: (error) => set({ error }, false, 'setError'),
      setPage: (page) => set({ page }, false, 'setPage'),
      incrementPage: () => set((state) => ({ page: state.page + 1 }), false, 'incrementPage'),
      
      // Async action to fetch coins
      fetchCoins: async (apiUrl: string) => {
        const { setStatus, setError, addCoins } = get();
        
        setStatus("loading");
        setError(null);
        
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch crypto data");
          }
          const data = await response.json();
          
          addCoins(data);
          setStatus("succeeded");
        } catch (error: any) {
          setError(error.message);
          setStatus("failed");
        }
      },
      
      // Getters (for backward compatibility with existing code)
      getCoins: () => get().coins,
      getStatus: () => get().status,
      getPage: () => get().page,
      getBitcoin: () => get().coins.find(coin => coin.id === "bitcoin"),
      getEthereum: () => get().coins.find(coin => coin.id === "ethereum"),
      getCoinById: (id: string) => get().coins.find(coin => coin.id === id),
    }),
    {
      name: 'coins-store',
    }
  )
);
