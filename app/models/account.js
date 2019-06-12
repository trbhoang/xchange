const mongoose = require("../db"),
    Schema = mongoose.Schema,
    config = require("../config"),
    TOKEN_NAME = config.token.tokenName;

const AccountSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        asset: {
            type: String,
            default: TOKEN_NAME
        },
        address: {
            type: String,
            required: true,
            max: 64
        },
        path: {
            type: String,
            required: true,
            max: 255
        }
    },
    {
        timestamps: true
    }
);

// Export the model
const Account = mongoose.model("Account", AccountSchema);
module.exports = { Account };
