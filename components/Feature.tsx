import { ArrowRightIcon } from '@heroicons/react/outline';
import { FC, ComponentProps } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Heading } from './Heading';
import { Link } from './Link';

export interface FeatureProps {
	title: string;
	text: string;
	href: string;
	icon: (props: ComponentProps<'svg'>) => JSX.Element;
}

export const Feature: FC<FeatureProps> = ({ text, title, icon, href }) => {
	const translate = useTranslation();
	const Icon = icon;

	return (
		<div className="block w-full shrink-0 basis-full">
			<div className="p-4">
				<div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col h-full">
					<div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-sea-green-100 text-sea-green-500 flex-shrink-0">
						<Icon className="w-8 h-8" />
					</div>
					<div className="flex-grow">
						<Heading level="2" className="text-gray-900 text-lg font-medium mb-3">
							{title}
						</Heading>
						<p className="leading-relaxed text-base">{text}</p>
						<Link
							href={href}
							className="transition mt-4 inline-flex group text-sea-green-500 hover:text-sea-green-400"
						>
							{translate('common.action.contact')}
							<ArrowRightIcon className="inline-block w-4 h-4 ml-1 transition-all group-hover:ml-3" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

Feature.displayName = 'Feature';
