const db = require("../config/db");
const Task = require("../model/task");

exports.savetask = async (req, res) => {
    const { title, content, date, status, userid } = req.body;

    if (!title || !content || !date || !userid) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user exists before inserting the task
        const [userExists] = await db.query("SELECT user_id FROM users WHERE user_id = ?", [userid]);

        if (userExists.length === 0) {
            return res.status(400).json({ message: "Invalid user_id. User does not exist." });
        }

        // Insert the task
        await Task.create({ title, content, date, status, userid });
        res.status(201).json({ message: "Task added successfully" });

    } catch (error) {
        console.error("Task Error:", error);
        res.status(500).json({ message: "Error adding task" });
    }
};

exports.gettask = async (req, res) => {
    const userId = req.params.user_id;  // Extract user_id from URL params

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const [tasks] = await  db.query("SELECT * FROM task WHERE user_id = ?", [userId]);
        res.json(tasks);
    } catch (error) {
        console.error("Task Error:", error);
        res.status(500).json({ message: "Error retrieving tasks" });
    }
};

exports.deletetask = async (req, res) => {

    const taskId = req.params.task_id;
    if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    try {
        await db.query("DELETE FROM task WHERE task_id = ?", [taskId]);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Task Error:", error);
        res.status(500).json({ message: "Error deleting task" });
    }
};

exports.updatetask = async (req, res) => {
    const taskId = req.params.task_id;
    if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    const { content, date, status } = req.body;

    // Validate that required fields are present
    if (!content || !date || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const [task] = await db.query("SELECT * FROM task WHERE task_id = ?", [taskId]);

        if (!task || task.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update task
        const [updateResult] = await db.query(
            "UPDATE task SET content = ?, date = ?, status = ? WHERE task_id = ?",
            [content, date, status, taskId]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ message: "Task update failed" });
        }

        res.json({ message: "Task updated successfully" });

    } catch (error) {
        console.error("Task Update Error:", error);
        res.status(500).json({ message: "Error updating task" });
    }
};
