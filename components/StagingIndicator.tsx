import { type FC } from 'react';

export const StagingIndicator: FC = () => {
	if (!process.env.ENABLE_STAGING_INDICATOR) {
		return null;
	}

	return (
		<div className="fixed left-0 right-0 bottom-0 p-2 lg:p-1 bg-slightly-rose-500 text-white shadow-md">
			<span className="uppercase block text-xs text-center tracking-wider">
				<span className="font-bold">Staging:</span>{' '}
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://github.com/rheinklang/website/commit/${process.env.GITHUB_SHA}`}
					className="underline"
				>
					SHA:{process.env.GITHUB_SHA}
				</a>{' '}
				-{' '}
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://github.com/rheinklang/website/tree/${process.env.GITHUB_REF?.replace(
						'refs/heads/',
						''
					)}`}
					className="underline"
				>
					{process.env.GITHUB_REF?.replace('refs/heads/', '')}
				</a>{' '}
				-{' '}
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`https://github.com/rheinklang/website/actions/runs/${process.env.GITHUB_RUN_ID}`}
					className="underline"
				>
					Run #{process.env.GITHUB_RUN_ID}
				</a>
			</span>
		</div>
	);
};

StagingIndicator.displayName = 'StagingIndicator';
