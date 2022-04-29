import { useApolloClient } from '@apollo/client';
import { FC } from 'react';
import { sendReport } from '../../api/slack';
import { tagManagerPush } from '../../utils/matomo';
import { Button } from '../Button';
import { ConsentConfiguration } from '../ConsentConfiguration';
import { ContentConstraint } from '../ContentConstraint';
import { Heading } from '../Heading';

export const Settings: FC = () => {
	const client = useApolloClient();

	return (
		<div className="bg-black text-white border-t border-b border-gray-800 py-2">
			<ContentConstraint>
				<Heading level="2" className="mb-8">
					Datenschutz
				</Heading>
				<div className="bg-white text-black inline-block p-8 rounded-xl w-full md:w-1/2 xl:w-1/3">
					<ConsentConfiguration
						handleConsented={() => {
							// TODO: Show notification?
							tagManagerPush({
								event: 'updateConsents',
								source: 'settings',
							});
						}}
					/>
				</div>
			</ContentConstraint>
			<ContentConstraint>
				<Heading level="2" className="mb-8">
					Experimentell
				</Heading>
				<Button
					isDisabled={!client || !client.cache}
					type="danger"
					onClick={() => {
						if (client && client.cache) {
							client.resetStore();

							tagManagerPush({
								event: 'resetCacheStore',
							});

							window.location.reload();
						}
					}}
				>
					Cache löschen &amp; neu laden
				</Button>
			</ContentConstraint>
		</div>
	);
};

Settings.displayName = 'Settings';
