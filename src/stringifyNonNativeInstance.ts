const stringifyNonNativeInstance = (value: unknown): string => {
	if (value?.toString) {
		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		const string = value.toString();

		if (string !== '[object Object]') {
			return string;
		}
	}

	return `[object ${ value?.constructor.name }]`;
};

export default stringifyNonNativeInstance;
