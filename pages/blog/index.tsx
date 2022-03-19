import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { StaticRoutes } from '../../utils/routes';

export const getStaticProps: GetStaticProps = async () => {
	return {
		redirect: {
			destination: `${StaticRoutes.BLOG_PAGE}/1`,
			permanent: false,
		},
	};
};

const BlogIndexRedirector: NextPage = () => {
	const router = useRouter();

	return <ErrorBoundary route={router.asPath} />;
};

BlogIndexRedirector.displayName = 'BlogIndexRedirector';

export default BlogIndexRedirector;
