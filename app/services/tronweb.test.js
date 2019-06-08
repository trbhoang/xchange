const { getTokenBalanceFromAddress } = require("./tronweb.service");

(async function() {
    const balance = await getTokenBalanceFromAddress("TYjz2gq2EAs9xP799vBUqz3SZHszZbcW4N");
    console.log(balance);
})();
