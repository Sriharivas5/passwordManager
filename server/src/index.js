const express = require("express");
const app = express();
const router = require("../Routes/route");
require("../db/connectin");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api", router);



const port = process.env.PORT || 3001;
app.listen(port,()=>{
  console.log(`you server is running on localhost:${port}`)
});
