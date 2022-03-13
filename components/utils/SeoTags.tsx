import { FC, useMemo } from 'react';
import { nonNullish } from '../../utils/filter';
import { compileStringTemplate } from '../../utils/templating';

export interface SeoTagsProps {
	variables?: Record<string, string>;
	title?: string;
	description?: string;
	keywords?: (string | null)[];
	image?: string;
	crawler?: string;
}

export const SeoTags: FC<SeoTagsProps> = (props) => {
	const { keywords, crawler, image, variables = {} } = props;
	const title = useMemo(() => compileStringTemplate(props.title, variables), [props.title, variables]);
	const description = useMemo(
		() => compileStringTemplate(props.description, variables),
		[props.description, variables]
	);

	return (
		<>
			{title && (
				<>
					<title>Rheinklang - {title}</title>
					<meta key="seo-og-title" property="og:title" content={title} />
				</>
			)}
			{description && (
				<>
					<meta key="seo-description" name="description" content={description} />
					<meta key="seo-og-description" property="og:description" content={description} />
				</>
			)}
			{keywords && <meta key="seo-keywords" name="keywords" content={keywords.filter(nonNullish).join(',')} />}
			{crawler && <meta key="seo-robots" name="robots" content={crawler} />}
			{image && <meta key="seo-og-image" property="og:image" content={image} />}
		</>
	);
};
