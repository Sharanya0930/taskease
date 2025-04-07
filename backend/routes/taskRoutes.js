const express = require("express");
const { savetask, gettask, deletetask, updatetask } = require("../controller/taskController");
const router = express.Router();

router.post("/savetask", savetask);
router.get("/gettask/:user_id", gettask);
router.delete("/deletetask/:task_id", deletetask);
router.put("/updatetask/:task_id", updatetask);


module.exports = router;