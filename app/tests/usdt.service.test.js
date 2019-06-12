const { getTransactionById } = require("../services/usdt.service"),
    txId = "8e1065db7335ac6d4d39eea2177e358aa4017463d187bf3e78c92d1c6e2d7bfc";

getTransactionById(txId).then(function(res) {
    console.log(res);
});
