'use client';

import { type FC } from 'react';

export const StagingIndicator: FC = () => {
	if (!process.env.ENABLE_STAGING_INDICATOR) {
		return null;
	}

	return (
		<>
			<span className="font-mono ribbon z-50 text-sea-green-50 bg-sea-green-400 shadow-sea-green-400">
				STAGING
			</span>
			<div className="font-mono p-3 md:p-4 bg-black text-white border-t border-gray-700">
				<div className="uppercase block text-xs lg:text-xs text-center tracking-wider">
					<span className="font-bold">Staging</span> -{' '}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`https://github.com/rheinklang/website/commit/${process.env.GITHUB_SHA}`}
						className="underline"
					>
						{`${process.env.GITHUB_SHA}`.substring(0, 8)}
					</a>{' '}
					-{' '}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={`https://github.com/rheinklang/website/actions/runs/${process.env.GITHUB_RUN_ID}`}
						className="underline"
					>
						Run #{process.env.GITHUB_RUN_ID}
					</a>{' '}
					- {process.env.CONFIG_BUILD_ID}
				</div>
			</div>
		</>
	);
};

StagingIndicator.displayName = 'StagingIndicator';
