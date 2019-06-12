const { Account } = require("../models/account"),
    ObjectId = require("mongoose").Types.ObjectId,
    { getTokenBalanceFromAddress } = require("../services/tronweb.service");

module.exports = {
    showHome,
    showProfile
};

function showHome(req, res) {
    if (req.isAuthenticated) res.redirect("/profile");
    else res.render("pages/home", { message: req.flash("loginMessage"), layout: false });
}

async function showProfile(req, res) {
    try {
        const accounts = await Account.find({ user: ObjectId(req.currentUser.id) });
        for (let i = 0; i < accounts.length; i++) {
            let account = accounts[i];
            account.balance = await getTokenBalanceFromAddress(account.address);
        }

        res.render("pages/profile", {
            accounts
        });
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}
