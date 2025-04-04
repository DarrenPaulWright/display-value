/* eslint  max-classes-per-file:off */
import blns from 'blns';
import { assert, it, when } from 'hippogriff';
import displayValue from './index.js';
import { allTypes } from './src/test.helper.js';

when('displayValue', () => {
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
});

when('naughtyStrings', () => {
	blns.forEach((naughtyString) => {
		it(`should return ${ naughtyString }`, () => {
			assert.is(
				displayValue(naughtyString),
				`"${ naughtyString.replaceAll('"', '\\"') }"`
			);
		});
	});
});
