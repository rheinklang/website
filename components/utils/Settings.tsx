import { useApolloClient } from '@apollo/client';
import { FC } from 'react';
import { Button } from '../Button';
import { ConsentConfiguration } from '../ConsentConfiguration';
import { ContentConstraint } from '../ContentConstraint';
import { Heading } from '../Heading';
import posthog from 'posthog-js';

export const Settings: FC = () => {
	const client = useApolloClient();

	return (
		<div className="py-2 text-white bg-black border-t border-b border-gray-800">
			<ContentConstraint>
				<Heading level="2" className="mb-8">
					Datenschutz
				</Heading>
				<div className="inline-block w-full p-8 text-black bg-white rounded-xl md:w-1/2 xl:w-1/3">
					<ConsentConfiguration
						handleConsented={() => {
							// TODO: Show notification?
							posthog.capture('Update Consent', {
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

							posthog.capture('Reset Cache Store');

							window.location.reload();
						}
					}}
				>
					Cache löschen &amp; neu laden
				</Button>
			</ContentConstraint>
			{process.env.NEXT_PUBLIC_ENABLE_STAGING_INDICATOR && (
				<ContentConstraint>
					<Heading level="2" className="mb-8">
						Metainformationen zur Fehlerbehebung
					</Heading>
					<div className="leading-6">
						<p className="mb-3">
							<strong className="inline-block w-40 font-bold">Build ID:</strong>
							<code className="p-1 text-sm text-gray-300 align-middle border rounded-sm bg-gray-400/10 border-gray-400/20">
								{process.env.CONFIG_BUILD_ID}
							</code>
						</p>
					</div>
				</ContentConstraint>
			)}
		</div>
	);
};

Settings.displayName = 'Settings';
