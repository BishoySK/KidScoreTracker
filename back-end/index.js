const express = require("express");
const app = express();
const { config } = require("dotenv");
const { connect } = require("mongoose");
const morgan = require("morgan");
var cors = require("cors");
require("./Models/userModel");

const accountRouter = require("./Routes/account.routes");
const { authentication } = require("./Middlewares/auth");
const userRouter = require("./Routes/user.routes");


config();
const port = process.env.PORT || 8080;

app.use(morgan(":method :url"));
app.use(cors());

connect(process.env.Atlas_URL)
  .then(() => {
    console.log("connect DB");
    app.listen(port, () => console.log(`listening on port ${port}!`));
  })
  .catch((error) => console.log(error));

app.use(express.json());

app.use(accountRouter);
app.use(authentication);
app.use(userRouter);


app.use((req, res) => res.status(404).json({ massage: "not found" }));

app.use((error, req, res, next) => {
  res.status(error.cause || 500).json({ massage: error.toString() });
});