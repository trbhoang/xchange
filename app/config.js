require("dotenv").config();

const config = {
    app: {
        env: process.env.APP_ENV || "development",
        port: process.env.APP_PORT || 3000
    },
    db: {
        uri: process.env.DB_URI
    }
};

module.exports = config;
