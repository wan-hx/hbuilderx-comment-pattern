const hx = require("hbuilderx");
const {
    insertComment
} = require('./src/main.js');

function activate(context) {
    let disposable = hx.commands.registerCommand('extension.commentPattern', () => {
        insertComment();
    });
    context.subscriptions.push(disposable);

    let commentPatternAbout = hx.commands.registerCommand('extension.commentPatternAbout', () => {
        hx.env.openExternal('https://ext.dcloud.net.cn/plugin?name=comment-pattern');
    });
    context.subscriptions.push(commentPatternAbout);
};

function deactivate() {

};


module.exports = {
    activate,
    deactivate
}
