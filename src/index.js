import bcQuestions from './dialogs/bcQuestions';
import bot from './bot';
import menu from './dialogs/menu';
import preExistingCondition from './dialogs/preExistingCondition';

applyMiddleware(bot);

const reloadMenu =
  [`showMenu`, null, { matches: /^(menu|back)/i }];

bot.dialog(`/`, introductionDialog);
bot.dialog(`/menu`, menuDialog).reloadAction(...reloadMenu);
bot.dialog(`/bcQuestions`, bcQuestionsDialog).reloadAction(...reloadMenu);
bot.dialog(`/preExistingCondition`, preExsitingConditionDialog).reloadAction(...reloadMenu);