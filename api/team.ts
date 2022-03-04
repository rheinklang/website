import { FullTeamMembersDocument, FullTeamMembersQuery, client } from '../graphql';
import { nonNullish } from '../utils/filter';

export const getTeamMembersList = async () => {
	const result = await client.query<FullTeamMembersQuery>({
		query: FullTeamMembersDocument,
	});

	return result.data.teamMembersCollection
		.filter(nonNullish)
		.sort((a, b) => a.fullName.localeCompare(b.fullName))
		.sort((a, b) => (a.isFounder && !b.isFounder ? -1 : 1))
		.sort((a, b) => (a.isActive && !b.isActive ? -1 : 1));
};
