const builder = require(`botbuilder`);

module.exports = [
  session => {
    builder.Prompts.text(session, `Progestin pills are the best bet.`);
    builder.Prompts.text(session, `Soon there will be a list of pills that appear!!`);
  },
];
