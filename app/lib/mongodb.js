// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;

// const options = {};

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   console.log("global._mongoClientPromise", global._mongoClientPromise);
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);

//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
//   console.log("connected to mongoDB");
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;

// clientPromise.js

import mongoose from "mongoose";

let clientPromise;

if (mongoose.connection.readyState === 1) {
  // If mongoose is already connected, return the current native connection
  clientPromise = Promise.resolve(mongoose.connection.getClient());
} else {
  // If mongoose is not connected, connect and return the native connection
  clientPromise = mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((mongooseConnection) => mongooseConnection.getClient());
}

export default clientPromise;