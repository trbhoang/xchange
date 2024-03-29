const { Account } = require("../models/account"),
    ObjectId = require("mongoose").Types.ObjectId,
    { getTokenBalanceFromAddress } = require("../services/tronweb.service"),
    { Trade } = require("../models/trade");

module.exports = {
    showCoin,
    showBuy
};

function showCoin(req, res) {
    res.render("pages/coin/coin");
}

function showBuy(req, res) {
    res.render("pages/coin/buy");
}
