import React, { useState } from "react";
import axios from "axios";

const AddNote = ({ onAdd, onCancel }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!note.title || !note.content || !note.date) {

      alert("All feilds are required!")
      console.error("All fields are required!");
      return;
    }

    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    if (!userid) {
      console.error("User ID is missing!");
      return;
    }

    const payload = {
      title: note.title,
      content: note.content,
      date: note.date,
      status: note.status,
      userid: userid,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/task/savetask", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Task saved successfully:", response.data);
      onAdd(note);
      setNote({ title: "", content: "", date: "", status: "pending" }); // Reset form
      onCancel(); // Close form after saving
    } catch (error) {
      console.error("Error saving task:", error.response ? error.response.data : error.message);
    }
  };

  const handleCancel = () => {
    setNote({ title: "", content: "", date: "", status: "pending" }); // Reset form
    onCancel(); // Close the form
  };

  return (
    <div className="card p-3 mb-3 shadow">
      <h5>Add New Note</h5>
      <input
        type="text"
        className="form-control mb-2"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        className="form-control mb-2"
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="date"
        className="form-control mb-2"
        name="date"
        value={note.date}
        onChange={handleChange}
        required
      />
      {/* Status Dropdown */}
      <select className="form-control mb-2" name="status" value={note.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <div className="d-flex justify-content-start mt-2">
        <button className="btn btn-success btn-sm me-2 px-3" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn btn-danger btn-sm px-3" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNote;
