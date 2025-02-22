import { Draggable } from "@hello-pangea/dnd";
import { Card } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import { Issue } from "../../../redux/types";

interface IssueCardProps {
  issue: Issue;
  index: number;
}

const IssueCard = ({ issue, index }: IssueCardProps) => {
   console.log("🔍 IssueCard рендерится:", issue, "Index:", index);
  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 p-2"
          style={{
            opacity: snapshot.isDragging ? 0.5 : 1,
            cursor: "grab",
            ...provided.draggableProps.style,
          }}
        >
          <Card.Body>
            <Card.Title>{issue.title}</Card.Title>
            <Card.Text>
              <strong>#{issue.number}</strong> opened{" "}
              {formatDistanceToNow(new Date(issue.created_at), {
                addSuffix: true,
              })}
            </Card.Text>
            <Card.Text>
              <strong>{issue.user?.login}</strong> | Comments: {issue.comments}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default IssueCard;
