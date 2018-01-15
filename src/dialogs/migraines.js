const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.choice(session, `Do you suffer from severe migraine headaches?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/preexistingCondition`);
        break;
      case 1:
        session.beginDialog(`/systemConditions`);
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
