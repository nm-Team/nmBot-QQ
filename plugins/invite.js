const { bot } = require("../main.js");

bot.on("request.friend.add", async function (e) {
    await this.setFriendAddRequest(e.flag);
    this.sendPrivateMsg(e.user_id, "I'm nmBot.");
});

bot.on("request.group.invite", async function (e) {
    await this.setGroupAddRequest(e.flag);
    this.sendGroupMsg(e.group_id, "I'm nmBot");
});
