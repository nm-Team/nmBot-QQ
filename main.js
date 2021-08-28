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

// 初始化plugin   
plugins.forEach((path) => {
    try {
        console.log("加载插件 " + path);
        require("./plugins/" + path + ".js");
    }
    catch (err) {
        console.error("插件 " + path + " 加载出错：" + err);
    }
})

// 新消息处理事件
client.on("message", function (e) {
    toBeContinue = true;
    plugins.forEach((path) => {
        try {
            // console.log(toBeContinue);
            if (toBeContinue) {
                console.log("调用插件 " + path);
                eval(path)(e);
                if (!toBeContinue) {
                    console.log("插件 " + path + " 阻塞后续插件，处理结束");
                }
            }
        }
        catch (err) {
            if (err != "ReferenceError: " + path + " is not defined")
                console.error("插件 " + path + " 运行出错：" + err);
        }

    })
})