const mongoose = require("../db"),
    Schema = mongoose.Schema,
    TRADE_STATUS_NEW = "new",
    TRADE_STATUS_PAYMENT_UNCONFIRMED = "payment_unconfirmed",
    TRADE_STATUS_PAYMENT_CONFIRMED = "payment_confirmed",
    TRADE_STATUS_TOKEN_TRANSFER_ISSUED = "token_transfer_issue",
    TRADE_STATUS_TOKEN_TRANSFER_SUCCESS = "token_transfer_success";

const TradeSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        payment_txid: {
            type: String,
            required: true,
            unique: true
        },
        token_transfer_txid: {
            type: String
        },
        status: {
            type: String,
            default: TRADE_STATUS_NEW
        }
    },
    {
        timestamps: true,
        collection: "trades"
    }
);

const Trade = mongoose.model("Trade", TradeSchema);

module.exports = {
    Trade,
    TRADE_STATUS_PAYMENT_UNCONFIRMED,
    TRADE_STATUS_PAYMENT_CONFIRMED,
    TRADE_STATUS_TOKEN_TRANSFER_ISSUED,
    TRADE_STATUS_TOKEN_TRANSFER_SUCCESS
};
