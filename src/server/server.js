const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//express
const app = express();
projectData = {};

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

//routes

app.get("/", (req, res) => {
  res.sendFiles("dist/index.html");
});

app.post("/data", function (req, res) {
  const {lat, lng} = req.body;
  projectData = {
    lat,
    lng
  };
  console.log(projectData)
  res.status(202).send();
});

//starting the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
