require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next();
});

const userRouter = require("./api/users/users.router");
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, ()=>{
    console.log("App port number => ", process.env.APP_PORT);
});