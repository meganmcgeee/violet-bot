const builder = require(`botbuilder`);

module.exports = [
  session => {
    session.send(`Okay, first I'm going to check to see if you have any medical conditions that would make it risky to take emergency contraceptives.`);
    builder.Prompts.choice(session, `Did you give birth less than 6 weeks ago?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/preExistingCondition`);
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
];
