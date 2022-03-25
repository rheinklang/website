import classNames from 'classnames';
import type { FC } from 'react';
import { Heading } from '../Heading';

export interface SubmissionNotificationProps {
	title: string;
	text: string;
	type?: 'success' | 'error';
}

export const SubmissionNotification: FC<SubmissionNotificationProps> = ({ title, text, type }) => (
	<div
		className={classNames('rounded-sm py-4 px-8', {
			'bg-slightly-rose-300 text-slightly-rose-700': type === 'error',
			'bg-alpine-green-300 text-alpine-green-700': type === 'success',
		})}
	>
		<Heading level="6">{title}</Heading>
		<p className="text-sm">{text}</p>
	</div>
);

SubmissionNotification.displayName = 'SubmissionNotification';
