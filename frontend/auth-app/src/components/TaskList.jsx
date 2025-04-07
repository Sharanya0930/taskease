import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div className="row">
      {tasks.length === 0 ? (
        <p className="text-center text-muted">No tasks yet! Create one</p>
      ) : (
        tasks.map((task, index) => (
          <TaskCard key={task.task_id || task.id || index} task={task} onUpdate={onUpdate} onDelete={onDelete}/>
        ))
      )}
    </div>
  );
};

export default TaskList;
