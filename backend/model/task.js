const db = require("../config/db");

const Task = {

    create: async ({ title, content, date, status, userid }) => {
        try {
            await db.query("INSERT INTO task (title, content, date, status, user_id) VALUES (?, ?, ?, ?, ?)", [
                title,
                content,
                date,
                status,
                userid
            ]);
        } catch (err) {
            console.error("Database Error:", err);
            throw err;
        }
    } 
    // delete: async (taskId) => { 
    //     try {
    //         await db.query("DELETE FROM task WHERE task_id = ?", [taskId]);
    //     } catch (err) {
    //         console.error("Database Error:", err);
    //         throw err;
    //     }
    // }
};

module.exports = Task;