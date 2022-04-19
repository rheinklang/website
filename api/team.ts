import {
	FullTeamMembersDocument,
	FullTeamMembersQuery,
	client,
	SingleMemberPortraitQuery,
	SingleMemberPortraitDocument,
	MemberPortraitSlugsQuery,
	MemberPortraitSlugsDocument,
} from '../graphql';
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

export const getTeamMemberPortraitSlugs = async () => {
	const result = await client.query<MemberPortraitSlugsQuery>({
		query: MemberPortraitSlugsDocument,
	});

	return result.data.teamMembersCollection.filter(nonNullish).map((member) => member.slug);
};

export const getTeamMemberPortrait = async (slug: string) => {
	const result = await client.query<SingleMemberPortraitQuery>({
		query: SingleMemberPortraitDocument,
		variables: {
			filter: {
				slug,
			},
		},
	});

	return result.data.teamMembersCollection.filter(nonNullish)[0];
};
