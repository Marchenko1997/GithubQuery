import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./githubApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import issuesReducer from "./issuesSlice";
import repoReducer from "./repoSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "issues",
  storage,
};

const persistedIssuesReducer = persistReducer(persistConfig, issuesReducer);

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    issues: persistedIssuesReducer, 
    repo: repoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      githubApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
