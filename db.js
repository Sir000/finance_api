const mongoose = require ("mongoose")
const dotenv = require ("dotenv")

dotenv.config({path: "./config.env"})

mongoose.connect(process.env.DB_URL)
.then((connection) => {console.log("DB connected...")})
.catch((err) => {console.log("error connecting DB",err)})

const dbCon = mongoose.connection

dbCon.on("error", (err) => {console.log("error while connecting DB",err)})
dbCon.on("disconnected", () => {console.log("DB is disconnecting")})

module.exports = dbCon