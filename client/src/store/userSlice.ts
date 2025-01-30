import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  role: "client" | "admin" | "vendor";
}

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      sessionStorage.setItem("userSession", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("userSession");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
