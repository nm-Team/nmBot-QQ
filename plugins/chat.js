const { bot } = require("../main.js");
require("./ad.js");
let fs = require('fs');
const config = require("../config.js");
const request = require('request');

chatApi = "http://api.qingyunke.com/api.php?key=free&appid=0&msg=";

chat = function (e) {
    // 判断条件
    if (e.raw_message.substring(0, 2) == "nm" || e.raw_message.indexOf("[CQ:at,qq=" + config.account.id) != -1) {
        toBeContinue = false;
        msg = encodeURI(e.raw_message.replace("nm", "").replace(/\[CQ:[^]*\]/g, ""));
        if (msg && msg != " ")
            console.log("即将请求聊天api,内容：" + msg);
        request(chatApi + msg, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            if (body.result == "0") {
                chatReturn = body.content.replace(/{br}/g, "\n").replace(/菲菲/g, "nmBot");
                console.log("api返回" + chatReturn);
                e.reply(chatReturn);
            }
        });
    }
}

module.exports = chat;
