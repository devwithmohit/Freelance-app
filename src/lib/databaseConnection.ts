// Database connection establish

import mongoose from "mongoose";

// karne ke baad jo object datbase se aat hai

type ConnectionObject = {
  isConnected?: number;
};

// Check Connection is  Already Establish
const connection: ConnectionObject = {};

async function DatabaseConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
  }

//   Database connection code
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.log(db);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database Connection Establish");
  } catch (error) {
    console.log(error);
    console.log("Database Connection Failed");

    process.exit(1);
  }
}
export default DatabaseConnection;
