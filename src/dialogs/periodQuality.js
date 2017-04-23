const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.choice(session, `
How would you describe your periods?`, `Light | Regular | Heavy | Clots | Irregular | Painful `);
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
      case 3:
        session.beginDialog(`/periodFrequency`);
        break;
      case 4:
        session.beginDialog(`/periodFrequency`);
        break;
      case 5:
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
