const mongoose = require("../db"),
    Schema = mongoose.Schema;

// Proof of Transaction model
const PotSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tx_hash: {
            type: String
        },
        status: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: "pots"
    }
);

const Pot = mongoose.model("Pot", PotSchema);

module.exports = Pot;
