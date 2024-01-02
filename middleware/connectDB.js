import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
    if (mongoose.connection.readyState !== undefined && mongoose.connection.readyState === 1) {
        // Connection is already established, proceed with the handler
        return handler(req, res);
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Connection successful, proceed with the handler
        return handler(req, res);
    } catch (error) {
        // Handle connection error
        console.error("Error connecting to MongoDB:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default connectDb;
