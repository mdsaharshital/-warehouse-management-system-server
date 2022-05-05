const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

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

async function run() {
  try {
    await client.connect();
    const perfumeCollection = client.db("assignment1").collection("perfume");
    console.log(`db is connected`);

    // get products from db
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = perfumeCollection.find(query);
      const products = await cursor.toArray();
      if (!products.length) {
        res.send({ success: false, error: "No products found" });
      }
      res.send({ success: true, data: products });
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`perfume-warehouse`);
});

app.listen(port, () => {
  console.log("listening from", port);
});
