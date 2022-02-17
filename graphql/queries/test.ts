import { gql } from 'graphql-request';

export const TEST_QUERY = gql`
	query MyQuery {
		ethereum(network: ethereum) {
			blocks {
				count
			}
		}
	}
`;
