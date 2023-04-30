import { FC, useMemo } from 'react';
import type { Event, Person, Patient, Place, Article, NewsArticle, WithContext } from 'schema-dts';

type SupportSchemas =
	| Event
	| Exclude<Person, 'string' | Patient>
	| Exclude<Place, 'string'>
	| Exclude<Article, 'string'>
	| Exclude<NewsArticle, 'string'>;

export interface JsonLdProps {
	schema: SupportSchemas;
}

function replacer(_key: string, value: any) {
	if (typeof value === 'string' || typeof value === 'number') {
		return value;
	}

	// strip other values
	return undefined;
}

export const JsonLd: FC<JsonLdProps> = ({ schema }) => {
	const schemaWithContext: WithContext<SupportSchemas> = useMemo(() => {
		if (typeof schema === 'string') {
			throw new Error('Schema strings are not supported');
		}

		return {
			'@context': 'https://schema.org',
			...schema,
		};
	}, [schema]);

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWithContext, null, 2) }}
		/>
	);
};

JsonLd.displayName = 'JSON+LD';
