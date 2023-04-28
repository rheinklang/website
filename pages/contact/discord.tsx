import {
	BriefcaseIcon,
	InboxIcon,
	MusicalNoteIcon,
	NewspaperIcon,
	LifebuoyIcon,
	UserPlusIcon,
} from '@heroicons/react/24/outline';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDiscordPage } from '../../api/pages';
import { Button } from '../../components/Button';
import { ContentConstraint } from '../../components/ContentConstraint';
import { Feature } from '../../components/Feature';
import { Heading } from '../../components/Heading';
import { PageLayout } from '../../components/layouts/PageLayout';
import { Richtext } from '../../components/Richtext';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { useTranslation } from '../../hooks/useTranslation';
import { StaticRoutes } from '../../utils/routes';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('contactIndex');
	const contentProviderProps = await getContentProviderProps();
	const pageData = await getDiscordPage();

	return {
		props: {
			contentProviderProps,
			pageData,
		},
	};
}

const ContactDiscordPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	pageData,
}) => {
	const router = useRouter();
	const translate = useTranslation(contentProviderProps.translations);

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
					festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
				>
					<ContentConstraint className="lg:py-24">
						<div className="text-gray-600 body-font flex flex-wrap flex-col gap-10 md:flex-row md:justify-between lg:gap-12">
							<div className="basis-1/2 flex flex-col gap-4">
								<Heading level="1">{pageData.title}</Heading>
								<p className="text-lg ">{pageData.description}</p>
								<Richtext content={pageData.content} />
								{pageData.isJoinEnabled && (
									<div>
										<Button link={{ href: String(pageData.serverJoinUrl) }}>
											<UserPlusIcon className="w-5 h-5 inline align-middle mr-2" />
											Jetzt beitreten
										</Button>
									</div>
								)}
							</div>
							{pageData.isWidgetEnabled && (
								<div className="flex items-center justify-center">
									<iframe
										// @ts-expect-error - react does not recognize camelCase
										allowtransparency="true"
										src={pageData.widgetEmbedUrl}
										width="350"
										height="500"
										frameBorder={0}
										sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
									/>
								</div>
							)}
						</div>
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ContactDiscordPage.displayName = 'ContactDiscordPage';

export default ContactDiscordPage;
