const kindOf = (value: unknown): number => {
	if (value === undefined) {
		return 3;
	}

	if (value === null) {
		return 2;
	}

	if (value !== value) { // eslint-disable-line no-self-compare
		return 1;
	}

	return typeof value === 'number' ? -1 : 0;
};

const compareKeys = (a: [unknown, unknown], b: [unknown, unknown]): number => {
	let finalA = a[0];
	let finalB = b[0];
	const kindA = kindOf(a[0]);
	const kindB = kindOf(b[0]);

	if (kindA !== kindB || kindA > 0) {
		finalA = kindA;
		finalB = kindB;
	}
	else if (typeof finalA === 'string' && typeof finalB === 'string') {
		return finalA.localeCompare(finalB, undefined, { sensitivity: 'base' });
	}

	// @ts-expect-error compare
	return (finalA < finalB && -1) || (finalA > finalB && 1) || 0;
};

export default compareKeys;
