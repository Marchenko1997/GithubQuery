import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "./test-utils";
import App from "../App";
import { store } from "../redux/store";
import { setIssues } from "../redux/issuesSlice";
import { Issue } from "../redux/types";

const mockIssue: Issue = {
  id: 1,
  title: "Issue 1",
  number: 101,
  created_at: "2024-02-20T12:34:56Z",
  comments: 0,
  user: { login: "user1" },
  state: "open",
};

beforeEach(async () => {
  await act(async () => {
    store.dispatch(
      setIssues({
        repoUrl: "https://github.com/user/repo",
        issues: [],
      })
    );
  });
});

test("перемещение задач через Drag & Drop", async () => {
  await act(async () => {
    store.dispatch(
      setIssues({
        repoUrl: "https://github.com/user/repo",
        issues: [mockIssue],
      })
    );
  });


  console.log("🟢 Redux state перед рендером:", store.getState().issues);

 
  await waitFor(() => {
    expect(
      store.getState().issues["https://github.com/user/repo"].todo
    ).toHaveLength(1);
  });

  render(<App />);

 
  console.log("🟢 HTML после рендера:", document.body.innerHTML);

  await waitFor(() => {
    expect(screen.getByText(/Issue 1/i)).toBeInTheDocument();
  });

  const issueElement = screen.getByText(/Issue 1/i);
  const inProgressColumn = screen.getByText(/In Progress/i)?.parentElement;

  if (!issueElement || !inProgressColumn) {
    throw new Error("❌ Элемент не найден");
  }


  await act(async () => {
    issueElement.dispatchEvent(new DragEvent("dragstart", { bubbles: true }));
    inProgressColumn.dispatchEvent(new DragEvent("drop", { bubbles: true }));
  });

 
  await waitFor(() => {
    expect(
      store.getState().issues["https://github.com/user/repo"].inProgress
    ).toHaveLength(1);
  });
}, 20000); 
