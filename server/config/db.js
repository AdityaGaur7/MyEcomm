
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;
// Now, we can import the connectDB function in index.js and call it to connect to MongoDB.
