import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { moveIssue, reorderIssues } from "../redux/issuesSlice";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const dispatch = useDispatch();

  const handleDragEnd = (result: DropResult) => {
    console.log("🛑 Drag End Event", result);

    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      console.log(`♻ Reordering within ${source.droppableId}`);
      dispatch(
        reorderIssues({
          column: source.droppableId as "todo" | "inProgress" | "done",
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );
    } else {
      console.log(
        `🔄 Moving from ${source.droppableId} to ${destination.droppableId}`
      );
      dispatch(
        moveIssue({
          id: parseInt(result.draggableId, 10),
          from: source.droppableId as "todo" | "inProgress" | "done",
          to: destination.droppableId as "todo" | "inProgress" | "done",
          newIndex: destination.index,
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>{children}</DragDropContext>
  );
};

export default AppProvider;
