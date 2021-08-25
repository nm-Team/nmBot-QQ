const { bot } = require("../main.js");

var reg = /\/nm (.*)/;

bot.on("message", function (e) {
    var args = reg.exec(e.raw_message);
    console.log(args);
    if (args == null) {
        return;
    }
    e.reply(rand(args[1]) + "nm");
})

function rand(str) {
    len = str.length;
    return str[Math.floor(Math.random() * len)];
}