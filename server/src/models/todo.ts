import mongoose, { Schema, model, Document, Model } from "mongoose";

interface ITodo extends Document{
  todoItem: string
  completed: boolean
  percentComplete: number
  notes: string

}

let TodoSchema: Schema = new Schema({
  todoItem: { type: String },
  completed: { type: Boolean },
  percentComplete: { type: Number },
  notes: {type: String}
});


const Todo: Model<ITodo> = model("todo", TodoSchema);

export default Todo
