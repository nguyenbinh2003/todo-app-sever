const Todo = require("../models/todo.model");

const TodosController = {
  //  GET
  getTodos: async (req, res) => {
    try {
      const { title, sortDirection, projectID } = req.query;
      const sort = { title: sortDirection === "asc" ? 1 : -1 };
      const filter = { _id: projectID };

      if(!projectID) return res.status(400).json({
        message: "projectID is required"
      });

      if (title) {
        filter.title = { $regex: title, $options: "i" };
      }
      const todos = Todo.find(filter).sort(sort).exec();

      return res.json(todos);
    } catch (error) {
      console.log(error);
      return res.status(404).json(error);
    }
  },

  //  POST
  createTodo: async (req, res) => {
    try {
      const { title, description, status, projectID } = req.body;

      if (!title && !projectID)
        return res.status(400).json({
          message: "title and projectID is required",
        });

      const newTodo = new Todo({
        title,
        description,
        status,
        projectID,
      });
      await newTodo.save();

      return res.json({
        message: "success",
      });
    } catch (error) {
      return res.status(404).json({
        error,
      });
    }
  },

  //  PATCH
  editTodo: async (req, res) => {
    try {
      const { todoID } = req.params;
      const { title, description, status } = req.body;
      if (!todoID)
        return res.status(400).json({
          message: "todoID is required",
        });

      const todo = await Todo.findById(todoID);
      if (!todo)
        return res.status(400).json({
          message: "not found",
        });

      todo.title = title ? title : todo.title;
      todo.description = description ? description : todo.description;
      todo.status = status ? status : todo.status;

      await todo.save();
      return res.json({ message: "success" });
    } catch (error) {
      return res.status(404).json({
        error,
      });
    }
  },

  //  DELETE
  deleteTodo: async (req, res) => {
    const { todoID } = req.params;
    if (!todoID) return res.status(400).json({ message: "todoID is required" });

    const todo = await Todo.findByIdAndDelete(todoID);
    if (!todo) return res.status(400).json({ message: "not found" });

    return res.json({ message: "success" });
  },
};

module.exports = TodosController;
