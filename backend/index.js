const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path")

connectToMongo();

var cors = require("cors");
// kis jagah se request ayega , request ka origin kya hai.
app.use(cors({
  origin: ["http://localhost:5173","https://code-base-wdwg.vercel.app"]
}));
app.use(express.json()); //to convert request data to json

app.use('/Public', express.static(path.join(__dirname, 'Public')));
app.use('/user/auth',require('./Routes/User Apis/User.Credentials.Api'));
app.use('/user/search',require('./Routes/User Apis/User.Details.Api'));
app.use('/user/details',require('./Routes/User Apis/User.Details.Api'));
app.get("/",(req,res)=>{
  res.send("backend is running")
})


app.listen(3000);