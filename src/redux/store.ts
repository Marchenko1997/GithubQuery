import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./githubApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import issueReducer from "./issuesSlice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer, // Добавляем RTK Query
    issues: issueReducer, // Храним колонки с задачами
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

// Позволяет автоматически обновлять данные при фокусе на странице
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
