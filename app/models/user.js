const mongoose = require("../db"),
    bcrypt = require("bcryptjs"),
    USERGROUP_ADMIN = "admin",
    USERGROUP_DAI_LY_CAP1 = "dai_ly_cap1",
    USERGROUP_DAI_LY_CAP2 = "dai_ly_cap2",
    Group = {
        [USERGROUP_ADMIN]: "Administrator",
        [USERGROUP_DAI_LY_CAP1]: "Đại lý cấp 1",
        [USERGROUP_DAI_LY_CAP2]: "Đại lý cấp 2"
    },
    GroupList = [[USERGROUP_DAI_LY_CAP1, Group[USERGROUP_DAI_LY_CAP1]], [USERGROUP_DAI_LY_CAP2, Group[USERGROUP_DAI_LY_CAP2]]];

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String
        },
        group: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
);

UserSchema.pre("save", function(next) {
    let user = this;
    if (!user.isModified("password")) {
        return next();
    }
    // encrypt password
    bcrypt.genSalt(12, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.method("comparePassword", function(password) {
    return bcrypt.compare(password, this.password);
});

UserSchema.virtual("isAdmin").get(function() {
    return this.group === USERGROUP_ADMIN;
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    USERGROUP_ADMIN,
    USERGROUP_DAI_LY_CAP1,
    USERGROUP_DAI_LY_CAP2,
    Group,
    GroupList,
    User
};
