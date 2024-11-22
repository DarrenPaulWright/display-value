import stringifyIndent from './stringifyIndent.js';
import type { IInternalSettings } from './types.js';

interface IFormatSettings {
	head: string;
	foot: string;
	pad: boolean;
	compact: boolean;
}

const formatObject = (
	mapped: Array<string>,
	prefix: string,
	indent: number,
	{ head, foot, pad, compact }: IFormatSettings,
	settings: IInternalSettings
): string => {
	if (mapped.length === 0) {
		return `${ prefix }${ head }${ foot }`;
	}

	if (settings.beautify) {
		const indented = compact ? '' : stringifyIndent(indent + 1);

		return `${
			prefix
		}${
			head
		}${
			indented
		}${
			mapped.join(`${ settings.separator }${ compact ? settings.space : indented }`)
		}${
			compact ? '' : stringifyIndent(indent)
		}${
			foot
		}`;
	}

	const padding = pad ? ' ' : '';

	return `${
		prefix
	}${
		head
	}${
		padding
	}${
		mapped.join(settings.separator)
	}${
		padding
	}${
		foot
	}`;
};

export default formatObject;
