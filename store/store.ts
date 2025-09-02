import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "@/components/home/coinsList/coinsSlice";
import chartsReducer from "../components/home/charts/chartsSlice";
export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    chart: chartsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
