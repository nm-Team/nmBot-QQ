const { bot } = require("../main.js");

var reg = /\/nm site/;

bot.on("message", function (e) {
    var args = reg.exec(e.raw_message);
    console.log(args);
    if (args == null) {
        return;
    }
    e.reply("https://nmteam.xyz/");
})