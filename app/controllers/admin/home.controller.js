const User = require("../../models/user"),
    Account = require("../../models/account"),
    { generateAddress } = require("../../services/tron.service");

module.exports = {
    showHome
};

// show the home page
function showHome(req, res) {
    res.render("admin_pages/home", { layout: "admin_layout" });
}
