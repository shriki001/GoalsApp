const mongo = require('mongoose');
const moment = require("moment");

const { Schema, model } = mongo;

// Create Schema
const GoalStpeSchema = new Schema({
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
    createAt: {
        type: Date,
        immutabel: true,
        default: _ => moment()
    },
    updateAt: {
        type: Date,
        default: _ => moment()
    }
});


module.exports = GoalStpeSchema;