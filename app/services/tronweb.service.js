const config = require("../config"),
    TronWeb = require("tronweb"),
    smPrivateKey = config.token.smPk,
    smAddress = config.token.smAddress,
    TOKEN_ID = config.token.tokenId,
    TOKEN_PRECISION_NUM = 100000,
    tronWeb = new TronWeb(
        {
            fullHost: config.token.fullNodeAPI
        },
        smPrivateKey
    );

module.exports = {
    getTokenBalanceFromAddress,
    transferToken
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

async function transferToken(toAddress, amount) {
    try {
        if (toAddress && amount > 0) {
            console.log("transferXToken", toAddress, amount * 10 ** 5);
            tronWeb.setAddress(smAddress);
            tronWeb.setPrivateKey(smPrivateKey);
            const res = await tronWeb.trx.sendToken(toAddress, amount * 10 ** 5, config.token.tokenId);
            return res;
        }
        throw new Error("Invalid input");
    } catch (err) {
        throw err;
    }
}
