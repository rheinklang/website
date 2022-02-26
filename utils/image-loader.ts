import type { ImageLoader } from 'next/image';

/**
 * Image loader to return the raw source without optimizations for eg. static assets
 */
export const rawImageLoader: ImageLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality}`;

/**
 * Next.js image loader for Cockpit CMS image ressources
 */
export const cockpitImageLoader: ImageLoader = ({ src, width, quality }) => {
	return `${process.env.NEXT_PUBLIC_CMS_REST_API_URL}/cockpit/image?src=${src}&w=${width}&q=${quality}&token=${process.env.NEXT_PUBLIC_CMS_API_TOKEN}&o=true`;
};
