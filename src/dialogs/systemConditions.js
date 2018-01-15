const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.choice(session, `Do you currently have breast cancer, a liver tumor, cirrhosis, or gallbladder trouble?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/preexistingCondition`);
        break;
      case 1:
        session.beginDialog(`/rxInteraction`);
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
