const restify = require(`restify`);
const builder = require(`botbuilder`);
// Quick replies
const quickReplies = require('botbuilder-quickreplies');
// Include Promises Library
const rp = require('request-promise');


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
bot.use(quickReplys.QuickRepliesMiddleware);

// =========================================================
// Bots Dialogs
// =========================================================

bot.dialog('/', [
    function (session) {
        // Send a greeting and show help.
        var card = new builder.HeroCard(session)
            .title("Violet")
            .text("I'm Violet and I know all about birth control and emergency contraception :-)")
            .images([
                 builder.CardImage.create(session, "http://www.publicdomainpictures.net/pictures/60000/velka/woman-silhouette-1381341328mJA.jpg")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
        session.send("Hi! I'm Violet, the pregnancy prevention bot. I can tell you all about emergency contraception and birth control options.");
        session.send("I'll go through a series of questions to figure out what the safest contraceptive options are for you. Then, I'll give you locations where you can get them over the counter!");
        session.beginDialog('/menu');
    }
]);
// Bot greets user
// ============================================
bot.dialog('/menu', [
    function (session) {
        session.send("Can I help you with monthly birth control or emergency contraceptives today?");
 // Send BC and ECP options to user
 // ============================================   
        var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("Emergency Contraceptives")
                    .subtitle("Sometimes the condom breaks, maybe you just didn't plan. It's totally normal, girl. I'll help you.")
                    .images([
                        builder.CardImage.create(session, "http://www.medimanage.com/Images/brk%20glass%20EC.jpg")
                            .tap(builder.CardAction.showImage(session, "http://www.medimanage.com/Images/brk%20glass%20EC.jpg")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "select:100", "Select Emergency Contrapceptives/ Plan B")
                    ]),
                new builder.HeroCard(session)
                    .title("Monthly Birth Control")
                    .subtitle("Enjoy your body, your youth and your freedom. No need to sweat over whether or not you'll have to put your life on hold.")
                    .images([
                        builder.CardImage.create(session, "http://palgrave.nature.com/nm/journal/v16/n5/images/nm0510-506-I1.jpg")
                            .tap(builder.CardAction.showImage(session, "http://palgrave.nature.com/nm/journal/v16/n5/images/nm0510-506-I1.jpg")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "select:101", "Select Monthly Birth Control or 'The Pill'")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "select:100|select:101");
    },

// Replies to user based on answer and 
// notifies them about questions to be asked
// =============================================================================
    function (session, results) {
        var action, item;
        var kvPair = results.response.entity.split(':');
        switch (kvPair[0]) {
            case 'select':
                action = 'I can help you with ';
                break;
        }
        switch (kvPair[1]) {
            case '100':
                item = "emergency contraception, girl! I have a few quick questions that I need to ask first.";
                break;
            case '101':
                item = "monthly birth control, girl! I have a few quick questions that I need to ask first.";
                break;
        }
        session.endDialog('You %s "%s"', action, item);
    }
]);


// Birth control questions dialog begins
// =============================================================================
bot.dialog('/birthControl', [
    function (session) {
        builder.Prompts.text(session, 'Birth Control questions will go here');
    }
]);

// Emergency contraceptive pill question 
// dialog begins
// =============================================================================
bot.dialog('/emergencyContraceptive', [
    function (session) {
        builder.Prompts.text(session, 'Emergency questions go here');
    }
]);
