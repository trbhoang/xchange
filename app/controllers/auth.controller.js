const User = require("../models/user");

module.exports = {
    processLogin: processLogin,
    processLogout: processLogout
};

async function processLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            req.flash("error", "Invalid username / password");
            res.redirect("/");
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
            req.flash("loginError", "Invalid username / password");
            res.redirect("/");
        } else {
            req.session.user = { id: user.id, username: user.username, group: user.group };
            if (user.isAdmin) res.redirect("/admin");
            else res.redirect("/profile");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

function processLogout(req, res) {
    res.clearCookie("sid");
    res.redirect("/");
}
