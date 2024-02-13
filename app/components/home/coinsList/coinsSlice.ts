import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";

interface CryptoData {
  id: string;
  name: string;
}

interface CryptoState {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
}

export const fetchCryptoData = createAsyncThunk<CryptoData[], string>(
  "crypto/fetchData",
  async (apiUrl: string, thunkAPI) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch crypto data");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: CryptoState = {
  data: [],
  status: "idle",
  error: null,
  page: 0,
};
export const reset = createAction("coins/reset");
const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCryptoData.fulfilled,
        (state, action: PayloadAction<CryptoData[]>) => {
          state.status = "succeeded";
          state.data = [...state.data, ...action.payload];
          state.page = state.page += 1;
          state.status = "idle";
        }
      )
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(reset, () => {
        return initialState;
      });
  },
});

export default coinsSlice.reducer;
export const getCoins = (state: RootState): any[] => state.coins?.data;
export const getCoinById = (state: RootState, id: string) =>
  state.coins.data.find((coin) => coin.id === id);
export const getStatus = (
  state: RootState
): "idle" | "loading" | "succeeded" | "failed" => state.coins?.status;
export const getPage = (state: RootState) => state?.coins.page;
