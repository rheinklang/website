import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { StaticRoutes } from '../../utils/routes';

export const getStaticProps: GetStaticProps = async () => {
	return {
		redirect: {
			destination: StaticRoutes.PORTRAIT,
			permanent: false,
		},
	};
};

const AboutUsIndexRedirector: NextPage = () => {
	const router = useRouter();

	return <ErrorBoundary route={router.asPath} />;
};

AboutUsIndexRedirector.displayName = 'AboutUsIndexRedirector';

export default AboutUsIndexRedirector;
