import { ActiveSponsorsListDocument, ActiveSponsorsListQuery, client } from '../graphql';
import { nonNullish } from '../utils/filter';

export const getCurrentActiveSponsors = async () => {
	const result = await client.query<ActiveSponsorsListQuery>({
		query: ActiveSponsorsListDocument,
	});

	return result.data.partnersCollection.filter(nonNullish);
};
