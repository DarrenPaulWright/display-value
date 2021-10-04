import { strict as assert } from 'assert';
import jsdom from 'jsdom';
import displayValue from './index.js';

const dom = new jsdom.JSDOM('<!DOCTYPE html><div style="height: 32px; width: 64px;">Hello world</div>');
const div = dom.window.document.querySelector('div');

const argList = function() {
	return arguments;
}(1, 2);

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
	[3n, '3n'],
	[-0n, '-0n'],
	[1300n, '1,300n'],
	[1300, '1,300'],
	[new Number(14), '14'],
	[Infinity, 'Infinity'],
	[-Infinity, '-Infinity'],
	['test', '"test"'],
	[new String('test2'), '"test2"'],
	[[1, 2], '[1, 2]', '[\n    1,\n    2\n]'],
	[{ x: 1 }, '{ "x": 1 }', '{\n    "x": 1\n}'],
	[
		[{ x: 1 }, { y: [{ z: 2 }, { z: 3 }] }],
		'[{ "x": 1 }, { "y": [{ "z": 2 }, { "z": 3 }] }]',
		'[\n    {\n        "x": 1\n    }, {\n        "y": [\n            {\n                "z": 2\n            }, {\n                "z": 3\n            }\n        ]\n    }\n]'
	],
	[/a/g, '/a/g'],
	[{}, '{}', '{}'],
	[[], '[]', '[]'],
	[
		div.getBoundingClientRect(),
		'{ "bottom": 0, "height": 0, "left": 0, "right": 0, "top": 0, "width": 0 }'
	],
	[argList, '[1, 2]'],
	[new Foo(), '[object Foo]'],
	[new Bar(), 'toString value'],
	[String, 'String'],
	[Symbol('test'), 'Symbol(test)'],
	[() => {
	}, '() => {…}'],
	[function(param) {
	}, 'ƒ (param) {…}'],
	[function coffee() {
	}, 'ƒ coffee() {…}'],
	[
		new Set([1, 2, 3]),
		'Set { 1, 2, 3 }',
		'Set {\n    1,\n    2,\n    3\n}'
	],
	[
		new Map([[1, 'decaf']]),
		'Map { "1": "decaf" }',
		'Map {\n    "1": "decaf"\n}'
	],
	[
		new WeakSet([[1, 2]]),
		'WeakSet {…}',
		'WeakSet {…}'
	],
	[
		new WeakMap([[{}, 'decaf']]),
		'WeakMap {…}',
		'WeakMap {…}'
	],
	[
		new Int8Array([1, 2, 3]),
		'Int8Array [1, 2, 3]',
		'Int8Array [\n    1,\n    2,\n    3\n]'
	],
	[
		new Uint8Array([1, 2, 3]),
		'Uint8Array [1, 2, 3]',
		'Uint8Array [\n    1,\n    2,\n    3\n]'
	],
	[
		new Uint8ClampedArray([1, 2, 3]),
		'Uint8ClampedArray [1, 2, 3]',
		'Uint8ClampedArray [\n    1,\n    2,\n    3\n]'
	],
	[
		new Int16Array([1, 2, 3]),
		'Int16Array [1, 2, 3]',
		'Int16Array [\n    1,\n    2,\n    3\n]'
	],
	[
		new Uint16Array([1, 2, 3]),
		'Uint16Array [1, 2, 3]',
		'Uint16Array [\n    1,\n    2,\n    3\n]'
	],
	[
		new Int32Array([1, 2, 3]),
		'Int32Array [1, 2, 3]',
		'Int32Array [\n    1,\n    2,\n    3\n]'
	],
	[
		new Uint32Array([1, 2, 3]),
		'Uint32Array [1, 2, 3]',
		'Uint32Array [\n    1,\n    2,\n    3\n]'
	],
	[
		new BigInt64Array([1n, 2n, 3n]),
		'BigInt64Array [1n, 2n, 3n]',
		'BigInt64Array [\n    1n,\n    2n,\n    3n\n]'
	],
	[
		new BigUint64Array([1n, 2n, 3n]),
		'BigUint64Array [1n, 2n, 3n]',
		'BigUint64Array [\n    1n,\n    2n,\n    3n\n]'
	],
	[
		new Float32Array([1, 2, 3]),
		'Float32Array [1, 2, 3]',
		'Float32Array [\n    1,\n    2,\n    3\n]'
	],
	[
		new Float64Array([1, 2, 3]),
		'Float64Array [1, 2, 3]',
		'Float64Array [\n    1,\n    2,\n    3\n]'
	]
].forEach((value) => {

	it(`should return ${value[1]}`, () => {
		assert.equal(displayValue(value[0]), value[1]);
	});

	it(`should return { "x": ${value[1]} }`, () => {
		assert.equal(displayValue({ x: value[0] }), '{ "x": ' + value[1] + ' }');
	});

	it(`should return [${value[1]}]`, () => {
		assert.equal(displayValue([value[0]]), '[' + value[1] + ']');
	});

	it(`should return [{ "x": ${value[1]} }, ${value[1]}]`, () => {
		assert.equal(displayValue([{ x: value[0] },
			value[0]]), '[{ "x": ' + value[1] + ' }, ' + value[1] + ']');
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
	assert.ok(displayValue(new Date('12/20/2000'))
		.indexOf('Wed Dec 20 2000 00:00:00') !== -1);
});
