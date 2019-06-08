const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

const User = mongoose.model("User", UserSchema);

module.exports = { User };
