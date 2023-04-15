import * as commonCommands from "./commands/common";
import * as profileCommands from "./commands/profile";
import * as articleCommands from "./commands/article";
import * as commentsCommands from "./commands/comments";
import * as ratingCommands from "./commands/rating";

// команды, которые можно зашить внутрь сайпреса и потом использовать
// добавляем команду запроса на авторизацию
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
