const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const path = require("path");
const port = process.env.PORT || 3005;
const productRouter = require("./routes/products");
const configRouter = require("./routes/configs");
const indexRouter = require("./routes/index");
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // For parsing JSON requests
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded requests
app.use(express.static(path.join(__dirname, "assets/images")));

app.use("/products", productRouter);
app.use("/configs", configRouter);
app.use("/*", indexRouter);

app.listen(port, () => {
  console.log(`App is listening on PORT ${port}`);
});
