module.exports = {
    showBuy,
    showDetail,
    showHistory
};

function showHistory(req, res) {
    res.render("pages/transaction/transactions");
}

function showBuy(req, res) {
    res.render("pages/transaction/buy");
}

function showDetail(req, res) {
    res.render("pages/transaction/detail");
}
