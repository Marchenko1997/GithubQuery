import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * 📌 Описание структуры задачи (Issue)
 */
export interface Issue {
  id: number;
  title: string;
  number: number;
  user: { login: string };
  comments: number;
  state: "open" | "closed";
  assignee?: { login: string } | null;
}

/**
 * 📌 Интерфейс для хранения состояния всех задач
 */
export interface IssuesState {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}

/**
 * 📌 Начальное состояние хранилища Redux
 */
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
        from: string;
        to: string;
      }>
    ) => {
      const { id, from, to } = action.payload;

      console.log("moveIssue action:", action.payload);
      console.log("Current state:", JSON.parse(JSON.stringify(state)));

      // Маппинг заголовков в ключи Redux-хранилища
      const columnMap: Record<string, keyof IssuesState> = {
        todo: "todo",
        "to do": "todo", // Учитываем разные вариации написания
        inprogress: "inProgress",
        "in progress": "inProgress",
        done: "done",
      };

      // Приводим from и to к нужному формату
      const fromColumn = columnMap[from.toLowerCase()];
      const toColumn = columnMap[to.toLowerCase()];

      if (!fromColumn || !toColumn) {
        console.error(`🚨 Invalid column names: from="${from}", to="${to}"`);
        return;
      }

      console.log(`✅ Moving issue ${id} from ${fromColumn} to ${toColumn}`);

      const issueIndex = state[fromColumn].findIndex(
        (issue) => issue.id === id
      );

      if (issueIndex === -1) {
        console.error(
          `❌ Issue with id ${id} not found in column "${fromColumn}".`
        );
        return;
      }

      const [movedIssue] = state[fromColumn].splice(issueIndex, 1);
      state[toColumn].push(movedIssue);
    },
  },
});

export const { setIssues, moveIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
