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
    /**
     * 📌 Устанавливает изначальные задачи, полученные из API.
     */
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.todo = action.payload.filter(
        (issue) => !issue.assignee && issue.state === "open"
      );
      state.inProgress = action.payload.filter(
        (issue) => issue.assignee && issue.state === "open"
      );
      state.done = action.payload.filter((issue) => issue.state === "closed");
    },

    /**
     * 📌 Перемещение задачи между колонками
     */
    moveIssue: (
      state,
      action: PayloadAction<{ id: number; to: keyof IssuesState }>
    ) => {
      const { id, to } = action.payload;

      console.log("moveIssue action:", action.payload);
      console.log("Current state:", JSON.parse(JSON.stringify(state)));

      // 🟢 Находим, в какой колонке находится задача
      let fromColumn: keyof IssuesState | null = null;
      let movedIssue: Issue | undefined;

      Object.keys(state).forEach((key) => {
        const column = key as keyof IssuesState;
        const index = state[column].findIndex((issue) => issue.id === id);
        if (index !== -1) {
          fromColumn = column;
          [movedIssue] = state[column].splice(index, 1);
        }
      });

      if (!fromColumn || !movedIssue) {
        console.error(`❌ Issue with id ${id} not found.`);
        return;
      }

      console.log(`✅ Moving issue ${id} from ${fromColumn} to ${to}`);

      // 🔄 Обновляем `state` и `assignee` в зависимости от целевой колонки
      movedIssue.state = to === "done" ? "closed" : "open";
      movedIssue.assignee = to === "inProgress" ? { login: "user" } : null;

      // 🟢 Добавляем задачу в новую колонку
      state[to].push(movedIssue);
    },
  },
});

export const { setIssues, moveIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
