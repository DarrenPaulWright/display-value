import stringifyIndent from './stringifyIndent.js';
import type { IInternalSettings } from './types.js';

interface IFormatSettings {
	head: string;
	foot: string;
	pad: boolean;
	compact: boolean;
}

const isShortEnough = (
	mapped: Array<string>,
	prefix: string,
	indent: number,
	{ head, foot, pad }: IFormatSettings,
	settings: IInternalSettings
): boolean => {
	const separatorLength = settings.separator.length;
	let output = true;
	let total = head.length + foot.length + prefix.length + (pad ? 2 : 0) + (indent * 4);

	for (let index = 0; index < mapped.length; index++) {
		total += mapped[index].length;

		if (index !== mapped.length - 1) {
			total += separatorLength;
		}

		if (total > settings.maxCharsPerLine) {
			output = false;
			break;
		}
	}

	return output;
};

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
		if (
			settings.maxCharsPerLine &&
			isShortEnough(mapped, prefix, indent, { head, foot, pad, compact }, settings)
		) {
			return formatObject(
				mapped,
				prefix,
				indent,
				{ head, foot, pad, compact },
				{
					...settings,
					beautify: false
				}
			);
		}

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
