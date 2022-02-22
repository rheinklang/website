import { FC } from 'react';
import { Button } from './Button';
import { ContentConstraint } from './ContentConstraint';

export interface ErrorPageProps {
	statusCode: number;
	title: string;
	message: string;
	isRetryable?: boolean;
}

export const ErrorPage: FC<ErrorPageProps> = ({ message, statusCode, title, isRetryable = false }) => (
	<section className="py-48 bg-black text-white border-t border-b border-gray-800">
		<ContentConstraint tag="article">
			<h1 className="text-5xl mb-5 font-bold text-center">{title}</h1>
			<p className="text-xl text-center">{message}</p>
			<div className="flex align-center justify-around py-10">
				<Button type="primary" link={{ href: '/', children: 'Zur Startseite' }} />
			</div>
		</ContentConstraint>
	</section>
);

ErrorPage.displayName = 'ErrorPage';
