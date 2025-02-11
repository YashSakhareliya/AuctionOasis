const mongoose = require('mongoose');

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
        })
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }

}

module.exports = connectDb;