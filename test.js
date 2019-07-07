const dislayValue = require('./index');
const assert = require('assert');

[
	[undefined, 'undefined'],
	[null, 'null'],
	[-0, '-0'],
	[+0, '0'],
	[Infinity, 'Infinity'],
	[-Infinity, '-Infinity'],
	['test', '\'test\''],
	[[1, 2], '[1,2]', '[\n    1,\n    2\n]'],
	[{x: 1}, '{"x":1}', '{\n    "x": 1\n}'],
	[/a/g, '/a/g'],
].forEach((value) => {
	it(`should return ${value[1]}`, () => {
		assert.equal(dislayValue(value[0]), value[1]);
	});

	if (value[2]) {
		it(`should return a beautified ${value[1]}`, () => {
			assert.equal(dislayValue(value[0], {
				beautify: true
			}), value[2]);
		});
	}
});
