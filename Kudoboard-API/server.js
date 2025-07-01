require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const cardRoutes = require("./routes/cardRoutes");
const boardRoutes = require("./routes/boardRoutes.js");
const morgan = require("morgan")
const cors = require("cors");

const corsOptions = {
  origin: `${FRONTEND_URL}`,
};
app.use(cors(corsOptions));
app.use(morgan("dev"))

app.use(express.json());
app.use("/cards", cardRoutes);
app.use("/boards", boardRoutes);

app.listen(port, () => {
  //2 arguemnts
  console.log(`Server running at http://localhost:${port}`);
});

//Create - POST, Read - GET, Update- PUT, Delete- Delete
