const { bot } = require("../main.js");

site = function (raw) {
    var reg = /\/nm site/;
    var args = reg.exec(raw.raw_message);
    // console.log("raw " + JSON.stringify(raw));
    // console.log("args " + args);
    if (args != null) {
        console.log("触发 site");
        raw.reply("https:// nmteam.x歪z");
        toBeContinue = false;
    }
    else console.log("未触发 site");
}

module.exports = site;