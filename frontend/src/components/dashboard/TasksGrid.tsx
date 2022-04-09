import React from "react";
import { Task } from "../../interfaces";

interface TasksGridProps {
  tasks: Task[];
  setSelectedTasks: (selectedTasks: string[]) => void;
}

export default function TasksGrid({ tasks, setSelectedTasks }: TasksGridProps) {
  return <div>TasksGrid</div>;
}
