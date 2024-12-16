const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bosyparser = require("body-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


dotenv.config();

// Connection URI
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Database Name
const dbName = "PassManager";
const app = express();

const port = 3000;

app.use(bodyParser.json());
// enabling cors
app.use(cors());

// connecting client
client.connect();

// get all the passwords
app.get("/", async (req, res) => {
  // creating database
  const db = client.db(dbName);
  const collection = db.collection("users");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save a password
app.post("/",async (req,res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("users");
  const findResult = await collection.insertOne(password);
  res.send({success : true , result : findResult});

})

// Delete a password
app.delete("/",async (req,res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("users");
  const findResult = await collection.deleteOne(password);
  res.send({success : true , result : findResult});

})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
