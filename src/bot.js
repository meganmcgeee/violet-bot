const restify = require(`restify`);
const mongoose = require(`mongoose`);
const builder = require(`botbuilder`);
// Quick replies
const quickReplies = require(`botbuilder-quickreplies`);

// =========================================================
// MongoDB Setup
// =========================================================

mongoose.connect(process.env.MONGO_URI, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Connected to MongoDB`);
});

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
