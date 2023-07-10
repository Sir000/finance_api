const express = require ("express")
const http = require ("http")
const app = require ("./app")
const db = require ("./db")
const configs = require ("./config")
const server = http.createServer(app)
const port = configs.port || 3000;

app.use(express.json());

app.get("/", (req, res, next) =>{
    res.send("Finance");
} );







server.listen(port, () => {
    console.log(`Listening on ${port}...`)
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("App server is closing")
    });
    db.close(() => {
        console.log("db is closing")
    });
} );