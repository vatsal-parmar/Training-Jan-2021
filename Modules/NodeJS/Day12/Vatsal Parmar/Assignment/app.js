const express = require("express");
var createError = require("http-errors");
const emplyees = require("./controller/employees/employee.controller");
const students = require("./controller/students/student.controller");
const login = require("./controller/login/login.controller");
const verifytoken = require("./authentication/verifytoken");
const logger = require("./middleware/logger");
const mongoose = require("mongoose");

var mongoDB = "mongodb://localhost/db1";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected To MongoDB"));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/login", login);
//app.use(verifytoken);
app.use("/emps", emplyees);
app.use("/students", students);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // seding error message
  res.status(err.status || 500).send("Smething is broke!!");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
