const { bot } = require("../main.js");

fk = function (e) {
    if (e.raw_message == "/nm status") {
        e.reply('nmBot 当前工作正常，感觉自己萌萌哒~');
        toBeContinue = false;
    }
}

module.exports = fk;
