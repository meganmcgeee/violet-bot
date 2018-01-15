const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.choice(session, `How frequently do you have your period?`, `Monthly | Yearly | Never`);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/periodFrequency`);
        break;
      case 1:
        session.beginDialog(`/periodFrequency`);
        break;
      case 2:
        session.beginDialog(`/periodFrequency`);
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
