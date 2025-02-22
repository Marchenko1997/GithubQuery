import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setRepoUrl } from "../../redux/repoSlice";
import { useGetIssuesQuery } from "../../redux/githubApi";
import { setIssues } from "../../redux/issuesSlice";
import { selectRepoUrl } from "../../redux/selectors";

const SearchBar = () => {
  const dispatch = useDispatch();
  const repoUrl = useSelector(selectRepoUrl);

  const { data, isLoading, error } = useGetIssuesQuery(repoUrl, {
    skip: !repoUrl,
  });

  const handleLoadIssues = () => {
    if (data) dispatch(setIssues({ repoUrl, issues: data })); 
  };

  return (
    <Row className="mt-3">
      <Col>
        <Form.Control
          type="text"
          placeholder="Enter Repo URL"
          value={repoUrl}
          onChange={(e) => dispatch(setRepoUrl(e.target.value))}
        />
      </Col>
      <Col xs="auto">
        <Button onClick={handleLoadIssues} disabled={!repoUrl || isLoading}>
          Load Issues
        </Button>
      </Col>
      {error && <p className="text-danger mt-2">Failed to load issues.</p>}
    </Row>
  );
};

export default SearchBar;
