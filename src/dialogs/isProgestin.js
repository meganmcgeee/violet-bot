const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.text(session, `Progestin pills are the best bet.`);
  },
];
