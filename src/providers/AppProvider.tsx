import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { moveIssue, reorderIssues } from "../redux/issuesSlice";
import { selectRepoUrl } from "../redux/selectors";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const dispatch = useDispatch();
  const repoUrl = useSelector(selectRepoUrl); 

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !repoUrl) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      dispatch(
        reorderIssues({
          repoUrl,
          column: source.droppableId as "todo" | "inProgress" | "done",
          fromIndex: source.index,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(
        moveIssue({
          repoUrl,
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
