//default
const express = require("express");
const path = require("path");

//third party
const bodyParser = require("body-parser");

//local
const sequalize = require("./utils/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const postRoute = require("./routes/post");
const adminRoute = require("./routes/admin");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/post", (req, res, next) => {
  console.log("I am post middleware");
  next();
});

app.use((req, res, next) => {
  console.log("I am parent middleware 2");
  next();
});

app.use("/admin", (req, res, next) => {
  console.log("admin middleware approved");
  next();
});

app.use(postRoute);
app.use("/admin", adminRoute);

sequalize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
