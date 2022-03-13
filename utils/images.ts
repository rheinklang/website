import { memoize } from './memoize';

/**
 * @see @see https://tailwindcss.com/docs/responsive-design
 */
export enum Breakpoint {
	sm = 640,
	md = 768,
	lg = 1024,
	xl = 1280,
	xxl = 1536,
}

export type CockpitImagerFilter = 'blur' | 'sharpen' | 'sketch' | 'emboss' | 'invert';

export type CockpitImagerMask = 'crop' | 'thumbnail';

export interface CockpitImagerOptions {
	width?: number;
	height?: number;
	quality?: number;
	mode?: 'resize' | 'thumbnail' | 'crop' | 'fitToWidth' | 'fitToHeight';
	mask?: CockpitImagerMask;
	filters?: CockpitImagerFilter[];
	useBase64?: boolean;
	className?: string;
	output?: 0 | 1;
}

export const EMPTY_PLACEHOLDER_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

export const COCKPIT_IMAGER_URL = `${process.env.NEXT_PUBLIC_CMS_REST_API_URL}/cockpit/image`;

export const BREAKPOINTS = [Breakpoint.sm, Breakpoint.md, Breakpoint.lg, Breakpoint.xl, Breakpoint.xxl];

const DEFAULT_QUALITY = 90;

const DEFAULT_OUTPUT = 1;

export const getCockpitImagerParams = memoize((source: string, options: CockpitImagerOptions = {}) => {
	const src = source.startsWith('/storage/uploads/') ? source : `/storage/uploads${source}`;
	const params = new URLSearchParams();

	params.set('src', src);
	params.set('o', `${DEFAULT_OUTPUT}`);
	params.set('token', `${process.env.NEXT_PUBLIC_CMS_API_TOKEN}`);

	if (options.width) {
		params.set('w', `${options.width}`);
	}

	if (options.height) {
		params.set('h', `${options.height}`);
	}

	if (options.filters) {
		params.set('f', options.filters.join(','));
	}

	if (options.mask) {
		params.set('m', options.mask);
	}

	if (options.quality) {
		params.set('q', `${options.quality}`);
	} else {
		params.set('q', `${DEFAULT_QUALITY}`);
	}

	if (options.useBase64) {
		params.set('b64', 'true');
	}

	if (options.mode) {
		params.set('m', options.mode);
	} else {
		params.set('m', 'fitToWidth');
	}

	return params;
});
