const { createClient } = require("oicq");
const config = require("./config.js");
const plugins = require("./plugins.js");
const client = createClient(config.account.id);

client.on("system.online", () => console.log("Logged in!"));

if (config.qrcode) {
    client.on("system.login.qrcode", function (event) {
        process.stdin.once("data", () => {
            this.login();
        });
    }).login();
}
else {
    client.on("system.login.slider", function (event) {
        process.stdin.once("data", (input) => {
            this.sliderLogin(input);
        });
    }).on("system.login.device", function (event) {
        process.stdin.once("data", () => {
            this.login();
        });
    }).login(config.account.password);
}

exports.bot = client

plugins.forEach((path) => {
    require("./plugins/" + path);
})