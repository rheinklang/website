import {
	client,
	SeoDefaultValuesDocument,
	SeoDefaultValuesQuery,
	SeoMetaDataDocument,
	SeoMetaDataQuery,
	SeoWithFilterDocument,
	SeoWithFilterQuery,
} from '../graphql';
import { nonNullish } from '../utils/filter';
import { compileStringTemplate } from '../utils/templating';

export const getDefaultSeo = async () => {
	const result = await client.query<SeoDefaultValuesQuery>({
		query: SeoDefaultValuesDocument,
	});

	return result.data.seoCollection.filter(nonNullish)[0];
};

export const getSeoForPageId = async (pageId: string) => {
	const result = await client.query<SeoWithFilterQuery>({
		query: SeoWithFilterDocument,
		variables: {
			filter: { id: pageId },
		},
	});

	return result.data.seoCollection.filter(nonNullish)[0];
};

export interface SeoMetaData {
	title: string;
	description: string;
	keywords: string;
	image: {
		path?: string | null;
		title?: string | null;
	};
	author: string;
	crawler: string | null;
}

// THIS IS THE FINAL IMPL!
export const getSeoMetaData = async (
	pageId: string,
	variables: Record<string, string> = {},
	translations: Record<string, string> = {}
): Promise<SeoMetaData> => {
	const result = await client.query<SeoMetaDataQuery>({
		query: SeoMetaDataDocument,
		variables: {
			filter: { id: pageId },
		},
	});

	const templateCompilerVariables = {
		...variables,
	};

	for (const variable in templateCompilerVariables) {
		// we support i18n keys directly, so we need to replace the i18n keys with the corresponding label
		if (templateCompilerVariables[variable].startsWith('translate:')) {
			const [, translationKey] = templateCompilerVariables[variable].split(':');
			templateCompilerVariables[variable] = translations[translationKey];

			if (!translations[translationKey]) {
				console.warn(
					`Could not replace translation key "${translationKey}" while aggregating SEO meta data for page "${pageId}"`
				);
				templateCompilerVariables[variable] = '';
			}
		}
	}

	const defaults = result.data.defaults[0];
	const specific = result.data.specific[0] || ({} as typeof defaults);

	const data: SeoMetaData = {
		title: specific?.title || defaults?.title || '',
		description: specific?.description || defaults?.description || '',
		image: {
			path: specific?.image?.path || defaults?.image?.path || '',
			title: specific?.image?.title || defaults?.image?.title || '',
		},
		crawler: specific?.crawler || defaults?.crawler || null,
		author: specific?.author || defaults?.author || 'Verein Rheinklang',
		keywords: [...(specific?.keywords || []), ...(defaults?.keywords || [])]
			.filter(nonNullish)
			.filter((v, i, a) => a.indexOf(v) === i)
			.join(', '),
	};

	return {
		...data,
		title: compileStringTemplate(data.title, templateCompilerVariables),
		description: compileStringTemplate(data.description, templateCompilerVariables),
		keywords: compileStringTemplate(data.keywords, templateCompilerVariables),
	};
};
