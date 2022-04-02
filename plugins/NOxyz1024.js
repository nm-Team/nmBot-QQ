const { bot } = require("../main.js");
const { segment } = require("oicq");
require("./ad.js");

bot.on("message", function (e) {
    if (e.message_type != "private" && e.sender.user_id == 486483978) {
        if (ma(e.raw_message)) {
            if (Math.round(Math.random() > 0.6))
                bot.setGroupBan(e.group_id, 486483978, Math.round(Math.random() * 6) * 60);
            bot.deleteMsg(e.message_id);
            e.reply("检测到嘴臭怪物 且含妈量高 自动为群友屏蔽" + ad());
        }
    }
})

function ma(w) {
    w = w.replace(/\[CQ:[^"$]*\]/g, "").replace(/\/nm /g, "");
    if (w.indexOf("马") == -1 && w.indexOf("妈") == -1 && w.indexOf("🐎") == -1 && w.indexOf("🐴") == -1 && w.indexOf("ma") == -1) return false;
    else return true;
}