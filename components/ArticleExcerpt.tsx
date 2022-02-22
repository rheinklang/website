import { ArrowRightIcon, ClockIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';
import { Badge } from './Badge';
import { Tag } from './Tag';

export interface ArticleExcerptProps {
	className?: string;
}

export const ArticleExcerpt: FC<ArticleExcerptProps> = ({ className }) => (
	<article className={classNames('flex flex-col items-start rounded-xl bg-white shadow-sm', className)}>
		<div className="w-full h-64 lg:h-80">
			<img
				className="w-full h-64 object-cover rounded-t-xl lg:h-80"
				alt="hero"
				src="https://dummyimage.com/1920x1080/ffe054/ffffff"
			/>
		</div>
		<div className="p-8 sm:p-12">
			<Badge>CATEGORY</Badge>
			<h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
				Roof party normcore before they sold out, cornhole vape
			</h2>
			<p className="leading-relaxed mb-8">
				Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal portland. VHS man braid palo santo
				hoodie brunch trust fund. Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90s,
				slow-carb etsy tumeric. Cray pug you probably havent heard of them hexagon kickstarter craft beer pork
				chic.
			</p>
			<div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
				<Link href="#">
					<a className="group transition-all text-sea-green-400 inline-flex items-center hover:border-sea-green-600 hover:text-sea-green-600">
						Weiterlesen
						<ArrowRightIcon className="transition-all w-4 h-4 ml-1 group-hover:ml-2" />
					</a>
				</Link>
				<span className="text-gray-400 inline-flex items-center ml-auto leading-none text-sm py-1 ">
					{/* mr-3 pr-3 border-r-2 border-gray-200 */}
					<ClockIcon className="w-4 h-4 mr-1" />3 MIN
				</span>
				{/* <span className="text-gray-400 inline-flex items-center leading-none text-sm">
				<svg
					className="w-4 h-4 mr-1"
					stroke="currentColor"
					strokeWidth="2"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					viewBox="0 0 24 24"
				>
					<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
				</svg>
				6
			</span> */}
			</div>
			<a className="inline-flex items-center">
				<img
					alt="blog"
					src="https://dummyimage.com/104x104"
					className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
				/>
				<span className="flex-grow flex flex-col pl-4">
					<span className="title-font font-medium text-gray-900">Autor XYZ</span>
					<span className="text-gray-400 text-xs tracking-widest mt-0.5">Rolle</span>
				</span>
			</a>
		</div>
	</article>
);

ArticleExcerpt.displayName = 'ArticleExcerpt';
