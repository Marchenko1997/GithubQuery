import { Draggable } from "@hello-pangea/dnd";
import { Card } from "react-bootstrap";
import { Issue } from "../../../redux/issuesSlice";

interface IssueCardProps {
  issue: Issue;
  index: number;
}

const IssueCard = ({ issue, index }: IssueCardProps) => {
  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2"
          style={{
            opacity: snapshot.isDragging ? 0.5 : 1,
            cursor: "grab",
            ...provided.draggableProps.style,
          }}
        >
          <Card.Body>
            <Card.Title>{issue.title}</Card.Title>
            <Card.Text>#{issue.id}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default IssueCard;
