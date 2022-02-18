import type { NextPage } from 'next';
import { ContentContainer } from '../components/ContentContainer';

const Error500: NextPage = () => {
	return (
		<ContentContainer>
			<h1>Etwas ist schiefgelaufen</h1>
			<p>Bitte versuche es später erneut oder wende dich an unser Team.</p>
			<button>Erneut versuchen</button>
			<button>Zur Startseite</button>
		</ContentContainer>
	);
};

Error500.displayName = 'Error500';

export default Error500;
