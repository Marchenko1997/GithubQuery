import "@testing-library/jest-dom";
import { render, screen, waitFor } from "./test-utils";
import IssueColumn from "../components/Common/IssueColumn/IssueColumn";
import { Issue } from "../redux/types";

const mockIssues: Issue[] = [
  {
    id: 1,
    title: "Issue 1",
    number: 101,
    created_at: "",
    comments: 0,
    user: { login: "user1" },
    state: "open",
  },
  {
    id: 2,
    title: "Issue 2",
    number: 102,
    created_at: "",
    comments: 0,
    user: { login: "user2" },
    state: "open",
  },
];

test("рендер списка задач", async () => {
  await render(<IssueColumn title="ToDo" issues={mockIssues} id="todo" />);

  await waitFor(() => {
    expect(screen.getByText(/Issue 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Issue 2/i)).toBeInTheDocument();
  });
});
