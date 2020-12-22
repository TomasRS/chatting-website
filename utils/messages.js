const moment = require('moment');
let values = require('./values.json');

function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format(values.timeFormat),
        isChatBot: username === values.chatBotName
    }
}

module.exports = formatMessage;