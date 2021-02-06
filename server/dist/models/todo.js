"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    //id: { type: String },
    todoItem: { type: String },
    completed: { type: Boolean },
    percentComplete: { type: Number },
    notes: { type: String }
});
const Todo = mongoose_1.model("todo", TodoSchema);
exports.default = Todo;
