const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.choice(session, `Do you have history of leg or lung clots, heart blockages, or stroke heart valve or rhythm  problems such as a murmur?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/preexistingCondition`);
        break;
      case 1:
        session.beginDialog(`/clotRiskECP`);
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
  },
];
