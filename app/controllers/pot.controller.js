const Pot = require("../models/pot"),
    ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    showPots,
    newPot,
    createPot
};

async function showPots(req, res) {
    try {
        const pots = await Pot.find({ user: ObjectId(req.currentUser.id) });
        res.render("pages/pot/pots", { pots });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

function newPot(req, res) {
    res.render("pages/pot/new", { message: req.flash("submitPotMessage") });
}

async function createPot(req, res) {
    // check if txhash already exist
    // check if pot expired
    // check if tx is valid
    // transfer X token
    // save Pot

    try {
        console.log(req.body);
        const pot = await Pot.create({
            user: req.currentUser.id,
            tx_hash: req.body.tx_hash
        });

        req.flash("success", "Successfully submitted proof of transaction!");
        res.redirect("/pots");
    } catch (e) {
        res.status(500).send(e);
    }
}
