import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { StaticRoutes } from '../utils/routes';
import { compileStringTemplate } from '../utils/templating';
import { Button } from './Button';
import { Link } from './Link';

export interface PaginationProps {
	count: number;
	totalCount: number;
	currentPage: number;
	pages: number[];
	children?: never;
}

export const Pagination: FC<PaginationProps> = ({ count, totalCount, currentPage, pages }) => {
	const translate = useTranslation();
	const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
	const isLastPage = useMemo(() => currentPage === pages.length, [currentPage, pages]);
	const isSinglePage = useMemo(() => pages.length === 1, [pages]);
	const paginationInfoText = useMemo(
		() =>
			compileStringTemplate(translate('common.pagination.currentText'), {
				count,
				totalCount,
			}),
		[count, totalCount, translate]
	);

	return (
		<>
			<div className="flex-1 flex justify-between gap-4 sm:hidden">
				{!isFirstPage && (
					<Button
						link={{ href: `${StaticRoutes.BLOG_PAGE}/${currentPage - 1}` }}
						isDisabled={currentPage === 1}
					>
						{translate('common.pagination.previousAction')}
					</Button>
				)}
				{!isLastPage && (
					<Button
						link={{ href: `${StaticRoutes.BLOG_PAGE}/${currentPage + 1}` }}
						isDisabled={currentPage === pages.length}
					>
						{translate('common.pagination.nextAction')}
					</Button>
				)}
				{pages.length === 1 && (
					<p className="grow text-sm text-center text-gray-200">
						{translate('common.pagination.noPagesAvailable')}
					</p>
				)}
			</div>
			<div className="hidden sm:flex bg-white w-full py-4 rounded-lg shadow-sm items-center justify-between sm:px-6">
				<div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div>
						<p className="text-sm">{paginationInfoText}</p>
					</div>
					<div>
						{isSinglePage && (
							<p className="text-sm text-gray-200">{translate('common.pagination.noPagesAvailable')}</p>
						)}
						{!isSinglePage && (
							<nav
								className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
								aria-label="Pagination"
							>
								<Link
									href={isFirstPage ? '#' : `${StaticRoutes.BLOG_PAGE}/${currentPage - 1}`}
									icon={<ChevronLeftIcon className="inline h-5 w-5" />}
									iconPositon="pre"
									className={classNames(
										'py-2 px-4 transition-colors rounded-tl-lg rounded-bl-lg relative inline-flex items-center border-t border-l border-b text-sm font-medium',
										{
											'cursor-not-allowed text-gray-200': currentPage === 1,
											'hover:bg-gray-50': !isFirstPage,
										}
									)}
								>
									<span className="sr-only">{translate('common.pagination.previousAction')}</span>
								</Link>
								{/* <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" --> */}
								{pages.map((page) => (
									<a
										key={page}
										href={`${StaticRoutes.BLOG_PAGE}/${page}`}
										className={classNames(
											'relative transition-colors inline-flex items-center px-4 py-2 border text-sm font-medium',
											{
												'hover:text-sea-green-400': currentPage !== page,
												'z-10 border-sea-green-400 text-sea-green-500 bg-sea-green-100':
													currentPage === page,
											}
										)}
									>
										{page}
									</a>
								))}
								<Link
									href={isLastPage ? '#' : `${StaticRoutes.BLOG_PAGE}/${currentPage + 1}`}
									icon={<ChevronRightIcon className="inline h-5 w-5" />}
									iconPositon="post"
									className={classNames(
										'py-2 px-4 rounded-tr-lg rounded-br-lg relative inline-flex items-center border-t border-r border-b text-sm font-medium',
										{
											'cursor-not-allowed text-gray-200': currentPage === pages.length,
											'hover:text-sea-green-400': !isLastPage,
										}
									)}
								>
									<span className="sr-only">{translate('common.pagination.nextAction')}</span>
								</Link>
							</nav>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

Pagination.displayName = 'Pagination';
