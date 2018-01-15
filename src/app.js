const mongoose = require(`mongoose`);
const dev_db_url = `mongodb://cooluser:coolpassword@ds115071.mlab.com:15071/violet`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `MongoDB connection error:`));
