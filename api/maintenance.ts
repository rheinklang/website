import { client, CurrentMaintenanceInfoDocument, CurrentMaintenanceInfoQuery } from '../graphql';

export const getCurrentMaintenance = async () => {
	const result = await client.query<CurrentMaintenanceInfoQuery>({
		query: CurrentMaintenanceInfoDocument,
	});

	return result.data.maintenanceConfigurationSingleton;
};
