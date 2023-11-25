module.exports = {
	process() {
		return { code: 'module.exports = {};' };
	},
	getcachekey() {
		// the output is always the same.
		return 'svgtransform';
	},
};
