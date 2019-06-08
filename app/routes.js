// create a new express router
const express = require("express"),
    router = express.Router(),
    { requiresLogin } = require("./middlewares"),
    mainController = require("./controllers/main.controller"),
    authController = require("./controllers/auth.controller"),
    adminController = require("./controllers/admin.controller");

// eventsController = require("./controllers/events.controller");

// export router
module.exports = router;

// define routes
// main routes
router.get("/", mainController.showHome);
router.get("/profile", requiresLogin, mainController.showProfile);

// auth routes
router.post("/login", authController.processLogin);
router.get("/logout", authController.processLogout);

// admin routes
router.get("/admin", adminController.showHome);
router.get("/admin/users", adminController.showUsers);
router.post("/admin/users", adminController.createUser);
router.get("/admin/user/:id", adminController.showUser);
router.post("/admin/user/:id", adminController.updateUser);

// event routes
// router.get("/events", eventsController.showEvents);

// seed events
// router.get("/events/seed", eventsController.seedEvents);

// create events
// router.get("/events/create", eventsController.showCreate);
// router.post("/events/create", eventsController.processCreate);

// edit events
// router.get("/events/:slug/edit", eventsController.showEdit);
// router.post("/events/:slug", eventsController.processEdit);

// delete events
// router.get("/events/:slug/delete", eventsController.deleteEvent);

// show a single event
// router.get("/events/:slug", eventsController.showSingle);
