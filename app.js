const express = require ("express")
const app = express ()
const cors = require("cors")

//routers
const userRouter = require("./api/user/router")
// const adminRouter = require("./api/admin/router")


app.use(express.json());

// User
app.use("/api/user", userRouter)

//Admin
// app.use("/api/admin", adminRouter)

module.exports = app