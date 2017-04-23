const bot = require(`./bot`);
const clotRisk = require(`./dialogs/clotRisk`);
const emergencyContraception = require(`./dialogs/emergencyContraception`);
const hasHypertension = require(`./dialogs/hasHypertension`);
const introduction = require(`./dialogs/introduction`);
const isCombination = require(`./dialogs/isCombination`);
const isProgestin = require(`./dialogs/isProgestin`);
const isSmoker = require(`./dialogs/isSmoker`);
const rxInteraction = require(`./dialogs/rxInteraction`);
const periodQuality = require(`./dialogs/periodQuality`);
const periodFrequency = require(`./dialogs/periodFrequency`);
const menu = require(`./dialogs/menu`);
const migraines = require(`./dialogs/migraines`);
const preExistingCondition = require(`./dialogs/preExistingCondition`);
const recentBirth = require(`./dialogs/recentBirth`);
const systemConditions = require(`./dialogs/systemConditions`);

const reloadMenu =
  [`showMenu`, null, { matches: /^(menu|back)/i }];

bot.dialog(`/`, introduction);
bot.dialog(`/menu`, menu).reloadAction(...reloadMenu);

// Emergency contraceptive pill questions
bot.dialog(`/emergencyContraception`, emergencyContraception);

// Birth control pill questions
bot.dialog(`/preExistingCondition`, preExistingCondition);
bot.dialog(`/recentBirth`, recentBirth);
bot.dialog(`/isSmoker`, isSmoker);
bot.dialog(`/hasHypertension`, hasHypertension);
bot.dialog(`/clotRisk`, clotRisk);
bot.dialog(`/migraines`, migraines);
bot.dialog(`/systemConditions`, systemConditions);
bot.dialog(`/rxInteraction`, rxInteraction);
bot.dialog(`/periodQuality`, periodQuality);
bot.dialog(`/periodFrequency`, periodFrequency);


// Combination pills suggestion
bot.dialog(`/isCombination`, isCombination);

// Progestin Pills suggestion
bot.dialog(`/isProgestin`, isProgestin);


