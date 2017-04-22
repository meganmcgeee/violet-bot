export default [  
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
                  session.endDialog('You %s "%s"', action, item);
                  session.beginDialog(`/emergencyContraception`);
                  break;
              case '101':
                  item = 'monthly birth control, girl! I have a few quick questions that I need to ask first.';
                  session.endDialog('You %s "%s"', action, item);
                  session.beginDialog(`/recentBirth`);
                  break;
          }
      }
  ])
];