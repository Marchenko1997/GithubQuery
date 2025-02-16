import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * 📌 Описание структуры задачи (Issue)
 */
export interface Issue {
  id: number; // Уникальный идентификатор задачи
  title: string; // Название задачи
  number: number; // Номер задачи в репозитории
  user: { login: string }; // Пользователь, создавший задачу
  comments: number; // Количество комментариев к задаче
  state: "open" | "closed"; // Статус задачи (открыта или закрыта)
  assignee?: { login: string } | null; // Назначенный исполнитель (если есть)
}

/**
 * 📌 Интерфейс для хранения состояния всех задач
 */
export interface IssuesState {
  todo: Issue[]; // Колонка "ToDo" (новые задачи без исполнителя)
  inProgress: Issue[]; // Колонка "In Progress" (задачи с исполнителем)
  done: Issue[]; // Колонка "Done" (закрытые задачи)
}

/**
 * 📌 Начальное состояние хранилища Redux
 * Все списки задач изначально пустые
 */
const initialState: IssuesState = {
  todo: [],
  inProgress: [],
  done: [],
};

/**
 * 📌 Создание Redux Slice с тремя основными редюсерами:
 * - setIssues: загрузка данных
 * - moveIssue: перемещение задач между колонками
 * - reorderIssue: перемещение задач внутри одной колонки
 */
const issuesSlice = createSlice({
  name: "issues", // Имя слайса в Redux-хранилище
  initialState, // Начальное состояние
  reducers: {
    /**
     * 📌 Загружаем задачи из API и распределяем их по колонкам:
     * - "ToDo" -> задачи без исполнителя и в статусе "open"
     * - "In Progress" -> задачи с исполнителем и в статусе "open"
     * - "Done" -> все закрытые задачи
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
     * 📌 Перемещение задачи между разными колонками (drag-and-drop).
     * - `id` - идентификатор задачи
     * - `from` - из какой колонки перемещается задача
     * - `to` - в какую колонку перемещается задача
     * - `toIndex` - индекс в новой колонке, куда вставить задачу
     */
    moveIssue: (
      state,
      action: PayloadAction<{
        id: number;
        from: keyof IssuesState;
        to: keyof IssuesState;
        toIndex: number;
      }>
    ) => {
      const { id, from, to, toIndex } = action.payload;

      // Находим индекс задачи в исходной колонке
      const issueIndex = state[from].findIndex((issue) => issue.id === id);

      if (issueIndex !== -1) {
        // Удаляем задачу из старой колонки
        const [movedIssue] = state[from].splice(issueIndex, 1);

        // Вставляем задачу в новую колонку на указанную позицию
        state[to].splice(toIndex, 0, movedIssue);
      }
    },

    /**
     * 📌 Перемещение задачи внутри одной колонки (drag-and-drop)
     * - `column` - в какой колонке происходит перемещение
     * - `fromIndex` - исходный индекс задачи в колонке
     * - `toIndex` - новый индекс задачи в колонке
     */
    reorderIssue: (
      state,
      action: PayloadAction<{
        column: keyof IssuesState;
        fromIndex: number;
        toIndex: number;
      }>
    ) => {
      const { column, fromIndex, toIndex } = action.payload;
      const columnData = state[column];

      if (fromIndex !== toIndex) {
        // Удаляем задачу из исходной позиции
        const [movedIssue] = columnData.splice(fromIndex, 1);

        // Вставляем задачу в новую позицию
        columnData.splice(toIndex, 0, movedIssue);
      }
    },
  },
});

/**
 * 📌 Экспортируем экшены для работы в компонентах:
 * - `setIssues` - загружает задачи и распределяет их по колонкам
 * - `moveIssue` - перемещает задачи между колонками
 * - `reorderIssue` - перемещает задачи внутри одной колонки
 */
export const { setIssues, moveIssue, reorderIssue } = issuesSlice.actions;

/**
 * 📌 Экспортируем редюсер, который будет добавлен в `store.ts`
 */
export default issuesSlice.reducer;
