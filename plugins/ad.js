const { bot } = require("../main.js");
let fs = require('fs');
const config = require("../config.js");

// 初始化 
try {
    adList = JSON.parse(fs.readFileSync("./data/" + config.account.id + "/ad.json", 'utf8')).ad;
}
catch (err) {
    fs.writeFile("./data/" + config.account.id + "/ad.json", JSON.stringify({ "ad": [] }), function () { });
}

ad = function () {
    if (Object.keys(adList).length == 0) return "";
    return "\n\n" + adList[Math.floor(Math.random() * Object.keys(adList).length)].content;
}

module.exports = ad;