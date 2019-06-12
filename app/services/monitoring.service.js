const { Trade, TRADE_STATUS_PAYMENT_UNCONFIRMED, TRADE_STATUS_PAYMENT_CONFIRMED, TRADE_STATUS_TOKEN_TRANSFER_SUCCESS } = require("../models/trade");
const Promise = require("bluebird");
const { getAndVerifyTransaction } = require("./usdt.service");
const { transferToken } = require("./tronweb.service");

async function monitorTrades() {
    try {
        // check unconfirmed-payment trades
        let trades = await Trade.find({ status: TRADE_STATUS_PAYMENT_UNCONFIRMED });
        if (trades.length > 0) {
            for (let i = 0; i < trades.length; i++) {
                let trade = trades[i];
                let isConfirmed = await getAndVerifyTransaction(trade.payment_txid);
                if (isConfirmed) {
                    trade.status = TRADE_STATUS_PAYMENT_CONFIRMED;
                    await trade.save();
                }
                console.log("sleep 3s");
                await Promise.delay(1000 * 3);
            }
        }

        // process confirmed-payment trades
        trades = await Trade.find({ status: TRADE_STATUS_PAYMENT_CONFIRMED });
        if (trades.length > 0) {
            for (let i = 0; i < trades.length; i++) {
                let trade = trades[i];
                console.log(trade);
                const res = await transferToken(trade.token_address, trade.amount);
                if (res.result) {
                    trade.token_txid = res.transaction.txID;
                    trade.status = TRADE_STATUS_TOKEN_TRANSFER_SUCCESS;
                    await trade.save();
                }
                console.log("sleep 3s");
                await Promise.delay(1000 * 3);
            }
        }

        console.log("sleep 10s");
        await Promise.delay(1000 * 10);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { monitorTrades };
