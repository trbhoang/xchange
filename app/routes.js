// create a new express router
const express = require("express"),
    router = express.Router(),
    { requiresLogin } = require("./middlewares"),
    mainController = require("./controllers/main.controller"),
    authController = require("./controllers/auth.controller"),
    coinController = require("./controllers/coin.controller"),
    orderController = require("./controllers/order.controller"),
    tradeController = require("./controllers/trade.controller"),
    adminHomeController = require("./controllers/admin/home.controller"),
    adminUserController = require("./controllers/admin/user.controller"),
    adminAccountController = require("./controllers/admin/account.controller");

// export router
module.exports = router;

// define routes
// main routes
router.get("/", mainController.showHome);
router.get("/balance", requiresLogin, mainController.showBalance);

// xchange rate
router.get("/coin", requiresLogin, coinController.showCoin);

// orders
router.get("/orders/buy", orderController.showBuy);
router.post("/orders/buy", orderController.createOrder);
router.get("/orders/payment/:id", orderController.showPayment);

// transactions
router.get("/trades", requiresLogin, tradeController.showHistory);
router.post("/trades/buy", requiresLogin, tradeController.createTrade);

// router.get("/transactions/sell", requiresLogin, transactionController.showSell);
router.get("/trades/:id", requiresLogin, tradeController.showDetail);

// auth routes
router.post("/login", authController.processLogin);
router.get("/logout", authController.processLogout);

// admin routes
router.get("/admin", adminHomeController.showHome);
router.get("/admin/users", adminUserController.showUsers);
router.post("/admin/users", adminUserController.createUser);
router.get("/admin/user/:id", adminUserController.showUser);
router.post("/admin/user/:id", adminUserController.updateUser);

router.get("/admin/accounts", adminAccountController.showAccounts);
// router.get("/admin/account/:id", adminAccountController.showAccount);
// router.post("/admin/account/:id", adminAccountController.updateAccount);

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
