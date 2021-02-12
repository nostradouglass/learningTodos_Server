"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let TodoSchema = new mongoose_1.Schema({
    todoItem: { type: String },
    completed: { type: Boolean },
    percentComplete: { type: Number },
    notes: { type: String },
    officalTechName: { type: String },
    websiteUrl: { type: String }
});
const Todo = mongoose_1.model("todo", TodoSchema);
exports.default = Todo;
//# sourceMappingURL=todo.js.map