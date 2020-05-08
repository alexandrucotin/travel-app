const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//express 
const app = express();

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

//routes

app.get('/', (req, res) =>{
    res.sendFiles("dist/index.html");
})


//starting the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
