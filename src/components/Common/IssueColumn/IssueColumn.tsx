import { Col } from "react-bootstrap";
import { Issue } from "../../../redux/issuesSlice";
import { useDrop, DropTargetMonitor } from "react-dnd"; // Добавил DropTargetMonitor для корректного типа monitor
import { useDispatch } from "react-redux";
import { moveIssue } from "../../../redux/issuesSlice";
import IssueCard from "../IssueCard/IssueCard";

interface IssueColumnProps {
  title: string;
  issues: Issue[];
}

const IssueColumn = ({ title, issues }: IssueColumnProps) => {
  const dispatch = useDispatch();

  const [{ isOver }, dropRef] = useDrop({
    accept: "ISSUE",
    drop: (item: { id: number; from: keyof typeof IssuesState }) => {
      dispatch(
        moveIssue({
          id: item.id,
          from: item.from,
          to: title.toLowerCase() as keyof typeof IssuesState,
        }) // Привёл к типу keyof typeof IssuesState
      );
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Col
      ref={dropRef}
      className="p-3 border"
      style={{ backgroundColor: isOver ? "#f0f0f0" : "transparent" }}
    >
      <h4>{title}</h4>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </Col>
  );
};

export default IssueColumn;
