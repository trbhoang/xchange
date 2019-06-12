module.exports = {
    showBuy,
    showDetail,
    showHistory
};

function showHistory(req, res) {
    res.render("pages/trade/trades");
}

function showBuy(req, res) {
    res.render("pages/trade/buy");
}

function showDetail(req, res) {
    res.render("pages/trade/detail");
}
