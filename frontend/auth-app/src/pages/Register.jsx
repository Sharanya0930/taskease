import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Added loading state
  const navigate = useNavigate();

  // Handle input change for all fields dynamically
  const handleChange = (e) => 
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));

  // Clear the form data
  const clearForm = () => setFormData({ name: "", email: "", password: "" });

  // Improved error message handling
  const getErrorMessage = (error) => {
    if (error.response) {
      return error.response.data?.message || "Registration failed";
    }
    return "Network error. Please try again later.";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      setMessage(response.data.message);
      clearForm();

      // Redirect after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(getErrorMessage(error));
      clearForm();
    } finally {
      setLoading(false);
    }
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 border p-4 rounded shadow bg-white">
          <h2 className="mb-3 text-dark fw-bold">Join Us🚀</h2>
          <p className="text-muted">Sign up to start your journey@TaskEase!</p>
          {message && <p className="alert alert-info text-center">{message}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="form-control mb-3"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="form-control mb-3"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="form-control mb-3"
              required
            />
            <button 
              type="submit" 
              className="btn btn-dark w-100" 
              disabled={loading}  // Disable button when loading
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
