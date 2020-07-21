const hx = require('hbuilderx');
const utils = require('./utils.js');
const comment = require('./commentPattern.js');

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
 * @description main
 */
async function main() {
	// 选择注释图案
	var pattern = await selectPattern();
	
	if (pattern != undefined) {
		hx.window.getActiveTextEditor().then(function(editor) {
			let workspaceEdit = new hx.WorkspaceEdit();
			let edits = [];
			edits.push(new hx.TextEdit({
				start: 0,
				end: 0
			}, pattern + '\n'));
		
			workspaceEdit.set(editor.document.uri, edits);
			hx.workspace.applyEdit(workspaceEdit);
		});
	}
	
};

module.exports = {
	main
}
