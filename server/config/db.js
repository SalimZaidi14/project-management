const mongoose = require('mongoose');

async function connectDb() {
    //connecting to the mognodb uri
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conencted ${connection.connection.host}`)
}

module.exports = connectDb;