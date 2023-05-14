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

const EXCERPT_SIZE_LIMIT = 100;
const EXCERPT_WORD_LIMIT_ON_CUT = 12;

export const getTeamMembersList = async () => {
	const result = await client.query<FullTeamMembersQuery>({
		query: FullTeamMembersDocument,
	});

	return result.data.teamMembersCollection
		.filter(nonNullish)
		.sort((a, b) => a.fullName.localeCompare(b.fullName))
		.sort((a, b) => (a.isFounder && !b.isFounder ? -1 : 1))
		.sort((a, b) => (a.isActive && !b.isActive ? -1 : 1))
		.map((entry) => ({
			...entry,
			bio:
				entry.bio && entry.bio.length > EXCERPT_SIZE_LIMIT
					? entry.bio.split(' ').slice(0, EXCERPT_WORD_LIMIT_ON_CUT).join(' ') + ' ...'
					: entry.bio,
		}));
};

export const getTeamMemberPortraitSlugs = async () => {
	const result = await client.query<MemberPortraitSlugsQuery>({
		query: MemberPortraitSlugsDocument,
	});

	return result.data.teamMembersCollection.filter(nonNullish).map((member) => member.slug_slug);
};

export const getTeamMemberPortrait = async (slug: string) => {
	const result = await client.query<SingleMemberPortraitQuery>({
		query: SingleMemberPortraitDocument,
		variables: {
			filter: {
				slug_slug: slug,
			},
		},
	});

	return result.data.teamMembersCollection.filter(nonNullish)[0];
};
