const moment = require('moment');
let values = require('./values.json');

function formatMessage(username, text){
    return {
        username,
        text,
        dateTime: moment().utc().format(values.dateTimeFormat),
        isChatBot: username === values.chatBotName
    }
}

module.exports = formatMessage;