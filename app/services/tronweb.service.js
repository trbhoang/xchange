const config = require("../config"),
    TronWeb = require("tronweb"),
    smPrivateKey = "99ced7bdaf2172ac5177f0381f273e4e0006e3dc30deb74f0071220122c8348e",
    smAddress = "TE7xK4ScGet7qvUw5CR4fEnRnpPMWzqFnq",
    TOKEN_ID = config.token.tokenId,
    TOKEN_PRECISION_NUM = 100000,
    tronWeb = new TronWeb(
        {
            fullHost: config.token.fullNodeAPI
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
        if (account && account.assetV2) {
            for (let i = 0; i < account.assetV2.length; i++) {
                if (account.assetV2[i].key === TOKEN_ID) {
                    return account.assetV2[i].value / TOKEN_PRECISION_NUM;
                }
            }
        }

        return 0;
    } catch (e) {
        console.log(e);
        return e.toString();
    }
}
