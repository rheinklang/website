import { SortAscendingIcon, SortDescendingIcon, TagIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ArticleExcerpt } from '../components/ArticleExcerpt';
import { Button } from '../components/Button';
import { ContentConstraint } from '../components/ContentConstraint';
import { Dropdown } from '../components/Dropdown';
import { Heading } from '../components/Heading';

enum BlogSort {
	ASCENDING = 'asc',
	DESCENDING = 'desc',
}

const BlogPage: NextPage = () => {
	const [sort, setSort] = useState<BlogSort>(BlogSort.DESCENDING);

	return (
		<section className="bg-gray-50">
			<div className="py-4 bg-white border-b border-gray-100">
				<ContentConstraint className="flex flex-wrap lg:flex-nowrap">
					<div className="flex flex-col text-center md:text-left">
						<Heading level="1">Neuste Artikel</Heading>
						<p className="mt-1 text-xl lg:text-2xl font-light">
							Erfahre mehr was in der Welt von Rheinklang aktuell passiert.
						</p>
					</div>
					<div className="flex flex-col w-full flex-nowrap mt-8 md:mt-3 md:ml-auto md:w-auto">
						<div className="mb-4">
							<input
								placeholder="Suchen ..."
								className="w-full border-2 border-gray-100 py-2 px-4 rounded-lg bg-gray-50/50 ring-sea-green-400"
							/>
						</div>
						<div className="w-full flex flex-row flex-wrap">
							<Dropdown placeholder="Kategorie" icon={TagIcon} />
							<Button
								type="black"
								className="ml-2 grow-0 w-1/4 md:w-auto"
								onClick={() =>
									setSort(sort === BlogSort.ASCENDING ? BlogSort.DESCENDING : BlogSort.ASCENDING)
								}
							>
								{sort === BlogSort.ASCENDING && <SortAscendingIcon className="h-6" />}
								{sort === BlogSort.DESCENDING && <SortDescendingIcon className="h-6" />}
							</Button>
						</div>
					</div>
				</ContentConstraint>
			</div>
			<div className="py-12">
				<ContentConstraint className="grid gap-8 lg:grid-cols-3">
					<ArticleExcerpt />
					<ArticleExcerpt />
					<ArticleExcerpt />
					<ArticleExcerpt />
					<ArticleExcerpt />
					<ArticleExcerpt />
					<ArticleExcerpt />
					<ArticleExcerpt />
					<ArticleExcerpt />
				</ContentConstraint>
				<ContentConstraint className="pt-2 pb-0 flex justify-center">
					<Button onClick={() => {}}>Mehr Anzeigen</Button>
				</ContentConstraint>
			</div>
		</section>
	);
};

BlogPage.displayName = 'BlogPage';

export default BlogPage;
