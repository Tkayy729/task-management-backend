const express = require("express");
const morgan = require("morgan");
const ConnectDB = require("./configs/dbConfig");
require("dotenv").config()

const app = express()
app.use(express.json());
ConnectDB();
app.use(morgan("dev"))

const port = process.env.PORT || 6000
app.listen(port , () => {
    console.log("Server is runnning on port "+port)
})

app.get("/" , (req, res) => {
    res.json({
        message: "Hello world"
    })
})