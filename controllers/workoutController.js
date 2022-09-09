const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such workout' });
    }
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'there is no workout!' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update an existing workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such workout' });
    }
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      }
    );

    if (!workout) {
      return res.status(404).json({ error: 'there is no workout!' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete an existing workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such workout' });
    }
    const workout = await Workout.findByIdAndDelete(id);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
