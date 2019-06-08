const User = require("../../models/user"),
    Account = require("../../models/account"),
    { generateAddress } = require("../../services/tron.service"),
    { GroupList } = require("../../models/group");

module.exports = {
    showUsers,
    createUser,
    showUser,
    updateUser
};

// show users
async function showUsers(req, res) {
    try {
        const users = await User.find({});

        res.render("admin_pages/users", {
            users: users,
            groups: GroupList,
            success: req.flash("success"),
            layout: "admin_layout"
        });
    } catch (e) {
        res.status(400).send("Not found!");
    }
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

        // calc total number of accounts
        const totalAccounts = await Account.count();

        // create new accounts for this user
        const path = `m/${totalAccounts}`;
        const xAccount = await Account.create({
            user: user,
            asset: "XCOIN",
            address: generateAddress(path), // HD address
            path: path
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
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("back");
    } catch (e) {
        res.status(500).send(e);
    }
}
