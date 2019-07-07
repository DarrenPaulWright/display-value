module.exports = function() {
	return {
		name: 'display-value',
		files: ['index.js'],
		tests: ['test.js'],
		testFramework: 'mocha',
		env: {
			type: 'node'
		},
		// debug: true,
		lowCoverageThreshold: 99
	};
};
