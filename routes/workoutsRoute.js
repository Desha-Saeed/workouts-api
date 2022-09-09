const express = require("express");
const router = express.Router();

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middlewares/requireAuth");

//require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

//Get single workout
router.get("/:id", getWorkout);

//Create new Workout
router.post("/", createWorkout);

//Update a workout
router.patch("/:id", updateWorkout);

//Delete a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
