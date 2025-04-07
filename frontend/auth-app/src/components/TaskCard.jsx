import React, { useState } from "react";
import axios from "axios";
import EditTask from "./EditTask";
import "bootstrap-icons/font/bootstrap-icons.css"; 

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "in_progress":
        return "bg-warning text-dark";
      case "pending":
        return "bg-primary";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleSave = (updatedTask) => {
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/task/deletetask/${task.task_id}`);
      alert("Task successfully deleted!");
      onDelete(task.task_id);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task!");
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
      <div className="card p-3 shadow position-relative" style={{ minHeight: "180px" }}>
        <span
          className={`badge position-absolute top-0 end-0 m-2 ${getStatusBadgeClass(task.status)}`}
          style={{ zIndex: 10, fontSize: "0.9rem", padding: "5px 10px", opacity: 0.8 }}
        >
          {task.status}
        </span>

        <h5>{task.title}</h5>
        <p className="text-muted">{task.date ? new Date(task.date).toLocaleDateString() : "No Date"}</p>
        <p>{task.content}</p>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-warning btn-sm" onClick={() => setIsEditing(true)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>

      {isEditing && <EditTask task={task} onSave={handleSave} onCancel={() => setIsEditing(false)} />}
    </div>
  );
};

export default TaskCard;
