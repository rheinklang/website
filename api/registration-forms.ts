import {
	client,
	GetAllRegistrationFormSlugsDocument,
	GetAllRegistrationFormSlugsQuery,
	GetRegistrationFormUniqueDocument,
	GetRegistrationFormUniqueQuery,
	GetRegistrationFormVerificationCodeForIdQuery,
} from '../graphql';
import { nonNullish } from '../utils/filter';

export const getRegistrationFormSlugs = async () => {
	const results = await client.query<GetAllRegistrationFormSlugsQuery>({
		query: GetAllRegistrationFormSlugsDocument,
	});

	if (!results.data) {
		return [];
	}

	return results.data.registrationFormsCollection
		.filter(nonNullish)
		.map((entry) => entry.slug_slug)
		.filter(nonNullish);
};

export const getRegistrationFormDataBySlug = async (slug: string) => {
	const results = await client.query<GetRegistrationFormUniqueQuery>({
		query: GetRegistrationFormUniqueDocument,
		variables: {
			filter: {
				slug_slug: slug,
			},
		},
	});

	return results.data.registrationFormsCollection.filter(nonNullish)[0];
};

export const getRegistrationVerificationCodeById = async (id: string) => {
	const results = await client.query<GetRegistrationFormVerificationCodeForIdQuery>({
		query: GetRegistrationFormUniqueDocument,
		variables: {
			filter: {
				_id: id,
			},
		},
	});
};
