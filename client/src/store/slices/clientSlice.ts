import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface ClientState {
  client: Client | null;
}

const initialState: ClientState = {
  client: JSON.parse(localStorage.getItem("clientSession") || "null"),
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clientLogin: (state, action: PayloadAction<Client>) => {
      state.client = action.payload;
      localStorage.setItem("clientSession", JSON.stringify(action.payload));
    },
    clientLogout: (state) => {
      state.client = null;
      localStorage.removeItem("clientSession");
    },
  },
});

export const { clientLogin, clientLogout } = clientSlice.actions;
export default clientSlice.reducer;
