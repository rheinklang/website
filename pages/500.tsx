import type { NextPage } from 'next';
import { ErrorPage } from '../components/ErrorPage';

const Error500: NextPage = () => (
	<ErrorPage
		isRetryable
		statusCode={500}
		title="Ups, da ist etwas schief gelaufen"
		message="Bitte versuche es später noch einmal oder wende dich direkt an unser Team."
	/>
);

Error500.displayName = 'Error500';

export default Error500;
