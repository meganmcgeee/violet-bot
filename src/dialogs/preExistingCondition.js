const builder = require(`botbuilder`);

// Pre-existing condition
module.exports = [
  session => {
      builder.Prompts.text(session, `From what you have answered, it sounds like you have a pre-existing condition or are on medication that interacts with oral contraceptive.`);
      builder.Prompts.text(session, `You should speak to a medical professional to find out what your options are.`);
      builder.Prompts.choice(session, `You can schedule an appointment with an OB/GYN online at HealthTap, or check to see if there's a doctor near you that takes your insurance.?`, `Yes | No | Unsure `);
  },
  (session, results) => {
    switch (results.response.index) {
      case 0:
        session.beginDialog(`/telehealth`);
        break;
      case 1:
        session.beginDialog(`/docNearMe`);
        break;
      case 2:
        session.beginDialog(`/end`);
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
