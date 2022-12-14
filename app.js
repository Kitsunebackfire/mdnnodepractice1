var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
//////////////////
const mongoose = require("mongoose");

// set up default mongoose connection
const mongoDb =
  "mongodb+srv://kurtIveyCodes:safari@cluster0.v8s7osl.mongodb.net/test";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// get the defautl connection
const db = mongoose.connection;

// bind connection to error event (to get notification fo connection errors)
db.on("error", console.error.bind(console, "MongoDb connection error:"));

// define schema
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

// compile model from schema

const SomeModel = mongoose.model("SomeModel", SomeModelSchema);
//////////////
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
