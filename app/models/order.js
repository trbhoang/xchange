const mongoose = require("../db"),
    Schema = mongoose.Schema,
    ORDER_BUY = "buy",
    ORDER_SELL = "sell";

const OrderSchema = new Schema(
    {
        order_type: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "orders"
    }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ORDER_BUY, ORDER_SELL };
