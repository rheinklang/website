import type { NextPage } from 'next';
import { ErrorPage } from '../components/ErrorPage';

const Error404: NextPage = () => (
	<ErrorPage
		statusCode={404}
		title="Ups, diese Seite wurde nicht gefunden"
		message="Bist du dir sicher dass eine Seite unter dieser URL existiert?"
	/>
);

Error404.displayName = 'Error404';

export default Error404;
