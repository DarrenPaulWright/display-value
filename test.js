const displayValue = require('./index');
const jsdom = require('jsdom');
const assert = require('assert');

const dom = new jsdom.JSDOM('<!DOCTYPE html><div style="height: 32px; width: 64px;">Hello world</div>');
const div = dom.window.document.querySelector('div');

const argList = function() {return arguments}(1, 2);

class Foo {}

class Bar {
	toString() {
		return 'toString value';
	}
}

[
	[undefined, 'undefined'],
	[null, 'null'],
	[NaN, 'NaN'],
	[-0, '-0'],
	[+0, '0'],
	[13, '13'],
	[1300, '1,300'],
	[new Number(14), '14'],
	[Infinity, 'Infinity'],
	[-Infinity, '-Infinity'],
	['test', '\'test\''],
	[new String('test2'), '\'test2\''],
	[[1, 2], '[1,2]', '[\n    1,\n    2\n]'],
	[{x: 1}, '{"x":1}', '{\n    "x": 1\n}'],
	[/a/g, '/a/g'],
	[div.getBoundingClientRect(), '{"bottom":0,"height":0,"left":0,"right":0,"top":0,"width":0}'],
	[argList, '[1,2]'],
	[new Foo(), '[object Foo]'],
	[new Bar(), 'toString value'],
	[String, 'String'],
	[Symbol('test'), 'Symbol(test)']
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

it(`should return a date string`, () => {
	assert.ok(displayValue(new Date('12/20/2000')).indexOf('Wed Dec 20 2000 00:00:00') !== -1);
});
