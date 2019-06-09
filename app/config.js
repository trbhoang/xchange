require("dotenv").config();

const config = {
    app: {
        env: process.env.APP_ENV || "development",
        port: process.env.APP_PORT || 3000
    },
    db: {
        uri: process.env.DB_URI
    },
    token: {
        explorer_url: process.env.TOKEN_EXPLORER_URL
    }
};

module.exports = config;
