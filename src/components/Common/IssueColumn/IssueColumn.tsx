import { Card, Col } from "react-bootstrap"; 
import { Issue } from "../../../redux/issuesSlice";

interface Props {
  title: string;
  issues: Issue[];
}

const IssueColumn = ({ title, issues }: Props) => {
  return (
    <Col md={4}>
      <h3 className="text-center">{title}</h3>
      <div className="p3 bg-light-rounded">
        {issues.map((issue) => (
          <Card key={issue.id} className="md-2">
            <Card.Title>{issue.title}</Card.Title>
            <Card.Subtitle className="md-2 text-muted">
              #{issue.number}
            </Card.Subtitle>
            <Card.Text>
              <strong>Author:</strong>
              {issue.user.login} | <strong>Comments:</strong> {issue.comments}
            </Card.Text>
          </Card>
        ))}
      </div>
    </Col>
  );
};

export default IssueColumn;
