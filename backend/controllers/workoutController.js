const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//getAllWorkouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.json(workouts);
};

//getOneWorkout
const getOneWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }
  const workout = await Workout.findById(id);
  res.json(workout);
};

//create
const createWorkout = async (req, res) => {
  let emptyFields = [];
  const { title, reps, load } = req.body;
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please the the empty fields: " + emptyFields });
  }
  try {
    const user_id = req.user._id;
    const workoutCreate = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workoutCreate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }

  const workoutDelete = await Workout.findByIdAndDelete(id);
  res.status(200).json(workoutDelete);
};

//update
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not a valid id" });
  }

  const workoutUpdate = await Workout.findByIdAndUpdate(id, { ...req.body });
  res.status(200).json(workoutUpdate);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  deleteWorkout,
  updateWorkout,
};
