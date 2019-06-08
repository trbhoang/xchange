const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        asset: {
            type: String,
            required: true
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
