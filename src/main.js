const hx = require('hbuilderx');
const comment = require('./commentPattern.js');
const {
    getCurrentLineFromPosition
} = require("./utils.js")

/**
 * @description 选择图案
 */
async function selectPattern() {
    let res = await hx.window.showQuickPick(comment.PickPatterns, {
        placeHolder: "请选择您要插入的注释图案"
    }).then(function(result) {
        if (!result) {
            return;
        };
        return result.code;
    });
    return res;
};

/**
 * @description 选择插入位置
 */
async function selectPosition() {
    let positions = [
        {label: "在当前行插入",code: "current"},
        {label: "在当前文件顶部开头插入",code: "top"},
        // {label: "在当前文件底部结尾插入",code: "bottom"},
        {label: "返回上一级",code: "goback"},
        {label: "关闭",code: "close"},
    ];
    let res = await hx.window.showQuickPick(positions, {
        placeHolder: "请选择您要插入的位置"
    }).then(function(result) {
        if (!result) {
            return;
        };
        return result.code;
    });
    return res;
};

/**
 * @description 在当前文件插入注释
 */
async function insertComment() {
    // 图案
    let pattern = await selectPattern();
    if (pattern == undefined) return;

    // 位置
    let position = await selectPosition();
    if (position == undefined) return;
    if (position == "close") return;
    if (position == "goback") {
        insertComment();
        return;
    };

    let startPosition = 0;
    if (position == "current") {
        let lineStartPosition = await getCurrentLineFromPosition();
        if (lineStartPosition == undefined) {
            hx.window.showErrorMessage("提示：获取当前行位置信息错误，插入注释图案失败。", ["我知道了"]);
            return;
        };
        startPosition = lineStartPosition;
    };

    await hx.window.getActiveTextEditor().then(function(editor) {
        let selection = editor.selection;
        console.log(selection)
        let workspaceEdit = new hx.WorkspaceEdit();
        let edits = [];
        edits.push(new hx.TextEdit({
            start: startPosition,
            end: startPosition
        }, pattern + '\n'));

        workspaceEdit.set(editor.document.uri, edits);
        hx.workspace.applyEdit(workspaceEdit);
    });
};

module.exports = {
    insertComment
};
