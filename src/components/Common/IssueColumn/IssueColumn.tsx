import { Col } from "react-bootstrap";
import { Issue } from "../../../redux/issuesSlice";
import { useDrop, DropTargetMonitor } from "react-dnd";
import IssueCard from "../IssueCard/IssueCard";

interface IssueColumnProps {
  title: "ToDo" | "In Progress" | "Done";
  issues: Issue[];
}

const IssueColumn = ({ title, issues }: IssueColumnProps) => {
  // 🟢 Маппинг заголовков колонок в ключи Redux-хранилища
  const columnMap: Record<string, keyof IssuesState> = {
    ToDo: "todo",
    "In Progress": "inProgress",
    Done: "done",
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "ISSUE",
    drop: () => ({ to: columnMap[title] }), // ✅ Передаем `toColumn`
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
