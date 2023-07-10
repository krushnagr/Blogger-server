const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userroute = require("./routers/router")
const blog = require("./routers/blogRouter")

dotenv.config()

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/user',userroute);
app.use('/api/v1/blog',blog);

const port = process.env.port || 8000;
app.listen(8000,()=>{
    console.log(`serever Running on ${process.env.DEV_MODE} mode port no ${port}`.bgCyan.white);
})