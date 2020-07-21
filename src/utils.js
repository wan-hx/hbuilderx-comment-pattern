const hx = require('hbuilderx');

/**
 * @description main
 */
async function getFileInfo() {
	let filePath = await hx.window.getActiveTextEditor().then(function(editor) {
		let fsPath = editor.document.uri.path;
		return {fsPath};
	});
	return filePath
};

module.exports = {
	getFileInfo
}
