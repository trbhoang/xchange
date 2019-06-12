const { transferToken } = require("../services/transfer.service"),
    { getTransactionById, isValidTransaction, isValidAndConfirmedTransaction } = require("../services/usdt.service"),
    { TRADE_STATUS_PAYMENT_CONFIRMED, TRADE_STATUS_PAYMENT_UNCONFIRMED } = require("../models/trade"),
    ObjectId = require("mongoose").Types.ObjectId,
    { Trade } = require("../models/trade");

module.exports = {
    showDetail,
    showHistory,
    createTrade
};

function showHistory(req, res) {
    res.render("pages/trade/trades");
}

async function showDetail(req, res) {
    const id = req.params.id;
    const trade = await Trade.findById(id);

    res.render("pages/trade/detail", { trade });
}

async function createTrade(req, res) {
    const txId = req.body.txId;

    try {
        const tx = await getTransactionById(txId);
        if (!isValidTransaction(tx)) {
            req.flash("error", "Id giao dịch không hợp lệ. Vui lòng thử lại!");
            res.redirect("back");
        }

        const status = isValidAndConfirmedTransaction(tx) ? TRADE_STATUS_PAYMENT_CONFIRMED : TRADE_STATUS_PAYMENT_UNCONFIRMED;
        const trade = await Trade.create({
            order: ObjectId(req.body._orderId),
            user: ObjectId(req.currentUser.id),
            payment_txid: txId,
            status: status
        });

        res.redirect(`/trades/${trade.id}`);
    } catch (err) {
        res.status(500).send(err.toString());
    }
}
