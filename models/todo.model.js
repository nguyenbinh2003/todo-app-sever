const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
      set: (value) => Number(value) || 0,
    },
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
    },
  },
  { timestamps: true },
  { collection: "Todos" }
);

module.exports = mongoose.model("Todos", todoSchema);
