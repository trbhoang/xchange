const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const DB_URL = process.env.DB_URL || "mongodb://root:example@localhost:27017/xchange?authSource=admin";

mongoose.connect(DB_URL).then(
    () => {
        console.log("Database Connected..");
    },
    err => {
        console.log("err", err);
    }
);

mongoose.exports = { mongoose };
