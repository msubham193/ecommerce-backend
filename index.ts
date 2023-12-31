import express from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);

app.listen(3000, () => {
  console.log("server listening on port");
});
