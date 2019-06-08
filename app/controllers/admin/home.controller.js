module.exports = {
    showHome
};

// show the home page
function showHome(req, res) {
    res.render("admin_pages/home", { layout: "admin_layout" });
}
