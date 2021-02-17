const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require('path');
connectDB();

app.use(express.json());
app.get('/',(req,res)=>res.send('api running'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON 5000`));
