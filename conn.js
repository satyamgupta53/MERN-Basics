const mongoose = require('mongoose');


const DB = "mongodb+srv://coderx_abhay:RgT2yVqo5gXuSkLf@longdrive.r7fj4ln.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async () => {
    try{
        await mongoose.connect(DB);
        console.log("connection successful to DB");
        } catch (error) {
          console.error("database connection failed");
          process.exit(0);
        }
    
};

module.exports = connectDb;