const User = require("../../models/user"),
    Account = require("../../models/account");

module.exports = {
    showAccounts
};

// show accounts
async function showAccounts(req, res) {
    try {
        const accounts = await Account.find({}).populate("user", "username");
        res.render("admin_pages/accounts", {
            accounts: accounts,
            success: req.flash("success"),
            layout: "admin_layout"
        });
    } catch (e) {
        res.status(400).send("Not found!");
    }
}
