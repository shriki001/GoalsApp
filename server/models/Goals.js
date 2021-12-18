const mongo = require('mongoose');
const moment = require("moment");
const GoalStep = require('./GoalStep');

const { Schema, model } = mongo;
// Create Schema
const GoalSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is require']
    },
    description: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: _ => moment()
    },
    steps: [GoalStep],
    createAt: {
        type: Date,
        immutabel: true,
        default: _ => moment()
    },
    updateAt: {
        type: Date,
        default: _ => moment()
    },
    createdBy: {
        type: Schema.Types.ObjectId
    }
});


module.exports = model('Goals', GoalSchema);