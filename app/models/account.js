const mongoose = require("../db"),
    Schema = mongoose.Schema,
    TOKEN_NAME = process.env.TOKEN_NAME;

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
module.exports = mongoose.model("Account", AccountSchema);
