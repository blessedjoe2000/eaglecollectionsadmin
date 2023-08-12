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
