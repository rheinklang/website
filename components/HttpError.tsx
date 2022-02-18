import { FC } from 'react';
import { Button } from './Button';

export interface HttpErrorProps {
	statusCode: number;
	title: string;
	message: string;
	isRetryable?: boolean;
}

export const HttpError: FC<HttpErrorProps> = ({ message, statusCode, title, isRetryable = false }) => (
	<div className="py-48">
		<h1 className="text-5xl mb-5 font-bold text-center">{title}</h1>
		<p className="text-xl text-center">{message}</p>
		<div className="flex align-center justify-around py-10">
			<Button type="primary" link={{ href: '/', children: 'Zur Startseite' }} />
		</div>
	</div>
);

HttpError.displayName = 'HttpError';
