const builder = require(`botbuilder`);

module.exports = [
    session => {
        builder.Prompts.text(session, `Emergency questions go here`);
    },
];
