const restify = require(`restify`);
const builder = require(`botbuilder`);

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
    },
    function (session, results) {
        // Display menu
        session.beginDialog('/cards');
    },
    function (session, results) {
        // Always say goodbye
        session.send("Ok... See you later!");
    }
]);

bot.dialog('/menu', [
    function (session) {
        session.send("Can I help you with monthly birth control or emergency contraceptives today?");
        
        // Ask the user to select an item from a carousel.
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
                item = "emergency contraception. I have a few questions I need to ask first.";
                break;
            case '101':
                item = "monthly birth control. I have a few questions I need to ask first.";
                break;
        }
        session.endDialog('You %s "%s"', action, item);
    }    
]);


// bot.dialog('/prompts', [
//     function (session) {
//         session.send("Our Bot Builder SDK has a rich set of built-in prompts that simplify asking the user a series of questions. This demo will walk you through using each prompt. Just follow the prompts and you can quit at any time by saying 'cancel'.");
//         builder.Prompts.text(session, "Prompts.text()\n\nEnter some text and I'll say it back.");
//     },
//     function (session, results) {
//         session.send("You entered '%s'", results.response);
//         builder.Prompts.number(session, "Prompts.number()\n\nNow enter a number.");
//     },
//     function (session, results) {
//         session.send("You entered '%s'", results.response);
//         session.send("Bot Builder includes a rich choice() prompt that lets you offer a user a list choices to pick from. On Facebook these choices by default surface using Quick Replies if there are 10 or less choices. If there are more than 10 choices a numbered list will be used but you can specify the exact type of list to show using the ListStyle property.");
//         builder.Prompts.choice(session, "Prompts.choice()\n\nChoose a list style (the default is auto.)", "auto|inline|list|button|none");
//     },
//     function (session, results) {
//         var style = builder.ListStyle[results.response.entity];
//         builder.Prompts.choice(session, "Prompts.choice()\n\nNow pick an option.", "option A|option B|option C", { listStyle: style });
//     },
//     function (session, results) {
//         session.send("You chose '%s'", results.response.entity);
//         builder.Prompts.confirm(session, "Prompts.confirm()\n\nSimple yes/no questions are possible. Answer yes or no now.");
//     },
//     function (session, results) {
//         session.send("You chose '%s'", results.response ? 'yes' : 'no');
//         builder.Prompts.time(session, "Prompts.time()\n\nThe framework can recognize a range of times expressed as natural language. Enter a time like 'Monday at 7am' and I'll show you the JSON we return.");
//     },
//     function (session, results) {
//         session.send("Recognized Entity: %s", JSON.stringify(results.response));
//         builder.Prompts.attachment(session, "Prompts.attachment()\n\nYour bot can wait on the user to upload an image or video. Send me an image and I'll send it back to you.");
//     },
//     function (session, results) {
//         var msg = new builder.Message(session)
//             .ntext("I got %d attachment.", "I got %d attachments.", results.response.length);
//         results.response.forEach(function (attachment) {
//             msg.addAttachment(attachment);    
//         });
//         session.endDialog(msg);
//     }
// ]);


    
// bot.dialog('/list', [
//     function (session) {
//         session.send("You can send the user a list of cards as multiple attachments in a single message...");

//         var msg = new builder.Message(session)
//             .attachments([
//                 new builder.HeroCard(session)
//                     .title("Space Needle")
//                     .subtitle("The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.")
//                     .images([
//                         builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
//                     ]),
//                 new builder.HeroCard(session)
//                     .title("Pikes Place Market")
//                     .subtitle("Pike Place Market is a public market overlooking the Elliott Bay waterfront in Seattle, Washington, United States.")
//                     .images([
//                         builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/PikePlaceMarket.jpg/320px-PikePlaceMarket.jpg")
//                     ])
//             ]);
//         session.endDialog(msg);
//     }
// ]);





bot.dialog('/actions', [
    function (session) { 
        session.send("Bots can register global actions, like the 'help' & 'goodbye' actions, that can respond to user input at any time. You can even bind actions to buttons on a card.");

        var msg = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .title("Space Needle")
                    .subtitle("The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.")
                    .images([
                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
                    ])
                    .buttons([
                        builder.CardAction.dialogAction(session, "weather", "Seattle, WA", "Current Weather")
                    ])
            ]);
        session.send(msg);

        session.endDialog("The 'Current Weather' button on the card above can be pressed at any time regardless of where the user is in the conversation with the bot. The bot can even show the weather after the conversation has ended.");
    }
]);

// Create a dialog and bind it to a global action
bot.dialog('/weather', [
    function (session, args) {
        session.endDialog("The weather in %s is 71 degrees and raining.", args.data);
    }
]);
bot.beginDialogAction('weather', '/weather');   // <-- no 'matches' option means this can only be triggered by a button.