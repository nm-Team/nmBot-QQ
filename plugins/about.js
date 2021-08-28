const { bot } = require("../main.js");

about = function (e) {
    if (e.raw_message == "/nm about") {
        e.reply(`[CQ:image,file=48bd26ba6e6e1b88109ff838ea682967628958-4400-4400.png,url=https://c2cpicdw.qpic.cn/offpic_new/2833769658//2833769658-2659848897-48BD26BA6E6E1B88109FF838EA682967/0?term=2]`);
        toBeContinue = false;
    }
}

module.exports = about;
