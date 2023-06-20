const express = require("express");
const morgan = require("morgan");
const ConnectDB = require("./configs/dbConfig");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
require("dotenv").config()

const taskRoutes = require("./routes/taskRoute")

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

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);