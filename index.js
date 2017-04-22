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
bot.use(quickReplies.QuickRepliesMiddleware);

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
                    .title("Monthly Birth Control")
                    .subtitle("Enjoy your body, your youth and your freedom. No need to sweat over whether or not you'll have to put your life on hold.")
                    .images([
                        builder.CardImage.create(session, "http://palgrave.nature.com/nm/journal/v16/n5/images/nm0510-506-I1.jpg")
                            .tap(builder.CardAction.showImage(session, "http://palgrave.nature.com/nm/journal/v16/n5/images/nm0510-506-I1.jpg")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "select:101", "Select Monthly Birth Control or 'The Pill'")
                    ]),
                new builder.HeroCard(session)
                    .title("Emergency Contraceptives")
                    .subtitle("Sometimes the condom breaks, maybe you just didn't plan. It's totally normal, girl. I'll help you.")
                    .images([
                        builder.CardImage.create(session, "http://www.medimanage.com/Images/brk%20glass%20EC.jpg")
                            .tap(builder.CardAction.showImage(session, "http://www.medimanage.com/Images/brk%20glass%20EC.jpg")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "select:100", "Select Emergency Contrapceptives/ Plan B")
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
                item = 'emergency contraception, girl! I have a few quick questions that I need to ask first.';
                session.beginDialog(`/emergencyContraception`);
                break;
            case '101':
                item = 'monthly birth control, girl! I have a few quick questions that I need to ask first.';
                session.beginDialog(`/recentBirth`);
                break;
        }
        session.endDialog('You %s "%s"', action, item);
    }
]);




// Birth control questions dialog begins
// Recent Birth
// =============================================================================
bot.dialog('/recentBirth', [
    session => {
    session.send("Okay, first I'm going to check to see if you have any medical conditions that would make it risky to take certain birth control.");
    builder.Prompts.choice(session, `Did you give birth less than 6 weeks ago?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/isCombination`);
        break;
      case 1:
        session.beginDialog(`/isSmoker`);
        break;
      case 2:
        session.beginDialog(`/unsure`);
        break;
      default:
        session.endDialog();
        break;
    }
  },
  session => {
      // Reload menu
    session.replaceDialog(`/menu`);
  }
]);





// Emergency contraceptive pill question 
// dialog begins
// =============================================================================
bot.dialog('/emergencyContraception', [
    session => {
        builder.Prompts.text(session, 'Emergency questions go here');
    }
]);

// Combination pills
bot.dialog('/isCombination', [
    session => {
        builder.Prompts.text(session, 'Combinations pills are the best bet.');
    }
]);

// I'm looking to load pills from a mongo database with info to hero cards. This code is something I found that accomplishess this using the Bing API- pulls articles based on used input

// bot.dialog('/searchPills', [
//     function (session){
//         // Ask them to enter a topic they want news about
//         builder.Prompts.text(session, prompts.promptSearchPills);
//     }, function (session, results, next){
//         if (results.response && results.response !== 'quit') {
//             session.sendTyping();
//             var numResults = 10;
//             var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q="
//             + results.response + "&count=" + numResults + "&mkt=" + market + "&originalImg=true";
//             //Options for the request
//             var options = {
//                 uri: url,
//                 headers: {
//                     'Ocp-Apim-Subscription-Key': BINGNEWSKEY
//                 },
//                 json: true
//             }
//             //Make the request
//             rp(options).then(function (body){
//                 sendSearchNewsResults(session, results, body);
//             }).catch(function (err){
//                 console.log(err.message);  
//                 session.send(prompts.msgError);
//             }).finally(function () {
//                 session.endDialog();
//             });
//         } else {
//             session.endDialog(prompts.msgCancel);
//         }
//     }
// ]);

// function sendPillsResults(session, results, body){
//    session.sendTyping();
//    let allPills = body.value;
//    let cards = [];
//    // Some searches don’t return 10, so make the upper limit the number of returned articles
//    for (let i = 0; i < allPills.length; i++){
//        let pill = allPills[i];
//        let cardImg;
//        if (pill.image) {
//            cardImg = pill.image.contentUrl;
//        } else {
//            // If there’s no image provided with the pill
//            //http://imgur.com/a/vl59A
//            cardImg = “http://i.imgur.com/7kYV6y5.jpg”; (79KB)


//        }
//        // Create a card for the article
//        cards.push(new builder.HeroCard(session)
//            .title(pill.name)
//            .subtitle(pill.datePublished)
//            .images([
//                builder.CardImage.create(session, cardImg)
//            ])
//            .buttons([
//                builder.CardAction.dialogAction(session, “moredetails”, pill.description, “Short snippet”),
//                builder.CardAction.openUrl(session, pill.url, “Full description)
//            ]));
//    }
//    let msg = new builder.Message(session)
//        .textFormat(builder.TextFormat.xml)
//        .attachmentLayout(builder.AttachmentLayout.carousel)
//        .attachments(cards);
//    session.send(msg);
// }

// Progestin Pills
bot.dialog('/isProgestin', [
    session => {
        builder.Prompts.text(session, 'Progestin pills are the best bet.');
    }
]);


