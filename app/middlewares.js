module.exports = {
    requiresLogin: requiresLogin
};

// Require login before continue
function requiresLogin(req, res, next) {
    if (req.isAuthenticated) return next();
    res.redirect("/");
}
