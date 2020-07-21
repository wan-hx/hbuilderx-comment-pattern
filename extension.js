const hx = require("hbuilderx");
const main = require('./src/main.js');

//该方法将在插件激活的时候调用
function activate(context) {
    let disposable = hx.commands.registerCommand('extension.commentPattern', () => {
        main.main()
    });
    context.subscriptions.push(disposable);

    let commentPatternAbout = hx.commands.registerCommand('extension.commentPatternAbout', () => {
        hx.env.openExternal('https://ext.dcloud.net.cn/plugin?name=comment-pattern');
    });
    context.subscriptions.push(commentPatternAbout);
};

//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

};

module.exports = {
    activate,
    deactivate
}
