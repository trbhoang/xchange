// load environment variables
require("dotenv").config();

// Required System Module Files
const express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    expressLayouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash"),
    expressValidator = require("express-validator"),
    connectMongoDBSession = require("connect-mongodb-session"),
    SessionStore = connectMongoDBSession(session),
    sessionStore = new SessionStore({
        uri: process.env.DB_URI,
        collection: "sessions"
    });

// connect to database
mongoose.connect(process.env.DB_URI);

// configure our application ===================
// set sessions and cookie parser
app.use(cookieParser());
app.use(
    session({
        name: "sid", // name of the session ID cookie to set in the response (and read from in the request).
        secret: "AagtCnvIdrVeRvI0Cwf6HSmPoitsE4vl",
        cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
        resave: true, // forces the session to be saved back to the store
        saveUninitialized: true, // dont save unmodified
        store: sessionStore
    })
);
app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + "/public"));

// set ejs as our templating engine
app.set("views", "./app/views");
app.set("view engine", "ejs");
app.use(expressLayouts);

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
// make logged in user object available in all templates
app.use(function(req, res, next) {
    req.isAuthenticated = req.session && req.session.user ? true : false;
    res.locals.currentUser = req.session.user;
    req.currentUser = req.session.user;
    next();
});

// set the routes =============================
app.use(require("./app/routes"));

// start our server ===========================
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
