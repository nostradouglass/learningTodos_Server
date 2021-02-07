import mongoose, { Schema, model, Document, Model } from "mongoose";

interface ITodo extends Document{
  todoItem: String
  completed: Boolean
  percentComplete: Number
  notes: String
}

let TodoSchema: Schema = new Schema({
  todoItem: { type: String },
  completed: { type: Boolean },
  percentComplete: { type: Number },
  notes: {type: String}
});


const Todo: Model<ITodo> = model("todo", TodoSchema);

export default Todo
