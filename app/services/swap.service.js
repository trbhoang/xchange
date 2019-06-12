const { getAndVerifyTransaction } = require("./usdt.service");

async function transferToken(user, amount) {
    try {
        address = await AddressModel.findOne({ user: user, currency: "TRX" });
        console.log("transferXToken", address.hash, amount * 10 ** 5);
        if (address && amount > 0) {
            await tronWeb.trx.sendToken(address.hash, amount * 10 ** 5, XTOKEN_ID);
        }
    } catch (err) {
        throw err;
    }
}

async function verifyPaymentAndTransferToken(user, txId) {
    const session = await mongoose.startSession();
    try {
        if (!session) throw Error("Can not start session");
        session.startTransaction();

        const isValid = await getAndVerifyTransaction(txId);
        await FundingModel.create([{ ...transaction, isSucessed: isSucessed }], { session: session });
        if (isValid) {
            await transferToken(user, transaction.amount);
        }

        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
}
