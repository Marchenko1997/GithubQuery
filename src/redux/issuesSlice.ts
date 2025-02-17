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
      state.todo = action.payload.filter(
        (issue) => !issue.assignee && issue.state === "open"
      );
      state.inProgress = action.payload.filter(
        (issue) => issue.assignee && issue.state === "open"
      );
      state.done = action.payload.filter((issue) => issue.state === "closed");
    },

    moveIssue: (
      state,
      action: PayloadAction<{
        id: number;
        from: keyof IssuesState;
        to: keyof IssuesState;
        newIndex: number;
      }>
    ) => {
      const { id, from, to, newIndex } = action.payload;
      console.log(
        `🔄 Moving issue ${id} from ${from} to ${to} at index ${newIndex}`
      );

      const issueIndex = state[from].findIndex((issue) => issue.id === id);
      if (issueIndex === -1) return;

      const [movedIssue] = state[from].splice(issueIndex, 1);
      state[to].splice(newIndex, 0, movedIssue);
    },

    reorderIssues: (
      state,
      action: PayloadAction<{
        column: keyof IssuesState;
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      const { column, fromIndex, toIndex } = action.payload;
      const [movedIssue] = state[column].splice(fromIndex, 1);
      state[column].splice(toIndex, 0, movedIssue);
    },
  },
});

export const { setIssues, moveIssue, reorderIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
