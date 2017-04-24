const restify = require(`restify`);
const mongoose = require(`mongoose`);
// Set up default mongoose connection
const mongoDB = `mongodb://127.0.0.1/violet`;
const builder = require(`botbuilder`);

// Quick replies
const quickReplies = require(`botbuilder-quickreplies`);

// =========================================================
// MongoDB Setup
// =========================================================

mongoose.connect(mongoDB);

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on(`error`, console.error.bind(console, `MongoDB connection error:`));

// Mongoose.connect(process.env.MONGO_URI, err => {
//     If (err) {
//         Return console.error(err);
//     }
//     Return console.log(`Connected to MongoDB`);
// });

// =========================================================
// Bot Setup
// =========================================================

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
   console.log(`%s listening to %s`, server.name, server.url);
});

// Create chat bot
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
});
const bot = new builder.UniversalBot(connector);
server.post(`/api/messages`, connector.listen());

// Set the middleware which includes quick replies
bot.use(quickReplies.QuickRepliesMiddleware);

module.exports = bot;
