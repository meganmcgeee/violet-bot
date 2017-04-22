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




// Birth control questions dialog begins




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
        builder.Prompts.text(session, 'Soon there will be a list of pills that appear!!');
    }
]);

// Progestin Pills
bot.dialog('/isProgestin', [
    session => {
        builder.Prompts.text(session, 'Progestin pills are the best bet.');
    }
]);

// I'm looking to load pills from a mongo database with info to hero cards. This code is something I found that accomplishess this using the Bing API- pulls articles based on used input
// This code is from NodeNewsBot and currently accepts a user input and sends it to the bing search engine.

// It needs to be recreated so that it hits the Airtable API and returns results based on the 

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