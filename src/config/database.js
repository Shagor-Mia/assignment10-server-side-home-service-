import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

const uri = process.env.URL;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectDB = async () => {
  try {
    // await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db("HouseHold_Service");
  } catch (err) {
    console.error(" Database connection failed", err);
    process.exit(1);
  }
};
