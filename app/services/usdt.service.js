// const { Address, HDPublicKey, Networks } = require("bitcore-lib");
// const mongoose = require("mongoose");

// const tronWeb = require("../lib/tron.web");
// const AddressModel = require("../models/address.model");
// const FundingModel = require("../models/funding.model");
// const BlockModel = require("../models/block.model");

// const TinyQueue = require("tinyqueue");
// let nextBlocks = new TinyQueue([], (a, b) => a.height - b.height);

// const xpub = "xpub661MyMwAqRbcH1ofWrryhxE8c1qdSacpCsrojJyNbzHTk2Y834a3ifXmR9XQB6UoPnhTyWVa5hxc43erWdpgAeYaN8XB668csRatUycZ2Cn";
// const usdtHdkey = new HDPublicKey(xpub);

const jayson = require("jayson");
const Promise = require("bluebird");

client = Promise.promisifyAll(jayson.client.http("http://admin:secret@95.216.227.168:8332"));

const USDT_FUNDING_ADDRESS = "1JcN6bBhr2AeNDQKSHTAKXGgupLRkwBB7R"; // "1DyxRL1J5YoPGbyd1jco7AYh7zLj38Zymi";
const XTOKEN_ID = "1000353";

async function getTxsByHeight(height) {
    return (await client.requestAsync("omni_listblocktransactions", [height])).result;
}

async function getRawTx(txHash) {
    return (await client.requestAsync("omni_gettransaction", [txHash])).result;
}

function parseRawTransaction(transaction) {
    try {
        return {
            ...transaction,
            transactionId: transaction.txid,
            fromAddress: transaction.sendingaddress,
            toAddress: transaction.referenceaddress,
            positionInBlock: transaction.positioninblock,
            amount: Number(transaction.amount),
            currency: "USDT",
            fee: Number(transaction.fee)
        };
    } catch (err) {
        console.log("errr", err);
    }
}

async function getTransactionById(id) {
    try {
        transaction = await getRawTx(id);
        if (transaction) {
            transaction = parseRawTransaction(transaction);
        }
        return transaction;
    } catch (err) {
        throw new Error(err);
    }
}

function isValidTransaction(transaction) {
    if (transaction) return transaction.valid && transaction.amount > 0 && transaction.toAddress == USDT_FUNDING_ADDRESS;

    return false;
}

function isValidAndConfirmedTransaction(transaction) {
    return isValidTransaction(transaction) && transaction.confirmations > 0;
}

async function getAndVerifyTransaction(txId) {
    try {
        const tx = await getTransactionById(txId);
        return isValidAndConfirmedTransaction(tx);
    } catch (err) {
        throw new Error(err);
    }
}

// async function transferXToken(user, amount) {
//     try {
//         address = await AddressModel.findOne({ user: user, currency: "TRX" });
//         console.log("transferXToken", address.hash, amount * 10 ** 5);
//         if (address && amount > 0) {
//             await tronWeb.trx.sendToken(address.hash, amount * 10 ** 5, XTOKEN_ID);
//         }
//     } catch (err) {
//         throw err;
//     }
// }

// async function processFunding(user, tranId) {
//     const session = await mongoose.startSession();
//     try {
//         if (!session) throw Error("Can not start session");
//         session.startTransaction();
//         transaction = await getTransactionById(tranId);
//         isSucessed = checkTransaction(transaction);
//         await FundingModel.create([{ ...transaction, isSucessed: isSucessed }], { session: session });
//         if (isSucessed) {
//             await transferXToken(user, transaction.amount);
//         }
//         await session.commitTransaction();
//         session.endSession();
//     } catch (err) {
//         await session.abortTransaction();
//         session.endSession();
//         throw err;
//     }
// }

// async function getLatestBlockHeight() {
//     return (await client.requestAsync("omni_getinfo", [])).result.block;
// }

// function createAddress(path) {
//     const address = new Address(usdtHdkey.derive(path).publicKey, Networks.mainnet).toString();
//     AddressModel.create(
//         {
//             hash: address,
//             path: path,
//             currency: "USDT"
//         },
//         function(err, address) {
//             if (err) console.log(err);
//             console.log("saved", address);
//         }
//     );
//     return address;
// }

// async function monitorNetwork() {
//     latestProcessedBlock = await BlockModel.findOne({ currency: "USDT" });
//     const latestHeight = await getLatestBlockHeight();

//     const currentHeight = latestProcessedBlock ? latestProcessedBlock.height : latestHeight - 10;

//     console.log("latestHeight", latestHeight);
//     const confirmedHeight = latestHeight - 2;
//     console.log("currentHeight", currentHeight);

//     if (currentHeight < confirmedHeight) {
//         // Fetch and process at the same time
//         await Promise.all([fetchRange(currentHeight + 1, confirmedHeight), processRange(currentHeight + 1, confirmedHeight)]);
//     } else {
//         // Reach confirmed height, nothing to do
//         await Promise.delay(1000 * 10);
//     }
// }

// async function fetchRange(fromHeight, toHeight) {
//     if (fromHeight > toHeight) return;
//     const heights = rangeToArray(fromHeight, toHeight);
//     await Promise.each(
//         heights,
//         async height => {
//             // if (!isRunning) return;
//             // if (height != 579531) return
//             const txs = await getTxsByHeight(height);
//             console.log("fetchRange have number transaction", txs.length);
//             const transactions = [];
//             // const txsTemp = [txs[0]]

//             await Promise.each(txs, async tx => {
//                 let transactionRaw = null;
//                 try {
//                     transactionRaw = await getRawTx(tx);
//                     const parsedTx = await parseTransaction(transactionRaw);
//                     if (parsedTx.valid) transactions.push(parsedTx);
//                 } catch (error) {
//                     console.log(error);
//                     transactionRaw = null;
//                 }
//             }).catch(err => console.log(err));
//             if (transactions.length > 0) {
//                 const nextBlock = { hash: transactions[0].blockHash, height, transactions };
//                 nextBlocks.push(nextBlock);
//             }
//         },
//         { concurrency: 5 }
//     );
// }

// function rangeToArray(startAt, to) {
//     const size = to - startAt + 1; // include startAt and to
//     return [...Array(size).keys()].map(i => i + startAt);
// }

// async function shouldProcessNextBlock(fromHeight, toHeight) {
//     // Pre-validate
//     if (fromHeight > toHeight) return false;

//     // Validate next block
//     const nextBlock = nextBlocks.peek();
//     if (validateBlock(nextBlock, fromHeight, toHeight)) return true;
//     await Promise.delay(1000 * 10);
//     return shouldProcessNextBlock(fromHeight, toHeight);
// }

// async function processRange(fromHeight, toHeight) {
//     if (await shouldProcessNextBlock(fromHeight, toHeight)) {
//         const nextBlock = nextBlocks.pop();
//         await processBlock(nextBlock);
//         await processRange(nextBlock.height + 1, toHeight);
//     }
// }

// async function processBlock({ height, transactions }) {
//     //isRunning = true;
//     try {
//         console.log(`Process block ${height}`);
//         const fundings = await buildFundings(transactions);
//         console.log("have ", fundings.length, "fundings");
//         // TODO: transfer coin X
//         if (fundings.length > 0) {
//             console.log("transfer coin X");
//         }
//         await Promise.each(fundings, tx => buildFundings(tx));
//         await BlockModel.findOneAndUpdate({ currency: "USDT" }, { height: height }, { upsert: true, useFindAndModify: true });
//     } catch (e) {
//         console.log(e);
//     }
// }

// async function buildFundings(transactions) {
//     // Our filters
//     const isFunding = transaction => transaction.toAddress;
//     const addFundingAttributes = tx => ({
//         ...tx,
//         toAddress: tx.toAddress.id
//     });

//     const fundingTransaction = await Promise.filter(
//         transactions,
//         async tx => {
//             console.log(tx);
//             return isFunding(tx);
//         },
//         { concurrency: 1 }
//     );

//     return fundingTransaction.map(addFundingAttributes);
// }

// function validateBlock(block, fromHeight, toHeight) {
//     return block && (block.height >= fromHeight && block.height <= toHeight);
// }

// module.exports = { processFunding, getTransactionById };
module.exports = { getTransactionById, isValidTransaction, isValidAndConfirmedTransaction, getAndVerifyTransaction };
