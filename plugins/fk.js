const { bot } = require("../main.js");

bot.on("message", function (e) {
    if (e.raw_message == "/nm fk") {
        e.reply('OK');
    }
})
