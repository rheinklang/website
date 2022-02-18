import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContentContainer } from '../components/ContentContainer';
import { HttpError } from '../components/HttpError';

const Error404: NextPage = () => {
	return (
		<div className="bg-black text-white border-t-gray-800 border-b-gray-800 border-t-2 border-b-2">
			<ContentContainer>
				<HttpError
					statusCode={404}
					title="Ups, diese Seite wurde nicht gefunden"
					message="Bist du dir sicher dass eine Seite unter dieser URL existiert?"
				/>
			</ContentContainer>
		</div>
	);
};

Error404.displayName = 'Error404';

export default Error404;
