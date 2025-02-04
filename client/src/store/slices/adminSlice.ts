import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AdminState {
  admin: Admin | null;
}

const initialState: AdminState = {
  admin: JSON.parse(localStorage.getItem("adminSession") || "null"),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      localStorage.setItem("adminSession", JSON.stringify(action.payload));
    },
    adminLogout: (state) => {
      state.admin = null;
      localStorage.removeItem("adminSession");
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
