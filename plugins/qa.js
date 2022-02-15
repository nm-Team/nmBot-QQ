const { bot } = require("../main.js");
require("./ad.js");
let fs = require('fs');
const config = require("../config.js");

qa = function (e) {
    // 接收消息时判断
    if (e.message_type == "group") {
        // 初始化 
        try {
            fs.readFileSync("./data/" + config.account.id + "/qa/" + e.group_id + ".json", 'utf8');
        }
        catch (err) {
            try {
                fs.mkdir("./data/" + config.account.id + "/qa", function () { });
            }
            catch (err) { }
            fs.writeFile("./data/" + config.account.id + "/qa/" + e.group_id + ".json", JSON.stringify({ "qaList": [] }), function () { });
        }
        qaList = JSON.parse(fs.readFileSync("./data/" + e.self_id + "/qa/" + e.group_id + ".json", 'utf8'));
        if (e.raw_message.indexOf("/nm qa ") > -1) {
            console.log("捕捉到qa请求");
            toBeContinue = false;
            if (e.raw_message == "/nm qa help") {
                e.reply("nmBot 自动回复\n\n设置方法：\n发送 /nm qa <敏感值>问： 答：\n* 需要管理员权限才能设置");
                return;
            }
            else {
                if (e.sender.role == "member") return e.reply("你清醒一点，你不是管理员");
                rate = Number(e.raw_message.split("/nm qa")[1].split("问：")[0].replace(/ /g, ""));
                console.log(rate);
                if (isNaN(rate) || rate <= 0 || rate > 100) rate = 60;
                console.log(rate);
                ques = trimRight(e.raw_message.split("问：")[1].split("答：")[0]);
                answ = trimLeft(e.raw_message.split("答：")[1]);
                if (!ques || !answ) return e.reply("nm，这是什么东西，重写");
                qaList.qaList[Object.keys(qaList.qaList).length] = { "que": ques, "ans": answ, "rate": rate, "qId": e.sender.user_id, "time": new Date().getTime() };
                fs.writeFileSync("./data/" + config.account.id + "/qa/" + e.group_id + ".json", JSON.stringify(qaList), function () { e.reply("由于未知错误，写入数据失败。"); });
                e.reply("自动回复设置成功。\n\n问：" + ques + "\n答：" + answ + "\n敏感度：" + rate + "\n" + ad());
                console.log("自动回复设置成功。\n\n问：" + ques + "\n答：" + answ + "\n敏感度：" + rate + "\n");
            }
        }
        else {
            // 检测可用的回复
            repliesList = new Array(0);
            for (k = 0; k < Object.keys(qaList.qaList).length; k++) {
                json = qaList.qaList[k];
                if (e.raw_message.indexOf(json.que) > -1 && (json.que.length / e.raw_message.length * 100) > json.rate) {
                    repliesList.push(json.ans);
                }
            }
            if (repliesList.length > 0) e.reply(repliesList[Math.floor(Math.random() * repliesList.length)]);
        }
    }
}

module.exports = qa;

function trimLeft(s) {
    if (s == null) {
        return "";
    }
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
}

function trimRight(s) {
    if (s == null) return "";
    var whitespace = new String(" \t\n\r");
    var str = new String(s);
    if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
        var i = str.length - 1;
        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
            i--;
        }
        str = str.substring(0, i + 1);
    }
    return str;
}         
