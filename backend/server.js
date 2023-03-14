require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_CONNECT).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      "listening on port and connecting to the database, PORT: " +
        process.env.PORT
    );
  });
});

app.use("/api/workouts/", workoutRoutes);
app.use("/api/user/", userRoutes);
