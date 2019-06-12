const { Account } = require("../../models/account"),
    { getTokenBalanceFromAddress } = require("../../services/tronweb.service");

module.exports = {
    showAccounts
};

// show accounts
async function showAccounts(req, res) {
    try {
        const accounts = await Account.find({}).populate("user", "username");
        for (let i = 0; i < accounts.length; i++) {
            let account = accounts[i];
            account.balance = await getTokenBalanceFromAddress(account.address);
        }

        res.render("admin_pages/accounts", {
            accounts: accounts,
            success: req.flash("success"),
            layout: "admin_layout"
        });
    } catch (e) {
        res.status(400).send("Not found!");
    }
}

// Get Single User Data
// async function showAccount(req, res) {
//     try {
//         const account = await Account.findOne({ _id: req.params.id });
//         const dataObject = { modalTitle: "Edit Account", modalSubmit: "Update", account: account };
//         res.send({ data: dataObject });
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e);
//     }
// }

// // update single sccount address
// async function updateAccount(req, res) {
//     try {
//         await Account.findByIdAndUpdate(req.params.id, { address: req.body.address });
//         res.redirect("back");
//     } catch (e) {
//         res.status(500).send(e);
//     }
// }
