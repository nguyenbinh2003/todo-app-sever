const express = require("express");
const router = express.Router();

const TodosController = require("../controllers/todo.controller");

/* GET */
router.get("/", TodosController.getTodos);
router.get("/:idTodo", TodosController.getTodoById);

//  POST
router.post("/add", TodosController.createTodo);

//  PATCH
router.patch("/:todoID", TodosController.editTodo);

//  DELETE
router.delete("/:todoID", TodosController.deleteTodo);

module.exports = router;
