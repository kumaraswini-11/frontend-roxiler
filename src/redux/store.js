import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import transactionsReducer from "./slices/transactionsSlice.js";

// Determine the environment (development or production)
const isProduction = false; // import.meta.env.VITE_APP_ENV === "production";

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  transactions: transactionsReducer,
});

// Configuration options for persisting state to local storage
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // Optionally, we can add migration functions if needed
  // migrate: createMigrate(migrations, { debug: true }),
};

// Created a persisted reducer by wrapping the root reducer with persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // Provided the persisted reducer as the main reducer
  reducer: persistedReducer,

  // Middleware configuration
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },

  // Enable Redux DevTools only in development
  devTools: !isProduction,
});

// Create a persistor to sync your store with local storage
export const persistor = persistStore(store);
