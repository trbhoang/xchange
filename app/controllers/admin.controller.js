const User = require("../models/user");

module.exports = {
    showHome: showHome,
    showUsers: showUsers,
    createUser: createUser,
    showUser: showUser,
    updateUser: updateUser
};

// show the home page
function showHome(req, res) {
    res.render("admin_pages/home", { layout: "admin_layout" });
}

// show users
async function showUsers(req, res) {
    try {
        const users = await User.find({});
        res.render("admin_pages/users", {
            users: users,
            success: req.flash("success"),
            layout: "admin_layout"
        });
    } catch (e) {
        res.status(400).send("Not found!");
    }

    // res.render("admin_pages/users", { layout: "admin_layout" });
}

// create user
async function createUser(req, res) {
    // if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors.map(err => err.msg));
        return res.redirect("back");
    }

    // create new user
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            group: req.body.group
        });
        req.flash("success", "Successfully created user!");
        res.redirect("back");
    } catch (e) {
        res.status(500).send(e);
    }
}

// Get Single User Data
async function showUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id });
        const dataObject = { modalTitle: "Edit User", modalSubmit: "Update", user: user };
        res.send({ data: dataObject });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

//Update Single User Data
async function updateUser(req, res) {
    try {
        let user = User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("back");
    } catch (e) {
        res.status(500).send(e);
    }
}
