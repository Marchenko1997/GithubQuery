import "./App.css";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import IssueColumn from "./components/Common/IssueColumn/IssueColumn";
import { selectIssuesState } from "./redux/selectors";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  const issuesState = useSelector(selectIssuesState);
  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <h1 className="my-4 text-center">GitHub Issues Tracker</h1>
        <SearchBar />
        <Row>
          <IssueColumn title="ToDo" issues={issuesState.todo} />
          <IssueColumn title="In Progress" issues={issuesState.inProgress} />
          <IssueColumn title="Done" issues={issuesState.done} />
        </Row>
      </Container>
    </DndProvider>
  );
}

export default App;
