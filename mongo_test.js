const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://testuser:User.test12.34@muscleband.4r55e.mongodb.net/Muscleband?retryWrites=true&w=majority&appName=Muscleband";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await client.close();
  }
}

run();
