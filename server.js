// Required System Module Files
const config = require("./app/config"),
    mongoose = require("./app/db"),
    express = require("express"),
    app = express(),
    expressLayouts = require("express-ejs-layouts"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash"),
    expressValidator = require("express-validator"),
    connectMongoDBSession = require("connect-mongodb-session"),
    SessionStore = connectMongoDBSession(session),
    sessionStore = new SessionStore({
        uri: config.db.uri,
        collection: "sessions"
    }),
    { requiresAdmin } = require("./app/middlewares");

// connect to database
// mongoose.connect(config.db.uri);

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

// helpers for views
app.locals.toAddrExplorerURL = function(address) {
    return config.token.explorerUrl + `/#/address/${address}`;
};

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

// requires Admin for /admin
app.use("/admin", requiresAdmin);

// set the routes =============================
app.use(require("./app/routes"));

// trades monitoring
const registerSignals = () => {
    process.on("SIGTERM", () => shutdown());
    process.on("SIGINT", () => shutdown());
};

async function shutdown() {
    process.exit(0);
}

const { monitorTrades } = require("./app/services/monitoring.service");

async function run() {
    while (true) {
        await monitorTrades();
    }
}

run()
    .then(registerSignals)
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

// start our server ===========================
app.listen(config.app.port, () => {
    console.log(`App listening on http://localhost:${config.app.port}`);
});
