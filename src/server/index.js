const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/products", productRouter);
app.use("/user", userRouter);

module.exports = app;
