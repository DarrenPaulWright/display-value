import { assert, it, when } from 'hippogriff';
import isArguments from './isArguments.js';
import { allTypes, argumentsTypes, testDataDifference } from './test.helper.js';

when('isArguments', () => {
	it('should return true for arguments', () => {
		assert.is(isArguments(argumentsTypes[0][0]), true);
	});

	testDataDifference(allTypes, argumentsTypes)
		.forEach((item, index) => {
			it(`should return false for a item at ${ index }`, () => {
				assert.is(isArguments(item[0]), false);
			});
		});

	it('should return false for a date', () => {
		assert.is(isArguments(new Date()), false);
	});
});
