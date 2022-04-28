require("dotenv").config();
require("./models");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const middleWare = (req, res, next) => {
  console.log(`incoming request: ${req.method} - ${req.url}`);
  next();
};

app.use(middleWare);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Deep Cut Discovery" });
});

app.use("/api-v1/users", require("./controllers/api-v1/users"));
app.use("/api-v1/posts", require("./controllers/api-v1/posts"));
app.use("/api-v1/faves", require("./controllers/api-v1/faves"));

app.listen(PORT, () => console.log(`connected to port ${PORT}`));
