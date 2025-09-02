import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type TAsset = {
  id: string;
  amount: number;
  name?: string;
  image?: string;
  current_price?: number;
  symbol?: string;
  purchaseDate?: string;
  priceDuringPurchase?: number;
};

interface PortfolioState {
  assets: TAsset[];
  addAsset: (asset: TAsset) => void;
  removeAsset: (id: string) => void;
  updateAmount: (id: string, newAmount: number) => void;
  getAssets: () => TAsset[];
  hasAsset: (id: string) => boolean;
}

export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    persist(
      (set, get) => ({
        assets: [],
        
        addAsset: (asset) => {
          const { assets } = get();
          if (assets.some((existingAsset) => existingAsset.id === asset.id)) {
            return;
          }
          set({ assets: [...assets, asset] }, false, 'addAsset');
        },
        
        removeAsset: (id) => {
          const { assets } = get();
          const filtered = assets.filter((a) => a.id !== id);
          set({ assets: filtered }, false, 'removeAsset');
        },
        
        updateAmount: (id, newAmount) => {
          const { assets } = get();
          const updated = assets.map((a) =>
            a.id === id ? { ...a, amount: newAmount } : a
          );
          set({ assets: updated }, false, 'updateAmount');
        },
        
        getAssets: () => get().assets,
        
        hasAsset: (id) => {
          const { assets } = get();
          return assets.some((asset) => asset.id === id);
        },
      }),
      {
        name: 'portfolio-storage', // localStorage key
        version: 1,
      }
    ),
    {
      name: 'portfolio-store',
    }
  )
);
