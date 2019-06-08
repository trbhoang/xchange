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
            req.session.user = { username: user.username, user_id: user.id };
            // req.session.user_id = user.id;
            res.redirect("/profile");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

    // res.render("pages/home");
}

function processLogout(req, res) {
    res.clearCookie("sid");
    res.redirect("/");
}
