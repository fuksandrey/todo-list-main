const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

let TaskSchema = new Schema({
  value: { type: String, required: true, max: 100 },
  // TODO STRING;; uuidv4
  id: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
});

// Экспорт модели
module.exports = mongoose.model("Task", TaskSchema);
// mongoose.model("Product", TaskSchema, "Task1");
// TaskSchema.Product.renameCollection("Task");
