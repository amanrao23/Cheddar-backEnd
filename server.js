const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require('path');
connectDB();

app.use(express.json());
app.get('/',(req,res)=>res.send('api running'))
const PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/user", require("./routes/api/user"));

app.listen(PORT, () => console.log(`SERVER STARTED ON 5000`));
