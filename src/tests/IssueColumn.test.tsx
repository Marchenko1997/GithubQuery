import "@testing-library/jest-dom";
import { render, screen } from "./test-utils";
import IssueColumn from "../components/Common/IssueColumn/IssueColumn";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { DragDropContext } from "@hello-pangea/dnd";
import { Issue } from "../redux/types";

const mockIssues: Issue[] = [
  {
    id: 1,
    title: "Issue 1",
    number: 101,
    created_at: "2024-02-20T12:34:56Z",
    comments: 0,
    user: { login: "user1" },
    state: "open",
  },
  {
    id: 2,
    title: "Issue 2",
    number: 102,
    created_at: "2024-02-21T09:15:30Z",
    comments: 0,
    user: { login: "user2" },
    state: "open",
  },
];

test("рендер списка задач", async () => {
  render(
    <Provider store={store}>
      <DragDropContext onDragEnd={() => {}}>
        <IssueColumn title="ToDo" issues={mockIssues} id="todo" />
      </DragDropContext>
    </Provider>
  );

  expect(await screen.findByText(/Issue 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/Issue 2/i)).toBeInTheDocument();
});
