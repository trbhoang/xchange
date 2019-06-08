module.exports = {
    // show the home page
    showHome: showHome,
    showProfile: showProfile
};

function showHome(req, res) {
    if (req.isAuthenticated) res.redirect("/profile");
    else res.render("pages/home", { message: req.flash("loginMessage") });
}

function showProfile(req, res) {
    res.render("pages/profile", {
        user: req.user // truyền đối tượng user cho profile để hiển thị lên view
    });
}
