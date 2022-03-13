import classNames from 'classnames';
import { FC, useMemo } from 'react';
import {
	Breakpoint,
	BREAKPOINTS,
	CockpitImagerOptions,
	COCKPIT_IMAGER_URL,
	EMPTY_PLACEHOLDER_IMAGE,
	getCockpitImagerParams,
} from '../utils/images';
import '../utils/lazysizes';

export type ImageFilter = 'blur' | 'sharpen' | 'sketch' | 'emboss' | 'invert';

export type ImageMask = 'crop' | 'thumbnail';

export interface ImageProps {
	src: string;
	alt: string;
	preset?: ImageSourceProps['preset'];
	options?: CockpitImagerOptions;
	className?: string;
}

interface ImageSourceProps {
	src: ImageProps['src'];
	preset?: 'full' | 'teaser' | 'thumbnail';
	options?: ImageProps['options'];
	breakpoint?: Breakpoint;
}

const ImageSource: FC<ImageSourceProps> = ({ src, breakpoint, preset = 'teaser', options = {} }) => {
	const mediaQuery = useMemo(
		() => (breakpoint ? `(min-width: ${breakpoint}px)` : `(max-width: ${Breakpoint.sm - 1}px)`),
		[breakpoint]
	);

	const mimeType = useMemo(() => {
		if (src.endsWith('jpg') || src.endsWith('jpeg')) {
			return 'image/jpeg';
		}

		if (src.endsWith('png')) {
			return 'image/png';
		}

		if (src.endsWith('gif')) {
			return 'image/gif';
		}

		if (src.endsWith('webp')) {
			return 'image/webp';
		}
	}, [src]);

	const correspondingSize = useMemo(() => {
		if (!breakpoint) {
			// mobile image size if breakpoint is undefined
			return Breakpoint.sm;
		}

		// calculate the next best image size based on the next maximum viewport and source image size
		const nextHigherBreakpointScale = BREAKPOINTS[BREAKPOINTS.indexOf(breakpoint) + 1];

		// 1920px is max size for images
		return nextHigherBreakpointScale || 1920;
	}, [breakpoint]);

	const size = useMemo(() => {
		switch (preset) {
			case 'full':
				return correspondingSize;
			case 'teaser':
				return Math.round(correspondingSize / 3);
			case 'thumbnail':
				return Math.round(correspondingSize / 18);
			default:
				return Math.round(correspondingSize / 2);
		}
	}, [preset, correspondingSize]);

	const defaultParams = useMemo(() => getCockpitImagerParams(src, { ...options, width: size }), [src, options, size]);

	const retinaParams = useMemo(
		() => getCockpitImagerParams(src, { ...options, width: Math.round(size * 1.8) }),
		[src, options, size]
	);

	return (
		<source
			type={mimeType}
			media={mediaQuery}
			data-breakpoint={`${breakpoint}`}
			data-base-size={`${size}`}
			data-srcset={`${COCKPIT_IMAGER_URL}?${defaultParams.toString()} 1x, ${COCKPIT_IMAGER_URL}?${retinaParams.toString()} 2x`}
		/>
	);
};

export const Image: FC<ImageProps> = ({ src, alt, preset, className, options }) => {
	const fallbackParams = useMemo(
		() =>
			getCockpitImagerParams(src || '', {
				...options,
				width: Breakpoint.xxl,
			}),
		[src, options]
	);

	if (!src) {
		return null;
	}

	return (
		<picture data-preset={preset}>
			<ImageSource preset={preset} src={src} options={options} breakpoint={Breakpoint.xxl} />
			<ImageSource preset={preset} src={src} options={options} breakpoint={Breakpoint.xl} />
			<ImageSource preset={preset} src={src} options={options} breakpoint={Breakpoint.lg} />
			<ImageSource preset={preset} src={src} options={options} breakpoint={Breakpoint.md} />
			<ImageSource preset={preset} src={src} options={options} breakpoint={Breakpoint.sm} />
			<ImageSource preset={preset} src={src} options={options} />
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				data-sizes="auto"
				className={classNames('lazyload', className)}
				src={EMPTY_PLACEHOLDER_IMAGE}
				data-src={`${COCKPIT_IMAGER_URL}?${fallbackParams.toString()}`}
				alt={alt}
			/>
		</picture>
	);
};
