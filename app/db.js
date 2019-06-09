const config = require("./config");
const mongoose = require("mongoose");

mongoose.connect(config.db.uri);

module.exports = mongoose;
