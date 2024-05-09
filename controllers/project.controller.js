const Project = require("../models/project.model");

const ProjectsController = {
  //    GET
  getProjectById: async (req, res) => {
    try {
      const { idProject } = req.params;
      if (!idProject)
        return res.status(404).json({
          message: "not found",
        });

      const project = await Project.findById(idProject);

      if (!project)
        return res.status(404).json({
          message: "not found",
        });

      return res.json(project);
    } catch (error) {
      return res.status(404).json({
        error,
      });
    }
  },

  getAllProject: async (req, res) => {
    try {
      const projects = await Project.find({});

      return res.json(projects);
    } catch (error) {
      return res.status(404).json({
        error,
      });
    }
  },

  //    POST
  createProject: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title)
        return res.status(400).json({
          message: "title is required",
        });

      const newProject = new Project({
        title,
        description,
        todos: [],
      });

      await newProject.save();

      return res.json({
        message: "success",
      });
    } catch (error) {
      return res.status(404).json({
        error,
      });
    }
  },

  //    PATCH
  editProject: async (req, res) => {
    const { idProject } = req.params;
    const { title, description } = req.body;

    if (!idProject)
      return res.status(400).json({
        message: "id not found",
      });

    const project = await Project.findById(idProject);

    if (!project)
      return res.status(400).json({
        message: "id not found",
      });

    if (title && description) {
      project.title = title;
      project.description = description;
    } else if (title) {
      project.title = title;
    } else if (description) {
      project.description = description;
    }
    await project.save();
    return res.json({ message: "success" });
  },

  //   DELETE
  deleteProject: async (req, res) => {
    const { idProject } = req.params;

    if (!idProject)
      return res.status(400).json({
        message: "id not found",
      });

    const project = await Project.findByIdAndDelete(idProject);
    if (!project) return res.status(404).json({ message: "not found" });

    return res.json({
      message: "success",
    });
  },
};

module.exports = ProjectsController;
