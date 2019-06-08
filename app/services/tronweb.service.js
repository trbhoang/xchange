const TronWeb = require("tronweb"),
    smPrivateKey = "99ced7bdaf2172ac5177f0381f273e4e0006e3dc30deb74f0071220122c8348e",
    smAddress = "TE7xK4ScGet7qvUw5CR4fEnRnpPMWzqFnq",
    TOKEN_ID = "1000353",
    TOKEN_NAME = "XXXCOIN",
    TOKEN_ABBR = "abbr",
    TOKEN_PRECISION_NUM = 100000,
    tronWeb = new TronWeb(
        {
            fullHost: "https://api.shasta.trongrid.io" //'https://api.trongrid.io'
        },
        smPrivateKey
    );

//
tronWeb.setAddress(smAddress);

module.exports = {
    getTokenBalanceFromAddress
};

async function getTokenBalanceFromAddress(address) {
    try {
        const account = await tronWeb.trx.getAccount(address);
        for (let i = 0; i < account.assetV2.length; i++) {
            if (account.assetV2[i].key === TOKEN_ID) {
                return account.assetV2[i].value / TOKEN_PRECISION_NUM;
            }
        }

        return 0;
    } catch (e) {
        console.log(e);
        return e.toString();
    }
}
