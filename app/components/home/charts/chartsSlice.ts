import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";

interface ChartState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchChartData = createAsyncThunk(
  "charts/fetchData",
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

const initialState: ChartState = {
  data: {},
  status: "idle",
  error: null,
};

const chartsSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchChartData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.data = { ...action.payload };
        }
      )
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default chartsSlice.reducer;
export const getChart = (state: RootState): any => state?.chart.data;
export const getChartStatus = (
  state: RootState
): "idle" | "loading" | "succeeded" | "failed" => state.chart?.status;
