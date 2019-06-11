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
        tokenName: process.env.TOKEN_NAME,
        tokenId: process.env.TOKEN_ID,
        smPk: process.env.TOKEN_SM_PK,
        smAddress: process.env.TOKEN_SM_ADDRESS,
        fullNodeAPI: process.env.TOKEN_FULLNODE_API,
        explorerUrl: process.env.TOKEN_EXPLORER_URL
    }
};

module.exports = config;
