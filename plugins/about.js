const { bot } = require("../main.js");

bot.on("message", function (e) {
    if (e.raw_message == "/nm about") {
        e.reply(`       🍋
    nmBot
nmTeam. 
----------------------
https://nmteam.xyz `);
    }
})
