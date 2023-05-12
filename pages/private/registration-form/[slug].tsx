import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getRegistrationFormDataBySlug, getRegistrationFormSlugs } from '../../../api/registration-forms';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { ContentHeader } from '../../../components/ContentHeader';
import { InvitationForm } from '../../../components/forms/InvitationForm';
import { Heading } from '../../../components/Heading';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { Richtext } from '../../../components/Richtext';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { useTranslation } from '../../../hooks/useTranslation';

export interface RegistrationFormQuery extends Record<string, string> {
	slug: string;
}

export const getStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
	const data = await getRegistrationFormDataBySlug(`${context.params?.slug}`);

	const getContentProviderProps = getContextualContentProviderFetcher('form', {
		title: data.title,
		text: data.description,
	});

	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
			data,
		},
	};
};

export const getStaticPaths: GetStaticPaths<RegistrationFormQuery> = async () => {
	const slugs = await getRegistrationFormSlugs();
	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
};

const RegistrationFormPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	data,
}) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
					festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
				>
					<ContentHeader constraintClassName="lg:max-w-4xl" title={data.title} text={data.description} />
					<ContentConstraint className="lg:max-w-4xl">
						{data.areCompanionsAllowed && data.content && (
							<section className="w-full">
								<Richtext useCustomSizing as="article" content={data.content} className="max-w-full" />
							</section>
						)}
						{!data.areSubmissionsAllowed && (
							<div className="text-center sm:text-left py-16">
								<Heading level="4" className="text-gray-600">
									Dieses Formular nimmt keine Antworten mehr entgegen
								</Heading>
								<p className="mt-2 max-w-lg text-gray-400">
									Bitte kontaktieren Sie die für Sie zuständige Kontaktperson oder wenden Sie sich an
									die Organisation via{' '}
									<a
										className="text-sea-green-400 underline"
										href={`mailto:info@rheinklang.events?subject=${encodeURIComponent(data.title)}`}
									>
										info@rheinklang.events
									</a>
									.
								</p>
							</div>
						)}
						{data.areSubmissionsAllowed && (
							<InvitationForm
								id={data._id}
								title={data.title}
								formId={data.formCollectionId}
								areCompanionsAllowed={
									typeof data.areCompanionsAllowed === 'boolean' ? data.areCompanionsAllowed : false
								}
								companionCount={data.companions}
							/>
						)}
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

RegistrationFormPage.displayName = 'RegistrationFormPage';

export default RegistrationFormPage;
