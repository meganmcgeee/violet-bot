const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.choice(session, `Are you over the age of 35 and a heavy smoker (more than 15 cigarettes per day)?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/preexistingCondition`);
        break;
      case 1:
        session.beginDialog(`/hasHypertension`);
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
