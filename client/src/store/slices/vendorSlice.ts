import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vendor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface VendorState {
  vendor: Vendor | null;
}

const initialState: VendorState = {
  vendor: JSON.parse(localStorage.getItem("vendorSession") || "null"),
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorLogin: (state, action: PayloadAction<Vendor>) => {
      state.vendor = action.payload;
      localStorage.setItem("vendorSession", JSON.stringify(action.payload));
    },
    vendorLogout: (state) => {
      state.vendor = null;
      localStorage.removeItem("vendorSession");
    },
  },
});

export const { vendorLogin, vendorLogout } = vendorSlice.actions;
export default vendorSlice.reducer;
