import { Col } from "react-bootstrap";
import { Issue } from "../../../redux/issuesSlice";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveIssue } from "../../../redux/issuesSlice";
import IssueCard from "../IssueCard/IssueCard";

interface IssueColumnProps {
  title: "ToDo" | "In Progress" | "Done"; // Заголовки в удобочитаемом формате
  issues: Issue[];
}

const IssueColumn = ({ title, issues }: IssueColumnProps) => {
  const dispatch = useDispatch();

  const [{ isOver }, dropRef] = useDrop({
    accept: "ISSUE",
    drop: (item: { id: number; from: keyof IssuesState }) => {
      console.log("Dropped item:", item);
      console.log("Target column:", title); // title теперь точно "ToDo" | "In Progress" | "Done"

      // Маппинг заголовков колонок в ключи Redux-хранилища
      const columnMap: Record<string, keyof IssuesState> = {
        ToDo: "todo",
        "In Progress": "inProgress",
        Done: "done",
      };

      dispatch(
        moveIssue({
          id: item.id,
          from: item.from,
          to: columnMap[title], // Передаем правильное название
        })
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
