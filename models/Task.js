const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {         // Add this field
    type: String,
    default: ''          // optional, you can make it required if you want
  },
  done: {
    type: Boolean,
    default: false
  }
  }, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
