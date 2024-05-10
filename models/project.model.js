const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
  { collection: "Projects" }
);

module.exports = mongoose.model("Projects", projectSchema);
