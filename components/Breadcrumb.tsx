import { Children, FC, Fragment, PropsWithChildren } from 'react';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { BreadcrumbItem } from './BreadcrumbItem';

export interface BreadcrumbProps extends PropsWithChildren {
	theme?: 'default' | 'black';
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ children, theme = 'default' }) => {
	const childrenArray = Children.toArray(children);

	const childrenWtihSeperator = childrenArray.map((child, index) => {
		if (index !== childrenArray.length - 1) {
			return (
				<Fragment key={index}>
					{child}
					<ChevronRightIcon className="h-3 text-gray-400" />
				</Fragment>
			);
		}
		return child;
	});

	return (
		<div
			className={classNames('breadcrumb text-sm overflow-x-scroll hidden md:visible md:block', {
				'bg-gray-900 text-gray-200': theme === 'default',
				'bg-black text-gray-300 border-t border-b border-gray-900': theme === 'black',
			})}
		>
			<nav aria-label="breadcrumb" className="container mx-auto px-4 py-2">
				<ol className="flex items-center space-x-2">
					<BreadcrumbItem href="/">
						<div className="p-1 text-white rounded-full">
							<HomeIcon className="h-3.5" />
						</div>
					</BreadcrumbItem>
					<ChevronRightIcon className="h-3 text-gray-400" />

					{childrenWtihSeperator}
				</ol>
			</nav>
		</div>
	);
};

Breadcrumb.displayName = 'Breadcrumb';
