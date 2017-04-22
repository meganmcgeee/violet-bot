const builder = require(`botbuilder`);

module.exports = [
  function (session) {
      // Send a greeting and show help.
      const card = new builder.HeroCard(session)
          .title(`Violet`)
          .text(`I'm Violet and I know all about birth control and emergency contraception :-)`)
          .images([
                builder.CardImage.create(session, `http://www.publicdomainpictures.net/pictures/60000/velka/woman-silhouette-1381341328mJA.jpg`),
          ]);
      const msg = new builder.Message(session).attachments([card]);
      session.send(msg);
      session.send(`Hi! I'm Violet, the pregnancy prevention bot. I can tell you all about emergency contraception and birth control options.`);
      session.send(`I'll go through a series of questions to figure out what the safest contraceptive options are for you. Then, I'll give you locations where you can get them over the counter!`);
      session.beginDialog(`/menu`);
  },
];
