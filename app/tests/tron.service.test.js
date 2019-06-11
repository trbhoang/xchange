const TronWeb = require("tronweb"),
    hdkey = require("hdkey"),
    tronService = require("../services/tron.service"),
    seed = "unable ordinary method rally neck knee trigger vote coffee guard pride child", // address TE7xK4ScGet7qvUw5CR4fEnRnpPMWzqFnq
    tronHdkey = hdkey.fromMasterSeed(seed),
    smPrivateKey = "99ced7bdaf2172ac5177f0381f273e4e0006e3dc30deb74f0071220122c8348e",
    smAddress = "TE7xK4ScGet7qvUw5CR4fEnRnpPMWzqFnq",
    tokenId = 1000353,
    tokenName = "XXXCOIN",
    tokenAbbr = "abbr",
    tronWeb = new TronWeb(
        {
            fullHost: "https://api.shasta.trongrid.io" //'https://api.trongrid.io'
        },
        smPrivateKey
    );

//
tronWeb.setAddress(smAddress);

// get token info by token ID
// tronWeb.trx.getTokenByID(tokenId).then(res => {
//     console.log(res);
// });

// get token info from sm address
// tronWeb.trx.getTokensIssuedByAddress(smAddress).then(res => {
//     console.log(res);
// });

// send 200 token xxxc from sm address to address
// tronWeb.trx
//     .sendToken("TYjz2gq2EAs9xP799vBUqz3SZHszZbcW4N", 15000000, "1000353", smPrivateKey)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log("error", err);
//     });

// send tokens from to, use TronWeb Transaction builder
// tronWeb.transactionBuilder.sendToken(to, amount, tokenID, from, options);

// get account info from address
tronWeb.trx
    .getAccount("TYjz2gq2EAs9xP799vBUqz3SZHszZbcW4N")
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log("error", err);
    });

// (async () => {
//     const userBalance = await tronWeb.trx.getBalance("TYjz2gq2EAs9xP799vBUqz3SZHszZbcW4N");
//     console.log(userBalance);
// })();

// console.log(tronWeb.address.toHex("TYjz2gq2EAs9xP799vBUqz3SZHszZbcW4N"));
// console.log(tronWeb.address.fromHex("412d87fc0845681352c08bbfc41acf64abb3a1b10f")); // TE7xK4ScGet7qvUw5CR4fEnRnpPMWzqFnq
