/* eslint  max-classes-per-file:off */
import blns from 'blns';
import { assert, describe, it } from 'hippogriff';
import displayValue from './index.js';
import { allTypes } from './src/test.helper.js';

describe('displayValue', () => {
	allTypes.forEach((value) => {
		it(`should return ${ value[1] }`, () => {
			assert.is(
				displayValue(value[0]),
				value[1]
			);
		});

		it(`should return { "x": ${ value[1] } }`, () => {
			assert.is(
				displayValue({ x: value[0] }),
				`{ "x": ${ value[1] } }`
			);
		});

		it(`should return [${ value[1] }]`, () => {
			assert.is(
				displayValue([value[0]]),
				`[${ value[1] }]`
			);
		});

		it(`should return [{ "x": ${ value[1] } }, ${ value[1] }]`, () => {
			assert.is(
				displayValue([{ x: value[0] }, value[0]]),
				`[{ "x": ${ value[1] } }, ${ value[1] }]`
			);
		});

		it(`should return a beautified ${ value[1] }`, () => {
			assert.is(
				displayValue(value[0], { beautify: true }),
				value[2] ?? value[1]
			);
		});

		if (value[3]) {
			it(`should return a beautified ${ value[1] } without key quotes`, () => {
				assert.is(
					displayValue(value[0], {
						beautify: true,
						preferJson: false
					}),
					value[3]
				);
			});
		}

		if (value[4]) {
			it(`should return a beautified ${ value[1] } with single quotes`, () => {
				assert.is(
					displayValue(value[0], {
						beautify: true,
						preferJson: false,
						preferSingleQuote: true
					}),
					value[4]
				);
			});
		}
	});

	it('should return a date string', () => {
		assert.is(
			displayValue(new Date('12/20/2000')).includes('Wed Dec 20 2000 00:00:00'),
			true
		);
	});

	it('should render an object on one line if within maxCharsPerLine', () => {
		const input = { x: 'something' };
		const expected = '{ "x": "something" }';

		assert.is(
			displayValue(input, {
				beautify: true,
				maxCharsPerLine: 20
			}),
			expected
		);
	});

	it('should render nested objects on one line if within maxCharsPerLine', () => {
		const input = { x: { y: 'apples' }, z: { y: 'oranges' } };
		const expected = '{\n    "x": { "y": "apples" },\n    "z": { "y": "oranges" }\n}';

		assert.is(
			displayValue(input, {
				beautify: true,
				maxCharsPerLine: 30
			}),
			expected
		);
	});

	it('should render an array on one line if within maxCharsPerLine', () => {
		const input = ['apples', 'bananas'];
		const expected = '["apples","bananas"]';

		assert.is(
			displayValue(input, {
				beautify: true,
				maxCharsPerLine: 30
			}),
			expected
		);
	});

	it('should sort keys', () => {
		const input = {
			x: {
				c: 'apples',
				b: 'kiwi',
				a: 'banana'
			},
			z: {
				b: 'oranges',
				c: 'potato'
			},
			y: {
				y: 'oranges'
			}
		};

		const expected = '{ "x": { "a": "banana", "b": "kiwi", "c": "apples" }, "y": { "y": "oranges" }, "z": { "b": "oranges", "c": "potato" } }';

		assert.is(
			displayValue(input, {
				sortKeys: true
			}),
			expected
		);
	});

	it('should sort keys and beautify', () => {
		const input = {
			x: {
				c: 'apples',
				b: 'kiwi',
				a: 'banana'
			},
			z: {
				b: 'oranges',
				c: 'potato'
			},
			y: {
				y: 'oranges'
			}
		};

		const expected = `{
    "x": {
        "a": "banana",
        "b": "kiwi",
        "c": "apples"
    },
    "y": {
        "y": "oranges"
    },
    "z": {
        "b": "oranges",
        "c": "potato"
    }
}`;

		assert.is(
			expected,
			displayValue(input, {
				beautify: true,
				sortKeys: true
			})
		);
	});

	it('should handle objects with methods', () => {
		const input = {
			a: {
				b: {
					x: (value: string): string => {
						return value;
					},
					z: (value: string, value2: string): string => {
						return value + value2;
					},
					y: (value: string): string => {
						return value;
					}
				}
			}
		};

		const expected = `{
    "a": {
        "b": {
            "x": (value) => {…},
            "z": (value, value2) => {…},
            "y": (value) => {…}
        }
    }
}`;

		assert.is(
			expected,
			displayValue(input, {
				beautify: true,
				maxCharsPerLine: 20
			})
		);
	});
});

describe('naughtyStrings', () => {
	blns.forEach((naughtyString) => {
		it(`should return ${ naughtyString }`, () => {
			assert.is(
				displayValue(naughtyString),
				`"${ naughtyString.replaceAll('"', '\\"') }"`
			);
		});
	});
});
