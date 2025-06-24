require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors");
app.use(cors()); 
app.use(express.json());

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.rcnlifl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();

		const productsCollection = client
			.db("WholeSale")
			.collection("productsCollection");

		const orderCollection = client.db("WholeSale").collection("orderCollection");

		app.post("/allOrders", async (req, res) => {
			const product = req.body;
			const result = await orderCollection.insertOne(product);
			res.send(result);
		});

		app.get("/allOrders", async (req, res) => {
			const filter = {};
			filter.email = { $eq: req.query.email };
			const result = await orderCollection.find(filter).toArray();
			res.send(result);
		});

		app.delete('/allOrders/:id', async(req, res)=>{
			const id = req.params.id;
			const filter = {_id : new ObjectId(id)}
			const result = await orderCollection.deleteOne(filter)
			res.send(result)
		})
		app.delete('/product/:id', async(req, res)=>{
			const id = req.params.id;
			const filter = {_id : new ObjectId(id)}
			const result = await productsCollection.deleteOne(filter)
			res.send(result)
		})

		app.post("/allProducts", async (req, res) => {
			const product = req.body;
			const result = await productsCollection.insertOne(product);
			res.send(result);
		});

		app.get("/products", async (req, res) => {
			const filter = {};
			if (req.query.minSellingQuantity) {
				filter.minSellingQuantity = { $gte: req.query.minSellingQuantity };
			}
			if (req.query.category) {
				filter.category = { $eq: req.query.category };
			}
			if (req.query.email) {
				filter.email = { $eq: req.query.email };
			}
			const result = await productsCollection.find(filter).toArray();
			res.send(result);
		});

		app.put("/products/:id", async (req, res) => {
			const id = req.params.id;
			const updatedData = req.body;

			const filter = { _id: new ObjectId(id) };
			const update = {
				$set: updatedData,
			};

			const result = await productsCollection.updateOne(filter, update);
			res.send(result);
		});

		app.put("/product/:id", async (req, res) => {
			const id = req.params.id;
			const updatedData = req.body;
			const { quan, dec } = updatedData;
			const quantity = parseInt(quan);
			const filter = { _id: new ObjectId(id) };
			let update = {}
			if (dec) {
				 update = {
					$inc: { mainQuantity: -quantity },
				};
			}else{
				 update = {
				$inc : {mainQuantity : quantity}
			}
			}

			const result = await productsCollection.updateOne(filter, update);
			res.send(result);
		});

		app.get("/", (req, res) => {
			res.send("hlw world");
		});
		app.listen(port, () => {
			console.log(`server running on the port ${port}`);
		});
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
	}
}
run().catch(console.dir);
