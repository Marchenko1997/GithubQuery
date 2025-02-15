import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Issue {
  id: number;
  title: string;
  number: number;
  user: { login: string };
  comments: number;
  state: "open" | "closed";
  assignee?: { login: string } | null;
}

export interface IssuesState {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}

const initialState: IssuesState = {
  todo: [],
  inProgress: [],
  done: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.todo = action.payload.filter((issue) => !issue.assignee && issue.state === "open");
      state.inProgress = action.payload.filter((issue) => issue.assignee && issue.state === "open");
      state.done = action.payload.filter((issue) => issue.state === "closed");
    },
    moveIssue: (
      state,
      action: PayloadAction<{ id: number; from: keyof IssuesState; to: keyof IssuesState }>
    ) => {
      const { id, from, to } = action.payload;
      const issueIndex = state[from].findIndex((issue) => issue.id === id);
      if (issueIndex !== -1) {
        const [issue] = state[from].splice(issueIndex, 1);
        state[to].push(issue);
      }
    },
  },
});

export const { setIssues, moveIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
