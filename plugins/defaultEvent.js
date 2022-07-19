const { bot } = require("../main.js");

var reg = /\/nm (.*)/;

defaultCooling = [];
defaultCoolingNoticed = [];

defaultEvent = function (e) {
    if (e.raw_message == "/nm") {
        e.reply(`nmBot by nmTeam
        
/nm focus 上线提醒
/nm about 关于`);
        return;
    };
    var args = reg.exec(e.raw_message);
    console.log("raw: " + JSON.stringify(e));
    console.log(args);
    if (args == null) {
        if (e.message_type == "group" && e.raw_message.replace(/\[CQ:[^\]]*\]/g, "").replace(/ /g, "")[0] == "/") {
            try {
                atToQid = e.raw_message.split("[CQ:at,qq=")[1].split(",")[0];
                atToQName = e.raw_message.split("[CQ:at,qq=")[1].split(",text=@")[1].split("]")[0];
            }
            catch (err) {
                atToQid = e.sender.user_id;
            }
            fromQid = e.sender.user_id;
            fromQName = (e.sender.card ? e.sender.card : e.sender.nickname);
            // text = e.raw_message.replace(/\,text=[^"$]*\]/g, "]").replace(e.raw_message.replace(/\,text=[^"$]*\]/g, "]").split("/")[0]+"/","");
            text = e.raw_message.replace(/\[CQ:[^\]]*\]/g, "").replace(e.raw_message.replace(/\[CQ:[^\]]*\]/g, "").split("/")[0] + "/", "");
            textA = text.split(" ")[0];
            if ("abcdefghijklmnopqrstuvwxyz".indexOf(textA.charAt(0).toLowerCase()) == -1) {
                if (textA.charAt(0) == "$") textA = textA.replace("$", "");
                textB = text.replace(textA, "");
                e.reply((` $from ` + textA + ((textA[textA.length - 1] == "了" || textB) ? "" : "了") + "$to" + (textB ? "" + textB : "") + "！").replace(/\$from/g, `[CQ:at,qq=${fromQid}]`).replace(/\$to/g, (atToQid == fromQid ? "自己" : `[CQ:at,qq=${atToQid}]`)));
            }
        }
        return;
    }
    muid = (e.group_id ? "g" + e.group_id : "u" + e.user_id);
    if (defaultCooling[muid]) {
        if (!defaultCoolingNoticed[muid]) {
            e.reply("nmBack 功能每 10 秒只能使用一次。或者，请输入正确的指令。");
            defaultCoolingNoticed[muid] = true;
        }
    } else {
        e.reply(rand(args[1]) + "nm");
        defaultCooling[muid] = true;
        defaultCoolingNoticed[muid] = false;
        setTimeout(() => {
            defaultCooling[muid] = false;
            defaultCoolingNoticed[muid] = false;
        }, 10000);
    }
    console.log(muid + " " + defaultCooling[muid] + " " + defaultCoolingNoticed[muid]);
}

function rand(str) {
    str = str.replace(/\[CQ:[^"$]*\]/g, "").replace(/\/nm /g, "");
    if (str == "") {
        returns = [
            "你这是要我回什么呢？",
            "你不是在耍我吧？",
            "喂，认真点 ",
            "你在教我做事？"
        ]
        return returns[Math.floor(Math.random() * returns.length)];
    }
    strsplit = str.split(" ");
    if (strsplit.length > 1 && !isNaN(Number(strsplit[strsplit.length - 1])) && str[Number(strsplit[strsplit.length - 1])] && str[Number(strsplit[strsplit.length - 1])] != " ") {
        console.log("确定返回字符");
        return str[Number(strsplit[strsplit.length - 1])].toLowerCase();
    }
    do {
        len = str.length;
        ran = Math.floor(Math.random() * len);
        if (str[ran] && str[ran] != " ")
            return str[ran].toLowerCase();
    } while (true);
}

module.exports = defaultEvent;