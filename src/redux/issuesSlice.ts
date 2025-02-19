import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Issue, IssuesByRepo, IssuesState } from "./types";

const initialState: IssuesByRepo = {};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (
      state,
      action: PayloadAction<{ repoUrl: string; issues: Issue[] }>
    ) => {
      const { repoUrl, issues } = action.payload;
      state[repoUrl] = {
        todo: issues.filter(
          (issue) => !issue.assignee && issue.state === "open"
        ),
        inProgress: issues.filter(
          (issue) => issue.assignee && issue.state === "open"
        ),
        done: issues.filter((issue) => issue.state === "closed"),
      };
    },

    moveIssue: (
      state,
      action: PayloadAction<{
        repoUrl: string;
        id: number;
        from: keyof IssuesState;
        to: keyof IssuesState;
        newIndex: number;
      }>
    ) => {
      const { repoUrl, id, from, to, newIndex } = action.payload;
      if (!state[repoUrl]) return;

      const issueIndex = state[repoUrl][from].findIndex(
        (issue) => issue.id === id
      );
      if (issueIndex === -1) return;

      const [movedIssue] = state[repoUrl][from].splice(issueIndex, 1);
      state[repoUrl][to].splice(newIndex, 0, movedIssue);
    },

    reorderIssues: (
      state,
      action: PayloadAction<{
        repoUrl: string;
        column: keyof IssuesState;
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      const { repoUrl, column, fromIndex, toIndex } = action.payload;
      if (!state[repoUrl]) return;

      const [movedIssue] = state[repoUrl][column].splice(fromIndex, 1);
      state[repoUrl][column].splice(toIndex, 0, movedIssue);
    },
  },
});

export const { setIssues, moveIssue, reorderIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
