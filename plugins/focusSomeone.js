const { bot } = require("../main.js");
let fs = require('fs');

// 初始化 
try {
    fs.readFileSync("./data/focus/list.json", 'utf8');
}
catch (err) {
    fs.mkdir("./data/focus", function () { });
    fs.writeFile("./data/focus/list.json", JSON.stringify({ "focusList": [] }), function () { });
}

focusSomeone = function (e) {
    // 接收消息时判断
    // 读json
    focusList = JSON.parse(fs.readFileSync("./data/focus/list.json", 'utf8'));
    // 查重
    for (k = 0; k < Object.keys(focusList.focusList).length; k++) {
        focusS = focusList.focusList[k];
        if (focusS.qId == e.user_id && focusS.groupId == e.group_id) {
            console.log("检查到上线监测事件");
            bot.sendTempMsg(focusS.groupId, focusS.oriId, (focusS.qId) + " 在群 " + (focusS.groupId) + " 上线了！")
            focusList.focusList.splice(k, 1);
            k--;
            fs.writeFileSync("./data/focus/list.json", JSON.stringify(focusList), function () { console.error("Something wrong."); });
        }
    }

    if (e.raw_message.substring(0, 10) == "/nm focus ") {
        console.log("捕捉到focus请求");
        toBeContinue = false;
        msgSplited = e.raw_message.replace(/\/nm focus /g, "").split(" ");
        console.log(msgSplited);
        // 读取各项信息 
        if (e.message_type == "private") { // 私聊，参数12分别为群号和qq号
            groupId = msgSplited[0];
            qId = msgSplited[1];
        }
        else {
            groupId = e.group_id;
            qId = msgSplited[0];
        }
        oriId = e.user_id;
        if (isNaN(groupId) || isNaN(qId) || isNaN(oriId)) {
            console.error("用户信息错误");
            e.reply("你输入的信息有误，请重试。");
            return;
        }
        console.log("User " + oriId + " wants to follow " + qId + " in group " + groupId);
        // 查特殊值
        if (qId == e.self_id || qId == oriId) {
            e.reply("此操作被系统禁止。");
            return;
        }
        // 写入json
        focusList = JSON.parse(fs.readFileSync("./data/focus/list.json", 'utf8'));
        // 查重
        for (k = 0; k < Object.keys(focusList.focusList).length; k++) {
            focusS = focusList.focusList[k];
            if (focusS.oriId == oriId && focusS.qId == qId && focusS.groupId == groupId) {
                console.warn("重复");
                e.reply("此记录已存在。");
                return;
            }
        }
        focusList.focusList[Object.keys(focusList.focusList).length] = { "oriId": oriId, "groupId": groupId, "qId": qId };
        fs.writeFileSync("./data/focus/list.json", JSON.stringify(focusList), function () { e.reply("由于未知错误，写入数据失败。"); });
        e.reply("设置成功。\n当 " + (qId) + " 在群 " + (groupId) + " 上线时，我会提醒你。");
    }
}

module.exports = focusSomeone;
