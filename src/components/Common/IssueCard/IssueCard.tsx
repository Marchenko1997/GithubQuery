import { useDrag, DragSourceMonitor } from "react-dnd";
import { Card } from "react-bootstrap";
import { Issue } from "../../../redux/issuesSlice";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ISSUE",
    item: { id: issue.id, from: issue.state },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={dragRef}
      className="mb-2"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}
    >
      <Card.Body>
        <Card.Title>{issue.title}</Card.Title>
        <Card.Text>#{issue.id}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default IssueCard;
