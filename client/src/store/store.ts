import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import vendorReducer from "./slices/vendorSlice";
import clientReducer from "./slices/clientSlice";
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    vendor: vendorReducer,
    client: clientReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
