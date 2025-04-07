import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ task, onSave, onCancel }) => {
  const [date, setDate] = useState(task?.date || "");
  const [content, setContent] = useState(task?.content || "");
  const [status, setStatus] = useState(task?.status || "");

  useEffect(() => {
    setDate(task?.date || "");
    setStatus(task?.status || "");
    setContent(task?.content || "");
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { date, content, status };

    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.put(
        `http://localhost:5000/api/task/updatetask/${task.task_id}`, 
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        }
      );

      console.log("Task updated successfully:", response.data);
      onSave({ ...task, ...updatedTask }); // Update state in the frontend
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date" required
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control" required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="modal-footer d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
