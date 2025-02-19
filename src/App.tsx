import Info from "./components/Info/Info";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectRepoUrl, selectIssuesState } from "./redux/selectors"; 
import AppProvider from "./providers/AppProvider";
import IssueColumn from "./components/Common/IssueColumn/IssueColumn";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  const issues = useSelector(selectIssuesState);
  const repoUrl = useSelector(selectRepoUrl);

  return (
    <AppProvider>
      <Container>
        <h1 className="my-4 text-center">GitHub Issues Tracker</h1>
        <SearchBar />
        {repoUrl && <Info repoUrl={repoUrl} />}
        <Row>
          <IssueColumn title="ToDo" issues={issues.todo} id="todo" />
          <IssueColumn
            title="In Progress"
            issues={issues.inProgress}
            id="inProgress"
          />
          <IssueColumn title="Done" issues={issues.done} id="done" />
        </Row>
      </Container>
    </AppProvider>
  );
};

export default App;
