const { transferToken } = require("../services/transfer.service"),
    { getTransactionById, isValidTransaction, isValidAndConfirmedTransaction } = require("../services/usdt.service"),
    { Order, ORDER_BUY } = require("../models/order"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    showBuy,
    createOrder,
    showPayment
};

function showBuy(req, res) {
    res.render("pages/order/buy");
}

async function showPayment(req, res) {
    const order = await Order.findById(req.params.id);
    res.render("pages/order/payment", { order });
}

// create user
async function createOrder(req, res) {
    // if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors.map(err => err.msg));
        return res.redirect("back");
    }

    // create new user
    try {
        const order = await Order.create({
            order_type: ORDER_BUY,
            user: ObjectId(req.currentUser.id),
            amount: req.body.amount
        });

        req.flash("success", "Successfully created order!");
        res.redirect(`/orders/payment/${order.id}`);
    } catch (e) {
        throw new Error(e);
        // res.status(500).send(e);
    }
}
