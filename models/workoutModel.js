const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required']
  },
  reps: {
    type: Number,
    required: [true, 'user must specify the number of reps']
  },

  load: {
    type: Number,
    required: [true, 'User must specify the load']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user_id: {
    type: String,
    required: true
  }
});

const workoutModel = mongoose.model('Workout', workoutSchema);

module.exports = workoutModel;
