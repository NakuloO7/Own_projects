//this is the main server of the app
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const rootRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());

//the request which will come for /api/v1 will be send to the root router
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
