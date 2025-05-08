const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./server/config/db");
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const port = 5454;

//Connect to DB

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: "mongodb+srv://rajputsom47:MtFNJQNWhMnE2vKu@cluster0.j9ujaem.mongodb.net/blog"
  }),
  //cookie:{maxAge: new Date (Date.now() + (3600000) )}
}));

app.use(express.static("public"));

//Template Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.get("", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});