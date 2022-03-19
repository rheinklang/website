import { FC } from 'react';
import { StaticExternalUrls } from '../../utils/routes';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ContentConstraint } from '../ContentConstraint';
import { Heading } from '../Heading';

export interface MaintenancePageProps {
	title?: string | null;
	description?: string | null;
}

export const MaintenancePage: FC<MaintenancePageProps> = ({ title, description }) => (
	<div className="bg-black text-white min-h-screen">
		<ContentConstraint useCustomYSpace className="min-h-screen flex items-center content-center justify-center">
			<div className="text-center max-w-xl">
				<Heading level="1" className="mb-2">
					{title || 'Aktuell finden Wartungsarbeiten statt'}
				</Heading>
				<p className="text-lg lg:text-xl mb-8">{description || 'Bitte versuche es später nochmals'}</p>
				<ButtonGroup>
					<Button link={{ href: StaticExternalUrls.FACEBOOK }}>Facebook</Button>
					<Button link={{ href: StaticExternalUrls.INSTAGRAM }}>Instagram</Button>
				</ButtonGroup>
			</div>
		</ContentConstraint>
	</div>
);

MaintenancePage.displayName = 'MaintenancePage';
