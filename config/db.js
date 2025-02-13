const mongoose = require('mongoose');

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_ATLAS_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }

}

module.exports = connectDb;