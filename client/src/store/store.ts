import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import vendorReducer from "./slices/vendorSlice";
import clientReducer from "./slices/clientSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    vendor: vendorReducer,
    client: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
