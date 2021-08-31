const express = require("express");
const router = express.Router();

// Требовать контроллеры
const {
  test,
  task_create,
  task_details,
  task_update,
  task_delete,
  tasks_get,
  tasks_clearCompleted,
} = require("../controllers/task.controller");

// простой тестовый URL для проверки правильности обмена данными со всеми нашими файлами.
router.get("/test", test);

router.get("/tasks", tasks_get);

router.post("/task", task_create);

router.get("/task/:id", task_details);

router.patch("/task/:id", task_update);

router.delete("/task/:id", task_delete);

router.get("/tasks/nocompleted", tasks_clearCompleted);

module.exports = router;
