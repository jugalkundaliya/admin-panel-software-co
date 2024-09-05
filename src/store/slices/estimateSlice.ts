import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Estimate } from "../../components/EstimatesTable";
const estimatesData = [
  {
    version: "00001",
    project: "Christine Brooks",
    client: "089 Kutch Green Apt. 448",
    createdAt: "04 Sep 2019",
    lastModified: "12-Jan-2022",
    status: "Created",
    action: () => alert("Edit 00001"),
    estimates: [
      {
        item: "Electric",
        total: 36000,
        estimates: [
          {
            finalPrice: 10000,
            name: "Lamps",
            description: "Item Desc",
            unit: "QTY",
            quantity: 100,
            price: 100,
            margin: 0,
          },
          {
            finalPrice: 4000,
            name: "Wires",
            description: "Item Desc",
            unit: "Meter",
            quantity: 20,
            price: 200,
            margin: 0,
          },
          {
            finalPrice: 22000,
            name: "Electrical Tools",
            description: "Item Desc",
            unit: "Box",
            quantity: 10,
            price: 2000,
            margin: 10,
          },
        ],
      },
      {
        item: "Colors Tin",
        total: 49350,
        estimates: [
          {
            finalPrice: 25200,
            name: "Red Color",
            description: "Item Desc",
            unit: "QTY",
            quantity: 12,
            price: 2000,
            margin: 5,
          },
          {
            finalPrice: 15750,
            name: "Blue Color",
            description: "Item Desc",
            unit: "OTY",
            quantity: 10,
            price: 1500,
            margin: 5,
          },
          {
            finalPrice: 8400,
            name: "Yellow Color",
            description: "Item Desc",
            unit: "QTY",
            quantity: 8,
            price: 1000,
            margin: 5,
          },
        ],
      },
    ],
  },
  {
    version: "00002",
    project: "Rosie Pearson",
    client: "979 Immanuel Ferry Suite 526",
    createdAt: "28 May 2019",
    lastModified: "29-Jul-2024",
    status: "Processing",
    action: () => alert("Edit 00002"),
    estimates: [
      {
        item: "Electric",
        total: 36000,
        estimates: [
          {
            finalPrice: 10000,
            name: "Lamps",
            description: "Item Desc",
            unit: "QTY",
            quantity: 100,
            price: 100,
            margin: 0,
          },
          {
            finalPrice: 4000,
            name: "Wires",
            description: "Item Desc",
            unit: "Meter",
            quantity: 20,
            price: 200,
            margin: 0,
          },
          {
            finalPrice: 22000,
            name: "Electrical Tools",
            description: "Item Desc",
            unit: "Box",
            quantity: 10,
            price: 2000,
            margin: 10,
          },
        ],
      },
      {
        item: "Colors Tin",
        total: 49350,
        estimates: [
          {
            finalPrice: 25200,
            name: "Red Color",
            description: "Item Desc",
            unit: "QTY",
            quantity: 12,
            price: 2000,
            margin: 5,
          },
          {
            finalPrice: 15750,
            name: "Blue Color",
            description: "Item Desc",
            unit: "OTY",
            quantity: 10,
            price: 1500,
            margin: 5,
          },
          {
            finalPrice: 8400,
            name: "Yellow Color",
            description: "Item Desc",
            unit: "QTY",
            quantity: 8,
            price: 1000,
            margin: 5,
          },
        ],
      },
    ],
  },
];
const fetchEstimates = createAsyncThunk(
  "estimates/fetchEstimates",
  async () => {
    return new Promise<Estimate[]>((resolve) =>
      setTimeout(() => resolve(estimatesData), 1000)
    );
  }
);

interface EstimatesState {
  estimates: Estimate[];
  loading: boolean;
  error: string | null;
}

const initialState: EstimatesState = {
  estimates: [],
  loading: false,
  error: null,
};

const estimatesSlice = createSlice({
  name: "estimates",
  initialState,
  reducers: {
    updateEstimate: (
      state,
      action: PayloadAction<{ index: number; estimate: Estimate }>
    ) => {
      const { index, estimate } = action.payload;
      state.estimates[index] = estimate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstimates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.estimates = action.payload;
        state.loading = false;
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch estimates";
      });
  },
});

export const { updateEstimate } = estimatesSlice.actions;
export { fetchEstimates };
export default estimatesSlice.reducer;
