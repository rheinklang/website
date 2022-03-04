import { client, PartnerLevel, PartnerOverviewDocument, PartnerOverviewQuery } from '../graphql';
import { nonNullish } from '../utils/filter';

export const getPartners = async () => {
	const result = await client.query<PartnerOverviewQuery>({
		query: PartnerOverviewDocument,
	});

	console.log(result);

	return result.data.partnersCollection.filter(nonNullish);
};

const sortPartners = (partners: Awaited<ReturnType<typeof getPartners>>) => {
	return partners.sort((a, b) => (a.since < b.since ? 1 : -1));
};

export const getLevelClusteredPartners = async () => {
	const partners = await getPartners();
	const sortedPartners = sortPartners(partners);

	return {
		[PartnerLevel.Bronze]: sortedPartners.filter((p) => p.level === PartnerLevel.Bronze),
		[PartnerLevel.Silver]: sortedPartners.filter((p) => p.level === PartnerLevel.Silver),
		[PartnerLevel.Gold]: sortedPartners.filter((p) => p.level === PartnerLevel.Gold),
		[PartnerLevel.Platinum]: sortedPartners.filter((p) => p.level === PartnerLevel.Platinum),
		[PartnerLevel.Diamond]: sortedPartners.filter((p) => p.level === PartnerLevel.Diamond),
	};
};