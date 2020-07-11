// ====== DEPENDENCIES ======
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const routes = require("./routes");
const chalk = require("chalk");
const passport = require("passport");
const PORT = process.env.PORT || 3001;
const app = express();

// ====== MIDDLEWARE ======
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// ====== ROUTES ======
app.use(routes);

// ====== DATABASE ======
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fetch", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// ====== START SERVER ======
app.listen(PORT, function () {
  console.log(
    chalk.cyan(`API Server now listening on PORT http://localhost:${PORT}`)
  );
});
