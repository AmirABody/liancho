const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/cats", require("./routes/categoryRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
const CLIENT_BUILD_PATH = path.join(__dirname, "..", "frontend", "build");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(CLIENT_BUILD_PATH));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(CLIENT_BUILD_PATH, "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
