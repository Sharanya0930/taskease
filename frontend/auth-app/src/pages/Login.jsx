import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  //formData is an object that contains the email and password fields
  const [formData, setFormData] = useState({ email: "", password: "" });
  //message is a string that contains the message to be displayed to the user
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const clearForm = () => setFormData({ email: "", password: "" });
  const getErrorMessage = (error) =>
    error.response?.data?.message || "Login failed";
  // const saveToken = (token) => localStorage.setItem("token", token);

  const saveUserData = (token, userid, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("userid", userid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      saveUserData(response.data.token, response.data.userid, response.data.name);
      setMessage("Login successful!");
      clearForm();
    } catch (error) {
      setMessage(getErrorMessage(error));
      clearForm();
    }
  };

  useEffect(() => {
    if (message === "Login successful!") {
      const timer = setTimeout(() => navigate("/dashboard"), 1000);
      return () => clearTimeout(timer);
    }

    if (message && message !== "Login successful!") {
      const errorTimer = setTimeout(() => setMessage(""), 1000);
      return () => clearTimeout(errorTimer);
    }

    const storedMessage = localStorage.getItem("logoutMessage");
    if (storedMessage) {
      setMessage(storedMessage);
      localStorage.removeItem("logoutMessage");
    }

  }, [message, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 border p-4 rounded shadow bg-white">
          <h2 className="mb-3 text-dark fw-bold">Login🚀</h2>
          {message && <p className="alert alert-info text-center">{message}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control mb-3"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control mb-3"
              required
            />
            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <Link to="/">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
