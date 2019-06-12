const mongoose = require("../db"),
    TRADE_STATUS_NEW = "new",
    TRADE_STATUS_PAYMENT_UNCONFIRMED = "payment_unconfirmed",
    TRADE_STATUS_PAYMENT_CONFIRMED = "payment_confirmed",
    TRADE_STATUS_TOKEN_TRANSFER_ISSUED = "token_transfer_issue",
    TRADE_STATUS_TOKEN_TRANSFER_SUCCESS = "token_transfer_success",
    ORDER_TYPE_BUY = "buy",
    ORDER_TYPE_SELL = "sell";

const TradeSchema = new mongoose.Schema(
    {
        order_type: {
            type: String,
            required: true
        },
        trader: {
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
            type: String,
            unique: true
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

module.exports = { Trade };
