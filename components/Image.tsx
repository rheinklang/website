import classNames from 'classnames';
import { FC, useMemo } from 'react';

export type ImageFilter = 'blur' | 'sharpen' | 'sketch' | 'emboss' | 'invert';

export type ImageMask = 'crop' | 'thumbnail';

export interface ImageProps {
	src: string;
	alt: string;
	width?: string;
	height?: string;
	quality?: number;
	mask?: ImageMask;
	filters?: ImageFilter[];
	useBase64?: boolean;
	className?: string;
}

export const COCKPIT_IMAGER_URL = `${process.env.NEXT_PUBLIC_CMS_REST_API_URL}/cockpit/image`;

const getCockpitImagerParams = (
	props: Pick<ImageProps, 'width' | 'height' | 'filters' | 'mask' | 'quality' | 'useBase64'>
) => {
	const params = new URLSearchParams();

	if (props.width) {
		params.set('w', props.width);
	}

	if (props.height) {
		params.set('h', props.height);
	}

	if (props.filters) {
		params.set('f', props.filters.join(','));
	}

	if (props.mask) {
		params.set('m', props.mask);
	}

	if (props.quality) {
		params.set('q', props.quality.toString());
	}

	if (props.useBase64) {
		params.set('b64', 'true');
	}

	return params;
};

export const Image: FC<ImageProps> = ({ src, alt, className, width, height, quality, useBase64, filters, mask }) => {
	const imagerParams = useMemo(
		() => getCockpitImagerParams({ width, height, filters, mask, quality, useBase64 }),
		[width, height, filters, mask, quality, useBase64]
	);

	const url = useMemo(
		() =>
			`${COCKPIT_IMAGER_URL}?${imagerParams.toString()}&src=${src}=&token=${
				process.env.NEXT_PUBLIC_CMS_API_TOKEN
			}&o=true`,
		[src, imagerParams]
	);

	if (width) {
	}

	// eslint-disable-next-line @next/next/no-img-element
	return <img className={classNames('block', className)} src={url} alt={alt} />;
};
