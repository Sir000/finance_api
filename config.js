const dotenv = require("dotenv")

dotenv.config({path: "./config.env"})

module.exports = {
    db: process.env.DB_URL,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET
};