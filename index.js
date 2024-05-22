// require("./config/database").connect();
const express = require("express");
const port = 8000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const { PORT, MONGODB_URL, SESSION_SECRET_KEY } = process.env;
const expressLayouts = require("express-ejs-layouts");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const db = require("./config/database");

const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(expressLayouts);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo stonre is used to store the session cookie in the db
app.use(
  session({
    name: "placement-cell",
    secret: "Sujoy Peter",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://sujoypeter:sujoy123@cluster0.ckdun0j.mongodb.net/",
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);




app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
