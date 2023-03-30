const hx = require('hbuilderx');

/**
 * @description main
 */
async function getFileInfo() {
    let filePath = await hx.window.getActiveTextEditor().then(function(editor) {
        let fsPath = editor.document.uri.path;
        return {
            fsPath
        };
    });
    return filePath;
};

/**
 * @description 获取当前行选区
 */
async function getCurrentLineFromPosition() {
    let position = await hx.window.getActiveTextEditor().then(function(editor) {
        let selection = editor.selection.active;
        if (selection == 0) return 0;
        return editor.document.lineFromPosition(selection).then((line) => {
            let { start } = line;
            return start;
        });
    });
    return position;
};


module.exports = {
    getFileInfo,
    getCurrentLineFromPosition
};
