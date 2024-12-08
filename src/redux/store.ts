import { configureStore } from "@reduxjs/toolkit";
import { predictHQApi } from "@/redux/api/predictHQ";
import counterReducer from "@/redux/slices/counterSlice";
import preferencesReducer from "@/redux/slices/preferencesSlice";
import authReducer from "@/redux/slices/authSlice";
import { authAPI } from "./api/auth";
import { userApi } from "./api/user";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    preferences: preferencesReducer,
    [predictHQApi.reducerPath]: predictHQApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      predictHQApi.middleware,
      authAPI.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
