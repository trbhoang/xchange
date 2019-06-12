const { USERGROUP_ADMIN } = require("./models/user");

module.exports = {
    requiresLogin,
    requiresAdmin
};

// Require login before continue
function requiresLogin(req, res, next) {
    if (req.isAuthenticated) return next();
    res.redirect("/");
}

function requiresAdmin(req, res, next) {
    if (req.currentUser && req.currentUser.group === USERGROUP_ADMIN) return next();
    res.redirect("/");
}
