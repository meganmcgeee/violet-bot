const builder = require(`botbuilder`);

module.exports = [
  session => {
    session.send(`I'm going to check to see if you are taking any medications that could interact with birth control.`);
    builder.Prompts.choice(session, `Are you taking any seizure medications, St. John's Wort, HIV medications, or Rifampin (treatment for Tuberculosis)?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/preexistingCondition`);
        break;
      case 1:
        session.beginDialog(`/periodQuality`);
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
