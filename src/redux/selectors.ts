import { RootState } from "./store";

export const selectRepoUrl = (state: RootState) => state.repo.url;
export const selectIssuesState = (state: RootState) => state.issues;