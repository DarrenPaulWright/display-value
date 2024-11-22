/*
eslint @typescript-eslint/no-empty-function:off,
@typescript-eslint/no-unused-vars:off,
@typescript-eslint/explicit-module-boundary-types:off,
prefer-arrow-functions/prefer-arrow-functions:off,
@typescript-eslint/no-wrapper-object-types:off,
@typescript-eslint/no-unsafe-function-type:off,
@typescript-eslint/ban-ts-comment:off,
unicorn/new-for-builtins:off,
func-style:off,
max-classes-per-file:off
*/
import jsdom from 'jsdom';

const dom = new jsdom.JSDOM('<!DOCTYPE html><div style="height: 32px; width: 64px;">Hello world</div>');
const div = dom.window.document.querySelector('div');

type TestData<Type> = [Type, string, string?, string?, string?];

export const nullishTypes: Array<TestData<null | undefined | typeof NaN>> = [
	[undefined, 'undefined'],
	[null, 'null'],
	[NaN, 'NaN']
];

export const numberTypes: Array<TestData<number | Number>> = [
	[-0, '-0'],
	[+0, '0'],
	[13, '13'],
	[1300, '1,300'],
	// eslint-disable-next-line no-loss-of-precision
	[1.1234567890123456789, '1.1234567890123457'],
	[new Number(14), '14'],
	[Infinity, 'Infinity'],
	[-Infinity, '-Infinity']
];

export const bigIntTypes: Array<TestData<bigint>> = [
	[3n, '3n'],
	[-0n, '-0n'],
	[1300n, '1,300n']
];

export const stringTypes: Array<TestData<string | String>> = [
	['test', '"test"', '"test"', '"test"', '\'test\''],
	[
		'apple \'quote\' banana',
		'"apple \'quote\' banana"',
		'"apple \'quote\' banana"',
		'"apple \'quote\' banana"',
		'\'apple \\\'quote\\\' banana\''
	],
	[new String('test2'), '"test2"']
];

export const regExpTypes: Array<TestData<RegExp>> = [
	[/a/g, '/a/g']
];

export const arrayTypes: Array<TestData<Array<unknown>>> = [
	[[], '[]', '[]'],
	[[1, 2], '[1, 2]', '[\n    1,\n    2\n]'],
	[
		[{ x: 1 }, { y: [{ z: 2 }, { z: 'qwerty' }] }],
		'[{ "x": 1 }, { "y": [{ "z": 2 }, { "z": "qwerty" }] }]',
		'[{\n    "x": 1\n}, {\n    "y": [{\n        "z": 2\n    }, {\n        "z": "qwerty"\n    }]\n}]',
		'[{\n    x: 1\n}, {\n    y: [{\n        z: 2\n    }, {\n        z: "qwerty"\n    }]\n}]',
		'[{\n    x: 1\n}, {\n    y: [{\n        z: 2\n    }, {\n        z: \'qwerty\'\n    }]\n}]'
	]
];

export const objectTypes: Array<TestData<object>> = [
	[{}, '{}', '{}'],
	[{ x: 1 }, '{ "x": 1 }', '{\n    "x": 1\n}'],
	[
		{ 'x 3': 'something' },
		'{ "x 3": "something" }',
		'{\n    "x 3": "something"\n}',
		'{\n    "x 3": "something"\n}',
		'{\n    \'x 3\': \'something\'\n}'
	],
	[
		div!.getBoundingClientRect(),
		'{ "x": 0, "y": 0, "bottom": 0, "height": 0, "left": 0, "right": 0, "top": 0, "width": 0 }',
		'{\n    "x": 0,\n    "y": 0,\n    "bottom": 0,\n    "height": 0,\n    "left": 0,\n    "right": 0,\n    "top": 0,\n    "width": 0\n}'
	]
];

const emptyArrowFunction = (): void => {
};

// @ts-expect-error
const paramsArrowFunction = (param1: unknown, param2: unknown): void => {
};

const emptyUnnamedFunction = function(): void {
};

// @ts-expect-error
const paramsUnnamedFunction = function(apples: unknown, oranges: unknown): void {
};

function emptyNamedFunction(): void {
}

// @ts-expect-error
function paramsNamedFunction(apples: unknown, oranges: unknown): void {
}

export const functionTypes: Array<TestData<Function>> = [
	[emptyArrowFunction, '() => {…}'],
	[paramsArrowFunction, '(param1, param2) => {…}'],
	[emptyUnnamedFunction, 'ƒ () {…}'],
	[paramsUnnamedFunction, 'ƒ (apples, oranges) {…}'],
	[emptyNamedFunction, 'ƒ emptyNamedFunction() {…}'],
	[paramsNamedFunction, 'ƒ paramsNamedFunction(apples, oranges) {…}']
];

const argList = (function(): IArguments {
	// eslint-disable-next-line prefer-rest-params
	return arguments;

// @ts-expect-error
})(3, 4);

export const argumentsTypes: Array<TestData<IArguments>> = [
	[argList, 'Arguments [3, 4]', 'Arguments [\n    3,\n    4\n]']
];

class Foo {}

class Bar {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/class-methods-use-this
	toString() {
		return 'toString value';
	}
}

export const otherTypes: Array<TestData<unknown>> = [
	[new Foo(), '[object Foo]'],
	[new Bar(), 'toString value'],
	[String, 'String'],
	[Symbol('test'), 'Symbol(test)'],
	[
		new Set([1, 2, 3]),
		'Set [1, 2, 3]',
		'Set [\n    1,\n    2,\n    3\n]'
	],
	[
		new Map([[1, 'decaf']]),
		'Map { 1: "decaf" }',
		'Map {\n    1: "decaf"\n}',
		'Map {\n    1: "decaf"\n}'
	],
	[
		new Map([[{ x: 3, y: 4 }, 'decaf']]),
		'Map { { x: 3, y: 4 }: "decaf" }',
		'Map {\n    {\n        x: 3,\n        y: 4\n    }: "decaf"\n}',
		'Map {\n    {\n        x: 3,\n        y: 4\n    }: "decaf"\n}'
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
];

export const allTypes: Array<TestData<unknown>> = [
	...nullishTypes,
	...numberTypes,
	...bigIntTypes,
	...stringTypes,
	...regExpTypes,
	...arrayTypes,
	...objectTypes,
	...functionTypes,
	...argumentsTypes,
	...otherTypes
];

export const testDataDifference = (
	array1: Array<TestData<unknown>>,
	...args: Array<Array<TestData<unknown>>>
): Array<TestData<unknown>> => {
	const diffArrays = args.flat(1);

	return array1.filter((item) => !diffArrays.includes(item));
};
