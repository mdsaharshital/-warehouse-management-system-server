const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;

//----- middleware -----
app.use(cors());
app.use(express.json());
//----------------------

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhq5r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const perfumeCollection = client.db("assignment1").collection("perfume");
    console.log(`db is connected`);
  } finally {
    //
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`perfume-warehouse`);
});

app.listen(port, () => {
  console.log("listening from", port);
});
