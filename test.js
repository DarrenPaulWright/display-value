const displayValue = require('./index');
const jsdom = require('jsdom');
const assert = require('assert');

const dom = new jsdom.JSDOM('<!DOCTYPE html><div style="height: 32px; width: 64px;">Hello world</div>');
const div = dom.window.document.querySelector('div');

let argList;
const argListFunction = function() {
	argList = arguments;
};
argListFunction(1, 2);

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
	[new Date('12/20/2000'), 'Wed Dec 20 2000 00:00:00 GMT-0800 (Pacific Standard Time)'],
	[div.getBoundingClientRect(), '{"bottom":0,"height":0,"left":0,"right":0,"top":0,"width":0}'],
	[argList, '[1,2]'],
].forEach((value) => {
	it(`should return ${value[1]}`, () => {
		assert.equal(displayValue(value[0]), value[1]);
	});

	if (value[2]) {
		it(`should return a beautified ${value[1]}`, () => {
			assert.equal(displayValue(value[0], {
				beautify: true
			}), value[2]);
		});
	}
});
