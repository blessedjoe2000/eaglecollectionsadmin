import mongoose from "mongoose";

export function mongooseConnect() {
  //if connection is open, return as a promise
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    //else create a new connection to mongodb
    return mongoose.connect(process.env.MONGODB_URI);
  }
}
