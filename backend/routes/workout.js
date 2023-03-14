const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const {
  createWorkout,
  getOneWorkout,
  getAllWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

router.use(checkAuth);

router.get("/", getAllWorkouts);

router.get("/:id", getOneWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
