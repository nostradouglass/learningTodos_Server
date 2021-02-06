import mongoose, { Schema, model, Document, Model } from "mongoose";

interface Todo extends Document{
  //id: String
  todoItem: String
  completed: Boolean
  percentComplete: Number
  notes: String
}

const TodoSchema: Schema = new Schema({
  //id: { type: String },
  todoItem: { type: String },
  completed: { type: Boolean },
  percentComplete: { type: Number },
  notes: {type: String}
});

const Todo: Model<Todo> = model("todo", TodoSchema);

export default Todo
