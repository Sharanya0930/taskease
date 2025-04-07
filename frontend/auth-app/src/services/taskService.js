import axios from "axios";

const API_URL = "http://localhost:5000/api/task";

export const fetchTasks = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/gettask/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
