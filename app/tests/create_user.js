const { User, USERGROUP_ADMIN } = require("../models/user");

// create admin user
(async function() {
    try {
        const user = await User.create({
            username: "admin",
            password: "12345678",
            group: USERGROUP_ADMIN
        });
        console.log(user);
        return;
    } catch (e) {
        console.log("xxx");
        console.log(e);
    }
})();
