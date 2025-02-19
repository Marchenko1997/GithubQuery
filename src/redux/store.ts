import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./githubApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import issuesReducer from "./issuesSlice";
import repoReducer from "./repoSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import repoInfoReducer from "./repoInfoSlice";

const persistConfig = {
  key: "issues",
  storage,
};

const repoInfoPersistConfig = {
  key: "repoInfo",
  storage,
};

const repoPersistConfig = {
  key: "repo",
  storage,
};

const persistedIssuesReducer = persistReducer(persistConfig, issuesReducer);
const persistedRepoInfoReducer = persistReducer(
  repoInfoPersistConfig,
  repoInfoReducer
);
const persistedRepoReducer = persistReducer(repoPersistConfig, repoReducer);

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    issues: persistedIssuesReducer,
    repo: persistedRepoReducer,
    repoInfo: persistedRepoInfoReducer,
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
