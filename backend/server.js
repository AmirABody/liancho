const express = require("express");
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
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
