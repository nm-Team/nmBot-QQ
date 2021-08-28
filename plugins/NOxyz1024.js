const { bot } = require("../main.js");
const { segment } = require("oicq")

bot.on("message", function (e) {
    if (e.sender.user_id == 486483978) {
        if (ma(e.raw_message)) {
            bot.setGroupBan(e.group_id, 486483978, 60);
            bot.deleteMsg(e.message_id);
            e.reply("检测到嘴臭怪物 且含妈量高 自动为群友屏蔽");
        }
    }
})

function ma(w) {
    w = w.replace(/\[CQ:[^"$]*\]/g, "").replace(/\/nm /g, "");
    if (w.indexOf("马") == -1 && w.indexOf("妈") == -1 && w.indexOf("m") == -1) return false;
    else return true;
}