import { configureStore } from "@reduxjs/toolkit";
import { predictHQApi } from "@/redux/api/predictHQ";
import counterReducer from "@/redux/slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [predictHQApi.reducerPath]: predictHQApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(predictHQApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
