import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import TaskList from "../components/TaskList";
import AddNote from "../components/AddNote";
import { fetchTasks } from "../services/taskService";

const Dashboard = () => {
  const navigate = useNavigate();

  // Retrieve stored user details
  const storedName = localStorage.getItem("name");
  const storedUserId = localStorage.getItem("userid");

  const [name, setName] = useState(storedName || "");
  const [userId, setUserId] = useState(storedUserId || null);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tasks when userId is set
  useEffect(() => {
    if (userId) {
      fetchTasks(userId).then(setTasks);
    }
  }, [userId]);

  // Fetch tasks when searchQuery changes
  useEffect(() => {
    if (userId) {
      fetchTasks(userId).then(setTasks);
    }
  }, [searchQuery]);

  // Logout function
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.setItem("logoutMessage", "Logged out successfully!");
    navigate("/login");
  }, [navigate]);

  // Task update function
  const handleTaskUpdate = useCallback((updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.task_id === updatedTask.task_id ? updatedTask : task
      )
    );
  }, []);

  // Task delete function
  const handleTaskDelete = useCallback((deletedTaskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== deletedTaskId));
  }, []);

  // Handle task addition and close form
  const handleTaskAdd = useCallback((newTask) => {
    fetchTasks(userId).then((fetchedTasks) => {
      setTasks(fetchedTasks); // Ensure tasks are synced with the backend
      setShowForm(false);
    });
  }, [userId]);
  

  return (
    <div>
      {/* Navbar */}
      <Navbar
        name={name}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleLogout={handleLogout}
      />

      <div className="container mt-4">
        <h2 className="text-center">Your Tasks</h2>

        {/* Add Task Form */}
        {showForm ? (
          <AddNote onAdd={handleTaskAdd} onCancel={() => setShowForm(false)} />
        ) : (
          <TaskList tasks={tasks} onUpdate={handleTaskUpdate} onDelete={handleTaskDelete} />
        )}
      </div>

      {/* Floating Add Task Button */}
      {!showForm && (
        <button
          className="btn bg-dark rounded-circle position-fixed bottom-0 end-0 m-4 p-3 shadow-lg"
          onClick={() => setShowForm(true)}
        >
          ➕
        </button>
      )}
    </div>
  );
};

export default Dashboard;
