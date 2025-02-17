import { useDrag, DragSourceMonitor } from "react-dnd";
import { Card } from "react-bootstrap";
import { Issue } from "../../../redux/issuesSlice";
import { useDispatch } from "react-redux";
import { moveIssue } from "../../../redux/issuesSlice";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "ISSUE",
    item: { id: issue.id }, // ✅ Передаем только ID, без from
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(moveIssue({ id: item.id, to: dropResult.to }));
      }
    },
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
