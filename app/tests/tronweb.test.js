const { transferToken, getTokenBalanceFromAddress } = require("../services/tronweb.service");

(async function() {
    const balance = await getTokenBalanceFromAddress("TYjz2gq2EAs9xP799vBUqz3SZHszZbcW4N");
    console.log(balance);
})();

(async function() {
    // const res = await getTokenBalanceFromAddress("TRytwCNQQKo9yu8yCSR9dnNtuxKsiorPQY");
    const res = await transferToken("TYjz2gq2EAs9xP799vBUqz3SZHszZbcW4N", 100);
    console.log(res);
})();
