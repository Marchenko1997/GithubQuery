import { Col } from "react-bootstrap";
import { Issue } from "../../../redux/types";
import { Droppable } from "@hello-pangea/dnd";
import IssueCard from "../IssueCard/IssueCard";

interface IssueColumnProps {
  title: "ToDo" | "In Progress" | "Done";
  issues: Issue[];
  id: "todo" | "inProgress" | "done";
}

const IssueColumn = ({ title, issues, id }: IssueColumnProps) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <Col
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-3 border"
          style={{
            backgroundColor: snapshot.isDraggingOver
              ? "#f0f0f0"
              : "transparent",
            flex: 1, 
            minWidth: "300px", 
            maxWidth: "400px",
            margin: "15px 10px 0 10px", 
          }}
        >
          <h4>{title}</h4>
          {issues?.map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))}
          {provided.placeholder}
        </Col>
      )}
    </Droppable>
  );
};

export default IssueColumn;
